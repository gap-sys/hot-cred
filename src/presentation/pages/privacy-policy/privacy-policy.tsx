import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from './privacy-policy.module.scss'

const PrivacyPolicy = () => {
    return (
        <div>
            <Meta
                title="Política de Privacidade | HotInvest"
                description="Saiba como a HotInvest protege seus dados pessoais e como você pode controlar a forma como compartilhamos essas informações."
                keywords="Política de Privacidade, HotInvest, privacidade, dados pessoais, proteção de dados, conta digital, conta sem tarifas"
            />
            <Navbar />
            <div className={styles.privacyPolicyContainer}>
                <div className={styles.privacyPolicyContent}>
                    <h1 className={styles.privacyTitle}>POLÍTICA DE PRIVACIDADE</h1>
                    <p className={styles.privacyEmpresa}>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA<br />CNPJ: 54.139.158/0001-76</p>

                    <h2>1. APRESENTAÇÃO</h2>
                    <p>A presente Política de Privacidade tem por finalidade estabelecer as diretrizes para coleta, uso, armazenamento, proteção, compartilhamento e descarte dos dados pessoais tratados pela HotInvest, em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD), com as normas do Banco Central do Brasil (BACEN) e com as melhores práticas do mercado financeiro.<br /><br />
                        HotInvest é o nome fantasia sob o qual opera nossa instituição de pagamento e sociedade de crédito direto, regularmente registrada nos órgãos competentes.<br /><br />
                        Ao utilizar nossos serviços ou acessar nosso site www.hotinvest.com.br, você manifesta consentimento livre, informado e inequívoco com os termos desta Política, essencial para a proteção de seus direitos fundamentais de liberdade e privacidade.<br /><br />
                        Nos comprometemos com a ética, a governança corporativa, a segurança da informação e o respeito integral aos direitos dos titulares de dados pessoais.</p>

                    <h2>2. DEFINIÇÕES</h2>
                    <ul>
                        <li><b>Dados Pessoais:</b> Informações que identificam ou possam identificar uma pessoa física.</li>
                        <li><b>Dados Sensíveis:</b> Dados sobre origem racial ou étnica, convicções religiosas, opiniões políticas, filiação a sindicato, dados genéticos, biométricos, de saúde ou vida sexual.</li>
                        <li><b>Titular:</b> Pessoa física a quem se referem os dados pessoais.</li>
                        <li><b>Controladora:</b> Pessoa jurídica que decide sobre o tratamento dos dados pessoais (HotInvest).</li>
                        <li><b>Operadora:</b> Terceiros que realizam o tratamento de dados em nome da HotInvest.</li>
                        <li><b>Encarregado (DPO):</b> Pessoa indicada para atuar como canal de comunicação entre a HotInvest, os titulares e a ANPD.</li>
                    </ul>

                    <h2>3. DADOS COLETADOS E FORMAS DE COLETA</h2>
                    <h3>3.1 Fornecidos Diretamente pelo Titular</h3>
                    <ul>
                        <li>Nome completo</li>
                        <li>CPF, RG, CNH</li>
                        <li>Endereço residencial</li>
                        <li>E-mail, telefone e celular</li>
                        <li>Data de nascimento</li>
                        <li>Estado civil, profissão, nacionalidade</li>
                        <li>Dados financeiros, patrimoniais e de renda</li>
                        <li>Fotografias (selfie), biometria facial (prova de vida)</li>
                    </ul>
                    <h3>3.2 Coletados Automaticamente</h3>
                    <ul>
                        <li>Endereço IP</li>
                        <li>Logs de acesso</li>
                        <li>Geolocalização</li>
                        <li>Cookies, pixel tags, device fingerprint</li>
                    </ul>
                    <h3>3.3 Recebidos de Terceiros</h3>
                    <ul>
                        <li>Bureaus de crédito (Serasa, SPC)</li>
                        <li>Fontes públicas ou bases privadas com fins de prevenção à fraude</li>
                    </ul>
                    <p>A HotInvest garante a utilização de fontes idôneas e certificadas.</p>

                    <h2>4. FINALIDADES DO TRATAMENTO</h2>
                    <ul>
                        <li>Execução de contratos e prestação de serviços financeiros</li>
                        <li>Cumprimento de obrigações legais, regulatórias e contratuais</li>
                        <li>Análise de risco de crédito e concessão de financiamentos</li>
                        <li>Prevenção à lavagem de dinheiro e financiamento ao terrorismo</li>
                        <li>Prevenção a fraudes</li>
                        <li>Atendimento de demandas judiciais e administrativas</li>
                        <li>Aperfeiçoamento de produtos e serviços</li>
                        <li>Comunicação institucional e marketing, mediante consentimento</li>
                    </ul>
                    <p>Adotamos políticas internas de segregação de dados para mitigar riscos e garantir a confidencialidade.</p>

                    <h2>5. COMPARTILHAMENTO DE DADOS</h2>
                    <p>Seus dados podem ser compartilhados com:</p>
                    <ul>
                        <li>Órgãos reguladores (BACEN, ANPD, Receita Federal)</li>
                        <li>Parceiros comerciais e correspondentes bancários</li>
                        <li>Prestadores de serviços de tecnologia, auditoria e compliance</li>
                        <li>Empresas de prevenção a fraudes e bureaus de crédito</li>
                        <li>Escritórios de advocacia para a defesa em processos</li>
                    </ul>
                    <p>Todos os terceiros são obrigados a manter a confidencialidade e a segurança dos dados, através de instrumentos contratuais específicos que asseguram o cumprimento da LGPD.</p>

                    <h2>6. TRANSFERÊNCIA INTERNACIONAL</h2>
                    <p>Em caso de transferência de dados para outros países, garantiremos:</p>
                    <ul>
                        <li>Adoção de Cláusulas-Padrão Contratuais aprovadas</li>
                        <li>Contratos de transferência internacional específicos</li>
                        <li>Alinhamento com as diretrizes da ANPD e do BACEN</li>
                    </ul>
                    <p>Sempre adotaremos medidas técnicas e organizacionais para assegurar um nível adequado de proteção.</p>

                    <h2>7. ARMAZENAMENTO E SEGURANÇA DOS DADOS</h2>
                    <ul>
                        <li>Criptografia de dados em trânsito e em repouso</li>
                        <li>Controle de acesso baseado em privilégios</li>
                        <li>Segregação de ambientes de produção, desenvolvimento e testes</li>
                        <li>Plano de Resposta a Incidentes de Segurança da Informação</li>
                        <li>Treinamentos recorrentes sobre boas práticas de proteção de dados</li>
                    </ul>
                    <p>Possuímos inventário de acesso às informações pessoais, conforme determinação do Decreto nº 8.771/2016.</p>

                    <h2>8. RETENÇÃO E DESCARTE DE DADOS</h2>
                    <ul>
                        <li>Necessário para o atendimento das finalidades indicadas</li>
                        <li>Exigido por normas legais, regulatórias ou contratuais</li>
                        <li>Prescrito pelas legislações civil, bancária e tributária</li>
                    </ul>
                    <p>Posteriormente, serão eliminados ou anonimizados de maneira segura.</p>

                    <h2>9. DIREITOS DO TITULAR</h2>
                    <p>Você poderá solicitar:</p>
                    <ul>
                        <li>Confirmação da existência de tratamento</li>
                        <li>Acesso aos dados pessoais</li>
                        <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                        <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                        <li>Portabilidade dos dados</li>
                        <li>Informação sobre o compartilhamento de dados</li>
                        <li>Revogação do consentimento</li>
                    </ul>
                    <p>Para exercer seus direitos:</p>
                    <ul>
                        <li>E-mail: dpo@hotinvest.com.br</li>
                        <li>Assunto: &quot;Solicitação de Titular de Dados&quot;</li>
                    </ul>
                    <p>Responderemos em até 15 dias contados do recebimento da solicitação.</p>

                    <h2>10. CANAIS DE ATENDIMENTO</h2>
                    <p>Atendimento ao Cliente:</p>
                    <ul>
                        <li>Telefone: (19) 3483-4454 | 0800 000 0120</li>
                        <li>E-mail: sac@hotinvest.com.br</li>
                    </ul>
                    <p>Responsáveis por Notificações:</p>
                    <ul>
                        <li>Produtos ou Serviços: juridico@hotinvest.com.br</li>
                        <li>Funding de Operação: financeiro@hotinvest.com.br</li>
                        <li>Encarregado (DPO):<br />Nome: Sergio Moraes<br />E-mail: dpo@hotinvest.com.br</li>
                        <li>Responsável Jurídico para Processos:<br />Nome: Bárbara de la Sierra Zucco Franzin<br />E-mail: juridico@hotinvest.com.br</li>
                    </ul>

                    <h2>11. ALTERAÇÕES NA POLÍTICA</h2>
                    <p>A HotInvest poderá atualizar esta Política a qualquer momento, respeitando o princípio da transparência e a proteção dos direitos dos titulares. Alterações relevantes serão previamente comunicadas.</p>

                    <h2>12. LEGISLAÇÃO E FORO</h2>
                    <p>Esta Política é regida pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca do domicílio do titular de dados para dirimir eventuais controvérsias.</p>

                    <p className={styles.privacyFinal}>HotInvest — Compromisso com a Excelência em Proteção de Dados e Governança Corporativa</p>
                    <p className={styles.privacyVersao}>Versão 1.0 — Atualizada em 26 de abril de 2025</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy
