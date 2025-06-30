'use client'

import { useState } from 'react'
import S from './header.module.scss'
import { IMAGE } from 'src/presentation/assets'

const Header = () => {
  const [valor, setValor] = useState('')

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '')

    if (numbers === '') return ''

    const number = parseInt(numbers, 10)
    return `R$${number.toLocaleString('pt-BR')}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted, valor:', valor)

    if (!valor || valor.trim() === '') {
      return
    }

    const msg = encodeURIComponent(`Olá! Gostaria de simular um crédito no valor de ${valor}`)
    console.log('Abrindo WhatsApp com mensagem:', msg)
    window.open(`https://api.whatsapp.com/send?phone=5519993120568&text=${msg}`, '_blank')
  }

  const handleButtonClick = () => {
    console.log('Botão clicado, valor atual:', valor)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    const formattedValue = formatCurrency(newValue)
    setValor(formattedValue)
  }

  return (
    <>
      <header id='simular' className={S.header}>
        <div className={S.leftSection}>
          <span className={S.brand}>HotCred</span>
          <h1 className={S.title}>
            Milhares de soluções  para uma vida mais simples e segura
          </h1>
          <form className={S.cpfForm} onSubmit={handleSubmit}>
            <label className={S.formLabel}>Simule agora: de quanto você precisa?</label>
            <input
              className={S.cpfInput}
              type="text"
              placeholder="R$ 0"
              value={valor}
              onChange={handleInputChange}
              maxLength={20}
            />
            <button
              className={S.cpfButton}
              type="submit"
              onClick={handleButtonClick}
            >
              Quero meu crédito
            </button>
          </form>
        </div>
        <div className={S.rightSection}>
          <img
            src={IMAGE.EQUIPE_REUNIDA.src}
            alt="Equipe HotCred"
            className={S.heroImage}
          />
        </div>
      </header>

    </>
  )
}

export default Header
