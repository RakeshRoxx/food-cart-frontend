import { Star } from "lucide-react";
import RestaurantCard from "./RestaurantCard";


const Restaurant = (props) => {

    const { showVegOnly } = props;

    // Mock data for restaurants and menu items
    const restaurants = [
        {
            id: 1,
            name: 'The Burger Hub',
            cuisine: 'American',
            rating: 4.5,
            imageUrl: 'https://images.unsplash.com/photo-1571091718767-f84e031a5411?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Burger restaurant
            menu: [
                { id: 'b1', name: 'Classic Burger', price: 12.99, isVeg: false, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { id: 'b2', name: 'Veggie Delight', price: 11.50, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1626082928925-fb0f52b66d8e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { id: 'b3', name: 'Crispy Fries', price: 4.00, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1585342880196-01d02c31ff7e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            ],
        },
        {
            id: 2,
            name: 'Pizza Planet',
            cuisine: 'Italian',
            rating: 4.8,
            imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Pizza restaurant
            menu: [
                { id: 'p1', name: 'Margherita Pizza', price: 15.00, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1604382181559-df9472e35b71?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { id: 'p2', name: 'Pepperoni Pizza', price: 16.50, isVeg: false, imageUrl: 'https://images.unsplash.com/photo-1628841440809-54157d4a2d81?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { id: 'p3', name: 'Garlic Bread', price: 5.50, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1601006509173-0402b85e0c8b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            ],
        },
        {
            id: 3,
            name: 'Green Leaf Cafe',
            cuisine: 'Healthy',
            rating: 4.2,
            imageUrl: 'https://images.unsplash.com/photo-1505253716312-b353066922d3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Healthy restaurant
            menu: [
                { id: 'g1', name: 'Quinoa Salad', price: 10.00, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { id: 'g2', name: 'Grilled Chicken', price: 14.00, isVeg: false, imageUrl: 'https://images.unsplash.com/photo-1584824367375-7b3c200c822e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
                { id: 'g3', name: 'Green Smoothie', price: 7.00, isVeg: true, imageUrl: 'https://images.unsplash.com/photo-1506804104597-400192e2129e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
            ],
        },
    ];



    // Filtered restaurants based on veg option
    const filteredRestaurants = restaurants.map(restaurant => ({
        ...restaurant,
        menu: showVegOnly ? restaurant.menu.filter(item => item.isVeg) : restaurant.menu,
    }));






    return (
        <>
            {/* Top Restaurants Listing */}
            <section className="container mx-auto my-12">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-red-700 dark:text-red-400 drop-shadow-sm">
                    Top Restaurants Near You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {filteredRestaurants.map(restaurant => (
                        <div key={restaurant.id} className="bg-white dark:bg-gray-850 rounded-2xl overflow-hidden shadow-lg transition-all transform hover:scale-103 duration-300 border border-gray-100 dark:border-gray-800 hover:border-red-300 dark:hover:border-red-600">
                            <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-105" />
                            <div className="p-5">
                                <h3 className="text-xl md:text-2xl font-bold mb-2 text-red-700 dark:text-red-400">{restaurant.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{restaurant.cuisine}</p>
                                <div className="flex items-center mt-2">
                                    {[...Array(Math.floor(restaurant.rating))].map((_, i) => (
                                        <Star key={i} className="text-yellow-400 w-5 h-5" />
                                    ))}
                                    {restaurant.rating % 1 !== 0 && <Star className="text-yellow-400 w-5 h-5 opacity-50" />} {/* Half star */}
                                    <span className="ml-2 font-semibold text-base">{restaurant.rating}</span>
                                </div>
                                <div className="mt-5">
                                    <h4 className="text-lg font-semibold mb-3 border-b pb-2 border-gray-100 dark:border-gray-700">Menu Highlights:</h4>
                                    <div className="space-y-4">
                                        {restaurant.menu.slice(0, 3).map((item, idx) => ( // Show first 3 items as highlights
                                            <RestaurantCard key={idx} item={item} restaurant={restaurant} />
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