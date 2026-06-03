import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IProduct {
    _id?: mongoose.Types.ObjectId | string; 
    name: string;
    price: string;
    description: string;
    category: string;
    isLuxury: boolean;
    createdAt?: Date;
    image: Array<string>;
    model3d?: string;
    views: number;
    genre: string;
    quantity: number;
}

interface ICartSlice {
    cartData: IProduct[];
}

const initialState: ICartSlice = {
    cartData: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {

            const existingItem = state.cartData.find(
                (item) => item._id?.toString() === action.payload._id?.toString()
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartData.push({ ...action.payload, quantity: 1 });
            }
        },
        increaseQuantity: (state, action: PayloadAction<string | mongoose.Types.ObjectId>) => {
            const item = state.cartData.find(
                (p) => p._id?.toString() === action.payload.toString()
            );
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string | mongoose.Types.ObjectId>) => {
            const item = state.cartData.find(
                (p) => p._id?.toString() === action.payload.toString()
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
    }
});

export const { addToCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;