import React from 'react';
import Image from 'next/image';

import { StepCadastro, StepEndereco, StepAcesso, SuccessPartnersModal, ErrorModal } from 'src/presentation/components';
import { STEPS } from 'src/presentation/constants';
import { IMAGE } from 'src/presentation/assets';
import { useSubmissionForm } from 'src/hooks';
import { INITIAL_FORM } from 'src/hooks/use-submission-form';

import { FaCheck, FaSpinner } from 'react-icons/fa';

import styles from './submission.module.scss';

const StepIcon = ({ active, completed, number }: { active: boolean; completed: boolean; number: number }) => (
    <span
        className={
            completed
                ? styles.completedStepNumber
                : active
                    ? styles.activeStepNumber
                    : styles.stepNumber
        }
    >
        {completed ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18 }}>
                <FaCheck fill="#000040" size={14} />
            </span>
        ) : active ? (
            <span style={{ color: '#fff' }}>{number}</span>
        ) : (
            <span style={{ color: '#8e8e93' }}>{number}</span>
        )}
    </span>
);

export default function Submission() {
    const formHook = useSubmissionForm();
    const {
        step,
        setStep,
        form,
        setForm,
        tipoCadastro,
        setTipoCadastro,
        errors,
        isSendingSms,
        isSubmitting,
        showPassword,
        setShowPassword,
        handleChange,
        handleNext,
        handleBack,
        showSuccessModal,
        setShowSuccessModal,
        contractSentSuccessfully,
        showErrorModal,
        setShowErrorModal,
        errorMessages,
        validateAllFields,
        handleSubmitContract,
    } = formHook;

    const handleSuccessModalClose = () => {
        setForm({ ...INITIAL_FORM });
        setStep(0);
        setShowSuccessModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <a>
                    <Image src={IMAGE.LOGO_HOT_CRED} alt="Logo HotCred" className={styles.logo} />
                </a>
            </div>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>CADASTRO DE CORRESPONDENTE</h2>

                <div className={styles.toggleWrapper}>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${tipoCadastro === 'juridica' ? styles.active : ''}`}
                        onClick={() => setTipoCadastro('juridica')}
                        aria-pressed={tipoCadastro === 'juridica'}
                        disabled={step !== 0}
                    >
                        Pessoa Jurídica
                    </button>
                    <button
                        type="button"
                        className={`${styles.toggleBtn} ${tipoCadastro === 'fisica' ? styles.active : ''}`}
                        onClick={() => setTipoCadastro('fisica')}
                        aria-pressed={tipoCadastro === 'fisica'}
                        disabled={step !== 0}
                    >
                        Pessoa Física
                    </button>
                    <div
                        className={styles.toggleIndicator}
                        style={{
                            transform: tipoCadastro === 'juridica' ? 'translateX(0%)' : 'translateX(100%)'
                        }}
                    />
                </div>

                <div className={styles.steps}>
                    {STEPS.map((label, idx) => (
                        <React.Fragment key={label}>
                            {idx > 0 && (
                                <div className={step > idx - 1 ? styles.stepDividerActive : styles.stepDivider}></div>
                            )}
                            <div className={styles.step + (step === idx ? ' ' + styles.activeStep : '')}>
                                <StepIcon active={step === idx} completed={step > idx} number={idx + 1} />
                                <span className={step === idx ? styles.activeStepLabel : styles.stepLabel}>{label}</span>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <form className={styles.form} onSubmit={e => e.preventDefault()}>
                    {step === 0 && (
                        <StepCadastro
                            form={form}
                            tipoCadastro={tipoCadastro}
                            handleChange={handleChange}
                            errors={errors}
                            step={step}
                            handleCnpjBlur={formHook.handleCnpjBlur}
                            loadingCnpj={formHook.loadingCnpj}
                        />
                    )}
                    {step === 1 && (
                        <StepEndereco
                            form={form}
                            handleChange={handleChange}
                            errors={errors}
                            handleCepBlur={formHook.handleCepBlur}
                            loadingCep={formHook.loadingCep}
                        />
                    )}
                    {step === 2 && (
                        <StepAcesso
                            form={form}
                            errors={errors}
                            handleChange={handleChange}
                            showPassword={showPassword}
                            setShowPassword={setShowPassword}
                        />
                    )}
                    <div className={styles.actions}>
                        {step > 0 && (
                            <button
                                type="button"
                                className={styles.backBtn}
                                onClick={handleBack}
                                disabled={isSubmitting}
                            >
                                Voltar
                            </button>
                        )}
                        <button
                            type="button"
                            className={`${styles.nextBtn} ${isSubmitting || isSendingSms ? styles.loadingButton : ''}`}
                            onClick={() => {
                                if (step < 2) {
                                    handleNext();
                                } else {
                                    if (validateAllFields()) {
                                        handleSubmitContract();
                                    }
                                }
                            }}
                            disabled={isSubmitting || isSendingSms}
                        >
                            {(isSubmitting || isSendingSms) ? (
                                <>
                                    <FaSpinner className={styles.spinner} style={{ marginRight: 8 }} />
                                    Cadastrando...
                                </>
                            ) : (
                                step === 2 ? 'Cadastrar' : 'Prosseguir'
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <SuccessPartnersModal
                isOpen={showSuccessModal}
                onRequestClose={handleSuccessModalClose}
                contractSentSuccessfully={contractSentSuccessfully}
            />
            <ErrorModal
                isOpen={showErrorModal}
                onRequestClose={() => setShowErrorModal(false)}
                errors={errorMessages}
            />
        </div>
    );
}