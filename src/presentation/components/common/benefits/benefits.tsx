import {
    IconDeviceMobile,
    IconCurrencyDollar,
    IconTrendingUp,
    IconCheck,
    IconMoodSmile,
    IconUsers
} from "@tabler/icons-react";

import styles from "./benefits.module.scss";

const BENEFITS = [
    {
        icon: <IconDeviceMobile size={36} stroke={1.7} />,
        title: "Tudo no seu celular",
        desc: "Gerencie sua conta e investimentos de forma simples e rápida, direto pelo app, onde estiver.",
    },
    {
        icon: <IconCurrencyDollar size={36} stroke={1.7} />,
        title: "Transferências gratuitas",
        desc: "Envie e receba dinheiro sem pagar taxas, com liberdade total para movimentar sua conta.",
    },
    {
        icon: <IconTrendingUp size={36} stroke={1.7} />,
        title: "Seu dinheiro rende mais",
        desc: "Deixe seu saldo render automaticamente acima da poupança, sem esforço e sem burocracia.",
    },
    {
        icon: <IconCheck size={36} stroke={1.7} />,
        title: "Organização inteligente",
        desc: "Pague contas, acompanhe boletos e receba alertas de vencimento, tudo em um só lugar.",
    },
    {
        icon: <IconMoodSmile size={36} stroke={1.7} />,
        title: "Sem mensalidade",
        desc: "Conta 100% gratuita, sem tarifas de manutenção ou surpresas no final do mês.",
    },
    {
        icon: <IconUsers size={36} stroke={1.7} />,
        title: "Acesso facilitado",
        desc: "Abra sua conta HotInvest sem burocracia, sem análise de crédito e para todos os perfis.",
    },
];

const Benefits = () => {
    return (
        <section id="beneficios" className={styles.section}>
            <h2 className={styles.title}>
                Tudo o que você precisa, com a conta da <span style={{ color: "#EF5635" }}>Hot</span><span style={{ color: "#16487E", fontStyle: "italic" }}>Invest</span>.
            </h2>
            <div className={styles.grid}>
                {BENEFITS.map((b, i) => (
                    <div className={styles.card} key={i}>
                        <div className={styles.icon}>{b.icon}</div>
                        <div className={styles.cardTitle}>{b.title}</div>
                        <div className={styles.cardDesc}>{b.desc}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Benefits;
