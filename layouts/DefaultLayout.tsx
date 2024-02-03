import HeaderComponent from '@/components/home/HeaderComponent'
import FooterComponent from '@/components/home/FooterComponent'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <HeaderComponent />
      {children}
      <FooterComponent />
    </div>
  )
}

export default DefaultLayout
