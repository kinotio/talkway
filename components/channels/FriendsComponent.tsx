'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faUser } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify'
import { getCookie } from 'cookies-next'
import { useParams } from 'next/navigation'

import LoaderComponent from '@/components/LoaderComponent'

import { getUsers, listenUser } from '@/actions/user'

import { supabase } from '@/lib/supabase'

const FriendsComponent = () => {
  const { receiverId } = useParams()

  const userId = getCookie('__user') as string

  const [users, setUsers] = useState<Array<{ [key: string]: any }>>([])

  const [isUsersLoading, setIsUsersLoading] = useState<boolean>(false)

  const [newUser, handleNewUser] = useState<{ new: any }>({ new: null })
  const [deletedUser, handleDeletedUser] = useState<{ old: any }>({
    old: null
  })

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

  useEffect(() => {
    const userListener = listenUser({ handleNewUser, handleDeletedUser })
    return () => {
      supabase.removeChannel(supabase.channel(userListener))
    }
  }, [])

  useEffect(() => {
    if (newUser) setUsers(users.concat(newUser.new))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser])

  useEffect(() => {
    if (deletedUser) setUsers(users.filter((user) => user.id !== deletedUser.old.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedUser])

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
              <Link
                className={`${user.id === receiverId?.toString() ? 'bg-emerald-600 text-white' : 'text-gray-600'}`}
                key={user.id}
                href={`/channels/friends/${user.id}`}
              >
                <div className='channel__direct_message_friend text-sm flex items-center py-4 px-4 border-b'>
                  <FontAwesomeIcon className='mr-4' icon={faUser} style={{ fontSize: 14 }} />
                  <div className='flex flex-col'>
                    <span className='break-words'>{user?.fullname}</span>
                    <span className='text-xs font-semibold text-emerald-500'>{user?.username}</span>
                  </div>
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
