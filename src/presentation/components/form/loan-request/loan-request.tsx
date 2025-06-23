'use client'

import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { useRouter } from 'next/navigation'

import { AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai'
import { FiChevronRight } from 'react-icons/fi'

import S from './loan-request.module.scss'

type LoanRequestProps = {
  cpf: string
}

const LoanRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoanRequestProps>()

  const router = useRouter();

  const onSubmit = (data: LoanRequestProps) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hotinvest_cpf', data.cpf);
    }
    router.push('/abrir-conta');
  }

  const isCpfValid = !errors.cpf && watch('cpf')?.length === 14

  return (
    <div className={S.container}>
      <div className={S.stepWrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={S.form}>
          <fieldset>
            <legend className={S.title}>
              Abra sua Conta no HotInvest e peça seu
              Cartão de Crédito em minutos
            </legend>

            <div className={`${S['input-wrapper']} ${errors.cpf ? S['input-error'] : isCpfValid ? S['input-success'] : ''}`}>
              <InputMask
                {...register('cpf', {
                  required: 'Digite seu CPF',
                  pattern: {
                    value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                    message: 'Precisamos de um CPF válido.',
                  },
                })}
                mask="999.999.999-99"
                maskChar=""
                className={S['input-text']}
                type="text"
                placeholder="Digite seu CPF"
                inputMode="numeric"
              />
              {isCpfValid ? (
                <AiOutlineCheckCircle className={S['input-icon']} />
              ) : (
                <AiOutlineInfoCircle className={S['input-icon']} />
              )}
            </div>
            {errors.cpf && (
              <span className={S['error-message']}>{errors.cpf.message}</span>
            )}
            <button
              type="submit"
              className={S['submit-btn']}
              disabled={isSubmitting}
            >
              <span className={S['btn-text']}>Continuar</span>
              <span className={S['btn-icon']}><FiChevronRight size={22} /></span>
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default LoanRequest
