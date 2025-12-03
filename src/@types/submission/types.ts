export type RegistrationType = "juridica" | "fisica";

export interface SubmissionForm {
  nomeFantasia: string;
  razaoSocial: string;
  fullName: string;
  complemento: string;
  email: string;
  whatsapp: string;
  cpf: string;
  cnpj: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  banco?: string;
  agencia?: string;
  conta?: string;
  tipo_chave_pix?: string;
  chave_pix?: string;
}

export interface SubmissionErrors {
  nomeFantasia: string;
  razaoSocial: string;
  fullName: string;
  complemento: string;
  email: string;
  whatsapp: string;
  cpf: string;
  cnpj: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}
