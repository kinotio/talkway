'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { supabase } from '@lib/supabase'

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleRegister = async () => {
    if (password !== passwordConfirm) return

    try {
      const {
        error,
        data: { user }
      } = await supabase.auth.signUp({ email, password })
      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        alert('Error with auth: ' + error.message)
      } else if (!user) alert('Signup successful, confirmation mail should be sent soon!')
    } catch (error: any) {
      console.log('error', error)
      alert(error.error_description || error)
    }
  }
  return (
    <section className='w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg py-24'>
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
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
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
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

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
            className='block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
          />
        </div>

        <div className='mt-6'>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleRegister()
            }}
            className='w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-800 rounded-lg hover:bg-emerald-950 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
          >
            Register
          </button>
        </div>
      </form>

      <p className='mt-8 text-xs font-light text-center text-gray-400'>
        {' '}
        Already have an account?{' '}
        <Link href='/login' className='font-medium text-emerald-500 hover:underline'>
          Login
        </Link>
      </p>
    </section>
  )
}

export default Page
