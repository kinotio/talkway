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
import { getCookie, deleteCookie } from 'cookies-next'
import { toast } from 'react-toastify'

import LoaderComponent from '@/components/LoaderComponent'

import { logout } from '@/actions/user'
import { getChannels, createChannel } from '@/actions/channel'

const SibebarComponent = () => {
  const userCookie = getCookie('user')
  const user = userCookie ? JSON.parse(userCookie) : null

  const [channels, setChannels] = useState<Array<{ [key: string]: any }>>([])
  const [channelName, setChannelName] = useState<string>('')

  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false)
  const [isChannelLoading, setIsChannelLoading] = useState<boolean>(false)
  const [isChannelCreating, setIsChannelCreating] = useState<boolean>(false)

  const handleCreateChannel = () => {
    setIsChannelCreating(true)

    createChannel({ channelName: channelName.toLowerCase(), userId: user?.user?.id })
      .then(({ error }) => {
        if (error) {
          toast.error('An error occurred while getting channels')
          return
        }
        handleGetChannels()
      })
      .finally(() => {
        setChannelName('')
        setIsChannelCreating(false)
      })
  }

  const handleLogout = () => {
    setIsLogoutLoading(true)

    logout()
      .then(() => {
        deleteCookie('user')
        window.location.href = '/'
      })
      .finally(() => setIsLogoutLoading(false))
  }

  const handleGetChannels = () => {
    setIsChannelLoading(true)

    getChannels()
      .then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting channels')
          return
        }
        setChannels(data)
      })
      .finally(() => setIsChannelLoading(false))
  }

  useEffect(() => {
    handleGetChannels()
  }, [])

  return (
    <div className='channel__sidebar'>
      <div className='channel_create'>
        <div className='channel_create_input'>
          <input
            onChange={(e) => setChannelName(e.target.value)}
            value={channelName}
            type='text'
            name='createChannel'
            className='channel_create_input_text block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
            placeholder='Create your channel'
          />
          <button
            onClick={handleCreateChannel}
            className='uppercase mt-2 channel_create_input_button w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
          >
            <FontAwesomeIcon className='mr-2' icon={faPlusCircle} style={{ fontSize: 14 }} />
            {isChannelCreating ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>

      <div className='channel_list border-r'>
        {isChannelLoading ? (
          <div className='flex justify-center items-center h-full'>
            <LoaderComponent />
          </div>
        ) : (
          <>
            {channels.map((channel) => (
              <Link
                key={channel.id}
                href='/channels/[id]'
                as={`/channels/${channel.id}`}
                className='channel_list_item_channel border-b'
              >
                <div className='channel__item text-gray-500 py-1 text-sm flex items-center '>
                  <FontAwesomeIcon className='mr-2' icon={faHashtag} style={{ fontSize: 14 }} />
                  {channel.slug}
                </div>
                <button className='mr-4'>
                  <FontAwesomeIcon
                    className='mr-2 text-gray-600'
                    icon={faTrash}
                    style={{ fontSize: 14 }}
                  />
                </button>
              </Link>
            ))}
          </>
        )}
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
          {isLogoutLoading ? 'Loading...' : 'Logout'}
        </button>
      </div>
    </div>
  )
}

export default SibebarComponent
