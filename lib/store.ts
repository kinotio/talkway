import { create } from 'zustand'
import { persistNSync } from 'persist-and-sync'

type TStore = {
  user: Object
  setUser: (user: Object) => void
}

const useStore = create<TStore>(
  persistNSync(
    (set) => ({
      user: {},
      setUser: (user: Object) => set(() => ({ user }))
    }),
    { name: 'user' }
  )
)

export default useStore
