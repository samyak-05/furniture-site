import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; 
import Product from '@/models/productModel'; 

export async function GET() {
  try {
    await connectDB();
    
    // Fetch 2 most recent non-luxury variant pieces
    const classicProducts = await Product.find({ isLuxury: false })
      .sort({ createdAt: -1 })
      .limit(2)
      .lean();

    return NextResponse.json(classicProducts, { status: 200 });
  } catch (error) {
    console.error("Classic Hero database fetch error:", error);
    return NextResponse.json({ error: "Failed to load classic curation data" }, { status: 500 });
  }
}