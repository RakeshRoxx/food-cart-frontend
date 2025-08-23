import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

const YOUR_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const YOUR_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_STYLE_KEY;

function TrackingMap({ deliveryAddress, riderLocation }) {
    const mapRef = useRef(null);
    const deliveryMarkerRef = useRef(null);
    const riderMarkerRef = useRef(null);
    const directionsRendererRef = useRef(null);
    const [map, setMap] = useState(null);

    console.log("Rider Location:", riderLocation);


    useEffect(() => {
        const loader = new Loader({
            apiKey: YOUR_API_KEY,
            version: "weekly",
            libraries: ["marker"],
            mapIds: [YOUR_MAP_ID],
        });

        const cleanMapStyle = [
            {
                featureType: "poi", // Points of Interest
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "road",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            },
            {
                featureType: "transit",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            }
        ];

        loader.load().then(() => {
            const mapInstance = new window.google.maps.Map(mapRef.current, {
                center: deliveryAddress,
                zoom: 16,
                mapId: YOUR_MAP_ID,
                disableDefaultUI: true,   // 👈 removes all controls
                clickableIcons: false,    // 👈 disables POI clicks
                gestureHandling: "greedy", // 👈 removes "ctrl+scroll to zoom" requirement
            });
            setMap(mapInstance);

            const { AdvancedMarkerElement } = window.google.maps.marker;

            // Create markers
            const homeIcon = document.createElement("img");
            homeIcon.src = "/MarkerIcons/house.png";
            homeIcon.style.width = "40px";
            homeIcon.style.height = "40px";

            deliveryMarkerRef.current = new AdvancedMarkerElement({
                map: mapInstance,
                position: deliveryAddress,
                title: "Delivery Address",
                content: homeIcon, // 👈 HTML content instead of icon
            });
            const bikeIcon = document.createElement("img");
            bikeIcon.src = "/MarkerIcons/bicycle.png";
            bikeIcon.style.width = "40px";
            bikeIcon.style.height = "40px";

            riderMarkerRef.current = new AdvancedMarkerElement({
                map: mapInstance,
                position: riderLocation,
                title: "Rider Location",
                content: bikeIcon
            });

            directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
                map: mapInstance,
                suppressMarkers: true
            });
        });
    }, []);

    useEffect(() => {
        if (!map || !window.google) return;

        // Update marker positions
        if (deliveryMarkerRef.current) deliveryMarkerRef.current.position = deliveryAddress;
        if (riderMarkerRef.current) riderMarkerRef.current.position = riderLocation;

        // Calculate and display route
        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: riderLocation,
                destination: deliveryAddress,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === "OK" && directionsRendererRef.current) {
                    directionsRendererRef.current.setDirections(result);
                    // 👇 Focus map only on the route
                    if (result.routes[0]?.bounds) {
                        map.fitBounds(result.routes[0].bounds);
                    }
                } else {
                    console.error("Directions request failed due to " + status);
                    directionsRendererRef.current?.setDirections({ routes: [] });
                }
            }
        );
    }, [deliveryAddress, riderLocation, map]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div
                ref={mapRef}
                className="w-1/2 h-1/2 rounded-lg shadow-lg"
            />
        </div>
    );
}

export default TrackingMap;
