import { createSlice } from "@reduxjs/toolkit";

const RestaurantSlice = createSlice({
    name: "Restaurant",
    initialState: {
        restaurant: null
    },
    reducers: {
        saveRestaurantDetails: (state, action) => {
            state.restaurant = action.payload;
        }
    }
});

export const { saveRestaurantDetails } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;