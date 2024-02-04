'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusCircle,
  faUser,
  faHashtag,
  faRightFromBracket,
  faTrash
} from '@fortawesome/free-solid-svg-icons'
import { deleteCookie } from 'cookies-next'

import { logout } from '@/actions/user'

const SibebarComponent = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = () => {
    setIsLoading(true)

    logout()
      .then(() => {
        deleteCookie('user')
        window.location.href = '/'
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='channel__sidebar'>
      <div className='channel_create'>
        <div className='channel_create_input'>
          <input
            type='text'
            name='createChannel'
            className='channel_create_input_text block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
            placeholder='Create your channel'
          />
          <button className='uppercase mt-2 channel_create_input_button w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'>
            <FontAwesomeIcon className='mr-2' icon={faPlusCircle} style={{ fontSize: 14 }} />
            Create
          </button>
        </div>
      </div>

      <div className='channel_list border-r'>
        <Link href='#' className='channel_list_item_channel border-b'>
          <div className='channel__item text-gray-500 py-1 text-sm flex items-center '>
            <FontAwesomeIcon className='mr-2' icon={faHashtag} style={{ fontSize: 14 }} />
            Channel 1
          </div>
          <button className='mr-4'>
            <FontAwesomeIcon
              className='mr-2 text-gray-600'
              icon={faTrash}
              style={{ fontSize: 14 }}
            />
          </button>
        </Link>
      </div>

      <div className='channel_logout'>
        <span className='pb-2 text-sm font-extralight text-white flex items-center'>
          <FontAwesomeIcon className='mr-2' icon={faUser} style={{ fontSize: 12 }} /> user@email.com
        </span>
        <button
          onClick={handleLogout}
          className='channel_create_input_button w-48 px-6 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
        >
          <FontAwesomeIcon className='mr-2' icon={faRightFromBracket} style={{ fontSize: 14 }} />
          {isLoading ? 'Loading...' : 'Logout'}
        </button>
      </div>
    </div>
  )
}

export default SibebarComponent
