import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { getConversation } from "@/lib/conversation"
import { ChatHeader } from "@/components/chat/chat-header"
import { ChatMessages } from "@/components/chat/chat-messages"
import { ChatInput } from "@/components/chat/chat-input"
import { MediaRoom } from "@/components/media-room"

type TMemberIdPage = {
    params: {
        memberId: string
        serverId: string
    },
    searchParams: {
        video?: boolean
    }
}
const MemberIdPage = async ({
    params,
    searchParams
}: TMemberIdPage) => {
    const profile = await currentProfile()

    if (!profile) return redirectToSignIn()

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        },
        include: {
            profile: true
        }
    })

    if (!currentMember) return redirect('/')

    const conversation = await getConversation(currentMember.id, params.memberId)

    if (!conversation) return redirect(`/servers/${params.serverId}`)

    const {
        memberOne,
        memberTwo
    } = conversation

    const otherMember = memberOne.profileId === profile.id
        ? memberTwo
        : memberOne

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                type="conversation"
                name={otherMember.profile.name}
                serverId={params.serverId}
                imageUrl={otherMember.profile.imageUrl}
            />
            {searchParams.video && <MediaRoom
                video
                audio
                chatId={conversation.id}
            />}
            {!searchParams.video && <>
                <ChatMessages
                    member={currentMember}
                    name={otherMember.profile.name}
                    chatId={conversation.id}
                    type='conversation'
                    apiUrl="/api/direct-messages"
                    paramKey='conversationId'
                    paramValue={conversation.id}
                    socketUrl="/api/socket/direct-messages"
                    socketQuery={{
                        conversationId: conversation.id
                    }}
                />
                <ChatInput
                    name={otherMember.profile.name}
                    type='conversation'
                    apiUrl="/api/socket/direct-messages"
                    query={{
                        conversationId: conversation.id
                    }}
                />
            </>}
        </div>
    )
}

export default MemberIdPage