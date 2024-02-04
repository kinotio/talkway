import Image from 'next/image'

import SibebarComponent from '@/components/channels/SibebarComponent'
import FriendsComponent from '@/components/channels/FriendsComponent'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='channel__container'>
      <div className='channel__header'>
        <Image
          className='h-auto w-auto pr-2'
          src='/assets/images/talkway-logo-dark.png'
          alt='Talkway Logo'
          width='100'
          height='100'
        />
      </div>
      <div className='channel__content'>
        <SibebarComponent />
        {children}
        <FriendsComponent />
      </div>
    </div>
  )
}

export default Layout
