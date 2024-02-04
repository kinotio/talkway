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

export const getDirectMessages = async ({
  senderId,
  receiverId
}: {
  senderId: any
  receiverId: any
}) => {
  return await supabase
    .from('direct_messages')
    .select(`*`)
    .or('sender_id.eq.' + senderId + ',receiver_id.eq.' + senderId)
    .or('receiver_id.eq.' + receiverId + ',sender_id.eq.' + receiverId)
    .order('inserted_at', { ascending: true })
}

export const createDirectMessage = async ({
  message,
  senderId,
  receiverId
}: {
  message: string
  senderId: string
  receiverId: string
}) => {
  return await supabase
    .from('direct_messages')
    .insert([{ message, sender_id: senderId, receiver_id: receiverId }])
    .select()
}

export const deleteDirectMessage = async ({ directMessageId }: { directMessageId: number }) => {
  return await supabase.from('direct_messages').delete().match({ id: directMessageId })
}

export const deleteMessage = async ({ messageId }: { messageId: number }) => {
  return await supabase.from('messages').delete().match({ id: messageId })
}
