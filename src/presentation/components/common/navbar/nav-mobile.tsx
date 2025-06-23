import Link from 'next/link'

import { NavItem } from 'src/presentation/components'
import { NavMobileProps } from 'src/data/models'
import { MENU } from 'src/data/ui'
import { IconX } from '@tabler/icons-react';

import S from './nav-mobile.module.scss'

const NavMobile = ({ closeMenu }: NavMobileProps) => {
  const handleClick = () => {
    closeMenu()
  }

  return (
    <div className={S['mobile-nav-container']}>
      <nav className={S['mobile-nav']}>
        <section className={S['close-section']}>
          <IconX onClick={closeMenu} className={S['close-icon']} />
        </section>
        <div className={S['nav-items']}>
          {MENU.map((item, key) => (
            <NavItem
              key={key}
              label={item.label}
              new={item.new}
              link={item.link}
              onClick={handleClick}
              blank="none"
              closeMenu={closeMenu}
            >
              {item.children}
            </NavItem>
          ))}
        </div>
        <aside className={S['right-section']}>
          <Link href="/abrir-conta" legacyBehavior>
            <a className={S.link}>
              <span>Quero ser HotInvest</span>
            </a>
          </Link>
        </aside>
      </nav>
    </div>
  )
}

export default NavMobile
