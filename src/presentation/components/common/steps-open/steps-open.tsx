"use client";

import React, { useRef, useEffect, useState } from "react";

import styles from "./steps-open.module.scss";

const STEPS = [
    'Baixe o app do HotInvest na loja do seu celular e abra-o.',
    'Toque em "Criar conta" e preencha seus dados pessoais de forma rápida e segura.',
    'Escolha seu tipo de conta e personalize seus produtos — como cartão, investimentos e mais.',
    'Confirme suas informações, aceite os termos e pronto! Sua conta estará ativa em poucos minutos.',
];

const StepsOpen = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function handleScroll() {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const totalHeight = rect.height;
            const isMobile = window.innerWidth <= 600;

            let percent = 0;

            if (isMobile) {
                const scrollTop = Math.max(0, -rect.top);
                const scrollable = totalHeight - windowHeight;
                if (scrollable > 0) {
                    percent = Math.min(1, scrollTop / scrollable);
                } else {
                    percent = 1;
                }
            } else {

                let activeStep = 0;
                let stepProgress = 0;
                for (let i = 0; i < stepRefs.current.length; i++) {
                    const step = stepRefs.current[i];
                    if (!step) continue;
                    const stepRect = step.getBoundingClientRect();
                    if (stepRect.top < windowHeight / 2) {
                        activeStep = i + 1;
                        const visible = Math.min(windowHeight, stepRect.bottom) - Math.max(0, stepRect.top);
                        stepProgress = Math.max(0, Math.min(1, visible / stepRect.height));
                    }
                }
                const totalSteps = stepRefs.current.length;
                if (activeStep === 0) {
                    percent = 0;
                } else {
                    percent = (activeStep - 1 + stepProgress) / (totalSteps - 1);
                    percent = Math.max(0, Math.min(1, percent));
                }
            }
            setProgress(percent);
        }
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <section className={styles.container}>
            <div id="abra-sua-conta" className={styles.section}>
                <h2 className={styles.title}>Abra sua conta no Hot<span style={{ color: "#16487E", fontStyle: "italic" }}>Invest</span> em poucos minutos</h2>
                <div className={styles.cardWrapper}>
                    <div className={styles.card} ref={containerRef}>
                        <div className={styles.lineContainer}>
                            <div className={styles.lineBg}></div>
                            <div
                                className={styles.lineProgress}
                                style={{ height: `${progress * 100}%` }}
                            ></div>
                        </div>
                        <div className={styles.steps}>
                            {STEPS.map((desc, idx) => (
                                <div
                                    className={styles.stepRow}
                                    key={idx}
                                    ref={el => { stepRefs.current[idx] = el; }}
                                >
                                    <div className={styles.stepNum}>{String(idx + 1).padStart(2, "0")}</div>
                                    <div className={styles.stepDesc}>{desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
        </section>
    );
}

export default StepsOpen;
