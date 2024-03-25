'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faHashtag, faTrash, faGear } from '@fortawesome/free-solid-svg-icons'
import { getCookie, deleteCookie } from 'cookies-next'
import { toast } from 'react-toastify'
import { useParams } from 'next/navigation'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'

import LoaderComponent from '@/components/LoaderComponent'

import { logout, getUser } from '@/actions/user'
import { getChannels, createChannel, deleteChannel, listenChannel } from '@/actions/channel'

import { supabase } from '@/lib/supabase'

import { getInitials } from '@/utils/common'

const SibebarComponent = () => {
  const { id } = useParams()
  const router = useRouter()

  const userId = getCookie('__user') as string

  const [user, setUser] = useState<TUser>()

  const [channels, setChannels] = useState<Array<TChannel>>([])
  const [channelName, setChannelName] = useState<string>('')

  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false)
  const [isChannelLoading, setIsChannelLoading] = useState<boolean>(false)
  const [isChannelCreating, setIsChannelCreating] = useState<boolean>(false)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)

  const [newChannel, handleNewChannel] = useState<{ new: any }>({ new: null })
  const [deletedChannel, handleDeletedChannel] = useState<{ old: any }>({
    old: null
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleCreateChannel = () => {
    if (channelName === '') return

    const slugifiedChannelName = channelName
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text

    if (user === null || user === undefined) return

    setIsChannelCreating(true)

    createChannel({ channelName: slugifiedChannelName, userId: user.id })
      .then(({ error }) => {
        if (error) {
          toast.error('An error occurred while getting channels')
          return
        }
        handleGetUser()
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
        deleteCookie('__user')
        deleteCookie('__token')
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

  const handleGetUser = () => {
    setIsUserLoading(true)

    getUser({ userId })
      .then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting user')
          handleLogout()
          return
        }
        setUser(data[0])
      })
      .finally(() => setIsUserLoading(false))
  }

  const handleDeleteChannel = ({ channelId }: { channelId: number }) => {
    deleteChannel({ channelId }).then(({ error }) => {
      if (error) {
        toast.error('An error occurred while deleting channel')
        return
      }
      router.push(`/channels/${channelId - 1}`)
    })
  }

  useEffect(() => {
    handleGetUser()
    handleGetChannels()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const channelListener = listenChannel({ handleNewChannel, handleDeletedChannel })
    return () => {
      supabase.removeChannel(supabase.channel(channelListener))
    }
  }, [])

  useEffect(() => {
    if (newChannel) setChannels(channels.concat(newChannel.new))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChannel])

  useEffect(() => {
    if (deletedChannel)
      setChannels(channels.filter((channel) => channel.id !== deletedChannel.old.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedChannel])

  return (
    <div className='channel__sidebar'>
      <div className='channel_create border-r border-b'>
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
                className={`${channel.id === Number(id) ? 'bg-emerald-600 text-white' : 'text-gray-600'} channel_list_item_channel border-b`}
              >
                <div className='channel__item py-1 text-sm flex items-center'>
                  <FontAwesomeIcon className='mr-2' icon={faHashtag} style={{ fontSize: 14 }} />
                  {channel?.slug}
                </div>
                {channel.created_by === user?.id ? (
                  <button
                    onClick={() => handleDeleteChannel({ channelId: channel.id })}
                    className='text-gray-600 hover:text-white hover:bg-red-600 px-6 py-2 flex justify-center items-center'
                  >
                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: 14 }} />
                  </button>
                ) : null}
              </Link>
            ))}
          </>
        )}
      </div>

      <div className='channel_logout'>
        <div className='channel_logout_username mt-2'>
          <div className='pb-2 text-sm font-extralight text-white flex items-center break-words'>
            <span className='bg-white text-emerald-600  w-10 h-10 rounded-full flex justify-center items-center mr-3'>
              {getInitials({ user })}
            </span>
            <div className='flex flex-col'>
              <span className='break-words'>{user?.fullname}</span>
              <span className='break-words'>{user?.username}</span>
            </div>
          </div>
        </div>

        <Button isIconOnly variant='light' className='text-white' onPress={onOpen}>
          <FontAwesomeIcon icon={faGear} style={{ fontSize: 18 }} />
        </Button>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus
                    non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed
                    porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus
                    non risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed
                    porttitor quam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
                    duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
                    et. Culpa deserunt nostrud ad veniam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button color='primary' onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  )
}

export default SibebarComponent
