import NextAuth, { DefaultSession } from "next-auth"
import { User } from "./SchemasTypes";

declare module 'next-auth' {
    interface Session {
      user:User & DefaultSession['user'];
    }
  }