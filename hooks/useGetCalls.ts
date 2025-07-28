import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

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
                // console.log(calls)
            } catch (error) {
                console.log(error)
            } finally {
                setISLoading(false)
            }
        }
        loadCalls()
    }, [])
    const now=new Date()
    const endedCalls=calls.filter(({state:{endedAt}}:Call)=>{
        return (endedAt&&!!endedAt)
    })
    const upcomingCalls=calls.filter((call)=>{
        
        return (call.state.startsAt&& new Date(call.state.startsAt)> now)
    })
    return { endedCalls, upcomingCalls, callRecordings: calls, isLoading }
} 