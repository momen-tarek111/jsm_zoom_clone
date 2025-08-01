"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void}) => {
    const [isMicCamSetup, setIsMicCamSetup] = useState(false)
    const call = useCall()
    console.log(call)
    if (!call) {
        throw new Error(
            'useStreamCall must be used within a StreamCall component.',
        );
    }

    useEffect(() => {
        if (isMicCamSetup) {
            call?.camera?.disable();
            call?.microphone?.disable();
        }
        else {
            call?.camera?.enable();
            call?.microphone?.enable();
        }
    }, [isMicCamSetup, call?.camera, call?.microphone])
    return (
        <div className='flex w-full h-screen flex-col items-center justify-center gap-3 text-white'>
            <h1 className='text-2xl font-bold'>
                Setup
            </h1>
            <VideoPreview/>
            <div className='flex-center h-16 gap-3 '>
                <label className='flex-center gap-2 font-medium'>
                    <input type="checkbox" checked={isMicCamSetup} onChange={(e)=>{setIsMicCamSetup(e.target.checked)}}/>
                    Join with Mic and Camera off
                </label>
                <DeviceSettings/>
            </div>
            <Button className='rounded-md bg-green-500 px-4 py-2.5 '
                onClick={() => {call.join() ; setIsSetupComplete(true);}}>
                Join Meeting
            </Button>
        </div>
    )
}

export default MeetingSetup