import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const HeroComponent = () => {
  return (
    <section className='relative isolate px-6 lg:px-8'>
      <div className='mx-auto max-w-1xl py-44'>
        <div className='text-center'>
          <h1 className='text-3xl text-gray-900 font-semibold sm:text-6xl'>
            <span className='text-emerald-400'>Seamless</span> conversations and{' '}
            <span className='text-emerald-400'>meaningful</span> connections.
          </h1>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            Talkway is not just another messaging app. It s a vibrant community where ideas flow,
            friendships blossom, and collaboration thrives.
          </p>
          <div className='mt-10 flex items-center justify-center gap-x-6'>
            <Link
              href='/register'
              className='text-sm font-semibold leading-6 text-white bg-emerald-900 py-2 px-4 rounded-full flex items-center lg:mx-1'
            >
              Get started
              <FontAwesomeIcon className='ml-2' icon={faChevronRight} style={{ fontSize: 16 }} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroComponent
