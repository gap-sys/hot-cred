"use client";

import Link from 'next/link';
import Image from 'next/image';

import { IMAGE } from 'src/presentation/assets';
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

import styles from "./footer.module.scss";

export default function Footer() {
  const handleSmoothScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: 'Simular agora', anchor: 'simular' },
    { label: 'Empréstimos', anchor: 'emprestimos' },
    { label: 'Perguntas frequentes', anchor: 'perguntas-frequentes' },
    { label: 'Contato', anchor: 'contato' },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <Image className={styles.logo} src={IMAGE.LOGO_HOT_CRED} alt="Logo HotCred" width={160} height={60} style={{ marginBottom: 16 }} />
          <h4>Redes Sociais</h4>
          <div className={styles.social}>
            <a href="https://api.whatsapp.com/send?phone=5519993120568&text=Ol%C3%A1!%20Vim%20do%20site%20da%20HotCred!" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className={styles.icon} />
            </a>
            <a href="https://www.instagram.com/hotcredoficial/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className={styles.icon} />
            </a>
          </div>
        </div>
        <div className={styles.column}>
          <h4>Fale com a gente</h4>
          <ul>
            <li>
              Capitais e regiões metropolitanas<br />
              <strong>+55 19 99312-0568</strong>
            </li>
            <li>
              Demais localidades<br />
              <strong>0800 000 0120</strong>
            </li>
          </ul>
          <h5>Ajuda</h5>
          <ul>
            <li>
              <a href="#perguntas-frequentes" onClick={handleSmoothScroll("perguntas-frequentes")}>Perguntas frequentes</a>
            </li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Transparência</h4>
          <ul>
            <li><Link href="/politica-de-privacidade">Política de privacidade</Link></li>
            <li><Link href="/politica-anticorrupcao">Política anticorrupção</Link></li>
            <li><Link href="/politica-kyc">Política KYC</Link></li>
            <li><Link href="/programa-responsabilidade-social">Programa responsabilidade social</Link></li>
            <li><Link href="/codigo-de-etica">Código de Ética</Link></li>
          </ul>
        </div>
        <div className={styles.column}>
          <h4>Navegue</h4>
          <ul className={styles.navFooter}>
            {navLinks.map(link => (
              <li key={link.anchor}>
                <a href={`#${link.anchor}`} onClick={handleSmoothScroll(link.anchor)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.copyright}>
          A HotCred é uma consultoria financeira independente, comprometida em oferecer soluções seguras, transparentes e personalizadas para quem busca organizar, planejar ou expandir sua vida financeira. Atuamos de forma 100% online, proporcionando agilidade no atendimento, clareza nas informações e suporte especializado em todas as etapas do processo.
          Não somos instituição financeira, nem operamos como correspondente bancário. Nosso papel é orientar e conectar nossos clientes às melhores oportunidades disponíveis no mercado, sempre de forma ética, imparcial e responsável.
          Importante: não realizamos cobranças antecipadas e não contamos com representantes externos. Todos os atendimentos e negociações devem ser feitos exclusivamente pelos nossos canais oficiais.
          As condições e soluções apresentadas podem variar conforme análise individual, perfil de crédito e disponibilidade das instituições parceiras. Consulte sempre todas as informações com atenção antes de qualquer contratação.
        </div>
      </div>
    </footer>
  );
}
