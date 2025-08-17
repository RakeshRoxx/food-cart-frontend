import { createSlice } from "@reduxjs/toolkit";

const RestaurantSlice = createSlice({
    name: "restaurant",
    initialState: null,
    reducers: {
        saveRestaurantDetails: (state, action) => {
            return action.payload;
        }
    }
});

export const { saveRestaurantDetails } = RestaurantSlice.actions;
export default RestaurantSlice.reducer;