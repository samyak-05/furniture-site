import { NextResponse } from 'next/server';
import connectDB from '@/lib/db'; 
import Product from '@/models/productModel'; 

export const revalidate = 60; 

export async function GET() {
  try {
    await connectDB();
    
    // Fetch the 2 most recent luxury elements
    const recentLuxuryProducts = await Product.find({ isLuxury: true })
      .sort({ createdAt: -1 })
      .limit(2)
      .lean();

    return NextResponse.json(recentLuxuryProducts, { status: 200 });
  } catch (error) {
    console.error("Hero fetch error:", error);
    return NextResponse.json({ error: "Failed to load curation" }, { status: 500 });
  }
}