import "@/lib/mongodb"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import User from "@/Models/userModel";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string,
          password: string,
        };

        try {
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  }
}

const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };
