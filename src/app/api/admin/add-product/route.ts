import mongoose from "mongoose";
import Product from "@/models/productModel";
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/db";
import { auth } from "@/auth";
import cloudinaryUpload from "@/lib/cloudinary";

export async function POST(req: NextRequest){
    try {
        await connectDB();
        const session = await auth();
        if(session?.user?.role !== "admin"){
            return NextResponse.json({message: "Unauthorized"}, {status: 401});
        }
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price =formData.get("price") as string;
        const category = formData.get("category") as string;
        const imageFiles = formData.getAll("image") as Blob[];
        const isLuxury = formData.get("isLuxury") === "true";

        if (!imageFiles || imageFiles.length === 0) {
            return NextResponse.json({ message: "At least one image is required" }, { status: 400 });
        }

        const uploadPromises = imageFiles.map((file) => cloudinaryUpload(file));
        const imageUrls = await Promise.all(uploadPromises);

        const validUrls = imageUrls.filter((url): url is string => url !== null);

        const newProduct = await Product.create({
            name,
            description,
            price,
            category,
            isLuxury,
            image: validUrls
        })

        return NextResponse.json(
            { message: "Product added successfully"},
            { status: 201 }
        )
        
    }
    catch (err){
        console.error(err);
        return NextResponse.json({
            message : "Unable to add product, try again later"
        }, {status: 500})
    }
}