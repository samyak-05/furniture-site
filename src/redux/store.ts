import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import modeSlice from "./modeSlice"

export const store = configureStore({
    reducer:{
        user : userSlice,
        cart : cartSlice,
        mode : modeSlice
    }

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch