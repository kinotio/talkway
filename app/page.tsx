'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import UserContext from '@lib/user'
import { supabase, fetchUserRoles } from '@lib/supabase'

import HeroComponent from '@/components/home/HeroComponent'
import AuthFormComponent from '@/components/home/AuthFormComponent'

const Page = () => {
  const router = useRouter()

  const [userLoaded, setUserLoaded] = useState(false)
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [userRoles, setUserRoles] = useState([])

  useEffect(() => {
    function saveSession(session: any) {
      setSession(session)

      const currentUser = session?.user
      setUser(currentUser ?? null)
      setUserLoaded(!!currentUser)

      if (currentUser) {
        signIn()
        router.push('/channels/[id]')
      }
    }

    supabase.auth.getSession().then(({ data: { session } }) => saveSession(session))

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, session) => saveSession(session))

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async () => {
    await fetchUserRoles((userRoles: any) =>
      setUserRoles(userRoles.map((userRole: any) => userRole.role))
    )
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      router.push('/')
    }
  }

  return (
    <UserContext.Provider
      value={{
        userLoaded,
        user,
        userRoles,
        signIn,
        signOut
      }}
    >
      <section className='bg-white'>
        <div className='container px-6 py-24 mx-auto lg:py-32'>
          <div className='lg:flex'>
            <div className='lg:w-1/2'>
              <HeroComponent />
            </div>

            <div className='mt-8 lg:w-1/2 lg:mt-0'>
              <div className='w-full lg:max-w-xl'>
                <AuthFormComponent />
              </div>
            </div>
          </div>
        </div>
      </section>
    </UserContext.Provider>
  )
}

export default Page
