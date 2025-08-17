import { Plus, Salad } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/ReduxStore/CartSlice";
import DishDetails from "./DishDetails";

const RestaurantCard = (props) => {
    const { item, restaurant } = props;
    const [selectedDishForDetails, setSelectedDishForDetails] = useState(null);
    const dispatch = useDispatch();

    // Function to handle opening dish details modal
    const openDishDetails = (item, restaurantCuisine) => {
        setSelectedDishForDetails({ ...item, restaurantCuisine });
    };

    // Function to close dish details modal
    const closeDishDetails = () => {
        setSelectedDishForDetails(null);
    };


    const addItemToCart = (item, restaurantName) => {
        dispatch(addToCart({ ...item, restaurantName }));
    };


    return (
        <>
            {selectedDishForDetails != null ? <DishDetails selectedDishForDetails={selectedDishForDetails} closeDishDetails={closeDishDetails} /> : ""}
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700 shadow-sm">
                <div className="flex items-center space-x-3">
                    <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-full object-cover border-2 border-red-200 dark:border-red-500" />
                    <div>
                        <p className="font-medium text-lg">{item.name} {item.isVeg && <Salad className="inline-block w-5 h-5 text-red-600 ml-1" />}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <button
                        onClick={() => addItemToCart(item, restaurant.name)}
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded-full shadow-md hover:bg-red-600 transition-colors duration-200 transform hover:scale-105 active:scale-95"
                    >
                        Add <Plus className="inline-block w-4 h-4" />
                    </button>
                    <button
                        onClick={() => openDishDetails(item, restaurant.cuisine)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </>
    );
}


export default RestaurantCard;