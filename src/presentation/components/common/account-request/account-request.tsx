'use client'

import { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from "react-hook-form";
import InputMask from 'react-input-mask';
import * as yup from 'yup';

import { AccountSuccessScreen } from 'src/presentation/components';
import { IMAGE } from "src/presentation/assets";

import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';

import styles from "./account-request.module.scss";

interface FormData {
    cpf: string;
    nome: string;
    celular: string;
    email: string;
    confirmEmail: string;
    terms: boolean;
}

interface AccountRequestProps {
    active?: boolean;
    cpf?: string;
}

const schema: yup.ObjectSchema<FormData> = yup.object({
    cpf: yup
        .string()
        .required('Digite seu CPF')
        .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, 'CPF inválido.'),
    nome: yup
        .string()
        .required('Digite seu nome completo')
        .matches(/^[A-Za-zÀ-ÿ]{2,}(?: [A-Za-zÀ-ÿ]{2,})+$/, 'Digite seu nome completo.'),
    celular: yup
        .string()
        .required('Digite seu celular')
        .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Celular inválido.'),
    email: yup
        .string()
        .required('Digite seu e-mail')
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'E-mail inválido.'),
    confirmEmail: yup
        .string()
        .required('Confirme seu e-mail')
        .oneOf([yup.ref('email')], 'Os e-mails não coincidem.'),
    terms: yup
        .boolean()
        .oneOf([true], 'Você deve aceitar os termos.')
        .required('Você deve aceitar os termos.'),
});

