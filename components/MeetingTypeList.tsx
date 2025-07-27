'use client'

import HomeCard from './HomeCard';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import MeetingModel from './MeetingModel';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';

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
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
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
      {
        !callDetails ? (
          <MeetingModel
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}
          >
            <div className='flex flex-col gap-2.5'>
              <label className='text-base font-normal leading-[22px] text-sky-2'>Add a description</label>
              <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                onChange={(e) => { setValues({ ...values, description: e.target.value }) }}
              />
            </div>
            <div className='flex flex-col gap-2.5'>
              <label className='text-base font-normal leading-[22px] text-sky-2'>Select Date and Time</label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => { setValues({ ...values, dateTime: date! }) }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-dark-3 p-2 focus:outline-none bg-dark-1"
              />
            </div>
          </MeetingModel>
        ) :
          (
            <MeetingModel
              isOpen={meetingState === 'isScheduleMeeting'}
              onClose={() => setMeetingState(undefined)}
              title="Meeting Created"
              className="text-center"
              buttonText="Copy Meeting Link"
              handleClick={() => {
                navigator.clipboard.writeText(meetingLink)
                toast('Meeting Created');
              }}
              image='/icons/checked.svg'
              buttonIcon='/icons/copy.svg'
            />
          )
      }
      <MeetingModel
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start a Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}

      />

      <MeetingModel
        isOpen={meetingState ==="isJoiningMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={()=>{router.push(new URL(values.link).pathname.slice(1) + (new URL(values.link).search))}}
      >
        <Input 
          placeholder='Meeting link' 
          className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          onChange={(e)=>{setValues({...values,link:e.target.value})}}
          />
      </MeetingModel>
    </section>
  )
}

export default MeetingTypeList