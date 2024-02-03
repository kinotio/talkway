import { Montserrat } from 'next/font/google'

import HeaderComponent from '@/components/home/HeaderComponent'
import FooterComponent from '@/components/home/FooterComponent'

const inter = Montserrat({ subsets: ['latin'], weight: '500' })

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <HeaderComponent />
        {children}
        <FooterComponent />
      </body>
    </html>
  )
}

export default ChannelLayout
