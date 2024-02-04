'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import LoaderComponent from '@/components/LoaderComponent'

import { getChannel } from '@/actions/channel'
import { getMessages, createMessage } from '@/actions/message'
import { getUser } from '@/actions/user'

import { supabase } from '@/lib/supabase'

const Page = () => {
  const { id } = useParams()

  const userId = getCookie('__user') as string

  const messagesEndRef = useRef<HTMLElement | null>(null) as any

  const [user, setUser] = useState<{ [key: string]: any }>({})

  const [messages, setMessages] = useState<Array<{ [key: string]: any }>>([])
  const [channel, setChannel] = useState<{ id: number; slug: string }>({ id: 0, slug: '' })
  const [message, setMessage] = useState<string>('')

  const [isChannelLoading, setIsChannelLoading] = useState<boolean>(false)
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false)
  const [isMessageCreating, setIsMessageCreating] = useState<boolean>(false)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)

  const [newMessage, handleNewMessage] = useState<{ new: any }>({ new: null })
  const [deletedMessage, handleDeletedMessage] = useState<{ old: any }>({
    old: null
  })

  const handleGetChannel = () => {
    setIsChannelLoading(true)

    getChannel({ channelId: Number(id) })
      .then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting channel')
          return
        }
        setChannel(data[0])
      })
      .finally(() => setIsChannelLoading(false))
  }

  const handleGetMessages = () => {
    setIsMessagesLoading(true)

    getMessages({ channelId: Number(id) })
      .then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting messages')
          return
        }
        setMessages(data)
      })
      .finally(() => setIsMessagesLoading(false))
  }

  const handleCreateMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (message === '') return

    if (e.keyCode === 13) {
      setIsMessageCreating(true)

      createMessage({ message, channelId: channel.id, userId })
        .then(({ error }) => {
          if (error) {
            toast.error('An error occurred while getting messages')
            return
          }
          handleGetMessages()
        })
        .finally(() => {
          setMessage('')
          setIsMessageCreating(false)
        })
    }
  }

  const handleGetUser = () => {
    setIsUserLoading(true)

    getUser({ userId })
      .then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting user')
          return
        }
        setUser(data[0])
      })
      .finally(() => setIsUserLoading(false))
  }

  useEffect(() => {
    if (Array.isArray(messages) && messages.length !== 0) {
      messagesEndRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }, [messages])

  useEffect(() => {
    handleGetUser()
    handleGetChannel()
    handleGetMessages()
  }, [id])

  useEffect(() => {
    const messageListener = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) =>
        handleNewMessage({ new: payload.new })
      )
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages' }, (payload) =>
        handleDeletedMessage({ old: payload.old })
      )
      .subscribe() as any

    return () => {
      supabase.removeChannel(supabase.channel(messageListener))
    }
  }, [])

  useEffect(() => {
    if (newMessage && newMessage?.new?.channel_id === channel.id) {
      const newMessageAltered = {
        ...newMessage.new,
        author: user
      }
      setMessages(messages.concat(newMessageAltered))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])

  useEffect(() => {
    if (deletedMessage)
      setMessages(messages.filter((message) => message.id !== deletedMessage.old.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage])

  return (
    <div className='channel__messages'>
      <div className='channel__message_header border-b bg-emerald-500'>
        <div className='text-white py-1 flex items-center ml-4 text-2xl'>
          <FontAwesomeIcon className='mr-2' icon={faHashtag} style={{ fontSize: 24 }} />
          {isChannelLoading ? '...' : <> {channel.slug}</>}
        </div>
      </div>

      <div className='channel__message_content'>
        {isMessagesLoading ? (
          <div className='flex justify-center items-center h-full'>
            <LoaderComponent />
          </div>
        ) : (
          <>
            {Array.isArray(messages) && messages.length === 0 ? (
              <div className='flex justify-center items-end h-full'>
                <div className='bg-emerald-500 w-44 flex justify-center items-center px-4 py-4 rounded-md text-white'>
                  No message 😢
                </div>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <div key={message.id} className='channel__message_item py-2'>
                    <div className='mb-2 text-gray-600 text-sm font-extralight'>
                      <span className='font-semibold'>{message.author.username}</span> -
                      <span className='ml-1'>{new Date(message.inserted_at).toString()}</span>
                    </div>
                    <div className='channel__message_item_content'>
                      <span className='channel__message_item_content_msg text-white'>
                        {message.message}
                      </span>
                      <div className='channel__message_item_content_btn'>
                        <button>
                          <FontAwesomeIcon
                            className='mr-2 text-gray-600'
                            icon={faTrash}
                            style={{ fontSize: 14 }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} style={{ height: 0 }}></div>
              </>
            )}
          </>
        )}
      </div>

      <div className='channel__message_input border-t'>
        <input
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => handleCreateMessage(e)}
          value={message}
          disabled={isMessageCreating}
          type='text'
          name='messageInput'
          placeholder='Type your message...'
          className='channel_message_input_text block px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
        />
      </div>
    </div>
  )
}

export default Page
