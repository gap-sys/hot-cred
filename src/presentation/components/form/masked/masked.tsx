"use client";

import InputMask from "react-input-mask";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";

import styles from "../../../pages/submission/submission.module.scss";

type MaskedInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  mask: string;
  label: string;
  error?: string;
  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputMode?: string;
  pattern?: string;
  autoComplete?: string;
  leftIcon?: React.ReactNode;
  inputClassName?: string;
  success?: boolean;
};

const MaskedInput: React.FC<MaskedInputProps> = ({
  value,
  onChange,
  onBlur,
  id,
  name,
  mask,
  label,
  error,
  loading = false,
  disabled = false,
  placeholder = " ",
  pattern = "[0-9]*",
  autoComplete = "off",
  leftIcon,
  inputClassName = "",
  success = false,
}) => (
  <div>
    <div className={styles.floatingGroup} style={{ position: "relative" }}>
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <InputMask
        mask={mask}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        id={id}
        placeholder={placeholder}
        maskChar={null}
        className={`${error ? styles.inputError : ""} ${
          leftIcon ? styles.inputWithIcon : ""
        } ${inputClassName}`}
        inputMode="numeric"
        pattern={pattern}
        disabled={disabled || loading}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        style={leftIcon ? { paddingLeft: 38 } : undefined}
      />
      <label htmlFor={id}>{label}</label>
      {loading && (
        <span
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <FaSpinner className={styles.spinner} />
        </span>
      )}
    </div>
    {error && (
      <span id={`${id}-error`} className={styles.inputErrorText} role="alert">
        {error}
      </span>
    )}
    {success && !loading && (
      <span className={styles.successIcon} aria-label="Válido">
        <FaCheckCircle color="#000040" size={20} />
      </span>
    )}
  </div>
);

export default MaskedInput;
