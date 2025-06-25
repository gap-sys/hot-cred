import Image from 'next/image'

import { IMAGE } from 'src/presentation/assets'

import S from './banks.module.scss'

const BANKS = [
  { src: IMAGE.BANCO_BRADESCO.src, alt: 'Imagem do banco Bradesco' },
  { src: IMAGE.BANCO_CAIXA.src, alt: 'Imagem do banco Caixa' },
  { src: IMAGE.BANCO_SANTANDER.src, alt: 'Imagem do banco Santander' },
  { src: IMAGE.BANCO_BRASIL.src, alt: 'Imagem do banco Brasil' },
  { src: IMAGE.BANCO_BANRISUL.src, alt: 'Imagem do banco Banrisul' },
  { src: IMAGE.BANCO_ITAU.src, alt: 'Imagem do banco Itaú' },
]

const Banks = () => {
  return (
    <div className={S.container}>
      <h1 className={S.title}>
        Simule com facilidade e veja nossas instituições parceiras
      </h1>
      <div className={S['image-section']}>
        {BANKS.map((item, index) => (
          <Image width={100} height={100} key={index} src={item.src} alt={item.alt} className={S.img} />
        ))}
      </div>
    </div>
  )
}

export default Banks
