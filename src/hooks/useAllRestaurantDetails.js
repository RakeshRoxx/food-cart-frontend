import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveRestaurantDetails } from "../utils/ReduxStore/RestaurantSlice";

const useAllRestaurantDetails = () => {
    const dispatch = useDispatch();

    const getRestaurantDetails = async () => {
        const data = await fetch("http://localhost:8001/public/all-restaurant", {
            method: 'GET'
        });
        const restaurantList = await data.json();

        if (!restaurantList) return null;

        dispatch(saveRestaurantDetails(restaurantList));
    }

    useEffect(() => {
        getRestaurantDetails();
    }, []);
}

export default useAllRestaurantDetails;