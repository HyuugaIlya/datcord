import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatInput } from "@/components/chat/chat-input"
import { ChatMessages } from "@/components/chat/chat-messages"
import { ChannelType } from "@prisma/client"
import { MediaRoom } from "@/components/media-room"

type TChannelIdPage = {
    params: {
        serverId: string
        channelId: string
    }
}
const ChannelIdPage = async ({
    params
}: TChannelIdPage) => {
    const profile = await currentProfile()

    if (!profile) return redirectToSignIn()

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        },
    })

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    })

    if (!channel || !member) return redirect('/')

    return (
        <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
            <ChatHeader
                type='channel'
                name={channel.name}
                serverId={channel.serverId}
            />
            {channel.type === ChannelType.TEXT && <>
                <ChatMessages
                    type='channel'
                    name={channel.name}
                    chatId={channel.id}
                    member={member}
                    apiUrl="/api/messages"
                    socketUrl="/api/socket/messages"
                    socketQuery={{
                        channelId: channel.id,
                        serverId: channel.serverId
                    }}
                    paramKey="channelId"
                    paramValue={channel.id}
                />
                <ChatInput
                    type='channel'
                    name={channel.name}
                    apiUrl='/api/socket/messages'
                    query={{
                        channelId: channel.id,
                        serverId: channel.serverId,
                    }}
                />
            </>}
            {channel.type === ChannelType.AUDIO && <MediaRoom
                chatId={channel.id}
                video={false}
                audio
            />}
            {channel.type === ChannelType.VIDEO && <MediaRoom
                chatId={channel.id}
                audio={false}
                video
            />}
        </div>
    )
}

export default ChannelIdPage