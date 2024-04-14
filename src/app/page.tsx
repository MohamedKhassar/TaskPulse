"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
import Home from "../../public/images/home.png"
import { motion } from "framer-motion";

export default function page() {
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sm:flex justify-center gap-x-80 items-center w-full h-[80.8vh]">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center ">
            <Image src={Home} alt='' className='rounded-md w-[80vh]' />
          </div>
        </div>
        <div className="sm:w-1/2 p-5 flex justify-center items-center">
          <div className="text w-full h-full">
            <span className="text-4xl font-body text-gray-500 border-b-2 border-indigo-600 uppercase">About us</span>
            <h2 className="font-body text-white my-4 font-bold text-3xl  sm:text-xl ">About <span className="text-indigo-600">Our Company</span>
            </h2>
            <p className="text-gray-700 font-body text-xl w-2/3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, commodi
              doloremque, fugiat illum magni minus nisi nulla numquam obcaecati placeat quia, repellat tempore
              voluptatum.
            </p>
            <button onClick={() => router.push('/project')} className="mt-8 bg-blue-600 hover:bg-blue-400 rounded py-3 px-6 shadow-lg text-white font-body">my project</button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
