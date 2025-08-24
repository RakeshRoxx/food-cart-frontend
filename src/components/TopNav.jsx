import {
    ChevronRight,
    Moon,
    Search,
    ShoppingCart,
    Sun,
    User
} from 'lucide-react';
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleCartState } from '../utils/ReduxStore/CartSlice';
import Cart from './Cart';

function TopNav() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    const cartStateSelector = useSelector((store) => store?.cart?.cartState);
    const cartItems = useSelector((store) => store?.cart?.items);
    const dispatch = useDispatch();

    const showCart = () => {
        dispatch(toggleCartState());
    }

    // Calculate total cart price


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
                                    <Link to="/profile" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-900 rounded-md mx-1 transition-colors duration-150">
                                        Profile
                                        <ChevronRight className="ml-auto w-4 h-4 text-gray-500" />
                                    </Link>
                                    <Link to="/orders" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-900 rounded-md mx-1 transition-colors duration-150">
                                        My Orders
                                        <ChevronRight className="ml-auto w-4 h-4 text-gray-500" />
                                    </Link>
                                    <Link to="/logout" className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-red-50 dark:hover:bg-red-900 rounded-md mx-1 transition-colors duration-150">
                                        Logout
                                        <ChevronRight className="ml-auto w-4 h-4 text-gray-500" />
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Cart Icon */}
                        <button
                            onClick={() => showCart()}
                            className="relative p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 transform hover:scale-105 shadow-md"
                            aria-label="View cart"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-amber-200 rounded-full text-xs text-red-500 flex items-center justify-center font-bold border-2 border-white dark:border-gray-900">
                                    {cartItems?.length}
                                </span>
                            )}
                        </button>

                    </div>
                </div>
            </nav>
            {cartStateSelector && <Cart />}
        </>
    );
};

export default TopNav;