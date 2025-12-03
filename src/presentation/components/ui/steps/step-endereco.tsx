import { SubmissionForm, SubmissionErrors } from "src/@types";
import { MaskedInput } from "src/presentation/components";
import { CEP_MASK } from "src/presentation/constants";

import S from "src/presentation/pages/submission/submission.module.scss";

interface StepEnderecoProps {
  form: SubmissionForm;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  errors: SubmissionErrors;
}

export const StepEndereco: React.FC<StepEnderecoProps> = ({
  form,
  handleChange,
  errors,
}) => (
  <div className={S.stepContent}>
    <div className={S.row}>
      <div className={S.col}>
        <MaskedInput
          value={form.cep}
          onChange={handleChange}
          id="cep"
          name="cep"
          mask={CEP_MASK}
          label="CEP *"
          placeholder="Digite o CEP"
          error={errors.cep}
        />
      </div>
      <div className={S.col}>
        <div className={S.floatingGroup}>
          <input
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            placeholder="Digite o endereço completo"
            id="endereco"
            className={
              errors.endereco && errors.endereco.length > 0 ? S.inputError : ""
            }
          />
          <label htmlFor="endereco">Endereço completo *</label>
          {errors.endereco && errors.endereco.length > 0 && (
            <span className={S.inputErrorText}>{errors.endereco}</span>
          )}
        </div>
      </div>
      <div className={S.col}>
        <div className={S.floatingGroup}>
          <input
            name="numero"
            value={form.numero}
            onChange={handleChange}
            placeholder="Digite o número"
            id="numero"
            className={
              errors.numero && errors.numero.length > 0 ? S.inputError : ""
            }
          />
          <label htmlFor="numero">Número *</label>
          {errors.numero && errors.numero.length > 0 && (
            <span className={S.inputErrorText}>{errors.numero}</span>
          )}
        </div>
      </div>
    </div>
    <div className={S.row}>
      <div className={S.col}>
        <div className={S.floatingGroup}>
          <input
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
            placeholder="Digite o bairro"
            id="bairro"
            className={
              errors.bairro && errors.bairro.length > 0 ? S.inputError : ""
            }
          />
          <label htmlFor="bairro">Bairro</label>
          {errors.bairro && errors.bairro.length > 0 && (
            <span className={S.inputErrorText}>{errors.bairro}</span>
          )}
        </div>
      </div>
      <div className={S.col}>
        <div className={S.floatingGroup}>
          <input
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            placeholder="Digite a cidade"
            id="cidade"
            className={
              errors.cidade && errors.cidade.length > 0 ? S.inputError : ""
            }
          />
          <label htmlFor="cidade">Cidade *</label>
          {errors.cidade && errors.cidade.length > 0 && (
            <span className={S.inputErrorText}>{errors.cidade}</span>
          )}
        </div>
      </div>
      <div className={S.col}>
        <div className={S.floatingGroup}>
          <input
            name="estado"
            value={form.estado}
            onChange={handleChange}
            placeholder="Digite o estado"
            id="estado"
            className={
              errors.estado && errors.estado.length > 0 ? S.inputError : ""
            }
          />
          <label htmlFor="estado">Estado *</label>
          {errors.estado && errors.estado.length > 0 && (
            <span className={S.inputErrorText}>{errors.estado}</span>
          )}
        </div>
      </div>
    </div>
    <div className={S.row}>
      <div className={S.colFull}>
        <div className={S.floatingGroup}>
          <input
            name="complemento"
            value={form.complemento}
            onChange={handleChange}
            placeholder="Digite o complemento (opcional)"
            id="complemento"
          />
          <label htmlFor="complemento">Complemento do endereço</label>
        </div>
        <span className={S.optional}>Não obrigatório</span>
      </div>
    </div>
  </div>
);
