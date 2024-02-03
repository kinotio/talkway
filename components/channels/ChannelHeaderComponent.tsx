'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark, faUser } from '@fortawesome/free-solid-svg-icons'

const ChannelHeaderComponent = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='bg-emerald-800 sticky inset-x-0 top-0 z-50'>
      <nav className='container flex items-center justify-between mx-auto' aria-label='Global'>
        <div className='flex lg:flex-1'>
          <Link href='/channels' className='m-1.5 p-1.5 flex'>
            <span className='sr-only'>Talkway</span>
            <Image
              className='h-auto w-auto pr-2'
              src='/assets/images/talkway-logo-icon-light.png'
              alt='Talkway Logo'
              width='10'
              height='10'
            />
          </Link>
        </div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='inline-flex items-center justify-center rounded-md text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className='sr-only'>Open main menu</span>
            <FontAwesomeIcon icon={faBars} style={{ fontSize: 32 }} />
          </button>
        </div>

        <div className='hidden lg:flex lg:justify-end items-center'>
          <div className='flex flex-col space-y-4 lg:mt-0 lg:flex-row lg:-px-8 lg:space-y-0 lg:px-2'>
            <Link
              href='#'
              className='text-sm font-semibold leading-6 text-white py-2 px-4 rounded-full flex items-center lg:mx-1'
            >
              Profile
              <FontAwesomeIcon className='ml-2' icon={faUser} style={{ fontSize: 16 }} />
            </Link>
          </div>
        </div>
      </nav>
      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='container flex items-center justify-between px-6 py-6 mx-auto'>
            <Link href='/channels' className='m-1.5 p-1.5 flex'>
              <span className='sr-only'>Talkway</span>
              <Image
                className='h-auto w-auto pr-2'
                src='/assets/images/talkway-logo-icon-light.png'
                alt='Talkway Logo'
                width='10'
                height='10'
              />
            </Link>
            <button
              type='button'
              className='rounded-md text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <FontAwesomeIcon icon={faXmark} style={{ fontSize: 32 }} />
            </button>
          </div>
          <div className='flow-root px-6 py-6'>
            <div className='my-6 divide-y divide-gray-500/10'>
              <div className='py-6'>
                <Link
                  href='#'
                  className='text-sm font-semibold leading-6 text-white py-2 px-4 rounded-full flex items-center lg:mx-1'
                >
                  Profile
                  <FontAwesomeIcon className='ml-2' icon={faUser} style={{ fontSize: 16 }} />
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default ChannelHeaderComponent
