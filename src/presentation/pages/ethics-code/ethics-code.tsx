import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from '../privacy-policy/privacy-policy.module.scss'

const EthicsCode = () => {
    return (
        <div>
            <Meta
                title="Código de Ética | HotInvest"
                description="Saiba como a HotInvest protege seus dados pessoais e como você pode controlar a forma como compartilhamos essas informações."
                keywords="Código de Ética, HotInvest, privacidade, dados pessoais, proteção de dados, conta digital, conta sem tarifas"
            />
            <Navbar />
            <div className={styles.privacyPolicyContainer}>
                <div className={styles.privacyPolicyContent}>
                    <h1 className={styles.privacyTitle}>CÓDIGO DE ÉTICA E CONDUTA</h1>
                    <h2>1. INTRODUÇÃO</h2>
                    <p>O presente Código de Ética e Conduta da Mastermind Serviços Administrativos Ltda estabelece os princípios e diretrizes que norteiam a atuação da empresa e de seus colaboradores. Como um correspondente bancário estruturado, a empresa valoriza a transparência, integridade, ética e conformidade com as normas do setor financeiro, seguindo as diretrizes do Banco Central do Brasil (Bacen) e demais órgãos reguladores.</p>
                    <h2>2. PRINCÍPIOS FUNDAMENTAIS</h2>
                    <ul>
                        <li><b>Ética e Integridade:</b> Atuar com honestidade e respeito em todas as relações comerciais e profissionais.</li>
                        <li><b>Transparência:</b> Garantir informações claras e precisas para clientes, parceiros e instituições financeiras.</li>
                        <li><b>Confidencialidade:</b> Proteger as informações de clientes e parceiros, garantindo sigilo e segurança de dados, em conformidade com a Lei Geral de Proteção de Dados (LGPD).</li>
                        <li><b>Conformidade Legal:</b> Cumprir rigorosamente as normas regulatórias, especialmente as diretrizes da Resolução CMN nº 4.935/2021, Circular Bacen nº 3.978/2020, Resolução CMN nº 4.658/2018 e Lei nº 12.846/2013 (Lei Anticorrupção).</li>
                        <li><b>Excelência no Atendimento:</b> Oferecer serviços com qualidade, eficiência e profissionalismo.</li>
                        <li><b>Segurança e Responsabilidade Corporativa:</b> Atuar com governança responsável e segurança cibernética, garantindo a proteção dos dados.</li>
                    </ul>
                    <h2>3. CONDUTA NO AMBIENTE DE TRABALHO</h2>
                    <ul>
                        <li>Respeitar colegas, superiores, subordinados e parceiros de negócios.</li>
                        <li>Proibir qualquer forma de discriminação, assédio ou conduta inadequada.</li>
                        <li>Utilizar os recursos da empresa de maneira responsável e sustentável.</li>
                        <li>Evitar conflitos de interesse, comunicando qualquer situação que possa comprometer a imparcialidade.</li>
                        <li>Participar de treinamentos obrigatórios sobre compliance, PLD/FT e boas práticas operacionais.</li>
                    </ul>
                    <h2>4. RELACIONAMENTO COM CLIENTES E PARCEIROS</h2>
                    <ul>
                        <li>Agir com transparência e clareza na oferta de produtos e serviços.</li>
                        <li>Garantir que todas as operações sigam as diretrizes de segurança e conformidade.</li>
                        <li>Evitar práticas abusivas ou enganosas, prezando pela ética nos negócios.</li>
                        <li>Manter a confidencialidade das informações dos clientes.</li>
                        <li>Seguir rigorosamente as regras de relacionamento com instituições financeiras conforme contratos firmados.</li>
                    </ul>
                    <h2>5. PREVENÇÃO À LAVAGEM DE DINHEIRO E FINANCIAMENTO AO TERRORISMO (PLD/FT)</h2>
                    <ul>
                        <li>Seguir rigorosamente as diretrizes do Banco Central e do Conselho de Controle de Atividades Financeiras (COAF).</li>
                        <li>Monitorar e reportar transações suspeitas às autoridades competentes.</li>
                        <li>Capacitar os colaboradores para reconhecer e evitar riscos relacionados à lavagem de dinheiro.</li>
                        <li>Cumprir todas as exigências da Circular Bacen nº 3.978/2020.</li>
                    </ul>
                    <h2>6. COMPLIANCE E RESPONSABILIDADE CORPORATIVA</h2>
                    <ul>
                        <li>Garantir que todas as operações estejam em conformidade com as normas regulatórias.</li>
                        <li>Manter um ambiente de trabalho ético e responsável.</li>
                        <li>Todos os colaboradores devem participar de treinamentos periódicos sobre compliance e segurança cibernética.</li>
                        <li>Incentivar a denúncia de irregularidades por meio de um canal seguro e confidencial.</li>
                    </ul>
                    <h2>7. CANAL DE DENÚNCIAS</h2>
                    <p>Para garantir a transparência e a ética nos negócios, a Mastermind Serviços Administrativos Ltda disponibiliza um Canal de Denúncias seguro e confidencial para colaboradores, clientes e parceiros reportarem irregularidades. O canal pode ser acessado pelo telefone <b>0800-000 0120</b>.<br /><br />Todas as denúncias serão tratadas com sigilo absoluto e encaminhadas para análise conforme a legislação vigente.</p>
                    <h2>8. DESCUMPRIMENTO E SANÇÕES</h2>
                    <p>O não cumprimento deste Código poderá resultar em medidas disciplinares, incluindo advertências, suspensão ou rescisão do contrato de trabalho. Casos graves poderão ser encaminhados às autoridades competentes.</p>
                    <h2>9. DISPOSIÇÕES FINAIS</h2>
                    <p>Este Código de Ética e Conduta deve ser revisado periodicamente para garantir sua efetividade e alinhamento com as normativas vigentes. Todos os colaboradores e parceiros devem assinar um termo de compromisso, confirmando a ciência e aceitação das diretrizes aqui estabelecidas.</p>
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