'use client';
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCartData } from "@/redux/cartSlice";

export function useSyncCart() {
    const dispatch = useDispatch<AppDispatch>();
    const { status } = useSession();
    const { cartData } = useSelector((state: RootState) => state.cart);
    const initial = useRef(true);

    useEffect(() => {
        if (status !== "authenticated") return;

        const fetchCart = async () => {
            try {
                const res = await axios.get("/api/cart");
                if (res.data) {
                    const normalised = res.data.map((item: any) => ({
                        _id: item.productId,
                        name: item.name,
                        price: item.price,
                        image: [item.image],
                        quantity: item.quantity,
                    }));
                    dispatch(setCartData(normalised));
                }
            } catch (err) {
                console.error("Error fetching cart data:", err);
            } finally {
                initial.current = false;
            }
        };

        fetchCart();
    }, [status, dispatch]);

    useEffect(() => {
        if (status !== "authenticated" || initial.current) return;

        const syncCartToDB = async () => {
            try {
                await axios.post("/api/cart", { items: cartData });
            } catch (err) {
                console.error("Failed to sync cart data to DB:", err);
            }
        };  

        const delayDebounce = setTimeout(() => {
            syncCartToDB();
        }, 600);

        return () => clearTimeout(delayDebounce);
    }, [cartData, status]);
}