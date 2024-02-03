import '@styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { config } from '@fortawesome/fontawesome-svg-core'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

const inter = Montserrat({ subsets: ['latin'], weight: '500' })

import DefaultLayout from '@/layouts/DefaultLayout'
import ChannelLayout from '@/layouts/ChannelLayout'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Talkway',
  description: 'Your ultimate destination for seamless conversations and meaningful connections.'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ToastContainer
          hideProgressBar={true}
          icon={false}
          position='top-center'
          theme='colored'
          autoClose={5000}
        />
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  )
}

export default RootLayout
