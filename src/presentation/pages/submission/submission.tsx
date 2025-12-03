import {
  StepCadastro,
  StepEndereco,
  SuccessPartnersModal,
  ErrorModal,
} from "src/presentation/components";
import { useSubmissionForm } from "src/hooks/use-submission-form";
import { INITIAL_FORM } from "src/hooks/use-submission-form";

import { FaSpinner } from "react-icons/fa";

import S from "./submission.module.scss";

export default function Submission() {
  const formHook = useSubmissionForm();
  const {
    step,
    setStep,
    form,
    setForm,
    tipoCadastro,
    errors,
    isSendingSms,
    isSubmitting,
    handleChange,
    handleNext,
    handleBack,
    showSuccessModal,
    setShowSuccessModal,
    contractSentSuccessfully,
    showErrorModal,
    setShowErrorModal,
    errorMessages,
    handleSubmitContract,
  } = formHook;

  const isLoading = isSubmitting || isSendingSms;
  const renderStep = () => {
    if (step === 0)
      return (
        <StepCadastro
          form={form}
          registrationType={tipoCadastro}
          handleChange={handleChange}
          errors={errors}
          step={step}
        />
      );
    return (
      <StepEndereco form={form} handleChange={handleChange} errors={errors} />
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
        <h2 className={S.title}>CADASTRO DE PARCEIRO</h2>
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
              className={`${S.nextBtn} ${isLoading ? S.loadingButton : ""}`}
              onClick={() => {
                if (step < 1) {
                  handleNext();
                } else {
                  handleSubmitContract();
                }
              }}
              disabled={isLoading}
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
