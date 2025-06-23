export interface NavbarItemProps {
  label: string
  link: string
  new?: string
  blank?: string
  children?: NavbarItemProps[]
  color?: string
  onClick?: () => void
  closeMenu?: () => void
}

export type NavMobileProps = {
  closeMenu: () => void
}
