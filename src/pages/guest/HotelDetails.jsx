import { hotels, rooms } from "../../utils/mockData";
import { useParams } from "react-router-dom";
import { useState } from "react";

const HotelDetails = () => {
    const { id } = useParams();
    const hotel = hotels.find((h) => h.id === id);
    const hotelRooms = rooms.filter((room) => room.hotelId === id);
    const [selectedRoom, setSelectedRoom] = useState(null);

    if (!hotel) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-center">
                    <div className="text-6xl text-red-500 mb-4">🏨</div>
                    <h2 className="text-2xl font-bold text-gray-100 mb-2">Hotel Not Found</h2>
                    <p className="text-gray-400">The hotel you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i} className="text-yellow-400">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400">☆</span>);
        }
        return stars;
    };

    const handleBookRoom = (room) => {
        setSelectedRoom(room);
        // Here you would typically open a booking modal or navigate to booking page
        alert(`Booking ${room.roomType} - Room ID: ${room.id}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{hotel.name}</h1>
                        <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center">
                                {renderStars(hotel.rating || 4.5)}
                                <span className="ml-2 text-lg">{hotel.rating || 4.5}</span>
                            </div>
                            <span className="text-lg">•</span>
                            <span className="text-lg">{hotel.city}, {hotel.state}</span>
                        </div>
                        <p className="text-xl text-gray-200 max-w-3xl">{hotel.description}</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hotel Information Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-900 rounded-xl shadow-lg p-6 text-center border border-gray-800">
                        <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">Prime Location</h3>
                        <p className="text-gray-400">{hotel.city}, {hotel.state}</p>
                    </div>

                    <div className="bg-gray-900 rounded-xl shadow-lg p-6 text-center border border-gray-800">
                        <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">Premium Amenities</h3>
                        <p className="text-gray-400">{hotel.amenities?.length || 5}+ facilities available</p>
                    </div>

                    <div className="bg-gray-900 rounded-xl shadow-lg p-6 text-center border border-gray-800">
                        <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-100 mb-2">24/7 Service</h3>
                        <p className="text-gray-400">Round the clock assistance</p>
                    </div>
                </div>

                {/* Amenities Section */}
                {hotel.amenities && (
                    <div className="bg-gray-900 rounded-xl shadow-lg p-8 mb-12 border border-gray-800">
                        <h2 className="text-2xl font-bold text-gray-100 mb-6">Hotel Amenities</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {hotel.amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center p-3 bg-gray-800 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-blue-400 text-sm">✓</span>
                                    </div>
                                    <span className="text-gray-200 font-medium">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Rooms Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-100">Available Rooms</h2>
                        <div className="text-sm text-gray-300 bg-gray-800 px-4 py-2 rounded-full shadow border border-gray-700">
                            {hotelRooms.length} room{hotelRooms.length !== 1 ? 's' : ''} available
                        </div>
                    </div>

                    {hotelRooms.length === 0 ? (
                        <div className="text-center py-12 bg-gray-900 rounded-xl shadow-lg border border-gray-800">
                            <div className="text-6xl text-gray-700 mb-4">🏨</div>
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">No Rooms Available</h3>
                            <p className="text-gray-500">Please check back later or contact the hotel directly.</p>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-8">
                            {hotelRooms.map((room) => (
                                <div key={room.id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-800">
                                    <div className="relative">
                                        <img
                                            src={room.image}
                                            alt={room.roomType}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-gray-800 px-3 py-1 rounded-full shadow-lg border border-gray-700">
                                            <span className="text-sm font-semibold text-gray-100">
                                                ₹{room.pricePerNight?.toLocaleString() || 'N/A'}/night
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-2xl font-bold text-gray-100">{room.roomType}</h3>
                                            <div className="flex items-center text-yellow-400">
                                                {renderStars(4.5)}
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
                                                Room Amenities
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {room.amenities?.map((amenity, index) => (
                                                    <div key={index} className="flex items-center text-sm text-gray-300">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                        {amenity}
                                                    </div>
                                                )) || (
                                                        <p className="text-gray-500 col-span-2">No amenities listed</p>
                                                    )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-gray-100">
                                                    ₹{room.pricePerNight?.toLocaleString() || 'N/A'}
                                                </p>
                                                <p className="text-sm text-gray-400">per night</p>
                                            </div>
                                            <button
                                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                                onClick={() => handleBookRoom(room)}
                                            >
                                                Book Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Contact Section */}
                <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl shadow-lg p-8 text-white text-center border border-gray-800">
                    <h2 className="text-2xl font-bold mb-4">Need Help with Your Booking?</h2>
                    <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
                        Our customer service team is available 24/7 to assist you with reservations,
                        special requests, and any questions you may have.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gray-100 text-blue-700 hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                            Call Now: +91 1234567890
                        </button>
                        <button className="border-2 border-gray-100 text-gray-100 hover:bg-gray-100 hover:text-blue-700 font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                            Live Chat Support
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
