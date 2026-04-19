import { NextRequest, NextResponse } from "next/server";
import connectDB from '@/lib/db'
import { auth } from "@/auth";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const { newMobile } = await request.json();
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Unauthorized: Please sign in to update your mobile number" },
                { status: 401 }
            );
        }
        const user = await User.findOneAndUpdate({email : session?.user?.email}, {mobile: newMobile}, {new: true});
        if(!user){
            return NextResponse.json(
                {message: "User not found"},
                {status: 404}
            )
        }

        return NextResponse.json(
            user,
            {status: 200}
        )
    } catch (err) {
        return NextResponse.json(
            {message: `Error updating mobile number: ${err}`},
            {status: 500}
        )
    }
    
}