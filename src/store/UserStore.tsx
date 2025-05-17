import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  user: any
  create: (params: any) => void
  delete: () => void
}

export const userStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      create: (params) => set(() => ({ user: params })),
      delete: () => set(() => ({ user: null }))
    }),
    { name: 'user' }
  )
)