export default function AccountRequest({ cpf = "" }: AccountRequestProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { errors, isValid, isSubmitting, touchedFields }
    } = useForm<FormData>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            nome: '',
            cpf: '',
            celular: '',
            email: '',
            confirmEmail: '',
            terms: false
        }
    });

    const nomeRef = useRef<HTMLInputElement>(null);
    const [success, setSuccess] = useState(false);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        let cpfValue = cpf;
        if (!cpfValue && typeof window !== 'undefined') {
            cpfValue = sessionStorage.getItem('hotinvest_cpf') || '';
            if (cpfValue) sessionStorage.removeItem('hotinvest_cpf');
        }
        if (cpfValue) {
            setValue('cpf', cpfValue, { shouldValidate: true, shouldDirty: true });
        }
    }, [cpf, setValue]);

    const cpfWatched = watch('cpf');
    useEffect(() => {
        if (cpfWatched && cpfWatched.length === 14 && nomeRef.current) {
            nomeRef.current.focus();
        }
    }, [cpfWatched]);

    const onSubmit = () => {
        setIsSending(true);
        setTimeout(() => {
            setSuccess(true);
            reset();
            setIsSending(false);
        }, 3000);
    };

    const email = watch('email');
    const confirmEmail = watch('confirmEmail');

    function getErrorMessage(error: unknown) {
        if (!error) return null;
        if (typeof error === 'string') return error;
        if (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message?: unknown }).message === 'string') {
            return (error as { message: string }).message;
        }
        return null;
    }

    if (success) {
        return <AccountSuccessScreen onClose={() => setSuccess(false)} />;
    }

    return (
        <section className={styles.section}>
            <div className={styles.right}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className={`${styles['input-wrapper']} ${errors.cpf ? styles['input-error'] : watch('cpf')?.length === 14 ? styles['input-success'] : ''}`}>
                        <Controller
                            name="cpf"
                            control={control}
                            render={({ field }) => (
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar={null}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                >
                                    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                                        <input
                                            {...inputProps}
                                            className={styles.input}
                                            type="text"
                                            placeholder="CPF"
                                            autoComplete="off"
                                            inputMode="numeric"
                                        />
                                    )}
                                </InputMask>
                            )}
                        />
                        {watch('cpf')?.length === 14 && !errors.cpf ? (
                            <AiOutlineCheckCircle className={styles['input-icon']} />
                        ) : (
                            <AiOutlineInfoCircle className={styles['input-icon']} />
                        )}
                    </div>
                    {touchedFields.cpf && getErrorMessage(errors.cpf) && <span className={styles['error-message']}>{getErrorMessage(errors.cpf)}</span>}

                    <div className={`${styles['input-wrapper']} ${errors.nome ? styles['input-error'] : watch('nome') && !errors.nome ? styles['input-success'] : ''}`}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Nome Completo"
                            autoComplete="off"
                            {...register('nome', {
                                setValueAs: v => v
                            })}
                            ref={el => {
                                register('nome').ref(el);
                                if (el !== null) Object.defineProperty(nomeRef, 'current', { value: el, writable: true });
                            }}
                        />
                        {watch('nome') && !errors.nome ? (
                            <AiOutlineCheckCircle className={styles['input-icon']} />
                        ) : (
                            <AiOutlineInfoCircle className={styles['input-icon']} />
                        )}
                    </div>
                    {touchedFields.nome && getErrorMessage(errors.nome) && <span className={styles['error-message']}>{getErrorMessage(errors.nome)}</span>}

                    <div className={`${styles['input-wrapper']} ${errors.celular ? styles['input-error'] : watch('celular')?.length >= 14 ? styles['input-success'] : ''}`}>
                        <Controller
                            name="celular"
                            control={control}
                            render={({ field }) => (
                                <InputMask
                                    mask="(99) 99999-9999"
                                    maskChar={null}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                >
                                    {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                                        <input
                                            {...inputProps}
                                            className={styles.input}
                                            type="text"
                                            placeholder="Celular"
                                            autoComplete="off"
                                            maxLength={15}
                                            inputMode="numeric"
                                        />
                                    )}
                                </InputMask>
                            )}
                        />
                        {watch('celular')?.length >= 14 && !errors.celular ? (
                            <AiOutlineCheckCircle className={styles['input-icon']} />
                        ) : (
                            <AiOutlineInfoCircle className={styles['input-icon']} />
                        )}
                    </div>
                    {touchedFields.celular && getErrorMessage(errors.celular) && <span className={styles['error-message']}>{getErrorMessage(errors.celular)}</span>}

                    <div className={`${styles['input-wrapper']} ${errors.email ? styles['input-error'] : email && !errors.email ? styles['input-success'] : ''}`}>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="E-mail"
                            autoComplete="off"
                            {...register('email')}
                        />
                        {email && !errors.email ? (
                            <AiOutlineCheckCircle className={styles['input-icon']} />
                        ) : (
                            <AiOutlineInfoCircle className={styles['input-icon']} />
                        )}
                    </div>
                    {touchedFields.email && getErrorMessage(errors.email) && <span className={styles['error-message']}>{getErrorMessage(errors.email)}</span>}

                    <div className={`${styles['input-wrapper']} ${errors.confirmEmail ? styles['input-error'] : confirmEmail && confirmEmail === email && !errors.confirmEmail ? styles['input-success'] : ''}`}>
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="Confirmação de E-mail"
                            autoComplete="off"
                            {...register('confirmEmail')}
                        />
                        {confirmEmail && confirmEmail === email && !errors.confirmEmail ? (
                            <AiOutlineCheckCircle className={styles['input-icon']} />
                        ) : (
                            <AiOutlineInfoCircle className={styles['input-icon']} />
                        )}
                    </div>
                    {touchedFields.confirmEmail && getErrorMessage(errors.confirmEmail) && <span className={styles['error-message']}>{getErrorMessage(errors.confirmEmail)}</span>}

                    <div className={styles.terms}>
                        <input type="checkbox" id="terms" {...register('terms')} />
                        <label htmlFor="terms">
                            Li e concordo com as condições de tratamento dos meus dados pessoais, autorizando o uso conforme detalhado na nossa{' '}
                            <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
                        </label>
                    </div>

                    <button
                        className={
                            isValid && !isSubmitting && !isSending
                                ? `${styles['submit-btn']} ${styles['enabled']}`
                                : styles['submit-btn']
                        }
                        type="submit"
                        disabled={!isValid || isSubmitting || isSending}
                    >
                        <span className={styles['btn-text']}>
                            {isSending ? 'Enviando...' : 'Enviar'}
                        </span>
                    </button>
                </form>
            </div>
            <div className={styles.left}>
                <h2 className={styles.title}>
                    Informe seus dados ao lado para solicitar sua Conta e Cartão de Crédito
                </h2>
                <div className={styles.illustration}>
                    <img src={IMAGE.CELULAR_CARTAO.src} alt="Solicite sua Conta Digital HotInvest" className={styles.successAppImg} />
                </div>
            </div>
        </section>
    );
}