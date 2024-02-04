import { supabase } from '@/lib/supabase'

export const getMessages = async ({ channelId }: { channelId: number }) => {
  return await supabase
    .from('messages')
    .select(`*, author:user_id(*)`)
    .eq('channel_id', channelId)
    .order('inserted_at', { ascending: true })
}

export const createMessage = async ({
  message,
  channelId,
  userId
}: {
  message: string
  channelId: number
  userId: string
}) => {
  return await supabase
    .from('messages')
    .insert([{ message, channel_id: channelId, user_id: userId }])
    .select()
}

export const deleteMessage = async ({ messageId }: { messageId: number }) => {
  return await supabase.from('messages').delete().match({ id: messageId })
}
