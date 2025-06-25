import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from '../privacy-policy/privacy-policy.module.scss'

const CorruptionPolicy = () => {
    return (
        <div>
            <Meta
                title="Política de Anticorrupção | HotCred"
                description="Conheça as diretrizes da HotCred para prevenção e combate à corrupção e suborno."
                keywords="Política de Anticorrupção, HotCred, ética, compliance, governança, combate à corrupção, suborno"
            />
            <Navbar />
            <div className={styles.privacyPolicyContainer}>
                <div className={styles.privacyPolicyContent}>
                    <h1 className={styles.privacyTitle}>POLÍTICA DE PREVENÇÃO E COMBATE À CORRUPÇÃO E SUBORNO</h1>
                    <p className={styles.privacyEmpresa}>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA<br />CNPJ: 54.139.158/0001-76</p>
                    <h2>1. OBJETIVO</h2>
                    <p>Esta política estabelece princípios e procedimentos internos para prevenir e combater a corrupção e o suborno na MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA, em conformidade com a Lei 12.846/2013 (Lei Anticorrupção) e as exigências do Banco Central do Brasil.</p>
                    <h2>2. ABRANGÊNCIA</h2>
                    <p>Aplica-se a todos os colaboradores, sócios, diretores, parceiros, fornecedores e terceiros que mantenham relação comercial com a empresa, incluindo participantes de processos regulados pelo Banco Central.</p>
                    <h2>3. GOVERNANÇA E COMPLIANCE</h2>
                    <p>A MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA conta com um Comitê de Compliance e Governança Anticorrupção, responsável por garantir o cumprimento desta política. O comitê atua em conjunto com:</p>
                    <ul>
                        <li><b>Setor de Compliance:</b> Elaboração e fiscalização de normas internas.</li>
                        <li><b>Auditoria Interna:</b> Realização de auditorias periódicas para garantir conformidade.</li>
                        <li><b>Setor de Treinamento e Desenvolvimento:</b> Capacitação dos colaboradores em práticas anticorrupção.</li>
                        <li><b>Departamento de Relacionamento Institucional:</b> Garantia de interações éticas e transparentes com agentes públicos e privados.</li>
                    </ul>
                    <h2>4. PRINCÍPIOS GERAIS</h2>
                    <ul>
                        <li>Atuar com ética, integridade e transparência em todas as operações e relações comerciais;</li>
                        <li>Rejeitar qualquer forma de suborno, propina ou favorecimento indevido;</li>
                        <li>Cumprir a legislação anticorrupção vigente;</li>
                        <li>Assegurar que todos estejam cientes das políticas e procedimentos de combate à corrupção.</li>
                    </ul>
                    <h2>5. CONDUTAS PROIBIDAS</h2>
                    <ul>
                        <li>Prometer, oferecer ou conceder vantagem indevida a agente público ou privado para benefício próprio ou de terceiros;</li>
                        <li>Fraudar ou manipular licitações públicas;</li>
                        <li>Utilizar interposta pessoa para ocultar condutas ilícitas;</li>
                        <li>Dificultar investigações de infrações relacionadas à corrupção.</li>
                    </ul>
                    <h2>6. PREVENÇÃO E CONTROLE</h2>
                    <ul>
                        <li>Realizar treinamentos obrigatórios e periódicos sobre a Lei Anticorrupção e boas práticas de governança;</li>
                        <li>Monitorar e revisar processos internos para mitigar riscos;</li>
                        <li>Executar due diligence em fornecedores, parceiros e clientes antes de contratos;</li>
                        <li>Disponibilizar canais de denúncia para reporte anônimo de condutas suspeitas.</li>
                    </ul>
                    <h2>7. CANAL DE DENÚNCIA</h2>
                    <p>A MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA oferece canal de denúncia para relatos de irregularidades, garantindo sigilo e proteção contra retaliação. As denúncias podem ser feitas pelo e-mail <b>sac@americafinanceira.com.br</b>, telefone <b>0800 000 0120</b> ou plataforma digital própria.</p>
                    <h2>8. AUDITORIA E RELATÓRIOS AO BANCO CENTRAL</h2>
                    <ul>
                        <li>O setor de Auditoria Interna realiza inspeções periódicas para avaliar conformidade com a Lei Anticorrupção.</li>
                        <li>Relatórios semestrais são enviados à diretoria e, quando necessário, ao Banco Central, assegurando transparência e compliance.</li>
                    </ul>
                    <h2>9. SANÇÕES</h2>
                    <p>O descumprimento desta política pode resultar em sanções disciplinares, como advertência, suspensão ou desligamento, além das sanções legais cabíveis.</p>
                    <h2>10. REVISÃO E ATUALIZAÇÃO</h2>
                    <p>Este documento será revisado anualmente pelo Comitê de Compliance e Governança Anticorrupção para garantir sua eficácia e aderência à legislação vigente.</p>
                    <p><b>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA<br />Diretoria Executiva</b></p>
                    <p>São Pedro, SP, 10 de Outubro de 2024.<br />Versão 1.0</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CorruptionPolicy