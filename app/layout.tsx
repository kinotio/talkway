import '@styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-toastify/dist/ReactToastify.css'

import { config } from '@fortawesome/fontawesome-svg-core'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

const inter = Poppins({ subsets: ['latin'], weight: ['300', '500'] })

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
        {children}
      </body>
    </html>
  )
}

export default RootLayout
