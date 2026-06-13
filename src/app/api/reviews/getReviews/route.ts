import connectDB from "@/lib/db";
import Product from "@/models/productModel";
import Review from "@/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{ id: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        await connectDB();
        let { id } = await params;
        const product = await Product.findById(id);

        if (!product) {
            return NextResponse.json(
                { mesaage: "Product does not exist" },
                { status: 404 }
            )
        }

        const reviews = await Review.find({ product: id }).populate("user", "image name");

        return NextResponse.json({
            success: true,
            data: {
                ...product.toObject(),
                reviews: reviews
            }
        }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}