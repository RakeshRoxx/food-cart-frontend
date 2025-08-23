import { createSlice } from "@reduxjs/toolkit";

const UserSlice = new createSlice({
    name: "user",
    initialState: {
        name: "Amaterasu",
        current_location: null
    },
    reducers: {
        updateCurrentLocation: (state, action) => {
            state.current_location = action.payload;
        }
    }
});

export const { updateCurrentLocation } = UserSlice.actions;
export default UserSlice.reducer;