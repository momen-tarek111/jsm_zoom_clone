import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now=new Date();
  const time=now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const date=(new Intl.DateTimeFormat('en-US',{dateStyle: 'full'})).format(now);
  return (
    <section className=' flex flex-col text-white size-full gap-10'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 px-5 py-8 lg:p-11'>
          <h2 className='bg-white/30 backdrop-blur-md rounded p-4 max-w-[280px] py-2 text-center text-base font-normal'>
            Upcoming Meeting at:12:30 PM
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList/>
    </section>
  )
}

export default Home