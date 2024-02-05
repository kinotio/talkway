'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'

import LoaderComponent from '@/components/LoaderComponent'

import { getUsers } from '@/actions/user'

const FriendsComponent = () => {
  const userId = getCookie('__user') as string

  const [users, setUsers] = useState<Array<{ [key: string]: any }>>([])

  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(false)

  const handleGetUsers = () => {
    setIsUsersLoading(true)

    getUsers()
      .then(({ error, data }) => {
        if (error) {
          toast.error('An error occurred while getting users')
          return
        }
        setUsers(data.filter((user) => user.id !== userId))
      })
      .finally(() => setIsUsersLoading(false))
  }

  useEffect(() => {
    handleGetUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='channel__direct_message'>
      <div className='channel__direct_message_header border-b'>
        <span className='text-gray-500 text-xl flex items-center'>
          <FontAwesomeIcon className='mr-2' icon={faUserFriends} style={{ fontSize: 14 }} />
          Friends
        </span>
      </div>
      <div className='channel__direct_message_friends border-l'>
        {isUsersLoading ? (
          <div className='flex justify-center items-center h-full'>
            <LoaderComponent />
          </div>
        ) : (
          <>
            {users.map((user) => (
              <Link key={user.id} href={`/channels/friends/${user.id}`}>
                <div className='channel__direct_message_friend text-sm flex items-center text-gray-600 py-4 px-4 border-b break-words'>
                  <FontAwesomeIcon className='mr-2' icon={faUser} style={{ fontSize: 14 }} />
                  {user?.username}
                </div>
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default FriendsComponent
