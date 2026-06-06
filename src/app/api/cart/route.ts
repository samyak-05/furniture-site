import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Cart from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
        }

        await connectDB();
        const cart = await Cart.findOne({ userId: session.user.id });
        return NextResponse.json(cart ? cart.items : [], { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: `Error Occured : ${err}` }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
        }

        const { items } = await req.json();
        
        if (!Array.isArray(items)) {
            return NextResponse.json({ message: "Invalid payload layout structure" }, { status: 400 });
        }

        await connectDB();
        const formattedItems = items.map((item: any) => ({
            productId: item._id,
            name: item.name,
            price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
            image: item.image?.[0] || item.image || "",
            quantity: Number(item.quantity) || 1,
        }));

        const updatedCart = await Cart.findOneAndUpdate(
            { userId: session.user.id },
            { items: formattedItems },
            { 
                upsert: true, 
                returnDocument: 'after' 
            }
        );

        return NextResponse.json(updatedCart ? updatedCart.items : [], { status: 200 });

    } catch (err) {
        return NextResponse.json({ message: `Error Occured : ${err}` }, { status: 500 });
    }
}