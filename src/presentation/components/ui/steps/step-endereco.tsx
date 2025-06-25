import { SubmissionForm, SubmissionErrors } from 'src/@types';

import { MaskedInput } from 'src/presentation/components';
import { CEP_MASK } from 'src/presentation/constants';

import styles from '../../../pages/submission/submission.module.scss';

interface StepEnderecoProps {
    form: SubmissionForm;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: SubmissionErrors;
    handleCepBlur: () => void;
    loadingCep?: boolean;
}

export const StepEndereco: React.FC<StepEnderecoProps> = ({ form, handleChange, errors, handleCepBlur, loadingCep }) => (
    <div className={styles.stepContent}>
        <div className={styles.row}>
            <div className={styles.col}>
                <MaskedInput
                    value={form.cep}
                    onChange={handleChange}
                    id="cep"
                    name="cep"
                    mask={CEP_MASK}
                    label="CEP"
                    error={errors.cep}
                    onBlur={handleCepBlur}
                    loading={loadingCep}
                />
            </div>
            <div className={styles.col}>
                <div className={styles.floatingGroup}>
                    <input
                        name="endereco"
                        value={form.endereco}
                        onChange={handleChange}
                        placeholder=" "
                        id="endereco"
                        className={errors.endereco && errors.endereco.length > 0 ? styles.inputError : ''}
                    />
                    <label htmlFor="endereco">Endereço completo</label>
                    {errors.endereco && errors.endereco.length > 0 && <span className={styles.inputErrorText}>{errors.endereco}</span>}
                </div>
            </div>
            <div className={styles.col}>
                <div className={styles.floatingGroup}>
                    <input
                        name="numero"
                        value={form.numero}
                        onChange={handleChange}
                        placeholder=" "
                        id="numero"
                        className={errors.numero && errors.numero.length > 0 ? styles.inputError : ''}
                    />
                    <label htmlFor="numero">Número</label>
                    {errors.numero && errors.numero.length > 0 && <span className={styles.inputErrorText}>{errors.numero}</span>}
                </div>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.floatingGroup}>
                    <input
                        name="bairro"
                        value={form.bairro}
                        onChange={handleChange}
                        placeholder=" "
                        id="bairro"
                        className={errors.bairro && errors.bairro.length > 0 ? styles.inputError : ''}
                    />
                    <label htmlFor="bairro">Bairro</label>
                    {errors.bairro && errors.bairro.length > 0 && <span className={styles.inputErrorText}>{errors.bairro}</span>}
                </div>
            </div>
            <div className={styles.col}>
                <div className={styles.floatingGroup}>
                    <input
                        name="estado"
                        value={form.estado}
                        onChange={handleChange}
                        placeholder=" "
                        id="estado"
                        className={errors.estado && errors.estado.length > 0 ? styles.inputError : ''}
                    />
                    <label htmlFor="estado">Estado</label>
                    {errors.estado && errors.estado.length > 0 && <span className={styles.inputErrorText}>{errors.estado}</span>}
                </div>
            </div>
            <div className={styles.col}>
                <div className={styles.floatingGroup}>
                    <input
                        name="cidade"
                        value={form.cidade}
                        onChange={handleChange}
                        placeholder=" "
                        id="cidade"
                        className={errors.cidade && errors.cidade.length > 0 ? styles.inputError : ''}
                    />
                    <label htmlFor="cidade">Cidade</label>
                    {errors.cidade && errors.cidade.length > 0 && <span className={styles.inputErrorText}>{errors.cidade}</span>}
                </div>
            </div>
        </div>
        <div className={styles.row}>
            <div className={styles.colFull}>
                <div className={styles.floatingGroup}>
                    <input
                        name="complemento"
                        value={form.complemento}
                        onChange={handleChange}
                        placeholder=" "
                        id="complemento"
                    />
                    <label htmlFor="complemento">Complemento do endereço</label>
                </div>
                <span className={styles.optional}>Não obrigatório</span>
            </div>
        </div>
    </div>
); 