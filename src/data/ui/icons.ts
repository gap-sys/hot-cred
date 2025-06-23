import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconMapPin,
} from '@tabler/icons-react';

type IconProps = {
  icon: React.ElementType
  link: string
}

export const ICONS: IconProps[] = [
  {
    icon: IconBrandLinkedin,
    link: 'https://www.linkedin.com/company/am%C3%A9rica-financeira/mycompany/',
  },
  {
    icon: IconBrandInstagram,
    link: 'https://www.instagram.com/america.financeira/',
  },
  {
    icon: IconBrandYoutube,
    link: 'https://www.youtube.com/channel/UCFZ1B3eZmM9sSEc_SkwRFRQ',
  },
  {
    icon: IconBrandFacebook,
    link: 'https://www.facebook.com/americafinanceiraeseguros',
  },
  {
    icon: IconBrandWhatsapp,
    link: 'https://api.whatsapp.com/send?phone=5519988285625&text=Ol%C3%A1!%20Vim%20do%20site%20da%20Am%C3%A9rica%20Financeira!',
  },
]

export const ICONS_LOCATIONS: IconProps[] = [
  {
    icon: IconBrandWhatsapp,
    link: 'https://api.whatsapp.com/send?phone=5519988285625&text=Ol%C3%A1!%20Vim%20do%20site%20da%20Am%C3%A9rica%20Financeira!',
  },
  {
    icon: IconMapPin,
    link: 'https://api.whatsapp.com/send?phone=5519988285625&text=Ol%C3%A1!%20Vim%20do%20site%20da%20Am%C3%A9rica%20Financeira!',
  },
]
