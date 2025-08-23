import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLocation } from "../../utils/ReduxStore/UserSlice";
import TrackingMap from "./DeliveryGoogle";

const TrackOrder = () => {
    // Get the user location and update it to store;
    // once we have the user location load the map till that show shimmer
    console.log("Rendered");


    const user_current_location = useSelector((state) => state.user.current_location);
    const dispatch = useDispatch();

    const sendLocation = async (coords) => {
        const backend_url = import.meta.env.VITE_BACKEND_HOST_URL;
        console.log(coords);

        dispatch(updateCurrentLocation(coords));

        const res = await fetch(`http://localhost:8001/restaurant/send/location`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(coords),
        });
        if (!res.ok) {
            console.log("Failed to send location to backend");
        }
        // return res.json();
    }

    const getAndSendLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
        }

        navigator.geolocation.getCurrentPosition((position) => {
            const coords = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            sendLocation(coords);
        },
            (error) => {
                console.log("Geolocation error:", error);
                alert("Failed to retive your location!");
            }
        );
    };




    useEffect(() => {
        if (!user_current_location) {
            getAndSendLocation();
        }
    }, [user_current_location]);



    if (!user_current_location) {
        return (
            <div>
                <h2>Loading Location!!!!</h2>
            </div>
        );
    }





    return (
        <>
            <div>
                <h2>TrackOrder Page</h2>
                <div>
                    <h1>Latitude: {user_current_location?.latitude}</h1>
                    <h1>Longitude: {user_current_location?.longitude}</h1>
                </div>
                <div>
                    <TrackingMap deliveryAddress={{ lat: user_current_location?.latitude, lng: user_current_location?.longitude }} riderLocation={{ lat: 18.519329, lng: 73.932070 }} />
                </div>
            </div>
        </>
    );
};

export default TrackOrder;