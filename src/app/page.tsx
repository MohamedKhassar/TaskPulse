"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
export default function page() {
  const router = useRouter()
  return (
    <div className="sm:flex justify-between items-center w-full h-[80.8vh]">
      <div className="sm:w-1/2 p-10">
        <div className="image object-center text-center">
          <Image src="https://i.imgur.com/WbQnbas.png" width={500} height={500} alt='' />
        </div>
      </div>
      <div className="sm:w-1/2 p-5">
        <div className="text">
          <span className="text-4xl font-body text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
          <h2 className="font-body text-white my-4 font-bold text-3xl  sm:text-xl ">About <span className="text-indigo-600">Our Company</span>
          </h2>
          <p className="text-gray-700 font-body text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, commodi
            doloremque, fugiat illum magni minus nisi nulla numquam obcaecati placeat quia, repellat tempore
            voluptatum.
          </p>
          <button onClick={() => router.push('/project')} className="mt-8 bg-blue-600 hover:bg-blue-400 rounded py-3 px-6 shadow-lg text-white font-body">my project</button>
        </div>
      </div>
    </div>
  )
}
