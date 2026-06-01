import connectDB from "@/lib/db"; 
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest, 
  context: any // Using any here lets us safely extract params dynamically
) {
  try {
    await connectDB();
    
    // Resolve params safely whether it is a Promise (Next.js 15+) or a plain object
    const params = await context.params;
    const id = params?.id;

    // This will print directly to your VS Code terminal when clicked
    console.log("--> Received View Increment Request for Product ID:", id);

    if (!id) {
      return NextResponse.json({ message: "Missing product ID" }, { status: 400 });
    }

    // $inc atomically increments the field by 1
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!updatedProduct) {
      console.log(`--> Product with ID ${id} not found in database.`);
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    console.log(`--> Success! New view count for ${updatedProduct.name}: ${updatedProduct.views}`);
    return NextResponse.json({ success: true, views: updatedProduct.views }, { status: 200 });
  } catch (err) {
    console.error("Error updating view count:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}