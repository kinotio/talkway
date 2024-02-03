import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const FooterComponent = () => {
  return (
    <footer className='bg-white relative inset-x-0 bottom-0'>
      <div className='container px-6 py-12 mx-auto'>
        <hr className='my-6 border-gray-700' />

        <div className='flex items-center justify-between'>
          <Link href='/'>
            <Image
              className='h-auto w-auto pr-2'
              src='/assets/images/talkway-logo.png'
              alt='Talkway Logo'
              width='100'
              height='100'
            />
          </Link>

          <div className='flex mx-2'>
            <Link
              href='https://github.com/kinotio/talkway'
              className='mx-2 text-black'
              aria-label='GitHub'
            >
              <FontAwesomeIcon icon={faGithub} style={{ fontSize: 20 }} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent
