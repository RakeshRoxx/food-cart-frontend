import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logout from "./components/Account/Logout";
import Orders from "./components/Account/Orders";
import Profile from "./components/Account/Profile";
import MainContainer from "./components/MainContainer";
import Delivery from "./components/Order/Delivery";
import DeliveryTrackingPage from "./components/Order/DeliveryGoogle";
import TrackOrder from "./components/Order/TrackOrder";
import Payment from "./components/Payment/Payment";
import RestaurantMain from "./components/Restaurant/RestaurantMain";

function App() {
  // const sendLocation = async (coords) => {
  //   const backend_url = import.meta.env.VITE_BACKEND_HOST_URL;
  //   console.log(coords);

  //   const res = await fetch(`http://localhost:8001/restaurant/send/location`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(coords),
  //   });
  //   if (!res.ok) {
  //     console.log("Failed to send location to backend");
  //     return;
  //   }
  //   // return res.json();
  // }

  // const getAndSendLocation = () => {
  //   if (!navigator.geolocation) {
  //     alert('Geolocation is not supported by your browser.');
  //     return;
  //   }

  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const coords = {
  //       latitude: position.coords.latitude,
  //       longitude: position.coords.longitude
  //     };
  //     sendLocation(coords);
  //   },
  //     (error) => {
  //       console.log("Geolocation error:", error);
  //       alert("Failed to retive your location!");
  //     }
  //   );
  // };

  // useEffect(() => {
  //   getAndSendLocation();
  // }, []);


  // Create the react router 

  const AppRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainContainer />
    }, {
      path: "/restaurant",
      element: <RestaurantMain />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/orders",
      element: <Orders />
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/payment",
      element: <Payment />
    },
    {
      path: "/track-order",
      element: <TrackOrder />
    },
    {
      path: "/delivery",
      element: <Delivery />
    },
    {
      path: "/google",
      element: <DeliveryTrackingPage deliveryAddress={{ lat: 28.6139, lng: 77.2090 }} riderLocation={{ lat: 18.519329, lng: 73.932070 }} />
    }
  ])


  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  )
}

export default App
