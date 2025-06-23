'use client'

import Link from 'next/link'
import { useState } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'

import { NavbarItemProps } from 'src/data/models'
import { IconChevronDown } from '@tabler/icons-react';

import S from './nav-item.module.scss'

const NavItem = ({ label, link, children, closeMenu }: NavbarItemProps) => {
  const [animationParent] = useAutoAnimate()
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = (event: React.MouseEvent) => {
    if (!children) {
      if (closeMenu) {
        closeMenu()
      }
      return
    }

    event.stopPropagation()
    setIsOpen(!isOpen)
  }

  return (
    <div ref={animationParent} className={S['single-nav-item']}>
      <Link onClick={handleClick} href={link ?? '#'} className={S['item-link']}>
        <p className={S['item-label']}>
          <span>{label}</span>
          {children && <IconChevronDown className={`${S['arrow-icon']} ${isOpen && S['rotate-180']}`} />}
        </p>
      </Link>
      {isOpen && children && (
        <div className={S.dropdown}>
          {children.map((item, key) => (
            <Link
              key={key}
              href={item.link ?? '#'}
              className={S['dropdown-link']}
              onClick={closeMenu}
            >
              <span className={S['link-label']}>{item.label}</span>
              <div>{item.new && <p className={S.new}>{item.new}</p>}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default NavItem
