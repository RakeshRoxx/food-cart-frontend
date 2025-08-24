import { ChevronRight, Minus, Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, toggleCartState, updateItemQuantity } from "../utils/ReduxStore/CartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const cartStateSelector = useSelector((store) => store?.cart?.cartState);
    const cartItems = useSelector((store) => store?.cart?.items);
    const navigate = useNavigate();
    let totalCartPrice = 0;
    let gst = 0;
    let deliveryCharge = 0;
    let toPay = 0;

    // Function to adjust item quantity in cart
    const updateQuantity = (itemId, restaurantName, delta) => {
        dispatch(updateItemQuantity({ itemId, restaurantName, value: delta }))
    };

    if (cartItems) {
        totalCartPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        gst = (totalCartPrice * 5) / 100;
        if (totalCartPrice <= 0) {
            deliveryCharge = 0;
        } else {
            deliveryCharge = 40.00;
        }
        toPay = totalCartPrice + gst + deliveryCharge;
    };

    const removeItemFromCart = (itemId, restaurantName) => {
        dispatch(removeFromCart({ itemId, restaurantName }));
    };

    const checkout = () => {
        console.log("Checkout the Order");
        navigate("/payment");
    };


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
                    <div className="space-y-4">
                        {cartItems && cartItems.map(item => (
                            <div key={item.id} className="flex flex-col justify-center">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-600" />
                                        <div>
                                            <p className="font-semibold text-white text-lg">{item.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.restaurantName}</p>
                                            <p className="text-base font-bold text-red-600 dark:text-red-400">Rs {item.price.toFixed(2)}</p>
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
                                        <span className="font-bold text-white text-lg">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.restaurantName, 1)}
                                            className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xl font-bold hover:bg-red-600 transition-colors duration-200"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                </div>
                                <button
                                    onClick={() => removeItemFromCart(item.id, item.restaurantName)}
                                    className="text-white flex justify-center bg-red-400 mt-0.5 rounded-full hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                                >
                                    Remove
                                </button>

                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="absolute bottom-0 w-full p-4 md:p-6 border-t border-red-100 dark:border-red-900 bg-red-50 dark:bg-gray-900 shadow-t-lg">
                <div>
                    <div className="flex justify-between text-white">
                        <span>Cart Total</span>
                        <span>{totalCartPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                        <span>GST and Other Charges</span>
                        <span>{gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                        <span>Delivery</span>
                        <span>{deliveryCharge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl md:text-2xl font-extrabold mb-4 text-red-700 dark:text-red-300">
                        <span>Total:</span>
                        <span>Rs  {toPay.toFixed(2)}</span>
                    </div>
                </div>
                <button onClick={() => checkout()} className="w-full py-3 md:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl text-lg font-bold shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-103 active:scale-98">
                    Proceed to Checkout
                    <ChevronRight className="inline-block w-5 h-5 ml-2 -mb-0.5" />
                </button>
            </div>
        </div>
    );
}

export default Cart;