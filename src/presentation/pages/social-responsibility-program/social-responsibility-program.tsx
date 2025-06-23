import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from './social-responsibility-program.module.scss'

const SocialResponsibilityProgram = () => {
    return (
        <div>
            <Meta
                title="Programa de Responsabilidade Social | HotInvest"
                description="Saiba como a HotInvest atua em responsabilidade social, ambiental e climática."
                keywords="Programa de Responsabilidade Social, Ambiental, Climática, HotInvest, sustentabilidade, governança, PRSAC"
            />
            <Navbar />
            <div className={styles.socialResponsibilityContainer}>
                <div className={styles.socialResponsibilityContent}>
                    <h1 className={styles.socialTitle}>PROGRAMA DE RESPONSABILIDADE SOCIAL, AMBIENTAL E CLIMÁTICA (PRSAC)</h1>
                    <p className={styles.socialEmpresa}>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA</p>

                    <h2>1. INTRODUÇÃO</h2>
                    <p>A Mastermind Serviços Administrativos Ltda. estabelece este Programa de Responsabilidade Social, Ambiental e Climática (PRSAC) em conformidade com a Resolução BCB nº 331/2023 do Banco Central do Brasil. Este programa tem como objetivo promover o desenvolvimento sustentável, a inclusão social e a gestão de riscos sociais, ambientais e climáticos, garantindo transparência e governança responsável.</p>

                    <h2>2. OBJETIVO</h2>
                    <p>O PRSAC busca integrar ações voltadas para o desenvolvimento social, a ética empresarial, a sustentabilidade e a governança climática, promovendo práticas alinhadas às diretrizes regulatórias do Banco Central do Brasil, visando o impacto positivo nos colaboradores, clientes, investidores e comunidades envolvidas.</p>

                    <h2>3. PRINCÍPIOS NORTEADORES</h2>
                    <ul>
                        <li><b>Ética e Transparência:</b> Atuar com integridade e responsabilidade em todas as relações;</li>
                        <li><b>Sustentabilidade:</b> Implementar práticas que reduzam impactos ambientais e promovam o uso responsável dos recursos naturais;</li>
                        <li><b>Inclusão e Diversidade:</b> Criar um ambiente de trabalho justo, igualitário e inclusivo;</li>
                        <li><b>Gestão de Riscos:</b> Monitorar e mitigar riscos sociais, ambientais e climáticos nas operações da empresa;</li>
                        <li><b>Engajamento das Partes Interessadas:</b> Manter diálogo contínuo com colaboradores, clientes, fornecedores e a sociedade.</li>
                    </ul>

                    <h2>4. GOVERNANÇA E ESTRUTURA ORGANIZACIONAL</h2>
                    <ul>
                        <li><b>Comitê de Responsabilidade Social, Ambiental e Climática:</b> Criado para supervisionar a implementação do PRSAC, monitorar ações e propor melhorias;</li>
                        <li><b>Diretor Responsável:</b> Nomeação de um diretor para coordenar e garantir a conformidade com as diretrizes regulatórias;</li>
                        <li><b>Revisão e Aprovação:</b> O PRSAC será revisado a cada três anos ou sempre que houver mudanças regulatórias significativas.</li>
                    </ul>

                    <h2>5. EIXOS DE ATUAÇÃO</h2>
                    <ul>
                        <li>Educação e Capacitação</li>
                        <li>Saúde e Bem-Estar</li>
                        <li>Sustentabilidade e Meio Ambiente</li>
                        <li>Gestão de Riscos Sociais, Ambientais e Climáticos</li>
                        <li>Ação Comunitária e Voluntariado</li>
                    </ul>

                    <h2>6. MONITORAMENTO E TRANSPARÊNCIA</h2>
                    <ul>
                        <li><b>Relatórios de Conformidade:</b> A empresa divulgará anualmente um relatório sobre riscos e oportunidades sociais, ambientais e climáticas, conforme exigido pelo Banco Central;</li>
                        <li><b>Engajamento das Partes Interessadas:</b> Implementação de canais para ouvir e dialogar com colaboradores, fornecedores, clientes e sociedade;</li>
                        <li><b>Divulgação Pública:</b> O PRSAC será de acesso público e revisado periodicamente para garantir sua adequação às melhores práticas de mercado.</li>
                    </ul>

                    <h2>7. TREINAMENTO E CONSCIENTIZAÇÃO</h2>
                    <ul>
                        <li>Capacitação contínua dos colaboradores sobre os princípios e diretrizes do PRSAC;</li>
                        <li>Treinamento sobre gestão de riscos sociais, ambientais e climáticos;</li>
                        <li>Incentivo à adoção de práticas sustentáveis e responsáveis dentro da empresa.</li>
                    </ul>

                    <h2>8. SANÇÕES E PENALIDADES</h2>
                    <ul>
                        <li>O descumprimento do PRSAC poderá resultar em medidas disciplinares internas;</li>
                        <li>Sanções administrativas e legais poderão ser aplicadas em casos de negligência;</li>
                        <li>Relatórios de não conformidade serão encaminhados aos órgãos reguladores, quando necessário.</li>
                    </ul>

                    <h2>9. REVISÃO E ATUALIZAÇÃO</h2>
                    <p>Esta política será revisada a cada três anos ou sempre que houver mudanças regulatórias significativas, garantindo sua adequação às regulamentações do Banco Central do Brasil e às melhores práticas internacionais.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SocialResponsibilityProgram