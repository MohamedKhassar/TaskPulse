"use client"
import RegisterForm from "@/components/RegisterForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Register() {
  return <RegisterForm />;
}
