"use client";

import { useState } from "react";

import { FiPlus, FiX } from "react-icons/fi";

import styles from "./faq.module.scss";

const QUESTIONS = [
    {
        question: "É seguro usar um banco digital?",
        answer: `Sim! Bancos digitais seguem as mesmas normas de segurança dos bancos tradicionais, com proteção de dados, criptografia e fiscalização do Banco Central. Além disso, você pode acompanhar todas as movimentações em tempo real pelo app.`,
    },
    {
        question: "Como funciona o atendimento em um banco digital?",
        answer: `O atendimento é 100% online, disponível pelo aplicativo, chat, e-mail ou telefone. Você resolve tudo sem precisar ir até uma agência física, com suporte rápido e eficiente.`,
    },
    {
        question: "Posso receber meu salário e pagar contas normalmente?",
        answer: `Sim! Você pode receber salário, transferir, pagar contas, boletos, fazer PIX e até investir, tudo pelo app. O banco digital oferece as mesmas funcionalidades essenciais de um banco tradicional.`,
    },
    {
        question: "E se eu precisar sacar dinheiro?",
        answer: `Você pode sacar dinheiro em caixas eletrônicos da rede Banco24Horas em todo o Brasil, usando seu cartão do banco digital.`,
    },
    {
        question: "O que acontece se eu tiver algum problema com o app?",
        answer: `O suporte está sempre disponível para te ajudar. Além disso, o app é atualizado frequentemente para garantir segurança e estabilidade. Se precisar, você pode bloquear o cartão, redefinir senha e resolver tudo pelo celular.`,
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="perguntas-frequentes" className={styles.faqSection}>
            <div className={styles.left}>
                <h2 className={styles.title}>Ficou com alguma dúvida?</h2>
                <p className={styles.subtitle}>
                    Encontre respostas para suas principais dúvidas sobre produtos e serviços do banco digital.
                </p>
                <button className={styles.button}>Confira perguntas frequentes</button>
            </div>
            <div className={styles.right}>
                {QUESTIONS.map((q, i) => (
                    <div
                        className={`${styles.card} ${open === i ? styles.open : ""}`}
                        key={i}
                        onClick={() => setOpen(open === i ? null : i)}
                    >
                        <div className={styles.cardHeader}>
                            <span className={styles.question}>{q.question}</span>
                            {open === i ? (
                                <FiX className={styles.icon} />
                            ) : (
                                <FiPlus className={styles.icon} />
                            )}
                        </div>
                        <div
                            className={styles.answer}
                            style={{
                                maxHeight: open === i ? "500px" : "0",
                                opacity: open === i ? 1 : 0,
                                paddingTop: open === i ? "20px" : "0",
                            }}
                        >
                            {q.answer}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
