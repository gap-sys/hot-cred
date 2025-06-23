import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from '../privacy-policy/privacy-policy.module.scss'

const CorruptionPolicy = () => {
    return (
        <div>
            <Meta
                title="Política de Anticorrupção | HotInvest"
                description="Saiba como a HotInvest protege seus dados pessoais e como você pode controlar a forma como compartilhamos essas informações."
                keywords="Política de Anticorrupção, HotInvest, privacidade, dados pessoais, proteção de dados, conta digital, conta sem tarifas"
            />
            <Navbar />
            <div className={styles.privacyPolicyContainer}>
                <div className={styles.privacyPolicyContent}>
                    <h1 className={styles.privacyTitle}>POLÍTICA DE PREVENÇÃO E COMBATE À CORRUPÇÃO E SUBORNO</h1>
                    <p className={styles.privacyEmpresa}>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA<br />CNPJ: 54.139.158/0001-76</p>
                    <h2>1. OBJETIVO</h2>
                    <p>Este documento tem como objetivo estabelecer diretrizes e procedimentos internos para prevenir e combater a corrupção e o suborno na MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA, em conformidade com a Lei 12.846/2013 (Lei Anticorrupção), bem como atender às exigências regulatórias do Banco Central do Brasil.</p>
                    <h2>2. ABRANGÊNCIA</h2>
                    <p>Aplica-se a todos os colaboradores, sócios, diretores, parceiros, fornecedores e terceiros que mantenham relação comercial com a empresa, incluindo aqueles que participam diretamente de processos regulados pelo Banco Central.</p>
                    <h2>3. GOVERNANÇA E COMPLIANCE</h2>
                    <p>A MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA possui um Comitê de Compliance e Governança Anticorrupção, responsável por garantir o cumprimento desta política. Esse comitê atua em conjunto com os seguintes setores:</p>
                    <ul>
                        <li><b>Setor de Compliance:</b> Responsável pela criação e fiscalização de normativos internos.</li>
                        <li><b>Auditoria Interna:</b> Realiza auditorias periódicas para garantir conformidade com esta política e demais normativas.</li>
                        <li><b>Setor de Treinamento e Desenvolvimento:</b> Responsável pela capacitação dos colaboradores sobre práticas anticorrupção.</li>
                        <li><b>Departamento de Relacionamento Institucional:</b> Garante que as interações com agentes públicos e privados ocorram de forma ética e transparente.</li>
                    </ul>
                    <h2>4. PRINCÍPIOS GERAIS</h2>
                    <ul>
                        <li>Atuar com ética, integridade e transparência em todas as operações e relações comerciais;</li>
                        <li>Rejeitar qualquer forma de suborno, propina ou favorecimento indevido;</li>
                        <li>Cumprir a legislação anticorrupção vigente;</li>
                        <li>Assegurar que todos os colaboradores estejam cientes das políticas e procedimentos relacionados ao combate à corrupção.</li>
                    </ul>
                    <h2>5. CONDUTAS PROIBIDAS</h2>
                    <ul>
                        <li>Prometer, oferecer ou dar vantagem indevida a agente público ou privado para obtenção de benefício próprio ou para terceiros;</li>
                        <li>Manipular ou fraudar licitações públicas;</li>
                        <li>Utilizar-se de interposta pessoa para ocultar condutas ilícitas;</li>
                        <li>Dificultar a investigação de infrações relacionadas à corrupção.</li>
                    </ul>
                    <h2>6. PREVENÇÃO E CONTROLE</h2>
                    <ul>
                        <li>Implementar treinamentos obrigatórios e periódicos para todos os colaboradores sobre a Lei Anticorrupção e boas práticas de governança corporativa;</li>
                        <li>Monitorar e avaliar regularmente os processos internos para mitigar riscos;</li>
                        <li>Realizar due diligence em fornecedores, parceiros e clientes antes da contratação;</li>
                        <li>Estabelecer e divulgar canais de denúncia para reporte anônimo de condutas suspeitas.</li>
                    </ul>
                    <h2>7. CANAL DE DENÚNCIA</h2>
                    <p>A MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA disponibiliza um canal de denúncia para relatos de irregularidades, garantindo sigilo e proteção contra retaliação. As denúncias podem ser feitas pelo e-mail <b>sac@americafinanceira.com.br</b>, telefone <b>0800 000 0120</b> ou via plataforma digital própria.</p>
                    <h2>8. AUDITORIA E RELATÓRIOS AO BANCO CENTRAL</h2>
                    <ul>
                        <li>O setor de Auditoria Interna será responsável por realizar inspeções periódicas para avaliar a conformidade com a Lei Anticorrupção.</li>
                        <li>Relatórios semestrais serão enviados à diretoria e, quando necessário, ao Banco Central, assegurando transparência e compliance regulatório.</li>
                    </ul>
                    <h2>9. SANÇÕES</h2>
                    <p>A não observância desta política pode resultar em sanções disciplinares, incluindo advertência, suspensão ou desligamento, além das sanções legais cabíveis.</p>
                    <h2>10. REVISÃO E ATUALIZAÇÃO</h2>
                    <p>Este documento será revisado anualmente pelo Comitê de Compliance e Governança Anticorrupção para garantir sua eficácia e conformidade com a legislação vigente.</p>
                    <p><b>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA<br />Diretoria Executiva</b></p>
                    <p>São Pedro, SP, 10 de Outubro de 2024.<br />Versa 1.0</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CorruptionPolicy