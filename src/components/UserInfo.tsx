"use client";
import { Mail, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";
import { motion } from "framer-motion";

export default function UserInfo() {
  const { data: user } = useSession()
  const [userData, setUserData] = useState({
    image: user?.user.image,
    name: user?.user.name,
  })
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >

      <div className="flex justify-center items-center h-[90vh]">
        <div className="shadow-md shadow-[#7A54CC] px-5 pb-5 rounded-lg border-t-4 border-[#7A54CC] flex flex-col">
          <div className="flex justify-center items-center m-5">
            <Image src={userData.image!} width={900} height={900} className="rounded-full w-56" alt="" />
          </div>
          <div className="flex flex-col gap-y-3">
            <div className="flex gap-x-3 items-center">
              <User color="#ffff" />
              <h1 className="text-xl font-bold font-body text-[#7A54CC]">{user?.user?.name}</h1>
            </div>
            <div className="flex gap-x-3 items-center">
              <Mail color="#ffff" />
              <h1 className="text-xl font-bold font-body text-[#7A54CC]">{user?.user?.email}</h1>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
