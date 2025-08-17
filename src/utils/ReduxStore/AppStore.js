import { configureStore } from "@reduxjs/toolkit";

import CartReducer from "./CartSlice";
import RestaurantReducer from "./RestaurantSlice";

const AppStore = configureStore({
    reducer: {
        restaurant: RestaurantReducer,
        cart: CartReducer
    }
});

export default AppStore;