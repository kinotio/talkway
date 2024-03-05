'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import moment from 'moment'

import LoaderComponent from '@/components/LoaderComponent'

import { getChannel } from '@/actions/channel'
import { getMessages, createMessage, deleteMessage, listenMessage } from '@/actions/message'
import { getUser } from '@/actions/user'

import { supabase } from '@/lib/supabase'

const Page = () => {
  const { id } = useParams()

  const userId = getCookie('__user') as string

  const messagesEndRef = useRef<HTMLElement | null>(null) as any

  const [messages, setMessages] = useState<Array<{ [key: string]: any }>>([])
  const [channel, setChannel] = useState<{ id: number; slug: string }>({ id: 0, slug: '' })
  const [message, setMessage] = useState<string>('')

  const [isChannelLoading, setIsChannelLoading] = useState<boolean>(false)
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false)
  const [isMessageCreating, setIsMessageCreating] = useState<boolean>(false)

  const [newMessage, handleNewMessage] = useState<{ new: any }>({ new: null })
  const [deletedMessage, handleDeletedMessage] = useState<{ old: any }>({
    old: null
  })

  const humanifyDate = ({ dateIso }: { dateIso: Date }) => {
    const humanReadable = moment(dateIso).format('MMMM Do YYYY, h:mm:ss a')
    return humanReadable
  }

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
            toast.error('An error occurred while saving message')
            return
          }
        })
        .finally(() => {
          setMessage('')
          setIsMessageCreating(false)
        })
    }
  }

  const handleDeleteMessage = ({ messageId }: { messageId: number }) => {
    deleteMessage({ messageId })
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
    handleGetChannel()
    handleGetMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    const messageListener = listenMessage({ handleNewMessage, handleDeletedMessage })
    return () => {
      supabase.removeChannel(supabase.channel(messageListener))
    }
  }, [])

  useEffect(() => {
    if (newMessage && newMessage?.new?.channel_id === channel.id) {
      getUser({ userId: newMessage.new.user_id }).then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting user')
          return
        }
        const newMessageAltered = {
          ...newMessage.new,
          author: data[0]
        }
        setMessages(messages.concat(newMessageAltered))
      })
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
          {isChannelLoading ? '...' : <> {channel?.slug}</>}
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
                  <div
                    key={message.id}
                    className={`${message.user_id === userId ? 'items-end' : 'items-start'} channel__message_item py-2`}
                  >
                    <div className='mb-2 text-gray-600 text-xs font-extralight'>
                      <span className='font-semibold mr-1'>
                        {message.author.fullname}
                        <span
                          className={`${message.user_id === userId ? 'text-blue-400' : 'text-emerald-400'} ml-1 text-xs font-semibold`}
                        >
                          ({message.author.username})
                        </span>
                      </span>
                      -
                      <span className='ml-1'>{humanifyDate({ dateIso: message.inserted_at })}</span>
                    </div>
                    <div className='channel__message_item_content'>
                      {message.user_id === userId ? (
                        <div className='channel__message_item_content_btn mr-6'>
                          <button
                            onClick={() => handleDeleteMessage({ messageId: message.id })}
                            className='mr-2 text-gray-600 hover:text-red-600'
                          >
                            <FontAwesomeIcon icon={faTrash} style={{ fontSize: 14 }} />
                          </button>
                        </div>
                      ) : null}

                      <span
                        className={`${message.user_id === userId ? 'bg-blue-400' : 'bg-emerald-400'} channel__message_item_content_msg text-white`}
                      >
                        {message.message}
                      </span>
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
