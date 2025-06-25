'use client'

import Link from 'next/link'
import { useState, useCallback, useMemo } from 'react'

import { Button } from 'src/presentation/components'

import S from './fgts-simulation.module.scss'

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

interface BalanceAdjusterProps {
  balance: number
  onDecrease: () => void
  onIncrease: () => void
}

interface BirthMonthAdjusterProps {
  birthMonth: number
  onDecrease: () => void
  onIncrease: () => void
}

const calculateAnticipation = (balance: number, birthMonth: number) => {
  const currentMonth = new Date().getMonth() + 1
  let monthDifference = birthMonth - currentMonth

  if (monthDifference < 0) monthDifference += 12
  const adjustmentFactor = monthDifference > 0 ? Math.pow(1.01, monthDifference) : 1

  return balance * 0.721274 * adjustmentFactor
}

const BalanceAdjuster = ({ balance, onDecrease, onIncrease }: BalanceAdjusterProps) => (
  <div className={S['balance-section']}>
    <h3 className={S['title-form']}>Qual é o saldo do seu FGTS?</h3>
    <input className={S['input-placeholder']} type="text" value={`R$ ${balance}`} readOnly />
    <div className={S['btn-group']}>
      <button className={S['btn']} onClick={onDecrease}>
        -
      </button>
      <button className={S['btn']} onClick={onIncrease}>
        +
      </button>
    </div>
  </div>
)

const BirthMonthAdjuster = ({ birthMonth, onDecrease, onIncrease }: BirthMonthAdjusterProps) => (
  <div className={S['balance-section']}>
    <h3 className={S['title-form']}>Seu mês de nascimento</h3>
    <input className={S['input-placeholder']} type="text" value={MONTHS[birthMonth - 1]} readOnly />
    <div className={S['btn-group']}>
      <button className={S['btn']} onClick={onDecrease}>
        -
      </button>
      <button className={S['btn']} onClick={onIncrease}>
        +
      </button>
    </div>
  </div>
)

const Simulation = () => {
  const [balance, setBalance] = useState<number>(0)
  const [birthMonth, setBirthMonth] = useState<number>(1)

  const adjustBalance = useCallback((amount: number) => {
    setBalance((currentBalance) => Math.max(currentBalance + amount, 0))
  }, [])

  const adjustBirthMonth = useCallback((amount: number) => {
    setBirthMonth((currentMonth) => ((currentMonth + amount + 12 - 1) % 12) + 1)
  }, [])

  const advanceValue = useMemo(() => calculateAnticipation(balance, birthMonth), [balance, birthMonth])

  return (
    <div className={S.container}>
      <div className={S['box-container']}>
        <h1 className={S.title}>
          Descubra quanto você pode antecipar <br /> com seu empréstimo FGTS
        </h1>
        <p className={S.subtitle}>
          Simule sua antecipação do FGTS e veja o valor <br /> de acordo com o saldo e mês de nascimento.
        </p>
        <div className={S['form-container']}>
          <div className={S['form-section']}>
            <BalanceAdjuster
              balance={balance}
              onIncrease={() => adjustBalance(100)}
              onDecrease={() => adjustBalance(-100)}
            />
            <BirthMonthAdjuster
              birthMonth={birthMonth}
              onIncrease={() => adjustBirthMonth(1)}
              onDecrease={() => adjustBirthMonth(-1)}
            />
          </div>
          <div className={S['result-section']}>
            <h6 className={S['title-form']}>Você pode antecipar até</h6>
            <p className={S['result']}>R$ {advanceValue.toFixed(2)}</p>
            <p className={S.paragraph}>
              Os valores simulados não incluem IOF e são baseados em dados médios. Eles podem variar conforme seu saldo
              do FGTS e mês de nascimento. Para uma simulação exata, entre em contato.
            </p>
            <Link
              href="https://api.whatsapp.com/send?phone=5519993120568&text=Ol%C3%A1!%20Vim%20do%20site%20da%20HotCred!%20Quero%20antecipar%20meu%20FGTS."
              target="_blank"
            >
              <Button typeStyle="btn1" label="Quero solicitar" width="260px" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Simulation
