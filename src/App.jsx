import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import RestaurantMain from "./components/Restaurant/RestaurantMain";

function App() {
  // console.log("env data", import.meta.env)
  // const sendLocation = async (coords) => {
  //   // const backend_url = import.meta.env.BACKEND_HOST_URL;
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
    }
  ])


  return (
    <>
      <RouterProvider router={AppRouter} />
    </>
  )
}

export default App
