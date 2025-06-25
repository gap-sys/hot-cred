import styles from './contact.module.scss';
import { MdLocationOn, MdEmail } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';

const CONTACTS = [
    {
        icon: <MdLocationOn size={34} color="#fff" />,
        title: 'NOSSO ENDEREÇO',
        desc: (
            <>
                Av Pres. Getulio Vargas, 832 - Santa Cruz<br />
                São Pedro - SP, 13522-000
            </>
        ),
        button: 'Ver localização',
        action: 'https://www.google.com/maps/place/Av.+Pres.+Get%C3%BAlio+Vargas,+832+-+Santa+Cruz,+S%C3%A3o+Pedro+-+SP,+13522-000/@-23.712219,-47.650315,17z/data=!3m1!4b1!4m5!3m4!1s0x94c584122701065f:0x1821f168adf77e0!8m2!3d-23.712224!4d-47.6481262',
        type: 'primary',
    },
    {
        icon: <MdEmail size={34} color="#fff" />,
        title: 'ENVIE UM E-MAIL',
        desc: 'Nosso time especializado irá te enviar as melhores oportunidades.',
        button: 'Mandar E-mail',
        action: 'mailto:sac@hotcred.com.br',
        type: 'primary',
    },
    {
        icon: <FaWhatsapp size={34} color="#fff" />,
        title: 'CONVERSE NO WHATSAPP',
        desc: 'Prefere agilidade? Fale com nossos atendentes direto pelo WhatsApp.',
        button: 'Falar no WhatsApp',
        action: 'https://api.whatsapp.com/send?phone=5519993120568&text=Ol%C3%A1!%20Vim%20do%20site%20e%20gostaria%20de%20falar%20com%20a%20equipe%20da%20HotCred.',
        type: 'primary',
    }
];

export default function Contact() {
    return (
        <section id='contato' className={styles.contactSection}>
            <div className={styles.contactBox}>
                <h2 className={styles.title}>Entre com contato conosco</h2>
                <p className={styles.subtitle}>
                    Escolha o canal de sua preferência e tire suas dúvidas com nossa equipe de especialistas.
                </p>
                <div className={styles.cardsGrid}>
                    {CONTACTS.map((item, idx) => (
                        <div className={styles.card} key={idx}>
                            <div className={styles.iconCircle}>{item.icon}</div>
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDesc}>{item.desc}</p>
                            {item.button && item.action && (
                                <a
                                    href={item.action}
                                    className={styles.cardBtn}
                                    target={item.action.startsWith('http') ? '_blank' : undefined}
                                    rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                                >
                                    {item.button}
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
