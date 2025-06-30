import { Meta, Navbar, Header, Footer, FAQ, Contact, FgtsSimulation, Path, Benefits, Banks, Numbers } from 'src/presentation/components'
import { ICON, IMAGE } from 'src/presentation/assets'

import S from './home.module.scss'

const Home = () => {
  const IMAGES = IMAGE.HEADER_IMAGE

  return (
    <div>
      <Meta
        title="HotCred – Soluções financeiras para o seu momento"
        description="A HotCred conecta você às melhores soluções de crédito com agilidade, segurança e atendimento personalizado. Empréstimo, antecipação de FGTS, crédito para CLT e muito mais."
        keywords="HotCred, crédito pessoal, antecipação FGTS, crédito para CLT, empréstimo fácil, consultoria financeira, fintech, crédito rápido, soluções financeiras"
        image={IMAGES.src}
      />
      <Navbar />
      <Header />
      <Numbers />
      <Benefits />
      <Path />
      <FgtsSimulation />
      <Banks />
      <FAQ />
      <Contact />
      <Footer />
      <a
        href="https://api.whatsapp.com/send?phone=5519993120568&text=Ol%C3%A1!%20Vim%20do%20site%20da%20HotCred!"
        target="_blank"
        rel="noopener noreferrer"
        className={S['whatsapp-button']}
      >
        <ICON.IconBrandWhatsapp className={S.icon} />
      </a>
    </div>
  )
}

export default Home
