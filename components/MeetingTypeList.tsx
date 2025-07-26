'use client'

import HomeCard from './HomeCard';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { lazy, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import MeetingModel from './MeetingModel';

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const router = useRouter();
  const [callDetails, setCallDetails] = useState<Call>()
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const { user } = useUser();
  const client = useStreamVideoClient();
  const createMeeting = async () => {
    
    if (!user || !client) return;
    try {
      if (!values.dateTime) {
        toast('Please select a date and time');
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id)
      if (!call) throw new Error("Failed to create call");
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${id}`);
      }
      
      toast('Meeting Created');
    } catch (error) {
      console.log("Error creating meeting:", error);
      toast("Failed to create meeting")
    }
  }
  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard img="/icons/add-meeting.svg" tittle="New Meeting " description="Setup a new recording" handleClick={() => setMeetingState('isInstantMeeting')} className="bg-orange-1" />
      <HomeCard img="/icons/join-meeting.svg" tittle="Join Meeting" description="via invitation link" handleClick={() => setMeetingState('isJoiningMeeting')} className="bg-blue-1" />
      <HomeCard img="/icons/schedule.svg" tittle="Schedule Meeting" description="Plan your meeting" handleClick={() => setMeetingState('isScheduleMeeting')} className="bg-purple-1" />
      <HomeCard img="/icons/recordings.svg" tittle="View Recordings" description="Meeting recordings" handleClick={() => router.push("/recordings")} className="bg-yellow-1" />
      <MeetingModel
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start a Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}

      />
    </section>
  )
}

export default MeetingTypeList