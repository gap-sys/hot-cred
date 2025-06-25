export type RegistrationType = 'juridica' | 'fisica';

export interface SubmissionForm {
    nomeFantasia: string;
    razaoSocial: string;
    nomeAdmin: string;
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

export interface SubmissionErrors {
    nomeFantasia: string;
    razaoSocial: string;
    nomeAdmin: string;
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