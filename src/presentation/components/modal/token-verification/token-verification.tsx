"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./token-verification.module.scss";

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
  onValidate?: (token: string) => void;
  onResend?: () => void;
  phoneMasked?: string;
};

export const TokenVerificationModal: React.FC<Props> = ({
  isOpen,
  onRequestClose,
  onValidate,
  onResend,
  phoneMasked,
}) => {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [countdown, setCountdown] = useState(45);

  useEffect(() => {
    if (!isOpen) return;
    setDigits(["", "", "", ""]);
    setError("");
    setCountdown(45);
    const timer = setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (digits.every((d) => d.length === 1)) {
      handleValidate();
    }
  }, [digits]);

  if (!isOpen) return null;

  const handleValidate = () => {
    const code = digits.join("").replace(/\D/g, "");
    if (!code || code.length < 4) {
      setError("Digite o código de 4 dígitos.");
      return;
    }
    setError("");
    if (onValidate) onValidate(code);
  };

  const handleChange = (idx: number, val: string) => {
    const only = val.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[idx] = only;
    setDigits(next);
    if (only && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < inputsRef.current.length - 1)
      inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!text) return;
    e.preventDefault();
    const next = ["", "", "", ""];
    for (let i = 0; i < Math.min(4, text.length); i++) next[i] = text[i];
    setDigits(next);
    inputsRef.current[Math.min(3, text.length - 1)]?.focus();
  };

  const handleResend = () => {
    if (countdown > 0) return;
    if (onResend) onResend();
    setCountdown(45);
  };

  const node = (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      onClick={onRequestClose}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.title}>Confirmação por SMS</div>
        <div className={styles.subtitle}>
          Antes de finalizar seu cadastro, enviamos um código de 4 dígitos por SMS para{" "}
          <strong>{phoneMasked || "seu número"}</strong>.
          <strong>{phoneMasked || "seu número"}</strong>.
        </div>
        <div className={styles.digitGrid}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              className={styles.digitBox}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              maxLength={1}
            />
          ))}
        </div>
        {error && <div className={styles.errorText}>{error}</div>}
        <div className={styles.resendLine}>
          Não recebeu?{" "}
          <button
            className={styles.linkButton}
            onClick={handleResend}
            disabled={countdown > 0}
            type="button"
          >
            Reenviar código (0:{String(countdown).padStart(2, "0")})
          </button>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.primaryBtn}
            type="button"
            onClick={handleValidate}
            disabled={!digits.every((d) => d.length === 1)}
          >
            Confirmar código
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};
