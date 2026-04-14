import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./models/userModel";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "password", type: "password" }
            },

            async authorize(credentials) {
                try {
                    await connectDB();

                    const email = credentials?.email as string;
                    const password = credentials?.password as string;

                    if (!email || !password) {
                        return null;
                    }

                    const user = await User.findOne({ email });

                    if (!user) {
                        return null;
                    }

                    const isPassCorrect = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isPassCorrect) {
                        return null;
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: user.name,
                        role : user.role
                    };

                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        })
    ],

    callbacks:{
        jwt({token, user}){
            if(user){
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }

            return token;
        },

        session({session, token}){
            if(session.user){
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.role = token.role as string;
            }
            return session;
        }
    },

    pages:{
        signIn: "/login",
        error: "/login"
    },

    session: {
        strategy: "jwt",
        maxAge: 10 * 24 * 60 * 60, // 10 days
    },

    secret: process.env.NEXTAUTH_SECRET,
});