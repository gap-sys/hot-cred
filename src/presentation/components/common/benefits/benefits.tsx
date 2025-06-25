import {
    IconUserDollar,
    IconBuildingBank,
    IconBriefcase,
    IconUsers,
    IconIdBadge2,
    IconCreditCard
} from "@tabler/icons-react";

import styles from "./benefits.module.scss";

const BENEFITS = [
    {
        icon: <IconIdBadge2 size={36} stroke={1.7} />,
        title: "Crédito do Trabalhador",
        desc: "Linha de crédito exclusiva para trabalhadores formais, com condições especiais e aprovação facilitada.",
    },
    {
        icon: <IconUserDollar size={36} stroke={1.7} />,
        title: "Empréstimo Pessoal",
        desc: "Dinheiro rápido e sem burocracia para você realizar seus planos, com contratação 100% digital.",
    },
    {
        icon: <IconBuildingBank size={36} stroke={1.7} />,
        title: "Empréstimo FGTS",
        desc: "Antecipe seu saque-aniversário do FGTS e tenha acesso ao valor na hora, com taxas reduzidas.",
    },
    {
        icon: <IconBriefcase size={36} stroke={1.7} />,
        title: "Empréstimo Consignado",
        desc: "Crédito com parcelas descontadas direto na folha, ideal para aposentados, pensionistas e servidores.",
    },

    {
        icon: <IconUsers size={36} stroke={1.7} />,
        title: "Consignado Público",
        desc: "Empréstimo consignado para servidores públicos, com taxas diferenciadas e prazos flexíveis.",
    },
    {
        icon: <IconCreditCard size={36} stroke={1.7} />,
        title: "Cartão de Crédito Consignado",
        desc: "Cartão sem consulta ao SPC/Serasa, com limite vinculado ao benefício e descontos em folha.",
    },
];

const Benefits = () => {
    return (
        <section id="emprestimos" className={styles.section}>
            <h2 className={styles.title}>
                Encontre a solução ideal para sua vida financeira
            </h2>
            <p className={styles.subtitle}>
                Descubra as melhores opções de crédito e conquiste seus objetivos com praticidade.
            </p>
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
