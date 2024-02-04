import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlusCircle,
  faUser,
  faHashtag,
  faRightFromBracket,
  faPaperPlane,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

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
              <FontAwesomeIcon className='mr-2' icon={faUser} style={{ fontSize: 12 }} />{' '}
              user@email.com
            </span>
            <button className='channel_create_input_button w-48 px-6 py-2.5 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'>
              <FontAwesomeIcon
                className='mr-2'
                icon={faRightFromBracket}
                style={{ fontSize: 14 }}
              />
              Logout
            </button>
          </div>
        </div>

        <div className='channel__messages'>
          <div className='channel__message_header border-b bg-emerald-500'>
            <div className='text-white py-1 flex items-center ml-4 text-2xl'>
              <FontAwesomeIcon className='mr-2' icon={faHashtag} style={{ fontSize: 24 }} />
              Channel 1
            </div>
          </div>

          <div className='channel__message_content'>
            <div className='channel__message_item py-2'>
              <div className='mb-2 text-gray-600 text-sm font-extralight'>
                <span>user@gmail.com</span> - <span>Today 10/19/10</span>
              </div>
              <div className='channel__message_item_content'>
                <span className='channel__message_item_content_msg text-white'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus vel
                  nesciunt optio ipsa labore facilis assumenda cumque, facere iste rem id? Quia
                  necessitatibus similique beatae animi reiciendis repellat doloribus tempore.
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
      </div>

      <div>{children}</div>
    </div>
  )
}

export default Layout
