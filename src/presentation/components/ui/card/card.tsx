import Link from "next/link";

import { IMAGE } from "src/presentation/assets";

import styles from "./card.module.scss";

const Card = () => {
    return (
        <section id="cartao-de-credito" className={styles.cardSection}>
            <div className={styles.leftCol}>
                <h1 className={styles.title}>
                    O melhor cartão para
                    seu perfil
                </h1>
                <p className={styles.subtitle}>
                    Zero tarifas, zero complicações e<br /> benefícios que realmente importam.
                </p>
                <Link href="/abrir-conta">
                    <button
                        className={styles.button}
                        aria-label="Conheça o Cartão HotInvest"
                    >
                        Pedir agora
                    </button>
                </Link>
            </div>

            <div className={styles.rightCol}>
                <div className={styles.cardsWrapper}>
                    <img
                        src={IMAGE.CARTAO.src}
                        alt="Cartão HotInvest Lucas Eduardo e Mariana Costa"
                        className={styles.cardImg1}
                        draggable={false}
                    />
                </div>
            </div>
        </section>
    );
}

export default Card;