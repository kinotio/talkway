'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { setCookie } from 'cookies-next'

import { login, register } from '@/actions/user'

const AuthComponent = () => {
  const router = useRouter()

  const [username, setUsername] = useState<string>('')
  const [fullname, setFullname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true)

  const handleLogin = () => {
    setIsLoading(true)

    login({ email, password })
      .then(({ error, data }) => {
        if (error) return toast.error(error.message)
        setCookie('__user', data.user.id)
        setCookie('__token', data.session.access_token)
        router.push('/channels/1')
      })
      .finally(() => {
        setEmail('')
        setPassword('')
        setIsLoading(false)
      })
  }

  const handleRegister = async () => {
    if (passwordConfirm && password !== passwordConfirm) {
      toast.error('Sorry, password dont match')
      return
    }

    setIsLoading(true)

    register({ email, password, username, fullname })
      .then(({ error }) => {
        if (error) return toast.error(error.message)
        toast.success('Signup successful, confirmation mail should be sent soon!')
        setIsLoggingIn(true)
      })
      .finally(() => {
        setFullname('')
        setUsername('')
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setIsLoading(false)
      })
  }

  return (
    <section className='w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg lg:pt-36 lg:pb-36 py-20'>
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
        {!isLoggingIn ? (
          <>
            <div>
              <label htmlFor='fullname' className='block text-sm text-gray-800'>
                Fullname
              </label>
              <input
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                type='text'
                name='fullname'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </div>
            <div className='mt-4'>
              <label htmlFor='username' className='block text-sm text-gray-800'>
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type='text'
                name='username'
                className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
              />
            </div>
          </>
        ) : null}

        <div className='mt-4'>
          <label htmlFor='email' className='block text-sm text-gray-800'>
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            value={password}
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
              value={passwordConfirm}
              type='password'
              name='confirmPassword'
              className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-emerald-400 focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40'
            />
          </div>
        ) : null}

        <div className='mt-6'>
          {isLoggingIn ? (
            <button
              onClick={(e) => {
                e.preventDefault()
                handleLogin()
              }}
              disabled={isLoading}
              className='w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault()
                handleRegister()
              }}
              disabled={isLoading}
              className='w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          )}
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

export default AuthComponent
