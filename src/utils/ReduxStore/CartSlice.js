import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: "cart",
    initialState: {
        cartState: false,
        items: []
    },
    reducers: {
        toggleCartState: (state) => {
            state.cartState = !state.cartState;
        },

        addToCart: (state, action) => {
            const existingItemIndex = state.items.findIndex(
                item => action?.payload?.id === item.id &&
                    item.restaurantName === action?.payload?.restaurantName
            );

            if (existingItemIndex > -1) {
                state.items[existingItemIndex].quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        updateItemQuantity: (state, action) => {
            const { itemId, restaurantName, value } = action.payload;

            const existingItemIndex = state.items.findIndex(
                item => item.id === itemId && item.restaurantName === restaurantName
            );

            if (existingItemIndex > -1) {
                state.items[existingItemIndex].quantity += value;

                // If quantity drops to 0 or below → remove item
                if (state.items[existingItemIndex].quantity <= 0) {
                    state.items.splice(existingItemIndex, 1);
                }
            }
        },

        removeFromCart: (state, action) => {
            const { itemId, restaurantName } = action?.payload;

            const existingItemIndex = state.items.findIndex(
                item => item.id === itemId && item.restaurantName === restaurantName
            );

            if (existingItemIndex > -1) {
                state.items.splice(existingItemIndex, 1);
            }
        }
    }
});

export const { toggleCartState, addToCart, updateItemQuantity, removeFromCart } = CartSlice.actions;
export default CartSlice.reducer;