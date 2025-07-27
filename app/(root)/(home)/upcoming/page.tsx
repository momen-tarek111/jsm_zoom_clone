import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
    return (
        <section className=' flex flex-col text-white size-full gap-10'>
            <h1 className='text-3xl font-bold'>
                Upcoming
            </h1>
            <CallList type="upcoming"/>
        </section>
    )
}

export default Upcoming