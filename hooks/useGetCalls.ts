import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { use, useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setCalls] = useState<Call[]>([])
    const client = useStreamVideoClient();
    const { user } = useUser();
    const [isLoading, setISLoading] = useState(false)
    useEffect(() => {
        const loadCalls = async () => {
            if (!client || !user?.id) return;
            setISLoading(true)
            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_at: { $exists: true },
                        $or: [
                            { created_by_user_id: user.id },
                            { members: { $in: [user.id] } },
                        ],
                    }
                });
                setCalls(calls);
            } catch (error) {
                console.log(error)
            } finally {
                setISLoading(false)
            }
        }
        loadCalls()
    }, [])
    const now=new Date()
    const endedCalls=calls.filter(({state:{startedAt,endedAt}}:Call)=>{
        return (startedAt&& new Date(startedAt)< now ||!!endedAt)
    })
    const upcomingCalls=calls.filter(({state:{startedAt}}:Call)=>{
        return (startedAt&& new Date(startedAt)> now)
    })

    return { endedCalls, upcomingCalls, callRecordings: calls, isLoading }
} 