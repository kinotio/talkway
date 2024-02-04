import { supabase } from '@/lib/supabase'

export const getUser = async ({ userId }: { userId: string }) => {
  return await supabase.from('users').select(`*`).eq('id', userId)
}

export const getUserRoles = async () => {
  return await supabase.from('user_roles').select(`*`)
}

export const login = async ({ email, password }: { email: string; password: string }) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const register = async ({ email, password }: { email: string; password: string }) => {
  return await supabase.auth.signUp({ email, password })
}

export const logout = async () => {
  return await supabase.auth.signOut()
}
