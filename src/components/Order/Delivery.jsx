import { Client } from "@stomp/stompjs";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
    iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
    shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});


// 🚴 Custom Driver Icon
const driverIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2972/2972185.png",
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // point from which the popup should open relative to the iconAnchor
});

// 🏠 Custom Destination Icon
const homeIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/69/69524.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35],
});

// 🔹 Animated marker for smooth driver movement
function AnimatedMarker({ location }) {
    const markerRef = useRef(null);
    const [currentPos, setCurrentPos] = useState(location);

    useEffect(() => {
        if (!markerRef.current) return;

        const marker = markerRef.current;
        const startLatLng = L.latLng(currentPos.lat, currentPos.lng);
        const endLatLng = L.latLng(location.lat, location.lng);
        const duration = 1000; // ms
        const frames = 30;
        const stepTime = duration / frames;

        let frame = 0;
        const interval = setInterval(() => {
            frame++;
            const lat = startLatLng.lat + (endLatLng.lat - startLatLng.lat) * (frame / frames);
            const lng = startLatLng.lng + (endLatLng.lng - startLatLng.lng) * (frame / frames);
            const newLatLng = L.latLng(lat, lng);
            marker.setLatLng(newLatLng);
            if (frame === frames) {
                clearInterval(interval);
                setCurrentPos(endLatLng);
            }
        }, stepTime);

        return () => clearInterval(interval);
    }, [location]);

    return (
        <Marker
            position={[currentPos.lat, currentPos.lng]}
            ref={markerRef}
            icon={driverIcon}
        >
            <Popup>🚴 Delivery Agent</Popup>
        </Marker>
    );
}

export default function OrderTracker({ orderId }) {
    orderId = 123;
    const [driverLocation, setDriverLocation] = useState({ lat: 28.6139, lng: 77.2090 });
    const [destination] = useState({ lat: 28.7041, lng: 77.1025 }); // example fixed destination

    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8001/ws",
            reconnectDelay: 5000,
            debug: (str) => console.log(str),
        });

        client.onConnect = () => {
            console.log("Connected to WebSocket");
            client.subscribe(`/topic/orders/${orderId}`, (msg) => {
                const loc = JSON.parse(msg.body);
                console.log("Received location:", loc);
                setDriverLocation({ lat: loc.latitude, lng: loc.longitude });
            });
        };

        client.activate();
        return () => client.deactivate();
    }, [orderId]);

    return (
        <div className="w-full h-[500px] p-4 bg-white shadow-lg rounded-2xl">
            <MapContainer
                center={[driverLocation.lat, driverLocation.lng]}
                zoom={13}
                className="h-full w-full rounded-xl"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* 🚴 Driver Marker */}
                <AnimatedMarker location={driverLocation} />

                {/* 📍 Destination Marker */}
                <Marker position={[destination.lat, destination.lng]} icon={homeIcon}>
                    <Popup>🏠 Destination</Popup>
                </Marker>

                {/* 🛣 Route Polyline */}
                <Polyline
                    positions={[
                        [driverLocation.lat, driverLocation.lng],
                        [destination.lat, destination.lng],
                    ]}
                    color="blue"
                />
            </MapContainer>
        </div>
    );
};
