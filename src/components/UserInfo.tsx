"use client";
import { Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
export default function UserInfo() {
  const { data: user } = useSession()
  const [isEdit, setIsEdit] = useState(false)
  const [userData, setUserData] = useState({
    image: user?.user.image,
    name: user?.user.name,
  })
  return (
    <div className="flex justify-center items-center h-[90vh]">

      <div className="shadow-md shadow-[#7A54CC] px-5 pb-5 min-w rounded-lg border-t-4 border-[#7A54CC] flex flex-col">
        <div className="flex justify-center items-center m-5">
          {isEdit ?
            <>
              <label htmlFor="image">
                <Image src={userData.image!} width={900} height={900} className="rounded-full w-56" alt="" />
              </label>
              <input type="file" className="hidden" onChange={(e) => setUserData({ ...userData })} name="" id="image" />
            </>
            :
            <Image src={userData.image!!} width={900} height={900} className="rounded-full w-56" alt="" />
          }
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="flex gap-x-3 items-center">
            <User color="#ffff" />
            {isEdit ? <input type="text" className="bg-transparent outline-none border-b border-b-white p-1" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} /> :
              <h1 className="text-xl font-bold font-body text-[#7A54CC]">{user?.user?.name}</h1>
            }
          </div>
          <div className="flex gap-x-3 items-center">
            <Mail color="#ffff" />
            <h1 className="text-xl font-bold font-body text-[#7A54CC]">{user?.user?.email}</h1>
          </div>
          {!isEdit ?
            <div className="grid gap-x-5 my-3">
              <button className="duration-300 p-2 w rounded-lg bg-sky-900 hover:bg-sky-950" onClick={() => setIsEdit(true)}>Edit</button>
            </div>
            :
            <div className="grid grid-cols-2 gap-x-5 my-3">
              <button className="duration-300 p-2 w rounded-lg bg-sky-900 hover:bg-sky-950">Confirm</button>
              <button className="duration-300 p-2 w rounded-lg bg-red-800 hover:bg-red-900" onClick={() => setIsEdit(false)}>Cancel</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
