import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'

const FriendsComponent = () => {
  return (
    <div className='channel__direct_message'>
      <div className='channel__direct_message_header border-b'>
        <span className='text-gray-500 text-xl flex items-center'>
          <FontAwesomeIcon className='mr-2' icon={faUserFriends} style={{ fontSize: 14 }} />
          Friends
        </span>
      </div>
      <div className='channel__direct_message_friends border-l'>
        <Link href='#'>
          <div className='channel__direct_message_friend text-sm flex items-center text-gray-600 py-4 px-4 border-b'>
            <FontAwesomeIcon className='mr-2' icon={faUser} style={{ fontSize: 14 }} />
            user@gmail.com
          </div>
        </Link>
      </div>
    </div>
  )
}

export default FriendsComponent
