"use client";


import Link from 'next/link';

import { FaLinkedinIn, FaYoutube, FaFacebookF, FaInstagram } from "react-icons/fa";

import styles from "./footer.module.scss";

export default function Footer() {
  const handleSmoothScroll = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>

        <div className={styles.column}>
          <h4>Ouvidoria</h4>
          <ul>
            <li>Atendimento em dias úteis das 8h às 18h (horário de Brasília)</li>
            <li><strong>0800 000 0120</strong></li>
            <li>ouvidoria@hotinvest.com.br</li>
          </ul>
          <h5>Redes Sociais</h5>
          <div className={styles.social}>
            <FaLinkedinIn className={styles.icon} />
            <FaYoutube className={styles.icon} />
            <FaFacebookF className={styles.icon} />
            <FaInstagram className={styles.icon} />
          </div>
        </div>

        <div className={styles.column}>
          <h4>Privacidade e proteção de dados</h4>
          <ul>
            <li>dpo@hotinvest.com.br</li>
            <li>Procedimentos de Ouvidoria</li>
          </ul>
          <h5>Explorar</h5>
          <ul>
            <li>
              <a href="#atendimento" onClick={handleSmoothScroll("atendimento")}>Central de Ajuda</a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>Fale com a gente</h4>
          <ul>
            <li>
              Capitais e regiões metropolitanas<br />
              <strong>(19) 3483-4454</strong>
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
      </div>

      <div className={styles.bottom}>
        <div className={styles.logo}>
          <span style={{ color: "#EF5635" }}>Hot</span><span style={{ color: "#fff", fontStyle: "italic" }}>Invest</span>
        </div>
        <div className={styles.copyright}>
          © 2025 HotInvest S.A - Instituição de Pagamento. 54.139.158/0001-76. Centro, São Pedro, SP - 13520-000
        </div>
        <div className={styles.accessibility}>
          <span role="img" aria-label="acessibilidade">🦽</span>
        </div>
      </div>
    </footer>
  );
}
