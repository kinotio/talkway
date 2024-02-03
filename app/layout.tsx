import '@styles/globals.css'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const inter = Montserrat({ subsets: ['latin'], weight: '500' })

export const metadata: Metadata = {
  title: 'Talkway',
  description: 'Your ultimate destination for seamless conversations and meaningful connections.'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
