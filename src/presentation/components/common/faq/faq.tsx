"use client";

import { useState } from "react";

import { FiPlus, FiX } from "react-icons/fi";

import styles from "./faq.module.scss";

const QUESTIONS = [
    {
        question: "Como funciona a análise de crédito na HotCred?",
        answer: `A análise de crédito é feita de forma rápida e digital, considerando seu histórico financeiro, renda e informações cadastrais. Você recebe a resposta em poucos minutos e pode acompanhar todo o processo pelo app ou site.`,
    },
    {
        question: "Quais são as vantagens de contratar um empréstimo digital?",
        answer: `Com a HotCred, você solicita, simula e contrata seu empréstimo sem sair de casa, com taxas competitivas, transparência total e sem burocracia. O dinheiro cai direto na sua conta após a aprovação.`,
    },
    {
        question: "É seguro compartilhar meus dados com a HotCred?",
        answer: `Sim! Utilizamos tecnologia de ponta para proteger seus dados, com criptografia e protocolos de segurança exigidos pelo Banco Central. Suas informações são tratadas com total confidencialidade.`,
    },
    {
        question: "Posso antecipar parcelas ou quitar meu empréstimo antes do prazo?",
        answer: `Sim, você pode antecipar pagamentos ou quitar seu contrato a qualquer momento, com desconto proporcional dos juros. Tudo pode ser feito pelo app ou entrando em contato com nosso atendimento.`,
    },
    {
        question: "Como posso falar com a HotCred em caso de dúvida ou problema?",
        answer: `Nosso atendimento é digital e humanizado: você pode nos acionar pelo chat, WhatsApp, telefone ou e-mail. Estamos prontos para te ajudar em todas as etapas, desde a simulação até o pós-venda.`,
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="perguntas-frequentes" className={styles.faqSection}>
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
            <div className={styles.left}>
                <h2 className={styles.title}>Ficou com alguma dúvida?</h2>
                <p className={styles.subtitle}>
                    Estamos aqui para esclarecer suas dúvidas e ajudar você a escolher as melhores soluções financeiras.
                </p>
            </div>
        </section>
    );
}
