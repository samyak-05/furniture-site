import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./models/userModel";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                await connectDB();
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                const user = await User.findOne({ email });

                // 1. If user doesn't exist, return null. 
                // This triggers a standard "CredentialsSignin" error on the frontend.
                if (!user) {
                    return null;
                }

                // 2. If it's a social account, we throw a specific string we can catch.
                if (!user.password) {
                    throw new Error("SOCIAL_LINKED");
                }

                // 3. Check password
                const isPassCorrect = await bcrypt.compare(password, user.password);
                if (!isPassCorrect) {
                    return null; // Return null for wrong password too
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            }
        }),
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    ],

callbacks: {
        async signIn({ user, account }) {
        if (account?.provider === "google") {
            await connectDB();
            let dbUser = await User.findOne({ email: user.email });

            if (!dbUser) {
                dbUser = await User.create({
                    name: user.name,
                    email: user.email,
                    image: user.image
                });
            }
            user.id = dbUser._id.toString();
            user.role = dbUser.role;
        }
        return true;
    },
    jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.role = user.role;
        }
        return token;
    },
    session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
            session.user.role = token.role as string;
        }
        return session;
    }
},
pages: {
    signIn: "/login",
        error: "/login"
},
session: { strategy: "jwt" },
secret: process.env.NEXTAUTH_SECRET || "samyak05",
});