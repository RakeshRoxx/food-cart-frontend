import { useState } from "react";
import {
    Search,
    User,
    ShoppingCart,
    Sun,
    Moon,
    ChevronRight,
    X
} from 'lucide-react';

function TopNav() {



    const [isDarkMode, setIsDarkMode] = useState(false);

    const [showProfileDropdown, setShowProfileDropdown] = useState(false);

    const [cartItems, setCartItems] = useState([]);
    const [showCart, setShowCart] = useState(false);


    // Function to add item to cart
    const addToCart = (item, restaurantName) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                cartItem => cartItem.id === item.id && cartItem.restaurantName === restaurantName
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += 1;
                return updatedItems;
            } else {
                return [...prevItems, { ...item, quantity: 1, restaurantName }];
            }
        });
        setShowCart(true); // Show cart when an item is added
    };

    // Function to adjust item quantity in cart
    const updateQuantity = (itemId, restaurantName, delta) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => {
                if (item.id === itemId && item.restaurantName === restaurantName) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter(Boolean); // Remove nulls (items with quantity 0)
            return updatedItems;
        });
    };

    // Calculate total cart price
    const totalCartPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <nav className="p-4 md:px-8 shadow-sm bg-white/90 dark:bg-gray-900/90 backdrop-blur-md fixed w-full z-20 top-0 border-b border-red-100 dark:border-red-900">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="font-extrabold text-2xl md:text-3xl text-red-600 dark:text-red-400">
                        Foodie<span className="text-red-300">Connect</span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-grow mx-4 md:mx-10 max-w-lg">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for delicious food..."
                                className="w-full p-2 pl-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400 dark:focus:ring-red-600 border border-transparent focus:border-red-400 dark:focus:border-red-600 transition-all duration-300"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>

                    {/* Right Navigation */}
                    <div className="flex items-center space-x-3 md:space-x-4">
                        {/* Dark/Light Mode Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-gray-700 dark:text-gray-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300 transform hover:scale-105"
                            aria-label="Toggle dark/light mode"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Profile Icon with Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                                className="flex items-center space-x-2 p-2 rounded-full bg-red-100 dark:bg-red-900 text-gray-700 dark:text-gray-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300 transform hover:scale-105"
                                aria-label="User profile menu"
                            >
                                <User className="w-5 h-5" />
                                <span className="hidden md:inline text-sm font-medium">Account</span>
                            </button>
                            {showProfileDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-1 z-30 transition-all duration-200 ease-out animate-fade-in-scale">
                                    <a href="#" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-900 rounded-md mx-1 transition-colors duration-150">
                                        My Orders
                                        <ChevronRight className="ml-auto w-4 h-4 text-gray-500" />
                                    </a>
                                    <a href="#" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-900 rounded-md mx-1 transition-colors duration-150">
                                        Settings
                                        <ChevronRight className="ml-auto w-4 h-4 text-gray-500" />
                                    </a>
                                    <a href="#" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-900 rounded-md mx-1 transition-colors duration-150">
                                        Logout
                                        <ChevronRight className="ml-auto w-4 h-4 text-gray-500" />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Cart Icon */}
                        <button
                            onClick={() => setShowCart(!showCart)}
                            className="relative p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 transform hover:scale-105 shadow-md"
                            aria-label="View cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-bold border-2 border-white dark:border-gray-900 animate-pulse">
                                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Food Cart Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-gray-900 shadow-2xl z-30 transform transition-transform duration-500 ease-in-out ${showCart ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center p-4 md:p-6 border-b border-red-100 dark:border-red-900 bg-red-50 dark:bg-gray-850">
                    <h2 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">Your Cart</h2>
                    <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 text-4xl leading-none transition-colors duration-200">
                        <X className="w-7 h-7" />
                    </button>
                </div>
                <div className="p-4 md:p-6 overflow-y-auto" style={{ height: 'calc(100% - 180px)' }}>
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">Your cart is empty. Start adding some delicious items!</p>
                    ) : (
                        <ul className="space-y-4">
                            {cartItems.map(item => (
                                <li key={`${item.id}-${item.restaurantName}`} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600" />
                                        <div>
                                            <p className="font-semibold text-lg">{item.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.restaurantName}</p>
                                            <p className="text-base font-bold text-red-600 dark:text-red-400">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.restaurantName, -1)}
                                            className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center text-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-bold text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.restaurantName, 1)}
                                            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-red-600 transition-colors duration-200"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="absolute bottom-0 w-full p-4 md:p-6 border-t border-red-100 dark:border-red-900 bg-red-50 dark:bg-gray-900 shadow-t-lg">
                    <div className="flex justify-between items-center text-xl md:text-2xl font-extrabold mb-4 text-red-700 dark:text-red-300">
                        <span>Total:</span>
                        <span>${totalCartPrice.toFixed(2)}</span>
                    </div>
                    <button className="w-full py-3 md:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-lg font-bold shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-103 active:scale-98">
                        Proceed to Checkout
                        <ChevronRight className="inline-block w-5 h-5 ml-2 -mb-0.5" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default TopNav;