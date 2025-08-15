import { configureStore } from "@reduxjs/toolkit";

import RestaurantReducer from "./RestaurantSlice";

const AppStore = configureStore({
    reducer: {
        restaurant: RestaurantReducer
    }
})

export default AppStore;