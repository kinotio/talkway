import ChannelHeaderComponent from '@/components/channels/ChannelHeaderComponent'

const ChannelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ChannelHeaderComponent />
      {children}
    </div>
  )
}

export default ChannelLayout
