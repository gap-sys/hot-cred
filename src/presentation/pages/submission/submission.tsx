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
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [sendingToken, setSendingToken] = useState(false);

  const isLoading = isSubmitting;
  const isInactiveProsseguir = false;
  const isInactiveCadastrar = false;
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
                (isLoading || sendingToken) && !showTokenModal
                  ? S.loadingButton
                  : ""
              }`}
              onClick={async () => {
                if (step < 1) {
                  handleNext();
                } else {
                  setSendingToken(true);
                  const sent = await formHook.handleSendToken();
                  setSendingToken(false);
                  if (sent) setShowTokenModal(true);
                }
              }}
              disabled={showTokenModal || isLoading || sendingToken}
            >
              {isLoading && !showTokenModal ? (
                <>
                  <FaSpinner className={S.spinner} style={{ marginRight: 8 }} />
                  Cadastrando...
                </>
              ) : sendingToken ? (
                <>
                  <FaSpinner className={S.spinner} style={{ marginRight: 8 }} />
                  Enviando código...
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
        phoneMasked={form.whatsapp}
        onResend={() => {
          formHook.handleSendToken();
        }}
        onValidate={async (code) => {
          const ok = await formHook.handleValidateToken(code);
          if (ok) {
            await formHook.handleSubmitContract();
            setShowTokenModal(false);
          }
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
