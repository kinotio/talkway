import { Montserrat } from 'next/font/google'

import ChannelHeaderComponent from '@/components/channels/ChannelHeaderComponent'

const inter = Montserrat({ subsets: ['latin'], weight: '500' })

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ChannelHeaderComponent />
        {children}
      </body>
    </html>
  )
}

export default ChannelLayout
