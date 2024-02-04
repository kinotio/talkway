'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'

import LoaderComponent from '@/components/LoaderComponent'

import { getChannel } from '@/actions/channel'
import { getMessages } from '@/actions/message'

const Page = () => {
  const { id } = useParams()
  const userCookie = getCookie('user')
  const user = userCookie ? JSON.parse(userCookie) : null

  const [messages, setMessages] = useState<Array<{ [key: string]: any }>>([])
  const [channel, setChannel] = useState<{ slug: string }>({ slug: '' })

  const [isChannelLoading, setIsChannelLoading] = useState<boolean>(false)
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false)

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

  useEffect(() => {
    handleGetChannel()
    handleGetMessages()
  }, [id])

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
                  No message
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
              </>
            )}
          </>
        )}
      </div>

      <div className='channel__message_input border-t'>
        <input
          type='text'
          name='messageInput'
          placeholder='Type your message...'
          className='channel_message_input_text block px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
        />
        <button className='channel_create_input_button w-28 px-6 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'>
          <FontAwesomeIcon className='mr-2' icon={faPaperPlane} style={{ fontSize: 14 }} />
          Send
        </button>
      </div>
    </div>
  )
}

export default Page
