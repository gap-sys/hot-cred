"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IMAGE } from "src/presentation/assets";
import styles from "./sucess-partners.module.scss";

export const SuccessPartnersModal = ({
  isOpen,
  onRequestClose,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  contractSentSuccessfully?: boolean;
}) => {
  if (!isOpen) return null;

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") onRequestClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [isOpen]);

  const node = (
    <div
      className={styles.overlay}
      onClick={onRequestClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <img
            src={IMAGE.LOGO_HOT_CRED.src}
            alt="Logo HotCred"
            className={styles.logo}
          />
          <>
            <p>
              <b>Cadastro enviado com sucesso!</b>
            </p>
            <p>
              Nosso time vai avaliar seu perfil e, em caso de aprovação, você
              receberá as orientações para iniciar a parceria por WhatsApp.
            </p>
            <button
              type="button"
              className={styles.button}
              onClick={onRequestClose}
            >
              Fechar
            </button>
          </>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};
