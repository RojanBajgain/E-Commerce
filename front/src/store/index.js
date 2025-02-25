import { configureStore } from "@reduxjs/toolkit";
import userReducer, { setUser, clearUser } from "./user.slice";
import cartReducer, { setCart, clearCart } from "./cart.slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
    }
})

export { setUser, clearUser, setCart, clearCart }