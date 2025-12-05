"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import axios from "axios";
import CryptoJS from "crypto-js";
import { cpf, cnpj } from "cpf-cnpj-validator";

import {
  isCurrentStepValid as externalIsCurrentStepValid,
  validateStep as externalValidateStep,
} from "src/presentation/components/ui/steps/validation";

import { SubmissionForm, SubmissionErrors, RegistrationType } from "src/@types";

const API_VALIDAR_CPF = "/api/validar-cpf";
const API_VALIDAR_CNPJ = "/api/validar-cnpj";
const API_CNPJ = "/api/cnpj";
const API_SEND_TOKEN = "/api/send-token";
const API_VALIDATE_TOKEN = "/api/validate-token";
const API_CEP = "/api/cep";

const SEJA_PARCEIRO_URL =
  (process.env.NEXT_PUBLIC_SEJA_PARCEIRO_URL as string) ||
  "https://hapi.hotcred.com.br/api/seja-parceiro";
const CACHE_TTL_MS = Number(process.env.NEXT_PUBLIC_CACHE_TTL_MS || 86400000);

export const INITIAL_FORM: SubmissionForm = {
  cpf: "",
  cnpj: "",
  fullName: "",
  razaoSocial: "",
  nomeFantasia: "",
  whatsapp: "",
  endereco: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
  complemento: "",
  email: "",
};

