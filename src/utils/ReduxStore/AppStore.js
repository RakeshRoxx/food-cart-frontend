import { configureStore } from "@reduxjs/toolkit";

import CartReducer from "./CartSlice";
import RestaurantReducer from "./RestaurantSlice";
import UserReducer from "./UserSlice";

const AppStore = configureStore({
    reducer: {
        restaurant: RestaurantReducer,
        cart: CartReducer,
        user: UserReducer
    }
});

export default AppStore;