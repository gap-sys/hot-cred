"use client";

import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { useSearchParams } from "next/navigation";

import { SubmissionForm, SubmissionErrors, RegistrationType } from "src/@types";
import { cpf } from "cpf-cnpj-validator";
import {
  isCurrentStepValid as externalIsCurrentStepValid,
  validateStep as externalValidateStep,
} from "src/presentation/components/ui/steps/validation";

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

function useSubmissionFormInner() {
  const searchParams = useSearchParams();
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

  useEffect(() => {}, []);

  useEffect(() => {
    const tipoRaw = searchParams.get("tipo");
    const tipo = (tipoRaw || "").toLowerCase();
    if (tipo === "pf" || tipo === "fisica") {
      setTipoCadastro("fisica");
    } else if (tipo === "pj" || tipo === "juridica") {
      setTipoCadastro("juridica");
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const sanitized =
      name === "fullName" ? value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, "") : value;
    setForm({ ...form, [name]: sanitized });
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "cpf") {
      setCpfValidado(cpf.isValid(value));
    }
  };

  const handleCpfBlur = async () => {};

  const handleCepBlur = async (
    e: React.FocusEvent<HTMLInputElement>
  ): Promise<boolean> => {
    const val = e?.target?.value ?? form.cep ?? "";
    const rawCep = val.replace(/\D/g, "");
    if (rawCep.length !== 8) return false;
    setLoadingCep(true);
    try {
      const response = await fetch("/api/cep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cep: rawCep }),
      });
      const data = await response.json();
      if (response.ok) {
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
        setErrors((prev) => ({ ...prev, cep: data.error || "CEP inválido" }));
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
    const rawCnpj = (form.cnpj || "").replace(/\D/g, "");
    if (rawCnpj.length !== 14) return;
    setLoadingCnpj(true);
    try {
      const response = await fetch("/api/cnpj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cnpj: rawCnpj }),
      });
      const data = await response.json();
      if (response.ok) {
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
      } else {
        setErrors((prev) => ({
          ...prev,
          cnpj: data.message || "CNPJ inválido",
        }));
      }
    } catch (e) {
      setErrors((prev) => ({ ...prev, cnpj: "Erro ao consultar CNPJ" }));
    } finally {
      setLoadingCnpj(false);
    }
  };

  const handleNext = async () => {
    if (!isCurrentStepValid()) {
      const { newErrors, errorMessages, hasErrors } = externalValidateStep(
        step,
        form,
        tipoCadastro
      );
      if (hasErrors) {
        setErrors(newErrors);
        setErrorMessages(errorMessages);
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
      if (hasErrors) {
        setErrors(newErrors);
        setErrorMessages(errorMessages);
        setShowErrorModal(true);
        return false;
      }
    }
    return true;
  };

  async function sendHotcredRequest(form: any) {
    const baseUrl = "https://hapi.hotcred.com.br/api/seja-parceiro";
    const cryptoKey = process.env.SEJA_PARCEIRO_CRIPTO;
    let encryptedAll: string | null = null;
    if (cryptoKey) {
      const data = {
        cpf: (form.cpf || "").replace(/\D/g, ""),
        nome: form.fullName,
        sexo: "1",
        telefone: (form.whatsapp || "").replace(/\D/g, ""),
        email: form.email,
        nome_fantasia: form.nomeFantasia,
        razao_social: form.razaoSocial,
        cep: form.cep,
        endereco: form.endereco,
        numero: form.numero,
        bairro: form.bairro,
        cidade: form.cidade,
        estado: form.estado,
        banco: form.banco || "237",
        agencia: form.agencia || "1548",
        conta: form.conta || "21584",
        tipo_chave_pix: form.tipo_chave_pix || "cpf",
        chave_pix: form.chave_pix || (form.cpf || "").replace(/\D/g, ""),
        cnpj: form.cnpj.replace(/\D/g, ""),
      };

      encryptedAll = criptografar(data, cryptoKey as string);
    }

    const baseQuery =
      "?h=0368d36026ac6c3214ca19b8935db5563eca8a12d3908e02bd5d90bcd9faca63" +
      "&p=5e583501" +
      "&d=eyJpZF9jb3JiYW5fbWFya2V0aW5nIjo1LCJpZF9jb3JiYW4iOjEsInNlamFfcGFyY2Vpcm8iOjIsImlkX3RpcG9fY29yYmFuIjozLCJub21lX2NhbXBhbmhhIjoiQ2FtcGFuaGEgdGVzdGUiLCJleHBpcmFjYW8iOm51bGwsInRpbWVzdGFtcCI6MTc2NDc4NTcxMywibGlua0lkIjoiNWU1ODM1MDEifQ==";
    const rawQuery =
      "&cpf=" +
      encodeURIComponent(form.cpf.replace(/\D/g, "")) +
      "&nome=" +
      encodeURIComponent(form.fullName) +
      "&sexo=" +
      encodeURIComponent("1") +
      "&telefone=" +
      encodeURIComponent(form.whatsapp.replace(/\D/g, "")) +
      "&email=" +
      encodeURIComponent(form.email) +
      "&nome_fantasia=" +
      encodeURIComponent(form.nomeFantasia) +
      "&razao_social=" +
      encodeURIComponent(form.razaoSocial) +
      "&cep=" +
      encodeURIComponent(form.cep) +
      "&endereco=" +
      encodeURIComponent(form.endereco) +
      "&numero=" +
      encodeURIComponent(form.numero) +
      "&bairro=" +
      encodeURIComponent(form.bairro) +
      "&cidade=" +
      encodeURIComponent(form.cidade) +
      "&estado=" +
      encodeURIComponent(form.estado) +
      "&banco=" +
      encodeURIComponent(form.banco || "237") +
      "&agencia=" +
      encodeURIComponent(form.agencia || "1548") +
      "&conta=" +
      encodeURIComponent(form.conta || "21584") +
      "&tipo_chave_pix=" +
      encodeURIComponent(form.tipo_chave_pix || "cpf") +
      "&chave_pix=" +
      encodeURIComponent(
        form.chave_pix || (form.cpf || "").replace(/\D/g, "")
      ) +
      "&cnpj=" +
      encodeURIComponent(form.cnpj.replace(/\D/g, ""));

    const url =
      baseUrl +
      baseQuery +
      (encryptedAll ? "&dados=" + encodeURIComponent(encryptedAll) : rawQuery);

    const response = await fetch(url, {
      method: "POST",
    });

    const text = await response.text();

    return {
      status: response.status,
      body: text,
    };
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
    handleSubmitContract,
  };
}

export function useSubmissionForm() {
  return useSubmissionFormInner();
}
