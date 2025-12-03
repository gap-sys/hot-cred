import { RegistrationType, SubmissionForm, SubmissionErrors } from "src/@types";
import { MaskedInput } from "src/presentation/components";
import { WHATSAPP_MASK, CNPJ_MASK, CPF_MASK } from "src/presentation/constants";
import { FaWhatsapp } from "react-icons/fa";

import S from "src/presentation/pages/submission/submission.module.scss";

interface StepCadastroProps {
  form: SubmissionForm;
  registrationType: RegistrationType;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors: SubmissionErrors;
  step: number;
}

export const StepCadastro: React.FC<StepCadastroProps> = ({
  form,
  registrationType,
  handleChange,
  errors,
}) => {
  const { fullName } = form;
  const fullNameError = errors.fullName;
  return (
    <div className={S.stepContent}>
      <div className={S.row}>
        {registrationType === "juridica" && (
          <>
            <div className={S.col} style={{ position: "relative" }}>
              <MaskedInput
                value={form.cnpj}
                onChange={handleChange}
                id="cnpj"
                name="cnpj"
                mask={CNPJ_MASK}
                label="CNPJ *"
                placeholder="Digite o CNPJ"
                error={errors.cnpj}
              />
            </div>
            <div className={S.col}>
              <div className={S.floatingGroup}>
                <input
                  name="nomeFantasia"
                  value={form.nomeFantasia}
                  onChange={handleChange}
                  placeholder="Digite o nome fantasia"
                  id="nomeFantasia"
                  className={errors.nomeFantasia ? S.inputError : S.inputLabel}
                />
                <label htmlFor="nomeFantasia">Nome fantasia *</label>
                {errors.nomeFantasia && (
                  <span className={S.inputErrorText}>
                    {errors.nomeFantasia}
                  </span>
                )}
              </div>
            </div>
            <div className={S.col}>
              <div className={S.floatingGroup}>
                <input
                  name="razaoSocial"
                  value={form.razaoSocial}
                  onChange={handleChange}
                  placeholder="Digite a razão social"
                  id="razaoSocial"
                  className={errors.razaoSocial ? S.inputError : S.inputLabel}
                />
                <label htmlFor="razaoSocial">Razão social *</label>
                {errors.razaoSocial && (
                  <span className={S.inputErrorText}>{errors.razaoSocial}</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className={S.row}>
        <div className={S.col} style={{ position: "relative" }}>
          <MaskedInput
            value={form.cpf}
            onChange={handleChange}
            id="cpf"
            name="cpf"
            mask={CPF_MASK}
            label="CPF do administrador *"
            placeholder="Digite o CPF do administrador"
            error={errors.cpf}
          />
        </div>
        <div className={S.col}>
          <div className={S.floatingGroup}>
            <input
              name="fullName"
              value={fullName}
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              id="fullName"
              className={fullNameError ? S.inputError : S.inputLabel}
            />
            <label htmlFor="fullName">Nome completo *</label>
            {fullNameError && (
              <span className={S.inputErrorText}>{fullNameError}</span>
            )}
          </div>
        </div>
      </div>
      <div className={S.row}>
        <div className={S.col}>
          <div className={S.floatingGroup}>
            <input
              name="email"
              value={form.email || ""}
              onChange={handleChange}
              placeholder="Digite seu e-mail"
              id="email"
              type="email"
              className={errors.email ? S.inputError : ""}
            />
            <label htmlFor="email">E-mail *</label>
            {errors.email && (
              <span className={S.inputErrorText}>{errors.email}</span>
            )}
          </div>
        </div>
        <div className={S.col}>
          <MaskedInput
            value={form.whatsapp}
            onChange={handleChange}
            id="whatsapp"
            name="whatsapp"
            mask={WHATSAPP_MASK}
            label="WhatsApp *"
            leftIcon={<FaWhatsapp />}
            inputClassName="labelFixed"
            placeholder="Digite seu WhatsApp"
            error={errors.whatsapp}
          />
        </div>
      </div>
    </div>
  );
};
