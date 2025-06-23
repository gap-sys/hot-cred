import { type ReactNode } from 'react'

import { LoanRequest } from 'src/presentation/components/form'

import S from './header.module.scss'

type HeaderProps = {
  title: ReactNode
  image: string
}

const Header = ({ title, image }: HeaderProps) => (

  <header
    className={S.container}
    style={{
      backgroundImage: `url(${image})`,
    }}
  >
    <div className={S['box-section']}>
      <div className={S['text-section']}>
        <h1 className={S.title}>{title}</h1>
      </div>


      <div className={S['form-section']}>
        <LoanRequest />
      </div>

    </div>
  </header>
)

export default Header
