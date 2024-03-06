import SibebarComponent from '@/components/channels/SibebarComponent'
import FriendsComponent from '@/components/channels/FriendsComponent'
import HeaderComponent from '@/components/channels/HeaderComponent'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='channel__container'>
      <HeaderComponent />
      <div className='channel__content'>
        <SibebarComponent />
        {children}
        <FriendsComponent />
      </div>
    </div>
  )
}

export default Layout
