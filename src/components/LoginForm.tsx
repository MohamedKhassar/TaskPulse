"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../public/images/logo.png"
import { EyeIcon, EyeOff, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import GoogleAuth from "./ui/authComponents/GoogleAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        setLoading(false)
        return;
      }
      router.replace("profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid gap-y-8 place-items-center h-screen place-content-center">
      <div className={cn("hidden items-center justify-center absolute w-full h-full backdrop-blur-xl bg-black/5 z-20", loading && "flex")}>
        <LoaderCircle size={50} className="animate-spin" color="#7A54CC" />
      </div>
      <div className="shadow-md shadow-[#7A54CC] p-10 rounded-lg border-t-4 border-[#7A54CC] flex flex-col gap-y-8">
        <h1 className='text-4xl text-center font-body'><span className='font-bold text-[#7A54CC]'>Task</span>Pulse</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-y-3 capitalize text-[#7A54CC]">
            <label htmlFor="email" className="font-extrabold font-body">email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="p-2 rounded outline-none text-sm w-60"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-y-3 capitalize text-[#7A54CC]">
            <label htmlFor="password" className="font-extrabold font-body">password</label>
            <div className="flex items-center justify-end">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={!showPassword ? "password" : "type"}
                placeholder="Password"
                className="p-2 rounded outline-none text-sm w-full"
                id="password"
              />
              <div className="absolute me-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)} >
                {!showPassword ? <EyeIcon size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
          </div>
          <button className={cn("bg-[#7A54CC]/50 hover:bg-[#7A54CC]/70 font-body text-xl rounded duration-300 text-[#2b165a] font-bold cursor-pointer px-6 py-2", loading && "cursor-not-allowed")} disabled={loading && true}>
            Login
          </button>
          <div className="grid gap-x-3">
            <GoogleAuth />
          </div>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          <small className="font-body text-[15px] font-extrabold text-gray-200 mt-3">Don't have an account ? <Link href={"/register"}><span className="underline text-[#7A54CC]">Register</span></Link></small>
        </form>
      </div >
    </div >
  );
}
