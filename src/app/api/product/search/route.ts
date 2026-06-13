import connectDB from '@/lib/db';
import Product from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q") || "";
        const mode = searchParams.get("mode") || "gold";

        if (!query.trim()) {
            return NextResponse.json(
                [], { status: 200 }
            )
        }

        await connectDB();

        const searchFilter: any = {
            $and: [
                { isLuxury: mode === "platinum" },
                {
                    $or: [
                        { name: { $regex: query, $options: "i" } },
                        { category: { $regex: query, $options: "i" } },
                        { description: { $regex: query, $options: "i" } },
                        { genre: { $regex: query, $options: "i" } },
                    ],
                },
            ],
        };

        const results = await Product.find(searchFilter)
            .select("name price image description genre category")
            .limit(10)
            .lean();

        return NextResponse.json(results, { status: 200 });

    } catch (err) {
        console.error("Search API Failure:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}