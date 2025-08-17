import { ChevronRight, Minus, Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCartState } from "../utils/ReduxStore/CartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cartStateSelector = useSelector((store) => store?.cart?.cartState);
    const cartItems = useSelector((store) => store?.cart?.list);
    let totalCartPrice = 0;

    if (cartItems) {

        totalCartPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }


    return (
        <div
            className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white dark:bg-gray-900 shadow-2xl z-30 transform transition-transform duration-500 ease-in-out ${cartStateSelector ? 'translate-x-0' : 'translate-x-full'}`}
        >
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-red-100 dark:border-red-900 bg-red-50 dark:bg-gray-850">
                <h2 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400">Your Cart</h2>
                <button onClick={() => dispatch(toggleCartState())} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 text-4xl leading-none transition-colors duration-200">
                    <X className="w-7 h-7" />
                </button>
            </div>
            <div className="p-4 md:p-6 overflow-y-auto" style={{ height: 'calc(100% - 180px)' }}>
                {cartItems && cartItems.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">Your cart is empty. Start adding some delicious items!</p>
                ) : (
                    <ul className="space-y-4">
                        {cartItems && cartItems.map(item => (
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
    );
}

export default Cart;