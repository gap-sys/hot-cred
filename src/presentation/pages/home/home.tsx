import { Meta, Navbar, Header, Footer, FAQ, Contact, FgtsSimulation, Path, Benefits, Banks } from 'src/presentation/components'
import { ICON, IMAGE } from 'src/presentation/assets'

import S from './home.module.scss'

const Home = () => {
  const IMAGES = IMAGE.HEADER_IMAGE

  return (
    <div>
      <Meta
        title="Conta Digital HotInvest – Autonomia, rendimento e zero tarifas"
        description="Simplifique sua vida financeira com a conta digital HotInvest. Controle total pelo app, transferências grátis, rendimento acima da poupança e sem taxas escondidas."
        keywords="HotInvest, conta digital, cartão HotInvest, transferências grátis, rendimento CDI, conta sem tarifas, abrir conta digital, fintech"
        image={IMAGES.src}
      />

      <Navbar />
      
      <Benefits />
      <Path />
      <Banks />
      <FgtsSimulation />
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
