import { Routes, Route } from "react-router-dom";
import Home from "../pages/guest/Home";
import Rooms from "../pages/guest/Rooms";
import Booking from "../pages/guest/Booking";
import Login from "../pages/guest/Login";
import Hotels from "../pages/guest/Hotels";
import GuestLayout from "../layouts/GuestLayout";
import HotelDetails from "../pages/guest/HotelDetails";

const GuestRoutes = () => (
    <GuestLayout>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
        </Routes>
    </GuestLayout>
);

export default GuestRoutes;
