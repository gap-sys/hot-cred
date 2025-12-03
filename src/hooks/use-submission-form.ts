"use client";

import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

import { isValidWhatsapp, isValidEmail } from "src/utils/validation";
import { SubmissionForm, SubmissionErrors, RegistrationType } from "src/@types";

import { cpf, cnpj } from "cpf-cnpj-validator";

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
  const [showSmsVerification, setShowSmsVerification] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [isVerifyingSms, setIsVerifyingSms] = useState(false);
  const [isSendingSms, setIsSendingSms] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [contractSentSuccessfully, setContractSentSuccessfully] =
    useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [smsError, setSmsError] = useState("");
  const [loadingCpf, setLoadingCpf] = useState(false);
  const [lastCpfFetched, setLastCpfFetched] = useState("");
  const [cpfValidado, setCpfValidado] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  useEffect(() => {
    const tipo = searchParams.get("tipo");
    if (tipo === "pf" || tipo === "fisica") {
      setTipoCadastro("fisica");
    } else if (tipo === "pj" || tipo === "juridica") {
      setTipoCadastro("juridica");
    }
  }, [searchParams]);

  const fetchCpfData = async (cpfValue: string) => {
    try {
      const resp = await fetch("/api/cpf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: cpfValue }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        toast.error(data.message || "Erro ao consultar CPF");
        return null;
      }
      return data;
    } catch (e) {
      toast.error("Erro ao consultar CPF");
      return null;
    }
  };

  // CNPJ preenchido manualmente

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "email") {
      if (value && !isValidEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "E-mail inválido" }));
      }
    }
    if (name === "whatsapp") {
      if (value && !isValidWhatsapp(value)) {
        setErrors((prev) => ({ ...prev, whatsapp: "WhatsApp inválido" }));
      }
    }
    if (name === "cpf") {
      setForm((prev) => ({
        ...prev,
        fullName: "",
      }));
      if (value.replace(/\D/g, "").length < 11) {
        setErrors((prev) => ({ ...prev, cpf: "" }));
      } else if (!cpf.isValid(value)) {
        setErrors((prev) => ({ ...prev, cpf: "CPF inválido" }));
      }
    }
    if (name === "cnpj") {
      setForm((prev) => ({
        ...prev,
        nomeFantasia: "",
        razaoSocial: "",
      }));
      if (value.replace(/\D/g, "").length < 14) {
        setErrors((prev) => ({ ...prev, cnpj: "" }));
      } else if (!cnpj.isValid(value)) {
        setErrors((prev) => ({ ...prev, cnpj: "CNPJ inválido" }));
      }
    }
    if (name === "fullName") {
      const nomeValido =
        value.trim().length >= 10 && value.trim().includes(" ");
      if (value && !nomeValido) {
        setErrors((prev) => ({
          ...prev,
          fullName: "Digite seu nome completo",
        }));
      }
    }
  };

  const handleCpfBlur = async () => {
    const cpfLimpo = form.cpf.replace(/\D/g, "");
    if (cpfLimpo.length < 11) return;
    if (!cpf.isValid(cpfLimpo)) {
      setErrors((prev) => ({ ...prev, cpf: "CPF inválido" }));
      setCpfValidado(false);
      return;
    }
    if (cpfLimpo.length === 11 && cpfLimpo !== lastCpfFetched) {
      setLoadingCpf(true);
      try {
        // Primeiro, verifica se o CPF já existe no sistema
        const checkResponse = await fetch("/api/check-partner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cpf: cpfLimpo }),
        });

        if (checkResponse.ok) {
          const checkData = await checkResponse.json();
          if (checkData.exists) {
            setErrors((prev) => ({
              ...prev,
              cpf: "Este CPF já está cadastrado no sistema.",
            }));
            setCpfValidado(false);
            setLoadingCpf(false);
            return;
          }
        }

        // Se não existe, busca os dados do CPF
        const data = await fetchCpfData(cpfLimpo);
        const nome =
          data?.response?.nome || data?.response?.content?.nome?.conteudo?.nome;
        if (nome) {
          setForm((prev) => ({
            ...prev,
            fullName: nome,
          }));
          setLastCpfFetched(cpfLimpo);
          setCpfValidado(true);
          setErrors((prev) => ({ ...prev, cpf: "" }));
        } else {
          setErrors((prev) => ({ ...prev, cpf: "CPF não encontrado." }));
          setCpfValidado(false);
        }
      } catch (err) {
        setErrors((prev) => ({ ...prev, cpf: "Erro ao consultar CPF." }));
        setCpfValidado(false);
      } finally {
        setLoadingCpf(false);
      }
    }
  };

  // Removido: preenchimento automático de CNPJ

  // Removido: preenchimento automático de CEP

  const handleNext = async () => {
    // Validar campos da etapa atual antes de prosseguir
    if (!isCurrentStepValid()) {
      // Validar campos específicos da etapa atual
      const newErrors: SubmissionErrors = {
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
      };
      let errorMessages: string[] = [];
      let hasErrors = false;

      if (step === 0) {
        // Validação da Etapa 1: Informações cadastrais
        if (tipoCadastro === "juridica") {
          if (!form.cnpj || form.cnpj.replace(/\D/g, "").length < 14) {
            newErrors.cnpj = "CNPJ obrigatório";
            hasErrors = true;
          } else if (!cnpj.isValid(form.cnpj)) {
            newErrors.cnpj = "CNPJ inválido";
            hasErrors = true;
          }
          if (!form.razaoSocial) {
            newErrors.razaoSocial = "Razão social obrigatória";
            hasErrors = true;
          }
          if (!form.nomeFantasia) {
            newErrors.nomeFantasia = "Nome fantasia obrigatório";
            hasErrors = true;
          }
        }

        if (!form.fullName) {
          newErrors.fullName = "Nome completo obrigatório";
          hasErrors = true;
        } else {
          const nomeValido =
            form.fullName.trim().length >= 10 &&
            form.fullName.trim().includes(" ");
          if (!nomeValido) {
            newErrors.fullName = "Digite seu nome completo";
            hasErrors = true;
          }
        }

        if (!form.cpf || form.cpf.replace(/\D/g, "").length < 11) {
          newErrors.cpf = "CPF obrigatório";
          hasErrors = true;
        } else if (!cpf.isValid(form.cpf)) {
          newErrors.cpf = "CPF inválido";
          hasErrors = true;
        }

        if (!form.whatsapp) {
          newErrors.whatsapp = "WhatsApp obrigatório";
          hasErrors = true;
        } else if (!isValidWhatsapp(form.whatsapp)) {
          newErrors.whatsapp = "WhatsApp inválido";
          hasErrors = true;
        }
        if (!form.email) {
          newErrors.email = "E-mail obrigatório";
          hasErrors = true;
        } else if (!isValidEmail(form.email)) {
          newErrors.email = "E-mail inválido";
          hasErrors = true;
        }
      } else if (step === 1) {
        // Validação da Etapa 2: Endereço
        if (!form.endereco) {
          newErrors.endereco = "Endereço obrigatório";
          hasErrors = true;
        }
        if (!form.numero) {
          newErrors.numero = "Número obrigatório";
          hasErrors = true;
        }
        if (!form.bairro) {
          newErrors.bairro = "Bairro obrigatório";
          hasErrors = true;
        }
        if (!form.cidade) {
          newErrors.cidade = "Cidade obrigatória";
          hasErrors = true;
        }
        if (!form.estado) {
          newErrors.estado = "Estado obrigatório";
          hasErrors = true;
        }
        if (!form.cep) {
          newErrors.cep = "CEP obrigatório";
          hasErrors = true;
        }
      } else if (step === 2) {
        // Validação da Etapa 3: E-mail
        if (!form.email) {
          newErrors.email = "E-mail obrigatório";
          hasErrors = true;
        } else if (!isValidEmail(form.email)) {
          newErrors.email = "E-mail inválido";
          hasErrors = true;
        }
      }

      if (step === 0) {
        const order =
          tipoCadastro === "juridica"
            ? [
                "cnpj",
                "nomeFantasia",
                "razaoSocial",
                "cpf",
                "fullName",
                "email",
                "whatsapp",
              ]
            : ["cpf", "fullName", "email", "whatsapp"];
        order.forEach((key) => {
          const msg = (newErrors as any)[key];
          if (msg && msg.length > 0) errorMessages.push(msg);
        });
      } else if (step === 1) {
        ["endereco", "numero", "bairro", "cidade", "estado", "cep"].forEach(
          (key) => {
            const msg = (newErrors as any)[key];
            if (msg && msg.length > 0) errorMessages.push(msg);
          }
        );
      }

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

  const isStep0Valid = () => {
    const whatsappValid = form.whatsapp && isValidWhatsapp(form.whatsapp);
    const emailValid = form.email && isValidEmail(form.email);
    const nomeValido =
      form.fullName &&
      form.fullName.trim().length >= 10 &&
      form.fullName.trim().includes(" ");
    if (tipoCadastro === "juridica") {
      return (
        form.cnpj.length > 0 &&
        cnpj.isValid(form.cnpj) &&
        !errors.cnpj &&
        form.cpf.length > 0 &&
        cpf.isValid(form.cpf) &&
        cpfValidado &&
        !errors.cpf &&
        nomeValido &&
        form.razaoSocial &&
        form.nomeFantasia &&
        whatsappValid &&
        emailValid
      );
    }
    return (
      form.cpf.length > 0 &&
      cpf.isValid(form.cpf) &&
      cpfValidado &&
      !errors.cpf &&
      nomeValido &&
      whatsappValid &&
      emailValid
    );
  };

  const isStep1Valid = () =>
    form.endereco &&
    form.numero &&
    form.bairro &&
    form.cidade &&
    form.estado &&
    form.cep;

  const isStep2Valid = () => {
    const emailValid = form.email && isValidEmail(form.email);
    return emailValid;
  };

  const isCurrentStepValid = () => {
    if (step === 0) return isStep0Valid();
    if (step === 1) return isStep1Valid();
    if (step === 2) return isStep2Valid();
    return false;
  };

  const handleTipoCadastroChange = (tipo: RegistrationType) => {
    setTipoCadastro(tipo);
    if (tipo === "fisica") {
      setForm((prev) => ({ ...prev, cnpj: "" }));
    }
  };

  const validateAllFields = () => {
    const newErrors: SubmissionErrors = {
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
    };
    let valid = true;
    let camposFaltantes: string[] = [];

    if (tipoCadastro === "juridica") {
      if (!form.cnpj || form.cnpj.replace(/\D/g, "").length < 14) {
        newErrors.cnpj = "CNPJ obrigatório";
        valid = false;
        camposFaltantes.push("CNPJ");
      } else if (!cnpj.isValid(form.cnpj)) {
        newErrors.cnpj = "CNPJ inválido";
        valid = false;
      }
      if (!form.razaoSocial) {
        newErrors.razaoSocial = "Razão social obrigatória";
        valid = false;
        camposFaltantes.push("Razão Social");
      }
      if (!form.nomeFantasia) {
        newErrors.nomeFantasia = "Nome fantasia obrigatório";
        valid = false;
        camposFaltantes.push("Nome Fantasia");
      }
      if (!form.fullName) {
        newErrors.fullName = "Nome completo obrigatório";
        valid = false;
        camposFaltantes.push("Nome completo");
      } else {
        const nomeValido =
          form.fullName.trim().length >= 10 &&
          form.fullName.trim().includes(" ");
        if (!nomeValido) {
          newErrors.fullName = "Digite seu nome completo";
          valid = false;
        }
      }
    } else {
      if (!form.fullName) {
        newErrors.fullName = "Nome completo obrigatório";
        valid = false;
        camposFaltantes.push("Nome completo");
      } else {
        const nomeValido =
          form.fullName.trim().length >= 10 &&
          form.fullName.trim().includes(" ");
        if (!nomeValido) {
          newErrors.fullName = "Digite seu nome completo";
          valid = false;
        }
      }
    }
    if (!form.cpf || form.cpf.replace(/\D/g, "").length < 11) {
      newErrors.cpf = "CPF obrigatório";
      valid = false;
      camposFaltantes.push("CPF");
    } else if (!cpf.isValid(form.cpf)) {
      newErrors.cpf = "CPF inválido";
      valid = false;
    }
    if (!form.whatsapp) {
      newErrors.whatsapp = "WhatsApp obrigatório";
      valid = false;
      camposFaltantes.push("WhatsApp");
    } else if (!isValidWhatsapp(form.whatsapp)) {
      newErrors.whatsapp = "WhatsApp inválido";
      valid = false;
    }

    if (!form.endereco) {
      newErrors.endereco = "Endereço obrigatório";
      valid = false;
      camposFaltantes.push("Endereço");
    }
    if (!form.numero) {
      newErrors.numero = "Número obrigatório";
      valid = false;
      camposFaltantes.push("Número");
    }
    if (!form.bairro) {
      newErrors.bairro = "Bairro obrigatório";
      valid = false;
      camposFaltantes.push("Bairro");
    }
    if (!form.cidade) {
      newErrors.cidade = "Cidade obrigatória";
      valid = false;
      camposFaltantes.push("Cidade");
    }
    if (!form.estado) {
      newErrors.estado = "Estado obrigatório";
      valid = false;
      camposFaltantes.push("Estado");
    }
    if (!form.cep) {
      newErrors.cep = "CEP obrigatório";
      valid = false;
      camposFaltantes.push("CEP");
    }

    if (!form.email) {
      newErrors.email = "E-mail obrigatório";
      valid = false;
      camposFaltantes.push("E-mail");
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "E-mail inválido";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      const mensagem =
        camposFaltantes.length > 0
          ? `Por favor, preencha os seguintes campos obrigatórios: ${camposFaltantes.join(
              ", "
            )}`
          : "Por favor, corrija os erros no formulário";
      toast.error(mensagem);
    }

    return valid;
  };

  async function sendHotcredRequest(form: any) {
    const baseUrl = "https://api.hotcred.com.br/api/seja-parceiro";
    const cryptoKey = process.env.NEXT_PUBLIC_HOTCRED_CRYPTO_KEY;
    let encryptedAll: string | null = null;
    if (cryptoKey) {
      const data = {
        cpf: form.cpf,
        nome: form.fullName,
        sexo: "1",
        telefone: (form.whatsapp || "").replace(/\D/g, "") || "31998072869",
        email: form.email ?? "matheuspm2006@gmail.com",
        nome_fantasia: form.nomeFantasia ?? "empresa2 tes6",
        razao_social: form.razaoSocial ?? "Teste sltd489",
        cep: form.cep ?? "32671632",
        endereco: form.endereco ?? "R. Pedro Rodrigues Laranjeiras ",
        numero: form.numero ?? "273",
        bairro: form.bairro ?? "Espirito Santo",
        cidade: form.cidade ?? "Betim",
        estado: form.estado ?? "MG",
        banco: form.banco ?? "237",
        agencia: form.agencia ?? "1548",
        conta: form.conta ?? "21584",
        tipo_chave_pix: form.tipo_chave_pix ?? "cpf",
        chave_pix: form.chave_pix ?? "02238056610",
        cnpj: form.cnpj ?? "50.744.599/0001-77",
      };
      const dadosString = JSON.stringify(data);
      const iv = CryptoJS.lib.WordArray.random(16);
      const encrypted = CryptoJS.AES.encrypt(dadosString, cryptoKey, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      const ivAndEncrypted = iv.concat(encrypted.ciphertext);
      encryptedAll = CryptoJS.enc.Base64.stringify(ivAndEncrypted);
    }

    const url =
      baseUrl +
      "?h=7b5af2c47b46318fbfbf448445b207206b25d424e653ac81938b6550f9ba152d" +
      "&p=722685b1" +
      "&d=eyJpZF9jb3JiYW5fbWFya2V0aW5nIjozLCJpZF9jb3JiYW4iOjEsIm5vbWVfY2FtcGFuaGEiOiJDYW1wYW5oYSBQcmluY2lwYWwiLCJleHBpcmFjYW8iOm51bGwsInRpbWVzdGFtcCI6MTc2NDY4MDQ0MCwibGlua0lkIjoiNzIyNjg1YjEifQ==" +
      "&cpf=" +
      encodeURIComponent(form.cpf) +
      "&nome=" +
      encodeURIComponent(form.fullName) +
      "&sexo=" +
      encodeURIComponent("1") +
      "&telefone=" +
      encodeURIComponent(
        (form.whatsapp || "").replace(/\D/g, "") || "31998072869"
      ) +
      "&email=" +
      encodeURIComponent(form.email ?? "matheuspm2006@gmail.com") +
      "&nome_fantasia=" +
      encodeURIComponent(form.nomeFantasia ?? "empresa2 tes6") +
      "&razao_social=" +
      encodeURIComponent(form.razaoSocial ?? "Teste sltd489") +
      "&cep=" +
      encodeURIComponent(form.cep ?? "32671632") +
      "&endereco=" +
      encodeURIComponent(form.endereco ?? "R. Pedro Rodrigues Laranjeiras ") +
      "&numero=" +
      encodeURIComponent(form.numero ?? "273") +
      "&bairro=" +
      encodeURIComponent(form.bairro ?? "Espirito Santo") +
      "&cidade=" +
      encodeURIComponent(form.cidade ?? "Betim") +
      "&estado=" +
      encodeURIComponent(form.estado ?? "MG") +
      "&banco=" +
      encodeURIComponent(form.banco ?? "237") +
      "&agencia=" +
      encodeURIComponent(form.agencia ?? "1548") +
      "&conta=" +
      encodeURIComponent(form.conta ?? "21584") +
      "&tipo_chave_pix=" +
      encodeURIComponent(form.tipo_chave_pix ?? "cpf") +
      "&chave_pix=" +
      encodeURIComponent(form.chave_pix ?? "02238056610") +
      "&cnpj=" +
      encodeURIComponent(form.cnpj ?? "50.744.599/0001-77") +
      (encryptedAll ? "&payload=" + encodeURIComponent(encryptedAll) : "");

    console.log("🔵 Enviando para:", url);

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
          try {
            await fetch("/api/contract-status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cpf: form.cpf,
                cnpj: form.cnpj,
                email: form.email,
                contractSent: true,
              }),
            });
          } catch {}
          break;
        }

        if (result.status === 422) {
          const msgs: string[] = [];
          if (parsed?.errors) {
            Object.entries(parsed.errors).forEach(
              ([field, arr]: [string, any]) => {
                if (Array.isArray(arr)) {
                  arr.forEach((m) => msgs.push(`${field}: ${m}`));
                }
              }
            );
          }
          setShowErrorModal(true);
          setErrorMessages(
            msgs.length ? msgs : [parsed?.message || result.body]
          );
          try {
            await fetch("/api/contract-status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cpf: form.cpf,
                cnpj: form.cnpj,
                email: form.email,
                contractSent: false,
                errorMessage:
                  msgs.join(" | ") || parsed?.message || result.body,
              }),
            });
          } catch {}
          break;
        }

        if (result.status === 500) {
          const msg = parsed?.message || result.body;
          if (attempts < maxAttempts - 1) {
            await new Promise((r) => setTimeout(r, 1500));
            attempts++;
            continue;
          }
          setShowErrorModal(true);
          setErrorMessages([msg || "Erro interno na formalização"]);
          try {
            await fetch("/api/contract-status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cpf: form.cpf,
                cnpj: form.cnpj,
                email: form.email,
                contractSent: false,
                errorMessage: msg,
              }),
            });
          } catch {}
          break;
        }

        setShowErrorModal(true);
        setErrorMessages([
          parsed?.message || result.body || "Erro ao enviar cadastro",
        ]);
        try {
          await fetch("/api/contract-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cpf: form.cpf,
              cnpj: form.cnpj,
              email: form.email,
              contractSent: false,
              errorMessage: parsed?.message || result.body,
            }),
          });
        } catch {}
        break;
      } catch (error) {
        console.error(error);
        setShowErrorModal(true);
        setErrorMessages(["Erro inesperado ao enviar cadastro"]);
        try {
          await fetch("/api/contract-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              cpf: form.cpf,
              cnpj: form.cnpj,
              email: form.email,
              contractSent: false,
              errorMessage: "Erro inesperado ao enviar cadastro",
            }),
          });
        } catch {}
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
    showSmsVerification,
    setShowSmsVerification,
    smsCode,
    setSmsCode,
    isSendingSms,
    canResend,
    resendTimer,
    isSubmitting,
    setIsSubmitting,
    showPassword,
    setShowPassword,
    showSuccessModal,
    setShowSuccessModal,
    contractSentSuccessfully,
    showErrorModal,
    setShowErrorModal,
    errorMessages,
    handleChange,
    handleCpfBlur,
    loadingCpf,
    handleNext,
    handleBack,
    isCurrentStepValid,
    smsError,
    setSmsError,
    handleTipoCadastroChange,
    // cnpjValidado removido
    cpfValidado,
    validateAllFields,
    isVerifyingSms,
    handleSubmitContract,
  };
}

export function useSubmissionForm() {
  return useSubmissionFormInner();
}
