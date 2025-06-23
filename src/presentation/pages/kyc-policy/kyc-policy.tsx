import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from '../privacy-policy/privacy-policy.module.scss'

const KycPolicy = () => {
    return (
        <div>
            <Meta
                title="Política de KYC | HotInvest"
                description="Saiba como a HotInvest protege seus dados pessoais e como você pode controlar a forma como compartilhamos essas informações."
                keywords="Política de KYC, HotInvest, privacidade, dados pessoais, proteção de dados, conta digital, conta sem tarifas"
            />
            <Navbar />
            <div className={styles.privacyPolicyContainer}>
                <div className={styles.privacyPolicyContent}>
                    <h1 className={styles.privacyTitle}>POLÍTICA E PROCEDIMENTOS DE KYC</h1>
                    <p className={styles.privacyEmpresa}>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA</p>
                    <h2>1. INTRODUÇÃO</h2>
                    <p>A Mastermind Serviços Administrativos Ltda estabelece esta Política de Conheça Seu Cliente (KYC - Know Your Customer) para garantir a identificação e verificação dos clientes, prevenindo fraudes, lavagem de dinheiro e financiamento ao terrorismo. Esta política segue as normativas vigentes e boas práticas do setor financeiro, incluindo a Circular nº 3.978/2020 do Banco Central do Brasil.</p>
                    <h2>2. OBJETIVO</h2>
                    <p>Assegurar a conformidade da empresa com as regulamentações de prevenção à lavagem de dinheiro (PLD) e financiamento do terrorismo (FT), protegendo a empresa contra riscos reputacionais, financeiros e legais, conforme exigido pelo Banco Central do Brasil.</p>
                    <h2>3. ABRANGÊNCIA</h2>
                    <p>Esta política aplica-se a todos os clientes, parceiros, colaboradores e prestadores de serviço envolvidos nas operações da Mastermind Serviços Administrativos Ltda.</p>
                    <h2>4. PROCESSO DE KYC</h2>
                    <h3>4.1. Identificação do Cliente</h3>
                    <ul>
                        <li>Coleta de informações pessoais (Nome, CPF/CNPJ, endereço, data de nascimento);</li>
                        <li>Documentação oficial com foto (RG, CNH ou passaporte);</li>
                        <li>Comprovante de endereço atualizado;</li>
                        <li>Comprovante de renda e/ou origem dos fundos, se aplicável;</li>
                        <li>Identificação e qualificação do beneficiário final em clientes pessoa jurídica.</li>
                    </ul>
                    <h3>4.2. Verificação e Validação</h3>
                    <ul>
                        <li>Consulta em bases de dados públicas e privadas para validação das informações;</li>
                        <li>Análise de risco do cliente baseada no perfil financeiro e histórico;</li>
                        <li>Due Diligence aprimorada para clientes de alto risco e Pessoas Expostas Politicamente (PEPs);</li>
                        <li>Avaliação periódica das informações cadastrais e risco do cliente.</li>
                    </ul>
                    <h3>4.3. Monitoramento Contínuo</h3>
                    <ul>
                        <li>Revisão periódica das informações cadastrais;</li>
                        <li>Monitoramento de transações suspeitas, conforme diretrizes do Banco Central;</li>
                        <li>Relatórios de conformidade e comunicação de operações suspeitas ao COAF.</li>
                    </ul>
                    <h2>5. POLÍTICA DE ACEITAÇÃO DE CLIENTES</h2>
                    <ul>
                        <li>Rejeição de clientes que não fornecem documentação adequada;</li>
                        <li>Recusa de relação comercial com indivíduos ou empresas em listas restritivas;</li>
                        <li>Avaliação rigorosa para clientes politicamente expostos (PEPs);</li>
                        <li>Implementação do programa Conheça Seus Funcionários e Prestadores de Serviço (KYE/KYP) para qualificação interna.</li>
                    </ul>
                    <h2>6. RESPONSABILIDADES</h2>
                    <ul>
                        <li>Diretoria: Supervisionar e garantir a conformidade com a política de KYC;</li>
                        <li>Equipe de Compliance: Implementar e monitorar o cumprimento das diretrizes;</li>
                        <li>Colaboradores: Seguir os procedimentos estabelecidos e reportar atividades suspeitas;</li>
                        <li>Treinamento contínuo para todos os envolvidos.</li>
                    </ul>
                    <h2>7. TREINAMENTO E CONSCIENTIZAÇÃO</h2>
                    <ul>
                        <li>Capacitação obrigatória para todos os funcionários, parceiros e prestadores de serviço;</li>
                        <li>Simulações e estudos de caso para reforço da aplicação da política;</li>
                        <li>Atualização periódica do treinamento conforme regulamentação do Banco Central.</li>
                    </ul>
                    <h2>8. SANÇÕES E PENALIDADES</h2>
                    <ul>
                        <li>A não conformidade com a política de KYC resultará em medidas disciplinares;</li>
                        <li>Possibilidade de sanções administrativas e legais para casos de negligência ou omissão;</li>
                        <li>Relatórios regulares ao Banco Central e órgãos reguladores em casos de descumprimento.</li>
                    </ul>
                    <h2>9. REVISÃO E ATUALIZAÇÃO</h2>
                    <p>Esta política será revisada a cada dois anos ou sempre que houver mudanças regulatórias significativas, garantindo sua adequação às regulamentações vigentes e melhores práticas de mercado.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default KycPolicy