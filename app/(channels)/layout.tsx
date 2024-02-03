import ChannelHeaderComponent from '@/components/channels/ChannelHeaderComponent'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ChannelHeaderComponent />
      {children}
    </>
  )
}

export default Layout
