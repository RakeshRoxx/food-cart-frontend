import { useSelector } from "react-redux";

const Payment = () => {
    const cartItems = useSelector((store) => store?.cart?.items);

    let totalCartPrice = 0;
    let gst = 0;
    let deliveryCharge = 0;
    let toPay = 0;

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

    return (
        <>
            <div className="flex justify-center mt-5 w-full">

                <div className="flex justify-center-safe flex-col w-1/2 p-3">
                    <div className="flex justify-between w-full px-2">
                        <span>Total Payable</span>
                        <span>Rs {toPay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-center items-center w-full px-2 bg-amber-700 h-24">
                        Paymnet Options
                    </div>
                    <div className="bg-amber-200">
                        <div className="flex justify-between w-full px-2">
                            <span>Total Cart</span>
                            <span>Rs {totalCartPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-full px-2">
                            <span>GST</span>
                            <span>Rs {gst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between w-full px-2">
                            <span>Delivery Charge</span>
                            <span>Rs {deliveryCharge.toFixed(2)}</span>
                        </div>
                        <div className="w-full border-[1px] border-black my-1"></div>
                        <div className="flex justify-between w-full px-2">
                            <span>Total Payable</span>
                            <span>Rs {toPay.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;