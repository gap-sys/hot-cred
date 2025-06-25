import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from '../privacy-policy/privacy-policy.module.scss'

const EthicsCode = () => {
    return (
        <div>
            <Meta
                title="Código de Ética | HotCred"
                description="Conheça o compromisso da HotCred com ética, integridade e proteção de dados."
                keywords="Código de Ética, HotCred, ética, conduta, proteção de dados, governança, compliance"
            />
            <Navbar />
            <div className={styles.privacyPolicyContainer}>
                <div className={styles.privacyPolicyContent}>
                    <h1 className={styles.privacyTitle}>CÓDIGO DE ÉTICA E CONDUTA</h1>
                    <h2>1. INTRODUÇÃO</h2>
                    <p>Este Código de Ética e Conduta da Mastermind Serviços Administrativos Ltda define os valores e princípios que orientam a atuação da empresa e de seus colaboradores. Como correspondente bancário estruturado, prezamos pela integridade, transparência, ética e conformidade com as normas do setor financeiro, seguindo as diretrizes do Banco Central do Brasil (Bacen) e demais órgãos reguladores.</p>
                    <h2>2. PRINCÍPIOS ESSENCIAIS</h2>
                    <ul>
                        <li><b>Ética e Integridade:</b> Agir com honestidade e respeito em todas as relações profissionais e comerciais.</li>
                        <li><b>Transparência:</b> Fornecer informações claras e precisas para clientes, parceiros e instituições financeiras.</li>
                        <li><b>Confidencialidade:</b> Proteger informações de clientes e parceiros, garantindo sigilo e segurança de dados, conforme a LGPD.</li>
                        <li><b>Conformidade Legal:</b> Cumprir rigorosamente as normas regulatórias, especialmente as diretrizes da Resolução CMN nº 4.935/2021, Circular Bacen nº 3.978/2020, Resolução CMN nº 4.658/2018 e Lei nº 12.846/2013 (Lei Anticorrupção).</li>
                        <li><b>Excelência no Atendimento:</b> Oferecer serviços com qualidade, eficiência e profissionalismo.</li>
                        <li><b>Segurança e Responsabilidade Corporativa:</b> Atuar com governança responsável e segurança cibernética, protegendo os dados de todos os envolvidos.</li>
                    </ul>
                    <h2>3. CONDUTA NO AMBIENTE DE TRABALHO</h2>
                    <ul>
                        <li>Respeitar colegas, superiores, subordinados e parceiros de negócios.</li>
                        <li>Não tolerar qualquer forma de discriminação, assédio ou conduta inadequada.</li>
                        <li>Utilizar recursos da empresa de forma responsável e sustentável.</li>
                        <li>Evitar conflitos de interesse, comunicando situações que possam comprometer a imparcialidade.</li>
                        <li>Participar de treinamentos obrigatórios sobre compliance, PLD/FT e boas práticas operacionais.</li>
                    </ul>
                    <h2>4. RELACIONAMENTO COM CLIENTES E PARCEIROS</h2>
                    <ul>
                        <li>Atuar com transparência e clareza na oferta de produtos e serviços.</li>
                        <li>Garantir que todas as operações estejam em conformidade com as normas de segurança e compliance.</li>
                        <li>Evitar práticas abusivas ou enganosas, sempre prezando pela ética nos negócios.</li>
                        <li>Manter a confidencialidade das informações dos clientes.</li>
                        <li>Seguir rigorosamente as regras de relacionamento com instituições financeiras conforme contratos firmados.</li>
                    </ul>
                    <h2>5. PREVENÇÃO À LAVAGEM DE DINHEIRO E FINANCIAMENTO AO TERRORISMO (PLD/FT)</h2>
                    <ul>
                        <li>Observar as diretrizes do Banco Central e do COAF.</li>
                        <li>Monitorar e reportar transações suspeitas às autoridades competentes.</li>
                        <li>Capacitar colaboradores para identificar e evitar riscos relacionados à lavagem de dinheiro.</li>
                        <li>Cumprir todas as exigências da Circular Bacen nº 3.978/2020.</li>
                    </ul>
                    <h2>6. COMPLIANCE E RESPONSABILIDADE CORPORATIVA</h2>
                    <ul>
                        <li>Assegurar que todas as operações estejam em conformidade com as normas regulatórias.</li>
                        <li>Manter um ambiente de trabalho ético e responsável.</li>
                        <li>Todos os colaboradores devem participar de treinamentos periódicos sobre compliance e segurança cibernética.</li>
                        <li>Incentivar denúncias de irregularidades por meio de canal seguro e confidencial.</li>
                    </ul>
                    <h2>7. CANAL DE DENÚNCIAS</h2>
                    <p>Para garantir ética e transparência, a Mastermind Serviços Administrativos Ltda oferece um Canal de Denúncias seguro e confidencial para colaboradores, clientes e parceiros reportarem irregularidades. O canal pode ser acessado pelo telefone <b>0800-000 0120</b>.<br /><br />Todas as denúncias serão tratadas com sigilo absoluto e encaminhadas para análise conforme a legislação vigente.</p>
                    <h2>8. DESCUMPRIMENTO E SANÇÕES</h2>
                    <p>O descumprimento deste Código pode resultar em medidas disciplinares, como advertências, suspensão ou rescisão do contrato de trabalho. Casos graves poderão ser encaminhados às autoridades competentes.</p>
                    <h2>9. DISPOSIÇÕES FINAIS</h2>
                    <p>Este Código de Ética e Conduta será revisado periodicamente para garantir sua efetividade e alinhamento com as normas vigentes. Todos os colaboradores e parceiros devem assinar termo de compromisso, confirmando ciência e aceitação das diretrizes aqui estabelecidas.</p>
                    <p>São Pedro, SP, 18 de Fevereiro de 2025.<br />
                        <b>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA</b><br />
                        CNPJ: 54.139.158/0001-76<br />
                        Versão: 1.0</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default EthicsCode