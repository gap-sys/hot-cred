import styles from './input.module.scss'

export type InputProps = {
  typeStyle: 'input-normal'
  placeHolder: string
  onClick?: () => void
  width?: string
}

const Input: React.FC<InputProps> = ({ typeStyle, placeHolder, width }) => {
  let InputClass
  switch (typeStyle) {
    case 'input-normal':
      InputClass = styles['input-normal']
      break
    default:
      InputClass = styles.input
  }
  return (
    <input
      className={`${styles.btn} ${InputClass}`}
      style={{ width: width || 'auto' }}
      placeholder={placeHolder}
    ></input>
  )
}

export default Input
