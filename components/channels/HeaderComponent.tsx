'use client'

import Image from 'next/image'

const HeaderComponent = () => {
  return (
    <div className='channel__header'>
      <div>
        <Image
          className='h-auto w-auto pr-2'
          src='/assets/images/talkway-logo-dark.png'
          alt='Talkway Logo'
          width='100'
          height='100'
        />
      </div>

      <div className='text-2xl'>
        Be <span className='text-emerald-400'>kind</span> to
        <span className='text-emerald-400 ml-1'>others</span>
      </div>
    </div>
  )
}

export default HeaderComponent
