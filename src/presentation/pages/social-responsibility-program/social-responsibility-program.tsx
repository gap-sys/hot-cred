import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from './social-responsibility-program.module.scss'

const SocialResponsibilityProgram = () => {
    return (
        <div>
            <Meta
                title="Programa de Responsabilidade Social | HotCred"
                description="Descubra como a HotCred atua em responsabilidade social, ambiental e climática."
                keywords="Programa de Responsabilidade Social, Ambiental, Climática, HotCred, sustentabilidade, governança, PRSAC"
            />
            <Navbar />
            <div className={styles.socialResponsibilityContainer}>
                <div className={styles.socialResponsibilityContent}>
                    <h1 className={styles.socialTitle}>PROGRAMA DE RESPONSABILIDADE SOCIAL, AMBIENTAL E CLIMÁTICA (PRSAC)</h1>
                    <p className={styles.socialEmpresa}>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA</p>

                    <h2>1. VISÃO GERAL</h2>
                    <p>A Mastermind Serviços Administrativos Ltda. apresenta este Programa de Responsabilidade Social, Ambiental e Climática (PRSAC) em conformidade com a Resolução BCB nº 331/2023 do Banco Central do Brasil. O objetivo é fomentar práticas sustentáveis, promover a inclusão social e gerenciar riscos socioambientais e climáticos, assegurando governança ética e transparente.</p>

                    <h2>2. PROPÓSITO</h2>
                    <p>O PRSAC visa integrar ações de desenvolvimento social, ética corporativa, sustentabilidade e governança ambiental, alinhando-se às normas do Banco Central do Brasil e buscando impacto positivo para colaboradores, clientes, investidores e comunidades.</p>

                    <h2>3. PRINCÍPIOS BÁSICOS</h2>
                    <ul>
                        <li><b>Ética e Clareza:</b> Agir com honestidade e responsabilidade em todas as relações;</li>
                        <li><b>Sustentabilidade:</b> Adotar práticas que minimizem impactos ambientais e promovam o uso consciente dos recursos naturais;</li>
                        <li><b>Inclusão e Diversidade:</b> Fomentar um ambiente de trabalho justo, igualitário e acolhedor;</li>
                        <li><b>Gestão de Riscos:</b> Identificar e mitigar riscos sociais, ambientais e climáticos nas operações;</li>
                        <li><b>Participação das Partes Interessadas:</b> Manter diálogo aberto com colaboradores, clientes, fornecedores e sociedade.</li>
                    </ul>

                    <h2>4. GOVERNANÇA E ESTRUTURA</h2>
                    <ul>
                        <li><b>Comitê de Responsabilidade Socioambiental:</b> Responsável por supervisionar a execução do PRSAC, acompanhar resultados e sugerir melhorias;</li>
                        <li><b>Diretor Responsável:</b> Indicação de um diretor para coordenar e garantir o cumprimento das normas;</li>
                        <li><b>Revisão e Atualização:</b> O PRSAC será revisado a cada três anos ou sempre que houver mudanças regulatórias relevantes.</li>
                    </ul>

                    <h2>5. EIXOS DE ATUAÇÃO</h2>
                    <ul>
                        <li>Educação e Desenvolvimento</li>
                        <li>Saúde e Qualidade de Vida</li>
                        <li>Meio Ambiente e Sustentabilidade</li>
                        <li>Gestão de Riscos Socioambientais e Climáticos</li>
                        <li>Voluntariado e Engajamento Comunitário</li>
                    </ul>

                    <h2>6. MONITORAMENTO E TRANSPARÊNCIA</h2>
                    <ul>
                        <li><b>Relatórios de Conformidade:</b> A empresa publicará anualmente relatório sobre riscos e oportunidades sociais, ambientais e climáticas, conforme exigido pelo Banco Central;</li>
                        <li><b>Engajamento das Partes Interessadas:</b> Criação de canais para ouvir e dialogar com colaboradores, fornecedores, clientes e sociedade;</li>
                        <li><b>Divulgação Pública:</b> O PRSAC será acessível ao público e revisado periodicamente para garantir aderência às melhores práticas.</li>
                    </ul>

                    <h2>7. CAPACITAÇÃO E CONSCIENTIZAÇÃO</h2>
                    <ul>
                        <li>Treinamento contínuo dos colaboradores sobre os princípios e diretrizes do PRSAC;</li>
                        <li>Capacitação em gestão de riscos sociais, ambientais e climáticos;</li>
                        <li>Promoção de práticas sustentáveis e responsáveis no ambiente corporativo.</li>
                    </ul>

                    <h2>8. SANÇÕES E PENALIDADES</h2>
                    <ul>
                        <li>O descumprimento do PRSAC poderá resultar em medidas disciplinares internas;</li>
                        <li>Sanções administrativas e legais poderão ser aplicadas em casos de negligência;</li>
                        <li>Relatórios de não conformidade serão encaminhados aos órgãos reguladores, quando necessário.</li>
                    </ul>

                    <h2>9. REVISÃO E ATUALIZAÇÃO</h2>
                    <p>Esta política será revisada a cada três anos ou sempre que houver mudanças regulatórias relevantes, assegurando alinhamento com as normas do Banco Central do Brasil e as melhores práticas internacionais.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SocialResponsibilityProgram