import { supabase } from '@/lib/supabase'

export const getChannels = async () => {
  return await supabase.from('channels').select('*')
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
