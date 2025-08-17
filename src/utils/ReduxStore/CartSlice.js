import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cartState: false,
        list: null
    }
    ,
    reducers: {
        toggleCartState: (state) => {
            state.cartState = !state.cartState;
        }
    }
})

export const { toggleCartState } = CartSlice.actions;
export default CartSlice.reducer;