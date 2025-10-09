'use client'

import { useState, useEffect, Suspense } from 'react';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';

import { isValidWhatsapp, isValidEmail } from 'src/utils/validation';
import { SubmissionForm, SubmissionErrors, RegistrationType } from 'src/@types';
// sendContract removed - process migrated to Laravel
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { HashGenerator } from 'src/utils/crypto';

export const INITIAL_FORM: SubmissionForm = {
    cpf: '',
    cnpj: '',
    nomeAdmin: '',
    razaoSocial: '',
    nomeFantasia: '',
    whatsapp: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    complemento: '',
    email: '',
};

function useSubmissionFormInner() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(0);

    // Capturar hash da URL ou usar hash padrão do ambiente
    const getOriginHash = () => {
        const urlHash = searchParams.get('hash');
        const defaultHash = process.env.NEXT_PUBLIC_DEFAULT_HASH || 'R8MHSVsncGgcOEoii5fqtLaCR5BALvcSjFdOfvQQ9mjlQYfBWs';
        return urlHash || defaultHash;
    };

    // Gerar hash criptografado
    const getEncryptedHash = () => {
        try {
            const hashGenerator = new HashGenerator();
            const originalHash = getOriginHash();
            return hashGenerator.generateEncryptedHash(originalHash);
        } catch (error) {
            console.error('Erro ao criptografar hash:', error);
            // Em caso de erro, retorna o hash original
            return getOriginHash();
        }
    };
    const [form, setForm] = useState<SubmissionForm>({ ...INITIAL_FORM });
    const [tipoCadastro, setTipoCadastro] = useState<RegistrationType>('juridica');
    const [errors, setErrors] = useState<SubmissionErrors>({
        nomeFantasia: '',
        razaoSocial: '',
        nomeAdmin: '',
        complemento: '',
        email: '',
        whatsapp: '',
        cpf: '',
        cnpj: '',
        endereco: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
    });
    const [showSmsVerification, setShowSmsVerification] = useState(false);
    const [smsCode, setSmsCode] = useState('');
    const [isVerifyingSms, setIsVerifyingSms] = useState(false);
    const [isSendingSms, setIsSendingSms] = useState(false);
    const [canResend, setCanResend] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [contractSentSuccessfully, setContractSentSuccessfully] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [smsError, setSmsError] = useState('');
    const [loadingCpf, setLoadingCpf] = useState(false);
    const [loadingCnpj, setLoadingCnpj] = useState(false);
    const [lastCpfFetched, setLastCpfFetched] = useState('');
    const [cnpjValidado, setCnpjValidado] = useState(false);
    const [cpfValidado, setCpfValidado] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (resendTimer > 0) {
            timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
        } else if (resendTimer === 0) {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [resendTimer]);

    const fetchCpfData = async (cpfValue: string) => {
        try {
            const resp = await fetch('/api/cpf', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cpf: cpfValue })
            });
            const data = await resp.json();
            if (!resp.ok) {
                toast.error(data.message || 'Erro ao consultar CPF');
                return null;
            }
            return data;
        } catch (e) {
            toast.error('Erro ao consultar CPF');
            return null;
        }
    };

    const fetchCnpjData = async (cnpjValue: string) => {
        try {
            const resp = await fetch('/api/cnpj', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cnpj: cnpjValue })
            });
            const data = await resp.json();
            if (!resp.ok) {
                toast.error(data.message || 'Erro ao consultar CNPJ');
                return null;
            }
            return data;
        } catch (e) {
            toast.error('Erro ao consultar CNPJ');
            return null;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors(prev => ({ ...prev, [name]: '' }));

        if (name === 'email') {
            if (value && !isValidEmail(value)) {
                setErrors(prev => ({ ...prev, email: 'E-mail inválido' }));
            }
        }
        if (name === 'whatsapp') {
            if (value && !isValidWhatsapp(value)) {
                setErrors(prev => ({ ...prev, whatsapp: 'WhatsApp inválido' }));
            }
        }
        if (name === 'cpf') {
            setForm(prev => ({
                ...prev,
                nomeAdmin: ''
            }));
            if (value.replace(/\D/g, '').length < 11) {
                setErrors(prev => ({ ...prev, cpf: '' }));
            } else if (!cpf.isValid(value)) {
                setErrors(prev => ({ ...prev, cpf: 'CPF inválido' }));
            }
        }
        if (name === 'cnpj') {
            setForm(prev => ({
                ...prev,
                nomeFantasia: '',
                razaoSocial: ''
            }));
            if (value.replace(/\D/g, '').length < 14) {
                setErrors(prev => ({ ...prev, cnpj: '' }));
            } else if (!cnpj.isValid(value)) {
                setErrors(prev => ({ ...prev, cnpj: 'CNPJ inválido' }));
            }
        }
        if (name === 'nomeAdmin') {
            const nomeValido = value.trim().length >= 10 && value.trim().includes(' ');
            if (value && !nomeValido) {
                setErrors(prev => ({ ...prev, nomeAdmin: 'Informe seu nome e sobrenome completo' }));
            }
        }
    };

    const handleCpfBlur = async () => {
        const cpfLimpo = form.cpf.replace(/\D/g, '');
        if (cpfLimpo.length < 11) return;
        if (!cpf.isValid(cpfLimpo)) {
            setErrors(prev => ({ ...prev, cpf: 'CPF inválido' }));
            setCpfValidado(false);
            return;
        }
        if (cpfLimpo.length === 11 && cpfLimpo !== lastCpfFetched) {
            setLoadingCpf(true);
            try {
                // Primeiro, verifica se o CPF já existe no sistema
                const checkResponse = await fetch('/api/check-partner', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cpf: cpfLimpo })
                });

                if (checkResponse.ok) {
                    const checkData = await checkResponse.json();
                    if (checkData.exists) {
                        setErrors(prev => ({ ...prev, cpf: 'Este CPF já está cadastrado no sistema.' }));
                        setCpfValidado(false);
                        setLoadingCpf(false);
                        return;
                    }
                }

                // Se não existe, busca os dados do CPF
                const data = await fetchCpfData(cpfLimpo);
                const nome = data?.response?.nome || data?.response?.content?.nome?.conteudo?.nome;
                if (nome) {
                    setForm(prev => ({
                        ...prev,
                        nomeAdmin: nome,
                    }));
                    setLastCpfFetched(cpfLimpo);
                    setCpfValidado(true);
                    setErrors(prev => ({ ...prev, cpf: '' }));
                } else {
                    setErrors(prev => ({ ...prev, cpf: 'CPF não encontrado.' }));
                    setCpfValidado(false);
                }
            } catch (err) {
                setErrors(prev => ({ ...prev, cpf: 'Erro ao consultar CPF.' }));
                setCpfValidado(false);
            } finally {
                setLoadingCpf(false);
            }
        }
    };

    const handleCnpjBlur = async () => {
        const cnpjLimpo = form.cnpj.replace(/\D/g, '');
        if (cnpjLimpo.length < 14) return;
        if (!cnpj.isValid(cnpjLimpo)) {
            setErrors(prev => ({ ...prev, cnpj: 'CNPJ inválido.' }));
            setCnpjValidado(false);
            return;
        }
        if (cnpjLimpo.length === 14) {
            setLoadingCnpj(true);
            try {
                // Primeiro, verifica se o CNPJ já existe no sistema
                const checkResponse = await fetch('/api/check-partner', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cnpj: cnpjLimpo })
                });

                if (checkResponse.ok) {
                    const checkData = await checkResponse.json();
                    if (checkData.exists) {
                        setErrors(prev => ({ ...prev, cnpj: 'Este CNPJ já está cadastrado no sistema.' }));
                        setCnpjValidado(false);
                        setLoadingCnpj(false);
                        return;
                    }
                }

                // Se não existe, busca os dados do CNPJ
                const data = await fetchCnpjData(cnpjLimpo);
                if (data?.response?.cnpj) {
                    const cnpjData = data?.response?.cnpj || {};
                    const endereco = (cnpjData.tipo_logradouro ? cnpjData.tipo_logradouro + ' ' : '') + (cnpjData.logradouro || '');
                    const numero = cnpjData.numero || '';
                    const bairro = cnpjData.bairro || '';
                    const cidade = cnpjData.municipio?.descricao || '';
                    const estado = cnpjData.uf || '';
                    const cep = cnpjData.cep || '';
                    const complemento = cnpjData.complemento || '';

                    setForm(prev => ({
                        ...prev,
                        razaoSocial: cnpjData.empresa?.razao_social || '',
                        nomeFantasia: cnpjData.nome_fantasia || '',
                        endereco,
                        numero,
                        bairro,
                        cidade,
                        estado,
                        cep,
                        complemento,
                    }));
                    setCnpjValidado(true);
                    setErrors(prev => ({ ...prev, cnpj: '' }));
                } else {
                    setErrors(prev => ({ ...prev, cnpj: 'CNPJ não encontrado. Preencha manualmente.' }));
                    setCnpjValidado(false);
                }
            } catch (err) {
                toast.error('Erro ao consultar CNPJ. Por favor, tente novamente.');
                setErrors(prev => ({ ...prev, cnpj: 'Erro ao consultar CNPJ.' }));
                setCnpjValidado(false);
            } finally {
                setLoadingCnpj(false);
            }
        }
    };

    const handleCepBlur = async () => {
        const cepLimpo = form.cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) return;
        setLoadingCep && setLoadingCep(true);
        try {
            const resp = await fetch('/api/cep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cep: cepLimpo })
            });
            const data = await resp.json();
            if (!resp.ok || data.error) {
                setErrors(prev => ({ ...prev, cep: data.error || 'CEP não encontrado.' }));
                return;
            }
            setForm(prev => ({
                ...prev,
                endereco: data.logradouro || '',
                bairro: data.bairro || '',
                cidade: data.localidade || '',
                estado: data.uf || '',
                complemento: data.complemento || '',
            }));
            setErrors(prev => ({ ...prev, cep: '' }));
        } catch (err) {
            setErrors(prev => ({ ...prev, cep: 'Erro ao buscar CEP.' }));
        } finally {
            setLoadingCep && setLoadingCep(false);
        }
    };

    const handleNext = async () => {
        // Validar campos da etapa atual antes de prosseguir
        if (!isCurrentStepValid()) {
            // Validar campos específicos da etapa atual
            const newErrors: SubmissionErrors = {
                nomeFantasia: '',
                razaoSocial: '',
                nomeAdmin: '',
                complemento: '',
                email: '',
                whatsapp: '',
                cpf: '',
                cnpj: '',
                endereco: '',
                numero: '',
                bairro: '',
                cidade: '',
                estado: '',
                cep: ''
            };
            let errorMessages: string[] = [];
            let hasErrors = false;

            if (step === 0) {
                // Validação da Etapa 1: Informações cadastrais
                if (tipoCadastro === 'juridica') {
                    if (!form.cnpj || form.cnpj.replace(/\D/g, '').length < 14) {
                        newErrors.cnpj = 'CNPJ obrigatório';
                        hasErrors = true;
                    } else if (!cnpj.isValid(form.cnpj)) {
                        newErrors.cnpj = 'CNPJ inválido';
                        hasErrors = true;
                    } else if (!cnpjValidado) {
                        newErrors.cnpj = 'CNPJ não validado';
                        hasErrors = true;
                    }
                    if (!form.razaoSocial) {
                        newErrors.razaoSocial = 'Razão social obrigatória';
                        hasErrors = true;
                    }
                    if (!form.nomeFantasia) {
                        newErrors.nomeFantasia = 'Nome fantasia obrigatório';
                        hasErrors = true;
                    }
                }

                if (!form.cpf || form.cpf.replace(/\D/g, '').length < 11) {
                    newErrors.cpf = 'CPF obrigatório';
                    hasErrors = true;
                } else if (!cpf.isValid(form.cpf)) {
                    newErrors.cpf = 'CPF inválido';
                    hasErrors = true;
                }

                if (!form.whatsapp) {
                    newErrors.whatsapp = 'WhatsApp obrigatório';
                    hasErrors = true;
                } else if (!isValidWhatsapp(form.whatsapp)) {
                    newErrors.whatsapp = 'WhatsApp inválido';
                    hasErrors = true;
                }
            } else if (step === 1) {
                // Validação da Etapa 2: Endereço
                if (!form.endereco) {
                    newErrors.endereco = 'Endereço obrigatório';
                    hasErrors = true;
                }
                if (!form.numero) {
                    newErrors.numero = 'Número obrigatório';
                    hasErrors = true;
                }
                if (!form.bairro) {
                    newErrors.bairro = 'Bairro obrigatório';
                    hasErrors = true;
                }
                if (!form.cidade) {
                    newErrors.cidade = 'Cidade obrigatória';
                    hasErrors = true;
                }
                if (!form.estado) {
                    newErrors.estado = 'Estado obrigatório';
                    hasErrors = true;
                }
                if (!form.cep) {
                    newErrors.cep = 'CEP obrigatório';
                    hasErrors = true;
                }
            } else if (step === 2) {
                // Validação da Etapa 3: Dados para acesso
                if (!form.email) {
                    newErrors.email = 'E-mail obrigatório';
                    hasErrors = true;
                } else if (!isValidEmail(form.email)) {
                    newErrors.email = 'E-mail inválido';
                    hasErrors = true;
                }

                if (tipoCadastro === 'juridica') {
                    if (!form.nomeFantasia) {
                        newErrors.nomeFantasia = 'Nome fantasia obrigatório';
                        hasErrors = true;
                    }
                }

                if (!form.nomeAdmin) {
                    newErrors.nomeAdmin = 'Nome do administrador obrigatório';
                    hasErrors = true;
                } else {
                    const nomeValido = form.nomeAdmin.trim().length >= 10 && form.nomeAdmin.trim().includes(' ');
                    if (!nomeValido) {
                        newErrors.nomeAdmin = 'Informe seu nome e sobrenome completo';
                        hasErrors = true;
                    }
                }
            }

            // Coletar apenas as mensagens de erro dos campos que têm erro
            Object.entries(newErrors).forEach(([field, message]) => {
                if (message && message.length > 0) {
                    errorMessages.push(message);
                }
            });

            if (hasErrors) {
                setErrors(newErrors);
                setErrorMessages(errorMessages);
                setShowErrorModal(true);
                return;
            }
        }

        if (step < 2) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const isStep0Valid = () => {
        const whatsappValid = form.whatsapp && isValidWhatsapp(form.whatsapp);
        if (tipoCadastro === 'juridica') {
            return (
                form.cnpj.length > 0 &&
                cnpj.isValid(form.cnpj) &&
                cnpjValidado &&
                !errors.cnpj &&
                form.cpf.length > 0 &&
                cpf.isValid(form.cpf) &&
                cpfValidado &&
                !errors.cpf &&
                form.razaoSocial &&
                form.nomeFantasia &&
                whatsappValid
            );
        }
        return (
            form.cpf.length > 0 &&
            cpf.isValid(form.cpf) &&
            cpfValidado &&
            !errors.cpf &&
            whatsappValid
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
        return emailValid
    };

    const isCurrentStepValid = () => {
        if (step === 0) return isStep0Valid();
        if (step === 1) return isStep1Valid();
        if (step === 2) return isStep2Valid();
        return false;
    };


    const handleTipoCadastroChange = (tipo: RegistrationType) => {
        setTipoCadastro(tipo);
        if (tipo === 'fisica') {
            setForm(prev => ({ ...prev, cnpj: '' }));
        }
    };

    const validateAllFields = () => {
        const newErrors: SubmissionErrors = {
            nomeFantasia: '',
            razaoSocial: '',
            nomeAdmin: '',
            complemento: '',
            email: '',
            whatsapp: '',
            cpf: '',
            cnpj: '',
            endereco: '',
            numero: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: ''
        };
        let valid = true;
        let camposFaltantes: string[] = [];

        if (tipoCadastro === 'juridica') {
            if (!form.cnpj || form.cnpj.replace(/\D/g, '').length < 14) {
                newErrors.cnpj = 'CNPJ obrigatório';
                valid = false;
                camposFaltantes.push('CNPJ');
            } else if (!cnpj.isValid(form.cnpj)) {
                newErrors.cnpj = 'CNPJ inválido';
                valid = false;
            }
            if (!form.razaoSocial) {
                newErrors.razaoSocial = 'Razão social obrigatória';
                valid = false;
                camposFaltantes.push('Razão Social');
            }
            if (!form.nomeFantasia) {
                newErrors.nomeFantasia = 'Nome fantasia obrigatório';
                valid = false;
                camposFaltantes.push('Nome Fantasia');
            }
            if (!form.nomeAdmin) {
                newErrors.nomeAdmin = 'Nome do administrador obrigatório';
                valid = false;
                camposFaltantes.push('Nome do Administrador');
            } else {
                const nomeValido = form.nomeAdmin.trim().length >= 10 && form.nomeAdmin.trim().includes(' ');
                if (!nomeValido) {
                    newErrors.nomeAdmin = 'Informe seu nome e sobrenome completo';
                    valid = false;
                }
            }
        } else {
            if (!form.nomeAdmin) {
                newErrors.nomeAdmin = 'Nome do administrador obrigatório';
                valid = false;
                camposFaltantes.push('Nome do Administrador');
            } else {
                const nomeValido = form.nomeAdmin.trim().length >= 10 && form.nomeAdmin.trim().includes(' ');
                if (!nomeValido) {
                    newErrors.nomeAdmin = 'Informe seu nome e sobrenome completo';
                    valid = false;
                }
            }
        }
        if (!form.cpf || form.cpf.replace(/\D/g, '').length < 11) {
            newErrors.cpf = 'CPF obrigatório';
            valid = false;
            camposFaltantes.push('CPF');
        } else if (!cpf.isValid(form.cpf)) {
            newErrors.cpf = 'CPF inválido';
            valid = false;
        }
        if (!form.whatsapp) {
            newErrors.whatsapp = 'WhatsApp obrigatório';
            valid = false;
            camposFaltantes.push('WhatsApp');
        } else if (!isValidWhatsapp(form.whatsapp)) {
            newErrors.whatsapp = 'WhatsApp inválido';
            valid = false;
        }

        if (!form.endereco) {
            newErrors.endereco = 'Endereço obrigatório';
            valid = false;
            camposFaltantes.push('Endereço');
        }
        if (!form.numero) {
            newErrors.numero = 'Número obrigatório';
            valid = false;
            camposFaltantes.push('Número');
        }
        if (!form.bairro) {
            newErrors.bairro = 'Bairro obrigatório';
            valid = false;
            camposFaltantes.push('Bairro');
        }
        if (!form.cidade) {
            newErrors.cidade = 'Cidade obrigatória';
            valid = false;
            camposFaltantes.push('Cidade');
        }
        if (!form.estado) {
            newErrors.estado = 'Estado obrigatório';
            valid = false;
            camposFaltantes.push('Estado');
        }
        if (!form.cep) {
            newErrors.cep = 'CEP obrigatório';
            valid = false;
            camposFaltantes.push('CEP');
        }

        if (!form.email) {
            newErrors.email = 'E-mail obrigatório';
            valid = false;
            camposFaltantes.push('E-mail');
        } else if (!isValidEmail(form.email)) {
            newErrors.email = 'E-mail inválido';
            valid = false;
        }

        setErrors(newErrors);

        if (!valid) {
            const mensagem = camposFaltantes.length > 0
                ? `Por favor, preencha os seguintes campos obrigatórios: ${camposFaltantes.join(', ')}`
                : 'Por favor, corrija os erros no formulário';
            toast.error(mensagem);
        }

        return valid;
    };

    const handleSubmitContract = async () => {
        setIsSubmitting(true);
        try {
            // Preparar dados completos para envio ao backend Laravel
            const registrationData: {
                nome_fantasia: string;
                razao_social: string;
                nome: string;
                email: string;
                telefone: string;
                cpf: string;
                endereco: string;
                numero: string;
                complemento: string;
                bairro: string;
                cidade: string;
                estado: string;
                cep: string;
                tipoCadastro: string;
                hash: string;
                cnpj?: string; // Propriedade opcional
            } = {
                nome_fantasia: form.nomeFantasia,
                razao_social: form.razaoSocial,
                nome: form.nomeAdmin,
                email: form.email,
                telefone: form.whatsapp.replace(/\D/g, ''), // Remove espaços e caracteres especiais
                cpf: form.cpf.replace(/\D/g, '').padStart(11, '0'), // Remove caracteres especiais e completa com zeros à esquerda
                endereco: form.endereco,
                numero: form.numero,
                complemento: form.complemento,
                bairro: form.bairro,
                cidade: form.cidade,
                estado: form.estado,
                cep: form.cep.replace(/\D/g, ''), // Remove caracteres especiais, envia apenas números
                tipoCadastro: tipoCadastro,
                hash: getEncryptedHash() // Adicionar hash criptografado
            };

            // Adicionar CNPJ apenas se for pessoa jurídica
            if (tipoCadastro === 'juridica') {
                registrationData.cnpj = form.cnpj.replace(/\D/g, '').padStart(14, '0'); // Remove caracteres especiais e completa com zeros à esquerda
            }

            // Chamar API única do Laravel que processa tudo
            const apiUrl = process.env.NEXT_PUBLIC_API_PARTNER_REGISTRATION_URL || '/api/sejaparceiro/cadastro';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registrationData)
            });

            const result = await response.json();

            if (result.success) {
                setContractSentSuccessfully(true);
                toast.success('Cadastro realizado e contrato enviado com sucesso!');
                setShowSuccessModal(true);
            } else {
                let errors: string[] = [];

                // Verificar se existe um objeto errors aninhado em result.error.errors
                if (result.error && result.error.errors && typeof result.error.errors === 'object') {
                    errors = Object.entries(result.error.errors).flatMap(([key, value]) => {
                        if (Array.isArray(value)) {
                            return value.map(msg => `${key}: ${msg}`);
                        }
                        return [`${key}: ${value}`];
                    });
                } else if (result.error && result.error.message) {
                    // Se não há errors específicos, usar a mensagem geral do error
                    errors = [result.error.message];
                } else if (result.error && typeof result.error === 'string') {
                    // Compatibilidade com formato anterior
                    errors = [result.error];
                } else if (result.message) {
                    // Usar a mensagem principal se disponível
                    errors = [result.message];
                } else {
                    errors = ['Erro ao processar cadastro. Tente novamente.'];
                }

                setErrorMessages(errors);
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            toast.error('Erro interno. Tente novamente mais tarde.');
        } finally {
            setIsSubmitting(false);
        }
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
        handleCnpjBlur,
        loadingCpf,
        loadingCnpj,
        loadingCep,
        handleNext,
        handleBack,
        isCurrentStepValid,
        smsError,
        setSmsError,
        handleTipoCadastroChange,
        cnpjValidado,
        cpfValidado,
        validateAllFields,
        handleCepBlur,
        isVerifyingSms,
        handleSubmitContract,
    };
}

export function useSubmissionForm() {
    return useSubmissionFormInner();
}