function criptografar(dados: any, chave: string) {
  const json = JSON.stringify(dados);
  const key = CryptoJS.enc.Utf8.parse(chave);
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(json, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const combinado = iv.concat(encrypted.ciphertext);
  return CryptoJS.enc.Base64.stringify(combinado);
}

function createAxiosCancelToken(controller: AbortController) {
  const source = axios.CancelToken.source();
  controller.signal.addEventListener("abort", () => {
    source.cancel("abort");
  });
  return source.token;
}

function useSubmissionFormInner() {
  const searchParams = useSearchParams();
  const LS_KEY_CPF_VALIDATE = "hc_cache_cpf_validate";
  const LS_KEY_CNPJ_VALIDATE = "hc_cache_cnpj_validate";
  const LS_KEY_CNPJ_PREFILL = "hc_cache_cnpj_prefill";
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<SubmissionForm>({ ...INITIAL_FORM });
  const [tipoCadastro, setTipoCadastro] =
    useState<RegistrationType>("juridica");
  const [errors, setErrors] = useState<SubmissionErrors>({
    nomeFantasia: "",
    razaoSocial: "",
    fullName: "",
    complemento: "",
    email: "",
    whatsapp: "",
    cpf: "",
    cnpj: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [contractSentSuccessfully, setContractSentSuccessfully] =
    useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [cpfValidado, setCpfValidado] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingCnpj, setLoadingCnpj] = useState(false);
  const [loadingCpf, setLoadingCpf] = useState(false);
  const [useOldSend, setUseOldSend] = useState(false);

  const cnpjDebounceRef = useRef<number | null>(null);
  const cnpjAbortRef = useRef<AbortController | null>(null);
  const cnpjPrefillDebounceRef = useRef<number | null>(null);
  const cnpjPrefillAbortRef = useRef<AbortController | null>(null);
  const lastPrefilledCnpjRef = useRef<string>("");
  const cpfDebounceRef = useRef<number | null>(null);
  const cpfAbortRef = useRef<AbortController | null>(null);
  const cpfValidationCacheRef = useRef<Record<string, any>>({});
  const cnpjValidationCacheRef = useRef<Record<string, any>>({});
  const cnpjPrefillCacheRef = useRef<Record<string, any>>({});

  useEffect(() => {
    try {
      const now = Date.now();
      const cpfRaw = localStorage.getItem(LS_KEY_CPF_VALIDATE);
      const cnpjRaw = localStorage.getItem(LS_KEY_CNPJ_VALIDATE);
      const prefillRaw = localStorage.getItem(LS_KEY_CNPJ_PREFILL);
      const cpfCache = cpfRaw ? JSON.parse(cpfRaw) : {};
      const cnpjCache = cnpjRaw ? JSON.parse(cnpjRaw) : {};
      const prefillCache = prefillRaw ? JSON.parse(prefillRaw) : {};
      const prune = (obj: Record<string, any>) => {
        const out: Record<string, any> = {};
        Object.keys(obj || {}).forEach((k) => {
          const v = obj[k];
          if (!v || typeof v !== "object") return;
          const ts = v.ts || 0;
          if (ts && now - ts > CACHE_TTL_MS) return;
          out[k] = v;
        });
        return out;
      };
      cpfValidationCacheRef.current = prune(cpfCache);
      cnpjValidationCacheRef.current = prune(cnpjCache);
      cnpjPrefillCacheRef.current = prune(prefillCache);
      localStorage.setItem(
        LS_KEY_CPF_VALIDATE,
        JSON.stringify(cpfValidationCacheRef.current)
      );
      localStorage.setItem(
        LS_KEY_CNPJ_VALIDATE,
        JSON.stringify(cnpjValidationCacheRef.current)
      );
      localStorage.setItem(
        LS_KEY_CNPJ_PREFILL,
        JSON.stringify(cnpjPrefillCacheRef.current)
      );
    } catch {}
  }, []);

  useEffect(() => {
    const tipoRaw = searchParams.get("tipo");
    const tipo = (tipoRaw || "").toLowerCase();
    if (tipo === "pf" || tipo === "fisica") {
      setTipoCadastro("fisica");
    } else if (tipo === "pj" || tipo === "juridica") {
      setTipoCadastro("juridica");
    }
    const enviarRaw = searchParams.get("enviar");
    const enviar = (enviarRaw || "").toLowerCase();
    setUseOldSend(enviar === "antigo");
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const sanitized =
      name === "fullName" ? value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "") : value;
    setForm({ ...form, [name]: sanitized });
    if (name !== "cnpj" && name !== "cpf") {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "cpf") {
      setCpfValidado(cpf.isValid(value));
      const digits = String(value || "").replace(/\D/g, "");
      if (digits.length === 11 && cpf.isValid(value) && !loadingCpf) {
        setTimeout(() => {
          handleCpfBlur();
        }, 0);
      }
    }

    if (name === "cnpj") {
      const digits = String(value || "").replace(/\D/g, "");
      if (digits.length === 14 && cnpj.isValid(value) && !loadingCnpj) {
        setTimeout(() => {
          handleCnpjBlur();
        }, 0);
      }
    }
  };

  const handleCpfBlur = async () => {
    const digits = (form.cpf || "").replace(/\D/g, "");
    if (digits.length !== 11) return false;
    if (!cpf.isValid(form.cpf)) {
      setErrors((prev) => ({ ...prev, cpf: "CPF inválido" }));
      return false;
    }
    const cached = cpfValidationCacheRef.current[digits];
    if (cached) {
      setErrors((prev) => ({
        ...prev,
        cpf: cached.existe ? cached.mensagem || "CPF já cadastrado." : "",
      }));
      return !cached.existe;
    }
    setLoadingCpf(true);
    try {
      const resp = await axios.get(`${API_VALIDAR_CPF}?cpf=${digits}`);
      const data = resp.data;
      if (
        resp.status >= 200 &&
        resp.status < 300 &&
        data &&
        typeof data === "object"
      ) {
        cpfValidationCacheRef.current[digits] = {
          existe: !!data.existe,
          mensagem: data.mensagem,
          ts: Date.now(),
        };
        try {
          localStorage.setItem(
            LS_KEY_CPF_VALIDATE,
            JSON.stringify(cpfValidationCacheRef.current)
          );
        } catch {}
        if (data.existe) {
          setErrors((prev) => ({
            ...prev,
            cpf: data.mensagem || "CPF já cadastrado.",
          }));
          return false;
        } else {
          setErrors((prev) => ({ ...prev, cpf: "" }));
          return true;
        }
      }
    } catch {
    } finally {
      setLoadingCpf(false);
    }
    return false;
  };

  useEffect(() => {
    const digits = (form.cpf || "").replace(/\D/g, "");
    if (digits.length !== 11) {
      if (cpfAbortRef.current) cpfAbortRef.current.abort();
      setLoadingCpf(false);
      setErrors((prev) => ({ ...prev, cpf: "" }));
      return;
    }
    if (!cpf.isValid(form.cpf)) {
      if (cpfAbortRef.current) cpfAbortRef.current.abort();
      setLoadingCpf(false);
      setErrors((prev) => ({ ...prev, cpf: "CPF inválido" }));
      return;
    }
    const cached = cpfValidationCacheRef.current[digits];
    if (cached) {
      setLoadingCpf(false);
      setErrors((prev) => ({
        ...prev,
        cpf: cached.existe ? cached.mensagem || "CPF já cadastrado." : "",
      }));
      return;
    }
    if (cpfDebounceRef.current) clearTimeout(cpfDebounceRef.current);
    setLoadingCpf(true);
    cpfDebounceRef.current = window.setTimeout(async () => {
      try {
        if (cpfAbortRef.current) cpfAbortRef.current.abort();
        cpfAbortRef.current = new AbortController();
        const resp = await axios.get(`${API_VALIDAR_CPF}?cpf=${digits}`, {
          cancelToken: createAxiosCancelToken(cpfAbortRef.current),
        });
        const data = resp.data;
        if (
          resp.status >= 200 &&
          resp.status < 300 &&
          data &&
          typeof data === "object"
        ) {
          cpfValidationCacheRef.current[digits] = {
            existe: !!data.existe,
            mensagem: data.mensagem,
            ts: Date.now(),
          };
          try {
            localStorage.setItem(
              LS_KEY_CPF_VALIDATE,
              JSON.stringify(cpfValidationCacheRef.current)
            );
          } catch {}
          if (data.existe) {
            setErrors((prev) => ({
              ...prev,
              cpf: data.mensagem || "CPF já cadastrado.",
            }));
          } else {
            setErrors((prev) => ({ ...prev, cpf: "" }));
          }
        }
      } catch (e) {
      } finally {
        setLoadingCpf(false);
      }
    }, 600) as unknown as number;
    return () => {
      if (cpfDebounceRef.current) clearTimeout(cpfDebounceRef.current);
      if (cpfAbortRef.current) cpfAbortRef.current.abort();
    };
  }, [form.cpf]);

  useEffect(() => {
    const digits = (form.cnpj || "").replace(/\D/g, "");
    if (digits.length !== 14) {
      if (cnpjAbortRef.current) cnpjAbortRef.current.abort();
      setLoadingCnpj(false);
      setErrors((prev) => ({ ...prev, cnpj: "" }));
      return;
    }
    if (!cnpj.isValid(form.cnpj)) {
      if (cnpjAbortRef.current) cnpjAbortRef.current.abort();
      setLoadingCnpj(false);
      setErrors((prev) => ({ ...prev, cnpj: "CNPJ inválido" }));
      return;
    }
    const cached = cnpjValidationCacheRef.current[digits];
    if (cached) {
      setLoadingCnpj(false);
      setErrors((prev) => ({
        ...prev,
        cnpj: cached.existe ? cached.mensagem || "CNPJ já cadastrado." : "",
      }));
      return;
    }
    if (cnpjDebounceRef.current) {
      clearTimeout(cnpjDebounceRef.current);
    }
    setLoadingCnpj(true);
    cnpjDebounceRef.current = window.setTimeout(async () => {
      try {
        if (cnpjAbortRef.current) cnpjAbortRef.current.abort();
        cnpjAbortRef.current = new AbortController();
        const resp = await axios.get(`${API_VALIDAR_CNPJ}?cnpj=${digits}`, {
          cancelToken: createAxiosCancelToken(cnpjAbortRef.current),
        });
        const data = resp.data;
        if (
          resp.status >= 200 &&
          resp.status < 300 &&
          data &&
          typeof data === "object"
        ) {
          cnpjValidationCacheRef.current[digits] = {
            existe: !!data.existe,
            mensagem: data.mensagem,
            ts: Date.now(),
          };
          try {
            localStorage.setItem(
              LS_KEY_CNPJ_VALIDATE,
              JSON.stringify(cnpjValidationCacheRef.current)
            );
          } catch {}
          if (data.existe) {
            setErrors((prev) => ({
              ...prev,
              cnpj: data.mensagem || "CNPJ já cadastrado.",
            }));
          } else {
            setErrors((prev) => ({ ...prev, cnpj: "" }));
          }
        }
      } catch (e) {
        // Silenciar falhas de rede; não bloquear avanço
      } finally {
        setLoadingCnpj(false);
      }
    }, 600) as unknown as number;
    return () => {
      if (cnpjDebounceRef.current) clearTimeout(cnpjDebounceRef.current);
      if (cnpjAbortRef.current) cnpjAbortRef.current.abort();
    };
  }, [form.cnpj]);

  useEffect(() => {
    const digits = (form.cnpj || "").replace(/\D/g, "");
    if (digits.length !== 14) {
      if (cnpjPrefillAbortRef.current) cnpjPrefillAbortRef.current.abort();
      return;
    }
    const needsPrefill =
      !form.razaoSocial || !form.nomeFantasia || !form.endereco;
    if (!needsPrefill) return;
    if (lastPrefilledCnpjRef.current === digits) return;
    const cached = cnpjPrefillCacheRef.current[digits];
    if (cached) {
      setForm((prev) => ({
        ...prev,
        razaoSocial: cached.razao_social || prev.razaoSocial,
        nomeFantasia: cached.nome_fantasia || prev.nomeFantasia,
        endereco: cached.logradouro || prev.endereco,
        numero: cached.numero || prev.numero,
        bairro: cached.bairro || prev.bairro,
        cep: cached.cep || prev.cep,
        cidade: cached.cidade || prev.cidade,
        estado: cached.uf || prev.estado,
        complemento: cached.complemento || prev.complemento,
      }));
      setErrors((prev) => ({
        ...prev,
        razaoSocial: "",
        nomeFantasia: "",
        endereco: "",
        numero: "",
        bairro: "",
        cep: "",
        cidade: "",
        estado: "",
      }));
      lastPrefilledCnpjRef.current = digits;
      return;
    }
    if (cnpjPrefillDebounceRef.current) {
      clearTimeout(cnpjPrefillDebounceRef.current);
    }
    cnpjPrefillDebounceRef.current = window.setTimeout(async () => {
      try {
        if (cnpjPrefillAbortRef.current) cnpjPrefillAbortRef.current.abort();
        cnpjPrefillAbortRef.current = new AbortController();
        const resp = await axios.post(
          API_CNPJ,
          { cnpj: digits },
          {
            cancelToken: createAxiosCancelToken(cnpjPrefillAbortRef.current),
          }
        );
        if (resp.status >= 200 && resp.status < 300) {
          const data = resp.data;
          cnpjPrefillCacheRef.current[digits] = { ...data, ts: Date.now() };
          try {
            localStorage.setItem(
              LS_KEY_CNPJ_PREFILL,
              JSON.stringify(cnpjPrefillCacheRef.current)
            );
          } catch {}
          setForm((prev) => ({
            ...prev,
            razaoSocial: data.razao_social || prev.razaoSocial,
            nomeFantasia: data.nome_fantasia || prev.nomeFantasia,
            endereco: data.logradouro || prev.endereco,
            numero: data.numero || prev.numero,
            bairro: data.bairro || prev.bairro,
            cep: data.cep || prev.cep,
            cidade: data.cidade || prev.cidade,
            estado: data.uf || prev.estado,
            complemento: data.complemento || prev.complemento,
          }));
          setErrors((prev) => ({
            ...prev,
            razaoSocial: "",
            nomeFantasia: "",
            endereco: "",
            numero: "",
            bairro: "",
            cep: "",
            cidade: "",
            estado: "",
          }));
          lastPrefilledCnpjRef.current = digits;
        }
      } catch {}
    }, 800) as unknown as number;
    return () => {
      if (cnpjPrefillDebounceRef.current)
        clearTimeout(cnpjPrefillDebounceRef.current);
      if (cnpjPrefillAbortRef.current) cnpjPrefillAbortRef.current.abort();
    };
  }, [form.cnpj, form.razaoSocial, form.nomeFantasia, form.endereco]);

  const handleCepBlur = async (
    e: React.FocusEvent<HTMLInputElement>
  ): Promise<boolean> => {
    const val = e?.target?.value ?? form.cep ?? "";
    const rawCep = val.replace(/\D/g, "");
    if (rawCep.length !== 8) return false;
    setLoadingCep(true);
    try {
      const response = await axios.post(API_CEP, { cep: rawCep });
      const data = response.data;
      if (response.status >= 200 && response.status < 300) {
        setForm((prev) => ({
          ...prev,
          endereco: data.logradouro || prev.endereco,
          bairro: data.bairro || prev.bairro,
          cidade: data.localidade || prev.cidade,
          estado: data.uf || prev.estado,
        }));
        setErrors((prev) => ({
          ...prev,
          endereco: "",
          bairro: "",
          cidade: "",
          estado: "",
        }));
        return true;
      } else {
        setErrors((prev) => ({ ...prev, cep: data?.error || "CEP inválido" }));
        return false;
      }
    } catch (e) {
      setErrors((prev) => ({ ...prev, cep: "Erro ao consultar CEP" }));
      return false;
    } finally {
      setLoadingCep(false);
    }
  };

  const handleCnpjBlur = async () => {
    const digits = (form.cnpj || "").replace(/\D/g, "");
    if (digits.length !== 14) return false;
    if (!cnpj.isValid(form.cnpj)) {
      setErrors((prev) => ({ ...prev, cnpj: "CNPJ inválido" }));
      return false;
    }
    const cached = cnpjValidationCacheRef.current[digits];
    if (cached) {
      setErrors((prev) => ({
        ...prev,
        cnpj: cached.existe ? cached.mensagem || "CNPJ já cadastrado." : "",
      }));
      return !cached.existe;
    }
    setLoadingCnpj(true);
    try {
      const resp = await axios.get(`${API_VALIDAR_CNPJ}?cnpj=${digits}`);
      const data = resp.data;
      if (
        resp.status >= 200 &&
        resp.status < 300 &&
        data &&
        typeof data === "object"
      ) {
        cnpjValidationCacheRef.current[digits] = {
          existe: !!data.existe,
          mensagem: data.mensagem,
          ts: Date.now(),
        };
        try {
          localStorage.setItem(
            LS_KEY_CNPJ_VALIDATE,
            JSON.stringify(cnpjValidationCacheRef.current)
          );
        } catch {}
        if (data.existe) {
          setErrors((prev) => ({
            ...prev,
            cnpj: data.mensagem || "CNPJ já cadastrado.",
          }));
          return false;
        } else {
          setErrors((prev) => ({ ...prev, cnpj: "" }));
          return true;
        }
      }
    } catch {
    } finally {
      setLoadingCnpj(false);
    }
    return false;
  };

  const handleSendToken = async (): Promise<boolean> => {
    const digits = (form.whatsapp || "").replace(/\D/g, "");
    if (!digits || digits.length < 10) {
      setShowErrorModal(true);
      setErrorMessages(["Telefone inválido para envio de SMS"]);
      return false;
    }
    try {
      const resp = await axios.post(API_SEND_TOKEN, { telefone: digits });
      if (resp.status >= 200 && resp.status < 300) return true;
      const data: any = resp.data;
      setShowErrorModal(true);
      setErrorMessages([
        (data && (data.message || data.error)) || "Falha ao enviar token",
      ]);
      return false;
    } catch (e: any) {
      const data = e?.response?.data;
      setShowErrorModal(true);
      setErrorMessages([
        (data && (data.message || data.error)) || "Falha ao enviar token",
      ]);
      return false;
    }
  };

  const handleValidateToken = async (token: string): Promise<boolean> => {
    const phoneDigits = (form.whatsapp || "").replace(/\D/g, "");
    const tokenDigits = String(token || "").replace(/\D/g, "");
    if (!phoneDigits || phoneDigits.length < 10) {
      setShowErrorModal(true);
      setErrorMessages(["Telefone inválido para validação"]);
      return false;
    }
    if (!tokenDigits || tokenDigits.length !== 6) {
      setShowErrorModal(true);
      setErrorMessages(["Token inválido"]);
      return false;
    }
    try {
      const resp = await axios.post(API_VALIDATE_TOKEN, {
        telefone: phoneDigits,
        token: tokenDigits,
      });
      if (resp.status >= 200 && resp.status < 300) return true;
      const data: any = resp.data;
      const rawMsg = (data && (data.message || data.error)) || "";
      const msg =
        resp.status === 400 ||
        /c[oó]digo inv[aá]lido|token inv[aá]lido/i.test(rawMsg)
          ? "Token inválido"
          : rawMsg || "Falha ao validar token";
      setShowErrorModal(true);
      setErrorMessages([msg]);
      return false;
    } catch (e: any) {
      const status = e?.response?.status;
      const data = e?.response?.data;
      const rawMsg = (data && (data.message || data.error)) || "";
      const msg =
        status === 400 ||
        /c[oó]digo inv[aá]lido|token inv[aá]lido/i.test(rawMsg)
          ? "Token inválido"
          : rawMsg || "Erro inesperado ao validar token";
      setShowErrorModal(true);
      setErrorMessages([msg]);
      return false;
    }
  };

  const handleNext = async () => {
    if (step === 0) {
      const cpfDigits = (form.cpf || "").replace(/\D/g, "");
      if (cpfDigits.length === 11 && cpf.isValid(form.cpf)) {
        await handleCpfBlur();
      }
      if (tipoCadastro === "juridica") {
        const cnpjDigits = (form.cnpj || "").replace(/\D/g, "");
        if (cnpjDigits.length === 14 && cnpj.isValid(form.cnpj)) {
          await handleCnpjBlur();
        }
      }
    }
    if (!isCurrentStepValid()) {
      const { newErrors, errorMessages, hasErrors } = externalValidateStep(
        step,
        form,
        tipoCadastro
      );
      const mergedErrors = { ...newErrors } as SubmissionErrors;
      // Preserva mensagem de CNPJ já cadastrado
      if (errors.cnpj && errors.cnpj.length > 0) {
        mergedErrors.cnpj = errors.cnpj;
      }
      // Preserva mensagem de CPF já cadastrado
      if (errors.cpf && errors.cpf.length > 0) {
        mergedErrors.cpf = errors.cpf;
      }
      const combinedMessages = [
        ...errorMessages,
        ...(errors.cnpj && errors.cnpj.length > 0 ? [errors.cnpj] : []),
        ...(errors.cpf && errors.cpf.length > 0 ? [errors.cpf] : []),
      ];
      const shouldBlock =
        hasErrors ||
        (errors.cnpj && errors.cnpj.length > 0) ||
        (errors.cpf && errors.cpf.length > 0);
      if (shouldBlock) {
        if (hasErrors) setErrors(mergedErrors);
        setErrorMessages(combinedMessages);
        setShowErrorModal(true);
        return;
      }
    }

    if (step < 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const isCurrentStepValid = () =>
    externalIsCurrentStepValid(step, form, tipoCadastro, errors, cpfValidado);

  const handleTipoCadastroChange = (tipo: RegistrationType) => {
    setTipoCadastro(tipo);
    if (tipo === "fisica") {
      setForm((prev) => ({ ...prev, cnpj: "" }));
    }
  };

  const validateAllFields = () => true;

  const ensureStepValid = () => {
    if (!isCurrentStepValid()) {
      const { newErrors, errorMessages, hasErrors } = externalValidateStep(
        step,
        form,
        tipoCadastro
      );
      const mergedErrors = { ...newErrors } as SubmissionErrors;
      if (errors.cnpj && errors.cnpj.length > 0) {
        mergedErrors.cnpj = errors.cnpj;
      }
      if (errors.cpf && errors.cpf.length > 0) {
        mergedErrors.cpf = errors.cpf;
      }
      const combinedMessages = [
        ...errorMessages,
        ...(errors.cnpj && errors.cnpj.length > 0 ? [errors.cnpj] : []),
        ...(errors.cpf && errors.cpf.length > 0 ? [errors.cpf] : []),
      ];
      if (
        hasErrors ||
        (errors.cnpj && errors.cnpj.length > 0) ||
        (errors.cpf && errors.cpf.length > 0)
      ) {
        setErrors(mergedErrors);
        setErrorMessages(combinedMessages);
        setShowErrorModal(true);
        return false;
      }
    }
    return true;
  };

  async function sendHotcredRequest(form: any) {
    const h = searchParams.get("h");
    const p = searchParams.get("p");
    const d = searchParams.get("d");
    const qs = new URLSearchParams();
    if (h) qs.set("h", h);
    if (p) qs.set("p", p);
    if (d) qs.set("d", d);
    const path = `/api/seja-parceiro${
      qs.toString() ? `?${qs.toString()}` : ""
    }`;
    const resp = await axios.post(
      path,
      {
        form,
        tipo: tipoCadastro === "juridica" ? "PJ" : "PF",
      },
      {
        validateStatus: () => true,
      }
    );
    const body =
      typeof resp.data === "string" ? resp.data : JSON.stringify(resp.data);
    return { status: resp.status, body };
  }

  const handleSubmitContract = async () => {
    setIsSubmitting(true);
    setErrorMessages([]);
    setShowErrorModal(false);
    let attempts = 0;
    const maxAttempts = 2;
    while (attempts < maxAttempts) {
      try {
        const result = await sendHotcredRequest(form);
        console.log("🔵 Status:", result.status);
        console.log("🟢 Body:", result.body);

        let parsed: any = null;
        try {
          parsed = JSON.parse(result.body);
        } catch {}

        if (result.status === 200) {
          setShowSuccessModal(true);
          setContractSentSuccessfully(true);
          break;
        }
        if (result.status === 207) {
          setShowSuccessModal(true);
          setContractSentSuccessfully(false);
          break;
        }

        setShowErrorModal(true);
        let formattedErrors: string[] = [];
        if (parsed && typeof parsed === "object") {
          const mapField = (field: string) => {
            const map: Record<string, string> = {
              cpf: "CPF",
              cnpj: "CNPJ",
              razao_social: "Razão Social",
              nome_fantasia: "Nome Fantasia",
              estado: "Estado",
              cidade: "Cidade",
              bairro: "Bairro",
              endereco: "Endereço",
              numero: "Número",
              email: "Email",
              telefone: "Telefone",
              banco: "Banco",
              agencia: "Agência",
              conta: "Conta",
              tipo_chave_pix: "Tipo Chave PIX",
              chave_pix: "Chave PIX",
            };
            return map[field] || field;
          };
          if (parsed.errors && typeof parsed.errors === "object") {
            const entries = Object.entries(
              parsed.errors as Record<string, string[] | string>
            );
            const details = entries.flatMap(([field, messages]) => {
              const arr = Array.isArray(messages)
                ? messages
                : [messages as string];
              const rawField = field.replace(/_/g, " ");
              const pretty = mapField(field);
              return arr.map((m) => {
                return m.replace(
                  new RegExp(`(campo\\s+)${rawField}`, "i"),
                  `$1${pretty}`
                );
              });
            });
            formattedErrors = details.length
              ? details
              : ["Erro ao enviar cadastro"];
          } else {
            formattedErrors = ["Erro ao enviar cadastro"];
          }
        } else {
          formattedErrors = [result.body || "Erro ao enviar cadastro"];
        }
        setErrorMessages(formattedErrors);
        break;
      } catch (error) {
        console.error(error);
        setShowErrorModal(true);
        setErrorMessages(["Erro inesperado ao enviar cadastro"]);
        break;
      }
    }
    setIsSubmitting(false);
  };

  return {
    step,
    setStep,
    form,
    setForm,
    tipoCadastro,
    setTipoCadastro,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    showSuccessModal,
    setShowSuccessModal,
    contractSentSuccessfully,
    showErrorModal,
    setShowErrorModal,
    errorMessages,
    handleChange,
    handleCpfBlur,
    handleCnpjBlur,
    handleCepBlur,
    handleNext,
    handleBack,
    isCurrentStepValid,
    handleTipoCadastroChange,
    cpfValidado,
    validateAllFields,
    ensureStepValid,
    loadingCep,
    loadingCnpj,
    loadingCpf,
    handleSubmitContract,
    handleSendToken,
    handleValidateToken,
    useOldSend,
  };
}

export function useSubmissionForm() {
  return useSubmissionFormInner();
}
