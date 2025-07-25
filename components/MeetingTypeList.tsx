'use client'

import { useState } from "react"
import HomeCard from "./HomeCard"
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";



const MeetingTypeList = () => {
    const [meetingState,setMeetingState]=useState<'isScheduleMeeting'|'isJoiningMeeting'|'isInstantMeeting'|undefined>();
    const router=useRouter();

    const createMeeting=()=>{}
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'> 
        <HomeCard img="/icons/add-meeting.svg" tittle="New Meeting " description="Setup a new recording" handleClick={()=>setMeetingState('isInstantMeeting')}className="bg-orange-1"/>
        <HomeCard img="/icons/join-meeting.svg" tittle="Join Meeting" description="via invitation link" handleClick={()=>setMeetingState('isJoiningMeeting')} className="bg-blue-1"/>
        <HomeCard img="/icons/schedule.svg" tittle="Schedule Meeting" description="Plan your meeting" handleClick={()=>setMeetingState('isScheduleMeeting')}  className="bg-purple-1"/>
        <HomeCard img="/icons/recordings.svg" tittle="View Recordings" description="Meeting recordings" handleClick={()=>router.push("/recordings")}  className="bg-yellow-1"/>
        <MeetingModel
          isOpen={meetingState === 'isInstantMeeting'}
          onClose={()=>setMeetingState(undefined)}
          title="Start a Instant Meeting"
          className="text-center"
          buttonText="Start Meeting"
          handleClick={createMeeting}

        />
    </section>
  )
}

export default MeetingTypeList