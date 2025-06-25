import { RegistrationType, SubmissionForm, SubmissionErrors } from 'src/@types';
import { MaskedInput } from 'src/presentation/components';
import { WHATSAPP_MASK, CNPJ_MASK, CPF_MASK } from 'src/presentation/constants';

import { FaWhatsapp, FaSpinner } from 'react-icons/fa';

import styles from '../../../pages/submission/submission.module.scss';

interface StepCadastroProps {
    form: SubmissionForm;
    tipoCadastro: RegistrationType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors: SubmissionErrors;
    step: number;
    handleCnpjBlur: () => void;
    loadingCnpj: boolean;
}

export const StepCadastro: React.FC<StepCadastroProps> = ({
    form,
    tipoCadastro,
    handleChange,
    errors,
    step,
    handleCnpjBlur,
    loadingCnpj
}) => {
    // Exibe campos de razão/nome fantasia se CNPJ tiver 14 dígitos
    const cnpjPreenchido = form.cnpj.replace(/\D/g, '').length === 14;
    // Exibe campo nomeAdmin se CPF tiver 11 dígitos
    const cpfPreenchido = form.cpf.replace(/\D/g, '').length === 11;

    return (
        <div className={styles.stepContent}>
            <div className={styles.row}>
                {tipoCadastro === 'juridica' && (
                    <>
                        <div className={styles.col} style={{ position: 'relative' }}>
                            <MaskedInput
                                value={form.cnpj}
                                onChange={handleChange}
                                id="cnpj"
                                name="cnpj"
                                mask={CNPJ_MASK}
                                label="CNPJ"
                                error={errors.cnpj}
                                onBlur={handleCnpjBlur}
                            />
                            {loadingCnpj && (
                                <span>
                                    <FaSpinner className={styles.loader} />
                                </span>
                            )}
                        </div>
                        <div className={styles.col}>
                            <div className={styles.floatingGroup}>
                                <input
                                    name="nomeFantasia"
                                    value={form.nomeFantasia}
                                    onChange={handleChange}
                                    placeholder=" "
                                    id="nomeFantasia"
                                    className={errors.nomeFantasia ? styles.inputError : styles.inputLabel}
                                />
                                <label htmlFor="nomeFantasia">Nome fantasia</label>
                                {errors.nomeFantasia && (
                                    <span className={styles.inputErrorText}>{errors.nomeFantasia}</span>
                                )}
                            </div>
                        </div>
                        <div className={styles.col}>
                            <div className={styles.floatingGroup}>
                                <input
                                    name="razaoSocial"
                                    value={form.razaoSocial}
                                    onChange={handleChange}
                                    placeholder=" "
                                    id="razaoSocial"
                                    className={errors.razaoSocial ? styles.inputError : styles.inputLabel}
                                />
                                <label htmlFor="razaoSocial">Razão social</label>
                                {errors.razaoSocial && (
                                    <span className={styles.inputErrorText}>{errors.razaoSocial}</span>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.row}>
                <div className={styles.col} style={{ position: 'relative' }}>
                    <MaskedInput
                        value={form.cpf}
                        onChange={handleChange}
                        id="cpf"
                        name="cpf"
                        mask={CPF_MASK}
                        label="CPF do administrador conforme Receita Federal"
                        error={errors.cpf}
                    />
                </div>
                <div className={styles.col}>
                    <div className={styles.floatingGroup}>
                        <input
                            name="nomeAdmin"
                            value={form.nomeAdmin}
                            onChange={handleChange}
                            placeholder=" "
                            id="nomeAdmin"
                            className={errors.nomeAdmin ? styles.inputError : styles.inputLabel}
                        />
                        <label htmlFor="nomeAdmin">Nome completo do administrador</label>
                        {errors.nomeAdmin && (
                            <span className={styles.inputErrorText}>{errors.nomeAdmin}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.col}>
                    <MaskedInput
                        value={form.whatsapp}
                        onChange={handleChange}
                        id="whatsapp"
                        name="whatsapp"
                        mask={WHATSAPP_MASK}
                        label="WhatsApp do administrador"
                        leftIcon={<FaWhatsapp />}
                        inputClassName="labelFixed"
                        error={errors.whatsapp}
                    />
                </div>
            </div>
        </div>
    );
} 