import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { name, email, password } = await req.json();

        //Check if user already exists
        const exsistingEmail = await User.findOne({ email });
        if (exsistingEmail) {
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        //Password length check
        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({
            newUser
        }, { status: 200 });

    } catch (err) {
        console.error("Error in signup route:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}