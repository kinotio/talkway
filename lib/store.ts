import { create } from 'zustand'

export const useUserStore = create((set) => ({
  user: {},
  setUser: (value: any) => set(() => ({ user: value }))
}))
