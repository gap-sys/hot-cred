import { SubmissionForm, SubmissionErrors } from 'src/@types';

import styles from '../../../pages/submission/submission.module.scss';

interface StepAcessoProps {
    form: SubmissionForm;
    errors: SubmissionErrors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
}

export const StepAcesso: React.FC<StepAcessoProps> = ({ form, errors, handleChange, showPassword, setShowPassword }) => (
    <div className={styles.stepContent}>
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.floatingGroup}>
                    <input
                        name="email"
                        value={form.email || ''}
                        onChange={handleChange}
                        placeholder=" "
                        id="email"
                        type="email"
                        className={errors.email ? styles.inputError : ''}
                    />
                    <label htmlFor="email">E-mail</label>
                    {errors.email && (
                        <span className={styles.inputErrorText}>{errors.email}</span>
                    )}
                </div>
            </div>
        </div>
    </div>
); 