import { supabase } from '@/lib/supabase'

export const getUsers = async () => {
  return await supabase.from('users').select(`*`)
}

export const getUser = async ({ userId }: { userId: string }) => {
  return await supabase.from('users').select(`*`).eq('id', userId)
}

export const getUserRoles = async () => {
  return await supabase.from('user_roles').select(`*`)
}

export const login = async ({ email, password }: { email: string; password: string }) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const register = async ({
  email,
  password,
  username,
  fullname
}: {
  email: string
  password: string
  username: string
  fullname: string
}) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        fullname
      }
    }
  })
}

export const logout = async () => {
  return await supabase.auth.signOut()
}

export const listenUser = ({
  handleNewUser,
  handleDeletedUser
}: {
  handleNewUser: Function
  handleDeletedUser: Function
}) => {
  return supabase
    .channel('public:users')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users' }, (payload) =>
      handleNewUser({ new: payload.new })
    )
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'users' }, (payload) =>
      handleDeletedUser({ old: payload.old })
    )
    .subscribe() as any
}

export const updateUser = ({ user }: { user: TUser }) => {
  return supabase.auth.updateUser({
    data: {
      username: user.username,
      fullname: user.fullname
    }
  })
}
