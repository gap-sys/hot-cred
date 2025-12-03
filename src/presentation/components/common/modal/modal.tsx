import { Modal as ResponsiveModal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

import { Button } from 'src/presentation/components'
import { ICONS } from 'src/data/ui'

import S from './modal.module.scss'

type ModalProps = {
  open: boolean
  message: string
  close: () => void
}

const Modal = ({ open, close, message }: ModalProps) => (
  <div className={S.container}>
    <ResponsiveModal
      classNames={{ modal: S.modal, overlay: S.overlay }}
      open={open}
      onClose={close}
      center
      showCloseIcon={false}
      blockScroll={true}
      animationDuration={300}
      focusTrapped={true}
      closeOnEsc={true}
      role="dialog"
    >
      <div className={S['modal-content']}>
        <h1 className={S.title}>{message}</h1>
        <h3 className={S.subtitle}>Siga a gente</h3>
        <p className={S.paragraph}>
          Conheça nossa cultura, explore nossos serviços e veja como <br />
          transformamos finanças em oportunidades todos os dias.
        </p>
        <div className={S['icons-section']}>
          {ICONS.map(({ icon: Icon, link }, index) => (
            <a key={index} href={link} target="_blank" rel="noopener noreferrer">
              <Icon className={S.icon} />
            </a>
          ))}
        </div>
        <Button typeStyle="btn1" label="Fechar" width="100%" onClick={close} />
      </div>
    </ResponsiveModal>
  </div>
)

export default Modal
