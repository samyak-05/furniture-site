import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Review from "@/models/reviewModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        let session = await auth();
        if (!session || !session.user) {
            return NextResponse.json(
                { message: "Not authorised to add review" },
                { status: 401 }
            )
        }

        await connectDB();

        let { productId, comment, rating } = await req.json();

        if (!productId || !comment || !rating) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            )
        }

        const numericalRating = Number(rating);
        if (isNaN(numericalRating) || numericalRating < 1 || numericalRating > 5) {
            return NextResponse.json(
                { success: false, message: "Rating parameters must sit strictly between 1 and 5." },
                { status: 400 }
            );
        }

        const userId = session.user.id;

        const existingReview = await Review.findOne({
            product: productId,
            user: userId,
        });

        if (existingReview) {
            return NextResponse.json(
                { message: "You have already reviewed this product!" },
                { status: 400 }
            )
        }

        const newReview = await Review.create({
            user: userId,
            product: productId,
            rating: numericalRating,
            comment: comment.trim(),
        });

        return NextResponse.json(
            { success: true, message: "Review curated successfully.", data: newReview },
            { status: 201 }
        );

    } catch (err : any) {
        console.error("Critical trace on review writing endpoint:", err);
        return NextResponse.json(
            { success: false, error: err.message || "Internal Framework Exception" },
            { status: 500 }
        );
    }
}