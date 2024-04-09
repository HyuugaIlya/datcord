import { create } from 'zustand'
import { ServerWithMembersWithProfiles } from "@/types"
import { Channel, ChannelType } from '@prisma/client'

export type TModal = 'createServer' | 'invite' | 'editServer' | 'members' | 'createChannel' | 'leaveServer' | 'deleteServer' | 'deleteChannel' | 'editChannel' | 'messageFile' | 'deleteMessage'

type TModalData = {
    server?: ServerWithMembersWithProfiles,
    channel?: Channel,
    channelType?: ChannelType
    apiUrl?: string
    query?: Record<string, any>
}
type TModalStore = {
    type: TModal | null
    data: TModalData
    isOpen: boolean
    onOpen: (type: TModal, data?: TModalData) => void
    onClose: () => void
}
export const useModal = create<TModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false }),
}))