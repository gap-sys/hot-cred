import S from './numbers.module.scss'

const Numbers = () => (
    <section className={S.statsSection}>
        <div className={S.statsGrid}>
            <div className={S.statCard}>
                <div className={S.statNumber}>+750 mil</div>
                <div className={S.statText}>
                    pessoas atendidas pela HotCred em todo o Brasil, mostrando a confiança e o alcance da nossa atuação financeira.
                </div>
            </div>
            <div className={S.statCard}>
                <div className={S.statNumber}>R$ 320 mi</div>
                <div className={S.statText}>
                    liberados em crédito com condições acessíveis e taxas reduzidas, ajudando brasileiros a saírem do aperto.
                </div>
            </div>
            <div className={S.statCard}>
                <div className={S.statNumber}>98%</div>
                <div className={S.statText}>
                    de satisfação no atendimento, refletindo nosso compromisso com agilidade, clareza e suporte humanizado.
                </div>
            </div>
        </div>
    </section>
)

export default Numbers
