import { Hash, Menu } from 'lucide-react'
import { MobileToggle } from '@/components/mobile-toggle'
import { UserAvatar } from '@/components/user-avatar'
import { SocketIndicator } from '@/components/socket-indicator'
import { ChatVideoButton } from './chat-video-button'

type TChatHeader = {
    type: 'channel' | 'conversation'
    name: string
    serverId: string
    imageUrl?: string
}
export const ChatHeader = ({
    type,
    name,
    serverId,
    imageUrl
}: TChatHeader) => {
    return (
        <div
            className='text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2'
        >
            <MobileToggle serverId={serverId} />
            {type === 'channel' && (
                <Hash
                    className='w-4 h-4 text-black dark:text-white ml-2'
                />
            )}
            {type === 'conversation' && (
                <UserAvatar
                    src={imageUrl}
                    className='w-8 h-8 md:h-8 md:w-8 mr-1'
                />
            )}
            <p
                className='font-semibold text-md text-black dark:text-white ml-1'
            >
                {name}
            </p>
            <div
                className='ml-auto flex items-center'
            >
                {type === 'conversation' && <ChatVideoButton />}
                <SocketIndicator />
            </div>
        </div>
    )
}