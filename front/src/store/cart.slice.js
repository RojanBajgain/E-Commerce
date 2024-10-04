import { createSlice } from "@reduxjs/toolkit";
import { fromStorage, inStorage } from "../lib";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: JSON.parse(fromStorage('12pmcart') ?? '{}'),
    },
    reducers: {
        setCart: (state, action) => {
            state.value = action.payload
            inStorage('12pmcart', JSON.stringify(state.value), true)
        },
        clearCart: state => {
            state.value = {}
        }
    }
})

export default cartSlice.reducer
export const { setCart, clearCart } = cartSlice.actions