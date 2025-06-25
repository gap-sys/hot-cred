import { Footer, Meta, Navbar } from "src/presentation/components"

import styles from './privacy-policy.module.scss'

const PrivacyPolicy = () => {
    return (
        <div>
            <Meta
                title="Política de Privacidade | HotCred"
                description="Entenda como a HotCred protege seus dados pessoais e como você pode gerenciar o uso dessas informações."
                keywords="Política de Privacidade, HotCred, privacidade, dados pessoais, proteção de dados, conta digital, conta sem tarifas"
            />
            <Navbar />
            <div className={styles.privacyPolicyContainer}>
                <div className={styles.privacyPolicyContent}>
                    <h1 className={styles.privacyTitle}>POLÍTICA DE PRIVACIDADE</h1>
                    <p className={styles.privacyEmpresa}>MASTERMiND SERVIÇOS ADMINISTRATIVOS LTDA<br />CNPJ: 54.139.158/0001-76</p>

                    <h2>1. APRESENTAÇÃO</h2>
                    <p>Esta Política de Privacidade define as regras para coleta, uso, armazenamento, proteção, compartilhamento e descarte de dados pessoais pela HotCred, em total conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD), normas do Banco Central do Brasil (BACEN) e melhores práticas do setor financeiro.<br /><br />
                        HotCred é o nome fantasia sob o qual nossa instituição de pagamento e sociedade de crédito direto atua, devidamente registrada nos órgãos competentes.<br /><br />
                        Ao utilizar nossos serviços ou acessar nosso site www.hotcred.com.br, você concorda com os termos desta Política, essencial para garantir seus direitos de liberdade e privacidade.<br /><br />
                        Nosso compromisso é com a ética, governança, segurança da informação e respeito integral aos direitos dos titulares de dados.</p>

                    <h2>2. DEFINIÇÕES</h2>
                    <ul>
                        <li><b>Dados Pessoais:</b> Informações que identificam ou possam identificar uma pessoa física.</li>
                        <li><b>Dados Sensíveis:</b> Dados sobre origem racial ou étnica, crenças religiosas, opiniões políticas, filiação a sindicato, dados genéticos, biométricos, de saúde ou vida sexual.</li>
                        <li><b>Titular:</b> Pessoa física a quem se referem os dados pessoais.</li>
                        <li><b>Controladora:</b> Pessoa jurídica que decide sobre o tratamento dos dados pessoais (HotCred).</li>
                        <li><b>Operadora:</b> Terceiros que tratam dados em nome da HotCred.</li>
                        <li><b>Encarregado (DPO):</b> Responsável pelo canal de comunicação entre HotCred, titulares e ANPD.</li>
                    </ul>

                    <h2>3. DADOS COLETADOS E FORMAS DE COLETA</h2>
                    <h3>3.1 Informações Fornecidas pelo Titular</h3>
                    <ul>
                        <li>Nome completo</li>
                        <li>CPF, RG, CNH</li>
                        <li>Endereço residencial</li>
                        <li>E-mail, telefone e celular</li>
                        <li>Data de nascimento</li>
                        <li>Estado civil, profissão, nacionalidade</li>
                        <li>Dados financeiros, patrimoniais e de renda</li>
                        <li>Fotografias (selfie), biometria facial</li>
                    </ul>
                    <h3>3.2 Informações Coletadas Automaticamente</h3>
                    <ul>
                        <li>Endereço IP</li>
                        <li>Registros de acesso</li>
                        <li>Geolocalização</li>
                        <li>Cookies, pixel tags, device fingerprint</li>
                    </ul>
                    <h3>3.3 Dados Recebidos de Terceiros</h3>
                    <ul>
                        <li>Bureaus de crédito (Serasa, SPC)</li>
                        <li>Fontes públicas ou privadas para prevenção à fraude</li>
                    </ul>
                    <p>A HotCred utiliza apenas fontes confiáveis e certificadas.</p>

                    <h2>4. FINALIDADES DO TRATAMENTO</h2>
                    <ul>
                        <li>Execução de contratos e prestação de serviços financeiros</li>
                        <li>Cumprimento de obrigações legais, regulatórias e contratuais</li>
                        <li>Análise de risco de crédito e concessão de financiamentos</li>
                        <li>Prevenção à lavagem de dinheiro e financiamento ao terrorismo</li>
                        <li>Prevenção a fraudes</li>
                        <li>Atendimento de demandas judiciais e administrativas</li>
                        <li>Melhoria de produtos e serviços</li>
                        <li>Comunicação institucional e marketing, mediante consentimento</li>
                    </ul>
                    <p>Adotamos políticas internas de segregação de dados para garantir confidencialidade e mitigar riscos.</p>

                    <h2>5. COMPARTILHAMENTO DE DADOS</h2>
                    <p>Seus dados podem ser compartilhados com:</p>
                    <ul>
                        <li>Órgãos reguladores (BACEN, ANPD, Receita Federal)</li>
                        <li>Parceiros comerciais e correspondentes bancários</li>
                        <li>Prestadores de serviços de tecnologia, auditoria e compliance</li>
                        <li>Empresas de prevenção a fraudes e bureaus de crédito</li>
                        <li>Escritórios de advocacia para defesa em processos</li>
                    </ul>
                    <p>Todos os terceiros são obrigados a manter a confidencialidade e segurança dos dados, por meio de contratos específicos que asseguram o cumprimento da LGPD.</p>

                    <h2>6. TRANSFERÊNCIA INTERNACIONAL</h2>
                    <p>Em caso de transferência internacional de dados, garantimos:</p>
                    <ul>
                        <li>Uso de Cláusulas-Padrão Contratuais aprovadas</li>
                        <li>Contratos específicos para transferência internacional</li>
                        <li>Alinhamento com as diretrizes da ANPD e BACEN</li>
                    </ul>
                    <p>Sempre adotamos medidas técnicas e organizacionais para assegurar proteção adequada.</p>

                    <h2>7. ARMAZENAMENTO E SEGURANÇA DOS DADOS</h2>
                    <ul>
                        <li>Criptografia de dados em trânsito e em repouso</li>
                        <li>Controle de acesso por privilégios</li>
                        <li>Separação de ambientes de produção, desenvolvimento e testes</li>
                        <li>Plano de resposta a incidentes de segurança</li>
                        <li>Treinamentos regulares sobre proteção de dados</li>
                    </ul>
                    <p>Possuímos inventário de acesso às informações pessoais, conforme Decreto nº 8.771/2016.</p>

                    <h2>8. RETENÇÃO E DESCARTE DE DADOS</h2>
                    <ul>
                        <li>Enquanto necessário para as finalidades indicadas</li>
                        <li>Quando exigido por normas legais, regulatórias ou contratuais</li>
                        <li>Prazo previsto em legislações civil, bancária e tributária</li>
                    </ul>
                    <p>Após esse período, os dados serão eliminados ou anonimizados de forma segura.</p>

                    <h2>9. DIREITOS DO TITULAR</h2>
                    <p>Você pode solicitar:</p>
                    <ul>
                        <li>Confirmação do tratamento de dados</li>
                        <li>Acesso aos dados pessoais</li>
                        <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                        <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                        <li>Portabilidade dos dados</li>
                        <li>Informação sobre compartilhamento de dados</li>
                        <li>Revogação do consentimento</li>
                    </ul>
                    <p>Para exercer seus direitos:</p>
                    <ul>
                        <li>E-mail: dpo@hotcred.com.br</li>
                        <li>Assunto: "Solicitação de Titular de Dados"</li>
                    </ul>
                    <p>Responderemos em até 15 dias após o recebimento da solicitação.</p>

                    <h2>10. CANAIS DE ATENDIMENTO</h2>
                    <p>Atendimento ao Cliente:</p>
                    <ul>
                        <li>Telefone: (19) 3483-4454 | 0800 000 0120</li>
                        <li>E-mail: sac@hotcred.com.br</li>
                    </ul>
                    <p>Responsáveis por Notificações:</p>
                    <ul>
                        <li>Produtos ou Serviços: juridico@hotcred.com.br</li>
                        <li>Funding de Operação: financeiro@hotcred.com.br</li>
                        <li>Encarregado (DPO):<br />Nome: Sergio Moraes<br />E-mail: dpo@hotcred.com.br</li>
                        <li>Responsável Jurídico para Processos:<br />Nome: Bárbara de la Sierra Zucco Franzin<br />E-mail: juridico@hotcred.com.br</li>
                    </ul>

                    <h2>11. ALTERAÇÕES NA POLÍTICA</h2>
                    <p>A HotCred poderá atualizar esta Política a qualquer momento, sempre respeitando o princípio da transparência e a proteção dos direitos dos titulares. Mudanças relevantes serão comunicadas previamente.</p>

                    <h2>12. LEGISLAÇÃO E FORO</h2>
                    <p>Esta Política é regida pelas leis da República Federativa do Brasil. Fica eleito o Foro da Comarca do domicílio do titular de dados para resolver eventuais controvérsias.</p>

                    <p className={styles.privacyFinal}>HotCred — Compromisso com a Excelência em Proteção de Dados e Governança Corporativa</p>
                    <p className={styles.privacyVersao}>Versão 1.0 — Atualizada em 26 de abril de 2025</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy
