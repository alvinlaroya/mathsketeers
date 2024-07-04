import { create } from 'zustand'

export const useProfileStore = create((set) => ({
    profile: {},
    profiles: [],
    setProfile: (payload: object) => set({ profile: payload }),
    setProfiles: (payload: object) => set({ profiles: payload }),
}))

export const useUserManagementStore = create((set) => ({
    userRequests: [],
    setUserRequests: (payload: object) => set({ userRequests: payload })
}))