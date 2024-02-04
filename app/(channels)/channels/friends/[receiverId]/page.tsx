'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import moment from 'moment'

import LoaderComponent from '@/components/LoaderComponent'

import { deleteDirectMessage, getDirectMessages, createDirectMessage } from '@/actions/message'
import { getUser } from '@/actions/user'

import { supabase } from '@/lib/supabase'

const Page = () => {
  const { receiverId } = useParams()

  const userId = getCookie('__user') as string

  const messagesEndRef = useRef<HTMLElement | null>(null) as any

  const [directMessages, setDirectMessages] = useState<Array<{ [key: string]: any }>>([])
  const [receiver, setReceiver] = useState<{ [key: string]: any }>({})

  const [isDirectMessageLoading, setIsDirectMessageLoading] = useState<boolean>(false)
  const [isDirectMessageCreating, setIsDirectMessageCreating] = useState<boolean>(false)
  const [isUserLoading, setIsUserLoading] = useState<boolean>(false)

  const [message, setMessage] = useState<string>('')

  const [newMessage, handleNewMessage] = useState<{ new: any }>({ new: null })
  const [deletedMessage, handleDeletedMessage] = useState<{ old: any }>({
    old: null
  })

  const humanifyDate = ({ dateIso }: { dateIso: Date }) => {
    const humanReadable = moment(dateIso).format('MMMM Do YYYY, h:mm:ss a')
    return humanReadable
  }

  const handleGetUser = () => {
    setIsUserLoading(true)

    getUser({ userId: receiverId.toString() })
      .then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting user')
          return
        }
        setReceiver(data[0])
      })
      .finally(() => setIsUserLoading(false))
  }

  const handleGetDirectMessages = () => {
    setIsDirectMessageLoading(true)

    getDirectMessages({ senderId: userId, receiverId: receiverId.toString() })
      .then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting direct messages')
          return
        }
        setDirectMessages(data)
      })
      .finally(() => setIsDirectMessageLoading(false))
  }

  const handleCreateDirectMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (message === '') return

    if (e.keyCode === 13) {
      setIsDirectMessageCreating(true)

      createDirectMessage({ message, senderId: userId, receiverId: receiverId.toString() })
        .then(({ error }) => {
          if (error) {
            toast.error('An error occurred while saving message')
            return
          }
        })
        .finally(() => {
          setMessage('')
          setIsDirectMessageCreating(false)
        })
    }
  }

  const handleDeleteDirectMessage = ({ directMessageId }: { directMessageId: number }) => {
    deleteDirectMessage({ directMessageId })
  }

  useEffect(() => {
    if (Array.isArray(directMessages) && directMessages.length !== 0) {
      messagesEndRef.current.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      })
    }
  }, [directMessages])

  useEffect(() => {
    handleGetUser()
    handleGetDirectMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiverId])

  useEffect(() => {
    const directMessageListener = supabase
      .channel('public:direct_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'direct_messages' },
        (payload) => handleNewMessage({ new: payload.new })
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'direct_messages' },
        (payload) => handleDeletedMessage({ old: payload.old })
      )
      .subscribe() as any

    return () => {
      supabase.removeChannel(supabase.channel(directMessageListener))
    }
  }, [])

  useEffect(() => {
    if (newMessage) setDirectMessages(directMessages.concat(newMessage.new))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage])

  useEffect(() => {
    if (deletedMessage)
      setDirectMessages(directMessages.filter((message) => message.id !== deletedMessage.old.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage])

  return (
    <div className='channel__messages'>
      <div className='channel__message_header border-b bg-emerald-500'>
        <div className='text-white py-1 flex items-center ml-4 text-2xl'>
          <FontAwesomeIcon className='mr-2' icon={faHashtag} style={{ fontSize: 24 }} />
          {isUserLoading ? '...' : <> {receiver?.username}</>}
        </div>
      </div>

      <div className='channel__message_content'>
        {isDirectMessageLoading ? (
          <div className='flex justify-center items-center h-full'>
            <LoaderComponent />
          </div>
        ) : (
          <>
            {Array.isArray(directMessages) && directMessages.length === 0 ? (
              <div className='flex justify-center items-end h-full'>
                <div className='bg-emerald-500 w-44 flex justify-center items-center px-4 py-4 rounded-md text-white'>
                  No message 😢
                </div>
              </div>
            ) : (
              <>
                {directMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`${message.sender_id === userId ? 'items-end' : 'items-start'} channel__message_item py-2`}
                  >
                    <div className='mb-2 text-gray-600 text-xs font-extralight items-end'>
                      <span className='ml-1'>{humanifyDate({ dateIso: message.inserted_at })}</span>
                    </div>
                    <div className='channel__message_item_content'>
                      {message.sender_id === userId ? (
                        <div className='channel__message_item_content_btn mr-6'>
                          <button
                            onClick={() =>
                              handleDeleteDirectMessage({ directMessageId: message.id })
                            }
                            className='mr-2 text-gray-600 hover:text-red-600'
                          >
                            <FontAwesomeIcon icon={faTrash} style={{ fontSize: 14 }} />
                          </button>
                        </div>
                      ) : null}

                      <span
                        className={`${message.sender_id === userId ? 'bg-blue-400' : 'bg-emerald-400'} channel__message_item_content_msg text-white`}
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
          onKeyDown={(e) => handleCreateDirectMessage(e)}
          value={message}
          disabled={isDirectMessageCreating}
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
