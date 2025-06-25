'use client'

import { useRef, useEffect, useState } from 'react'
import { IconCheck } from '@tabler/icons-react'

import S from './path.module.scss'

const steps = [
    {
        number: 1,
        text: 'Simule o valor e condições do seu crédito',
    },
    {
        number: 2,
        text: 'Envie seus dados de forma segura',
    },
    {
        number: 3,
        text: 'Receba a aprovação e o dinheiro na conta',
    },
]

const Path = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const stepRefs = useRef<(HTMLDivElement | null)[]>([])
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        function handleScroll() {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const sectionHeight = rect.height;

            const start = windowHeight - 100;
            const end = -sectionHeight + 100;

            let percent = 0;
            if (rect.top < start && rect.bottom > end) {
                const total = start - end;
                const current = start - rect.top;
                percent = Math.max(0, Math.min(1, current / total));
            }
            setProgress(percent);
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <section className={S.pathSection}>
            <h2 className={S.title}>
                Realize suas conquistas em <span className={S.bold}>3 passos</span>
            </h2>
            <div className={S.stepsWrapper} ref={containerRef}>
                <div className={S.line} />
                <div
                    className={S.lineProgress}
                    style={{ width: `${progress * 100}%` }}
                />
                <div className={S.steps}>
                    {steps.map((step, idx) => (
                        <div
                            className={S.step}
                            key={idx}
                            ref={el => { stepRefs.current[idx] = el; }}
                        >
                            <div className={S.circle}>{step.number}</div>
                            <div className={S.stepText}>{step.text}</div>
                        </div>
                    ))}
                    <div className={S.step} ref={el => { stepRefs.current[steps.length] = el; }}>
                        <div className={S.circle}>
                            <IconCheck size={22} color="#0a2a32" stroke={2.5} />
                        </div>
                        <div className={S.stepTextFinal}>
                            <p>Rápido, digital e sem burocracia: conquiste seu crédito com a HotCred!</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Path
