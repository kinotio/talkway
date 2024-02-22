import { supabase } from '@/lib/supabase'

export const getChannels = async () => {
  return await supabase.from('channels').select('*')
}

export const getChannel = async ({ channelId }: { channelId: number }) => {
  return await supabase.from('channels').select(`*`).eq('id', channelId)
}

export const createChannel = async ({
  channelName,
  userId
}: {
  channelName: string
  userId: string
}) => {
  return await supabase
    .from('channels')
    .insert([{ slug: channelName, created_by: userId }])
    .select()
}

export const deleteChannel = async ({ channelId }: { channelId: number }) => {
  return await supabase.from('channels').delete().match({ id: channelId })
}

export const listenChannel = ({
  handleNewChannel,
  handleDeletedChannel
}: {
  handleNewChannel: Function
  handleDeletedChannel: Function
}) => {
  return supabase
    .channel('public:channels')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'channels' }, (payload) =>
      handleNewChannel({ new: payload.new })
    )
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'channels' }, (payload) =>
      handleDeletedChannel({ old: payload.old })
    )
    .subscribe() as any
}
