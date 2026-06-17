import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const session = await auth();
        
        if (session?.user?.role !== "admin") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const orderList = await Order.find({}).sort({ createdAt: -1 });
        
        return NextResponse.json(orderList, { status: 200 });
    } catch (err: any) {
        return NextResponse.json(
            { message: err.message || "Some Error Occured" },
            { status: 500 }
        );
    }
}