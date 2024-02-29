import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const HeroComponent = () => {
  return (
    <section className='relative isolate px-6 lg:px-8'>
      <div className='mx-auto lg:pt-44 lg:pb-44'>
        <div className='text-center'>
          <h1 className='text-5xl text-gray-900 font-semibold'>
            <span className='text-emerald-400'>Seamless</span> conversations and{' '}
            <span className='text-emerald-400'>meaningful</span> connections.
          </h1>

          <p className='mt-6 text-md leading-8 text-gray-600'>
            Talkway is not just another messaging app. It s a vibrant community where ideas flow,
            friendships blossom, and collaboration thrives.
          </p>
        </div>

        <div className='text-center mt-4 flex justify-center'>
          <Link
            href='https://github.com/kinotio/talkway'
            className='mx-2 text-black'
            aria-label='GitHub'
          >
            <FontAwesomeIcon icon={faGithub} style={{ fontSize: 20 }} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroComponent
