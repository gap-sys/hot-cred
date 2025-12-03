"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IMAGE } from "src/presentation/assets";
import styles from "./sucess-partners.module.scss";

export const SuccessPartnersModal = ({
  isOpen,
  onRequestClose,
  contractSentSuccessfully = true,
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
              Recebemos suas informações e vamos validar seu perfil para liberar
              sua parceria. Você receberá as próximas orientações por e-mail e
              WhatsApp.
            </p>
            <a
              href="https://api.whatsapp.com/send?phone=5519993120568&text=Ol%C3%A1!%20Acabei%20de%20fazer%20o%20cadastro%20de%20parceria%20pelo%20site%20da%20HotCred."
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={styles.button}>
                Falar com a equipe no WhatsApp
              </button>
            </a>
          </>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};
