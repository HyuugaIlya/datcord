'use client'


import { useState, useEffect } from 'react'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import { Channel } from '@prisma/client'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

import '@livekit/components-styles'

type TMediaRoom = {
    chatId: string,
    video: boolean,
    audio: boolean
}

export const MediaRoom = ({
    audio,
    video,
    chatId
}: TMediaRoom) => {
    const { user } = useUser()
    const [token, setToken] = useState<string>('')

    useEffect(() => {
        if (!user?.firstName || !user?.lastName) return

        const name: string = `${user.firstName} ${user.lastName}`;

        (async () => {
            try {
                const res = await fetch(`/api/livekit?room=${chatId}&username=${name}`)
                const data = await res.json()
                setToken(data.token)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [chatId, user])

    if (!token) return (
        <div className='flex flex-col flex-1 justify-center items-center'>
            <Loader2
                className='h-7 w-7 text-zinc-500 animate-spin my-4'
            />
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
                Loading...
            </p>
        </div>
    )

    return (
        <LiveKitRoom
            data-lk-theme="default"
            video={video}
            audio={audio}
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            connect
        >
            <VideoConference />
        </LiveKitRoom>
    )
}