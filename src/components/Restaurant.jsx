import { Star } from "lucide-react";
import { useSelector } from "react-redux";
import useAllRestaurantDetails from "../hooks/useAllRestaurantDetails";
import RestaurantCard from "./RestaurantCard";


const Restaurant = (props) => {

    const { showVegOnly } = props;

    const restaurants = useSelector((store) => store.restaurant);

    useAllRestaurantDetails();


    // Filtered restaurants based on veg option
    // const filteredRestaurants = restaurants.map(restaurant => ({
    //     ...restaurant,
    //     menu: showVegOnly ? restaurant.menu.filter(item => item.isVeg) : restaurant.menu,
    // }));

    if (restaurants == null) {
        return <></>;
    }

    return (
        <>
            {/* Top Restaurants Listing */}
            <section className="container mx-auto my-12">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-red-700 dark:text-red-400 drop-shadow-sm">
                    Top Restaurants Near You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {restaurants == null ? "" : restaurants.map(restaurant => (
                        <div key={restaurant.id} className="bg-white dark:bg-gray-850 rounded-2xl overflow-hidden shadow-lg transition-all transform hover:scale-103 duration-300 border border-gray-100 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-600">
                            <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105" />
                            <div className="p-5">
                                <h3 className="text-xl md:text-2xl font-bold mb-2 text-red-700 dark:text-red-400">{restaurant.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{restaurant.cuisine}</p>
                                <div className="flex items-center mt-2">
                                    {[...Array(Math.floor(restaurant.rating))].map((_, i) => (
                                        <Star key={i} className="text-yellow-500 w-5 h-5" />
                                    ))}
                                    {restaurant.rating % 1 !== 0 && <Star className="text-yellow-400 w-5 h-5 opacity-50" />} {/* Half star */}
                                    <span className="ml-2 font-semibold text-base">{restaurant.rating}</span>
                                </div>
                                <div className="mt-5">
                                    <h4 className="text-lg font-semibold mb-3 border-b pb-2 border-gray-100 dark:border-gray-700">Menu Highlights:</h4>
                                    <div className="space-y-4">
                                        {restaurant?.menuItemsList?.slice(0, 2)?.map((item) => (
                                            <RestaurantCard key={item?.id} item={item} restaurant={restaurant} />
                                        ))}
                                    </div>
                                    <button className="mt-6 w-full py-3 bg-red-100 dark:bg-red-700 text-red-600 dark:text-white rounded-xl hover:bg-red-200 dark:hover:bg-red-600 transition-colors duration-200 font-semibold text-base shadow-sm transform hover:scale-103 active:scale-98">
                                        View Full Menu
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Restaurant;