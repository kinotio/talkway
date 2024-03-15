type TUser = {
  created_at: Date
  email: string
  fullname: string
  id: string
  status: string
  username: string
}

type TChannel = {
  id: number
  slug: string
  created_by: Date
  inserted_at: Date
}

type TMessage = {
  id: number
  message: string
  user_id: string
  channel_id: number
  inserted_at: number
}

type TDirectMessage = {
  id: number
  message: string
  sender_id: string
  receiver_id: string
  inserted_at: Date
}
