import { useEffect, useState } from "react"

type TChatScroll = {
    chatRef: React.RefObject<HTMLDivElement>,
    bottomRef: React.RefObject<HTMLDivElement>,
    shouldLoadMore: boolean,
    loadFn: () => void
    count: number
}

export const useChatScroll = ({
    chatRef,
    bottomRef,
    shouldLoadMore,
    loadFn,
    count,
}: TChatScroll) => {
    const [hasInitialized, setHasInitialized] = useState<boolean>(false)

    useEffect(() => {
        const topDiv: HTMLDivElement | null = chatRef?.current

        const handleScroll = () => {
            const scrollTop: number | undefined = topDiv?.scrollTop

            if (scrollTop === 0 && shouldLoadMore) {
                loadFn()
            }
        }

        topDiv?.addEventListener('scroll', handleScroll)

        return () => topDiv?.removeEventListener('scroll', handleScroll)
    }, [chatRef, loadFn, shouldLoadMore])

    useEffect(() => {
        const bottomDiv: HTMLDivElement | null = bottomRef?.current
        const topDiv: HTMLDivElement | null = chatRef?.current

        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true)
                return true
            }

            if (!topDiv) {
                return false
            }

            const distanceFromBottom: number = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight

            return distanceFromBottom <= 100
        }

        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({
                    behavior: 'smooth'
                })
            }, 100)
        }
    }, [bottomRef, chatRef, hasInitialized, count])


}