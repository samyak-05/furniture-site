import connectDB from "@/lib/db";
import Product from "@/models/productModel"; 
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const mode = searchParams.get("mode") || "gold";

    if (!query.trim()) {
      return NextResponse.json([], { status: 200 });
    }

    await connectDB();

    // 🚀 FIXED: Robust filtering condition matrix checks
    const modeParam = mode.toLowerCase().trim();
    const isLuxuryFilter = modeParam === 'platinum';
    const searchRegex = { $regex: query.trim(), $options: "i" };

    const queryCondition: any = {
      $or: [
        { name: searchRegex },
        { category: searchRegex },
        { genre: searchRegex }
      ]
    };

    // If platinum mode, pull exclusively where isLuxury is true.
    // If gold mode, pull items that are explicitly false OR missing the property entirely.
    if (isLuxuryFilter) {
      queryCondition.isLuxury = true;
    } else {
      queryCondition.isLuxury = { $ne: true };
    }

    const suggestions = await Product.find(queryCondition)
      .select("name category _id")
      .limit(6)
      .lean();

    return NextResponse.json(suggestions || [], { status: 200 });
  } catch (err) {
    console.error("Suggestions API Deep Search Crash:", err);
    return NextResponse.json([], { status: 500 });
  }
}