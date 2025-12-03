import { SubmissionForm, SubmissionErrors, RegistrationType } from "src/@types";
import { isValidWhatsapp, isValidEmail } from "src/utils/validation";
import { cpf, cnpj } from "cpf-cnpj-validator";

export function isStep0Valid(
  form: SubmissionForm,
  tipoCadastro: RegistrationType,
  errors: SubmissionErrors,
  cpfValidado: boolean
) {
  const whatsappValid = form.whatsapp && isValidWhatsapp(form.whatsapp);
  const emailValid = form.email && isValidEmail(form.email);
  const nomeValido =
    !!form.fullName &&
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
      !!form.razaoSocial &&
      !!form.nomeFantasia &&
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
}

export function isStep1Valid(form: SubmissionForm) {
  return (
    !!form.endereco &&
    !!form.numero &&
    !!form.bairro &&
    !!form.cidade &&
    !!form.estado &&
    !!form.cep
  );
}

export function isStep2Valid(form: SubmissionForm) {
  const emailValid = form.email && isValidEmail(form.email);
  return !!emailValid;
}

export function isCurrentStepValid(
  step: number,
  form: SubmissionForm,
  tipoCadastro: RegistrationType,
  errors: SubmissionErrors,
  cpfValidado: boolean
) {
  if (step === 0) return isStep0Valid(form, tipoCadastro, errors, cpfValidado);
  if (step === 1) return isStep1Valid(form);
  if (step === 2) return isStep2Valid(form);
  return false;
}

export function validateStep(
  step: number,
  form: SubmissionForm,
  tipoCadastro: RegistrationType
) {
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
      newErrors.whatsapp = "Telefone obrigatório";
      hasErrors = true;
    } else if (!isValidWhatsapp(form.whatsapp)) {
      newErrors.whatsapp = "Telefone inválido";
      hasErrors = true;
    }
    if (!form.email) {
      newErrors.email = "E-mail obrigatório";
      hasErrors = true;
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "E-mail inválido";
      hasErrors = true;
    }

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
    ["endereco", "numero", "bairro", "cidade", "estado", "cep"].forEach(
      (key) => {
        const msg = (newErrors as any)[key];
        if (msg && msg.length > 0) errorMessages.push(msg);
      }
    );
  } else if (step === 2) {
    if (!form.email) {
      newErrors.email = "E-mail obrigatório";
      hasErrors = true;
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "E-mail inválido";
      hasErrors = true;
    }
  }

  return { newErrors, errorMessages, hasErrors };
}
