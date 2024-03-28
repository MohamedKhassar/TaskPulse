"use client"
import Image from 'next/image'
import React from 'react'
import bgHome from "../../public/images/bgHome.png"
import bg from "../../public/images/bg.jpg"
import { useRouter } from 'next/navigation'
export default function page() {
  const router = useRouter()
  return (
    <div className='flex justify-center m-8'
    >
      <div className='flex justify-center items-center mx-24'>
        <div className='flex flex-col gap-y-5'>
          <h1 className='font-body text-6xl text-left'><span className='font-bold text-[#7A54CC]'>Task</span>Pulse</h1>
          <p className='text-white w-3/4'>
            Task Management Platform Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, officiis, tempora ipsum minima accusantium est quo soluta iusto quasi cumque beatae, repellendus impedit nam tempore recusandae consectetur corrupti architecto id!</p>
          <button className='p-3 capitalize text-white bg-[#7A54CC] duration-300 hover:bg-[#5127aa] rounded-lg w-fit' onClick={() => router.push("/project")}>learn more ...</button>
        </div>
        <Image src={bgHome} className='w-[500px] h-[500px] object-contain' alt='' />
      </div>
    </div>
  )
}
