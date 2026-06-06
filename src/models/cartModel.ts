import mongoose, { Document } from 'mongoose';

interface ICartItem {
    productId: mongoose.Types.ObjectId | string;
    quantity: number;
    image: string;
    price: number;
    name: string;
}

export interface ICart extends Document {
    userId: string; // 🚀 FIXED: Changed from ObjectId to String to safely map Next-Auth session IDs
    items: ICartItem[];
}

const cartSchema = new mongoose.Schema<ICart>({
    // 🚀 FIXED: type changed to String to avoid casting failures during query validation
    userId: { type: String, required: true, unique: true }, 
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, required: true },
            quantity: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            name: { type: String, required: true }
        }
    ]
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model<ICart>('Cart', cartSchema);

export default Cart;