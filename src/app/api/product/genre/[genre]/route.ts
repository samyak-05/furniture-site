import connectDB from "@/lib/db";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ genre: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { genre } = await params;
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode") || "platinum"; 

    if (!genre) {
      return NextResponse.json({ error: "Genre parameter is required" }, { status: 400 });
    }

    await connectDB();

    const targetGenre = genre.toLowerCase().trim();
    const isLuxuryFilter = mode.toLowerCase().trim() === 'platinum';

    const queryCondition: any = {
      genre: targetGenre
    };

    if (isLuxuryFilter) {
      queryCondition.isLuxury = true;
    } else {
      queryCondition.isLuxury = { $ne: true };
    }

    const products = await Product.find(queryCondition)
      .sort({ createdAt: -1 }) 
      .lean();

    return NextResponse.json(products || [], { status: 200 });

  } catch (err) {
    console.error("Genre Products API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}