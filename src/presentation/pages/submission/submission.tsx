"use client";

import {
  StepCadastro,
  StepEndereco,
  SuccessPartnersModal,
  ErrorModal,
  TokenVerificationModal,
} from "src/presentation/components";
import { useSubmissionForm } from "src/hooks/use-submission-form";
import { INITIAL_FORM } from "src/hooks/use-submission-form";

import { FaSpinner } from "react-icons/fa";

import S from "./submission.module.scss";

import { Highlighter } from "src/presentation/components/ui/highlighter";
import { useState } from "react";

export default function Submission() {
  const [showTokenModal, setShowTokenModal] = useState(false);
  const formHook = useSubmissionForm();
  const {
    step,
    setStep,
    form,
    setForm,
    tipoCadastro,
    errors,
    isSubmitting,
    handleChange,
    handleNext,
    handleBack,
    showSuccessModal,
    setShowSuccessModal,
    showErrorModal,
    setShowErrorModal,
    errorMessages,
    handleSubmitContract,
  } = formHook;

  const isLoading = isSubmitting;
  const isInactiveProsseguir =
    step === 0 &&
    (!formHook.isCurrentStepValid() ||
      formHook.loadingCnpj ||
      formHook.loadingCpf);
  const isInactiveCadastrar = step === 1 && !formHook.isCurrentStepValid();
  const renderStep = () => {
    if (step === 0)
      return (
        <StepCadastro
          form={form}
          registrationType={tipoCadastro}
          handleChange={handleChange}
          errors={errors}
          step={step}
          loadingCnpj={formHook.loadingCnpj}
          handleCnpjBlur={formHook.handleCnpjBlur}
          loadingCpf={formHook.loadingCpf}
        />
      );
    return (
      <StepEndereco
        form={form}
        handleChange={handleChange}
        errors={errors}
        loadingCep={formHook.loadingCep}
        handleCepBlur={formHook.handleCepBlur}
      />
    );
  };

  const handleSuccessModalClose = () => {
    setForm({ ...INITIAL_FORM });
    setStep(0);
    setShowSuccessModal(false);
  };

  const maskedPhone = (() => {
    const raw = (form.whatsapp || "").replace(/\D/g, "");
    if (raw.length >= 10) {
      const ddd = raw.slice(0, 2);
      const first = raw[2] || "";
      const last4 = raw.slice(-4);
      return `(${ddd}) ${first}****-${last4}`;
    }
    return form.whatsapp || "";
  })();

  return (
    <div className={S.container}>
      <div className={S.formWrapper}>
        <h2 className={S.title}>
          SEJA{" "}
          <Highlighter action="underline" color="#FF9800">
            PARCEIRO
          </Highlighter>
        </h2>
        <form className={S.form} onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
          <div className={S.actions}>
            {step > 0 && (
              <button
                type="button"
                className={S.backBtn}
                onClick={handleBack}
                disabled={isLoading}
              >
                Voltar
              </button>
            )}
            <button
              type="button"
              className={`${S.nextBtn} ${
                isInactiveProsseguir || isInactiveCadastrar
                  ? S.nextBtnInactive
                  : ""
              } ${isLoading ? S.loadingButton : ""}`}
              onClick={() => {
                if (step < 1) {
                  handleNext();
                } else {
                  setShowTokenModal(true);
                }
              }}
              disabled={
                isLoading ||
                (step === 0 ? isInactiveProsseguir : isInactiveCadastrar)
              }
            >
              {isLoading ? (
                <>
                  <FaSpinner className={S.spinner} style={{ marginRight: 8 }} />
                  Cadastrando...
                </>
              ) : step === 1 ? (
                "Cadastrar"
              ) : (
                "Prosseguir"
              )}
            </button>
          </div>
        </form>
      </div>
      <SuccessPartnersModal
        isOpen={showSuccessModal}
        onRequestClose={handleSuccessModalClose}
      />
      <TokenVerificationModal
        isOpen={showTokenModal}
        onRequestClose={() => setShowTokenModal(false)}
        phoneMasked={maskedPhone}
        onResend={() => {}}
        onValidate={() => {
          setShowTokenModal(false);
          setShowSuccessModal(true);
        }}
      />
      <ErrorModal
        isOpen={showErrorModal}
        onRequestClose={() => setShowErrorModal(false)}
        errors={errorMessages}
      />
    </div>
  );
}
