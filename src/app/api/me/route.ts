import { auth } from "@/auth";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest){
    try {
        const session = await auth();
        if(!session || !session.user){
            return NextResponse.json({message : "User not authenticated"}, {status : 400});
        }
        
        const user = await User.findOne({email : session.user.email}).select("-password");

        if(!user){
            return NextResponse.json({message : "User not found"}, {status : 400});
        }

        return NextResponse.json(user, {status : 200});

    } catch (err) {
        return NextResponse.json({error : `Some error occurred: ${err}`}, {status : 500});
    }
}