'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { supabase } from '@lib/supabase'
import { toast } from 'react-toastify'

const AuthFormComponent = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(true)

  const handleAuth = async () => {
    if (passwordConfirm && password !== passwordConfirm) {
      toast.error('Sorry, password dont match')
      return
    }

    setIsLoading(true)

    try {
      const {
        error,
        data: { user }
      } = isLoggingIn
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({
            email,
            password
          })

      if (error) {
        toast.error('An error occurred with auth: ' + error.message)
      } else if (!user) {
        toast.success('Signup successful, confirmation mail should be sent soon!')
      }
    } catch (error: any) {
      toast.error('An error occurred while signing in', error.error_description || error)
    } finally {
      setEmail('')
      setPassword('')
      setPasswordConfirm('')

      setIsLoading(false)
    }
  }

  return (
    <section className='w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg py-36'>
      <div className='flex justify-center mx-auto'>
        <Image
          className='h-auto w-auto pr-2'
          src='/assets/images/talkway-logo-dark.png'
          alt='Talkway Logo'
          width='100'
          height='100'
        />
      </div>

      <form className='mt-6'>
        <div>
          <label htmlFor='email' className='block text-sm text-gray-800'>
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='text'
            name='email'
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div className='mt-4'>
          <div className='flex items-center justify-between'>
            <label htmlFor='password' className='block text-sm text-gray-800'>
              Password
            </label>
          </div>

          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            name='password'
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        {!isLoggingIn ? (
          <div className='mt-4'>
            <div className='flex items-center justify-between'>
              <label htmlFor='confirmPassword' className='block text-sm text-gray-800'>
                Confirm Password
              </label>
            </div>

            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              type='password'
              name='confirmPassword'
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
        ) : null}

        <div className='mt-6'>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleAuth()
            }}
            disabled={isLoading}
            className='w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-800 rounded-lg hover:bg-emerald-950 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
          >
            {isLoggingIn ? 'Login' : 'Register'}
          </button>
        </div>
      </form>

      <p className='mt-8 text-xs font-light text-center text-gray-400'>
        Dont have an account?
        <button
          onClick={() => setIsLoggingIn(!isLoggingIn)}
          className='font-medium text-emerald-500 hover:underline ml-1'
        >
          {!isLoggingIn ? 'Login' : 'Register'}
        </button>
      </p>
    </section>
  )
}

export default AuthFormComponent
