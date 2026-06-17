import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest){
    try {
        await connectDB();
        const session = await auth();
        if(session?.user?.role !== "admin"){
            return NextResponse.json({message : "Unauthorized"}, {status : 401});
        }

        const productList = await Product.find({}).sort({views : -1});
        
        return NextResponse.json(
            productList,
            {status : 200}
        )
    } catch (err) {
        return NextResponse.json(
            {message : `Some Error Occured : ${err}`},
            {status : 500}
        )
    }
}