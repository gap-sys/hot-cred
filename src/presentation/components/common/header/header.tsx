'use client'

import { useState } from 'react'
import S from './header.module.scss'
import { IMAGE } from 'src/presentation/assets'

const Header = () => {
  const [valor, setValor] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valor) return
    const msg = encodeURIComponent(`Olá! Gostaria de simular um crédito no valor de R$ ${valor}`)
    window.open(`https://api.whatsapp.com/send?phone=SEUNUMEROAQUI&text=${msg}`, '_blank')
  }

  return (
    <>
      <header className={S.nubankHeader}>
        <div className={S.leftSection}>
          <span className={S.brand}>Nubank</span>
          <h1 className={S.title}>
            N possibilidades para uma<br />vida mais simples e segura
          </h1>
          <form className={S.cpfForm} onSubmit={handleSubmit}>
            <label className={S.formLabel}>Simule agora: de quanto você precisa?</label>
            <input
              className={S.cpfInput}
              type="text"
              placeholder="Digite o valor desejado"
              value={valor}
              onChange={e => setValor(e.target.value)}
              maxLength={12}
            />
            <button className={S.cpfButton} type="submit">Quero meu crédito</button>
          </form>
        </div>
        <div className={S.rightSection}>
          <img
            src={IMAGE.HEADER_IMAGE.src}
            alt="Casal feliz Nubank"
            className={S.heroImage}
          />
        </div>
      </header>
      <section className={S.statsSection}>
        <div className={S.statsGrid}>
          <div className={S.statCard}>
            <div className={S.statNumber}>119 mi</div>
            <div className={S.statText}>de clientes no Brasil, México e Colômbia.</div>
          </div>
          <div className={S.statCard}>
            <div className={S.statNumber}>US$ 11 bi</div>
            <div className={S.statText}>em tarifas economizadas por nossos clientes em 2023.</div>
          </div>
          <div className={S.statCard}>
            <div className={S.statNumber}>440 mi</div>
            <div className={S.statText}>de horas economizadas por nossos clientes em filas e aguardando atendimento, em sete anos.</div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Header
