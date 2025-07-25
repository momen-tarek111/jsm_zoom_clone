"use client"
import React from 'react'
import Image from "next/image"
import { cn } from '@/lib/utils';
interface HomeCardProps {
    img: string;
    tittle: string;
    description: string;
    handleClick: () => void;
    className: string;
}
const HomeCard = ({ img, tittle, description, handleClick, className }: HomeCardProps) => {
    return (
        <div 
            className={cn('px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer', className)}
            onClick={handleClick}
        >
            <div className="flex-center bg-white/30 backdrop-blur-md rounded-[10px] size-12">
                <Image src={img} width={27} height={27} alt="meeting" />

            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{tittle}</h1>
                <p className="text-lg font-normal">{description}</p>
            </div>
        </div>
    )
}

export default HomeCard