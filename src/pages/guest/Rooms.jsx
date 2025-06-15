import { useState, useEffect } from "react";
// Assuming 'rooms' and 'hotels' are imported from '../../utils/mockData'
// For standalone runnable code, we'll mock them here.

// Mock data for rooms and hotels for runnable example
const rooms = [
    { id: 'room-1', hotelId: '1', roomType: 'Standard King', pricePerNight: 5000, image: 'https://placehold.co/600x400/87CEEB/000000?text=Standard+King', amenities: ['WiFi', 'TV', 'Mini Bar'] },
    { id: 'room-2', hotelId: '1', roomType: 'Deluxe Suite', pricePerNight: 12000, image: 'https://placehold.co/600x400/ADD8E6/000000?text=Deluxe+Suite', amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Bathtub'] },
    { id: 'room-3', hotelId: '2', roomType: 'Economy Twin', pricePerNight: 3500, image: 'https://placehold.co/600x400/90EE90/000000?text=Economy+Twin', amenities: ['WiFi', 'TV'] },
    { id: 'room-4', hotelId: '2', roomType: 'Executive Room', pricePerNight: 8000, image: 'https://placehold.co/600x400/FFB6C1/000000?text=Executive+Room', amenities: ['WiFi', 'Air Conditioning', 'TV', 'Desk', 'Room Service'] },
    { id: 'room-5', hotelId: '3', roomType: 'Luxury Penthouse', pricePerNight: 25000, image: 'https://placehold.co/600x400/FFD700/000000?text=Luxury+Penthouse', amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony', 'Sea View', 'Bathtub', 'Room Service'] },
    { id: 'room-6', hotelId: '3', roomType: 'Family Suite', pricePerNight: 15000, image: 'https://placehold.co/600x400/DDA0DD/000000?text=Family+Suite', amenities: ['WiFi', 'Air Conditioning', 'TV', 'Refrigerator', 'Sofa'] },
];

const hotels = [
    { id: '1', name: 'Grand Hyatt', location: 'New York City, USA', image: 'https://placehold.co/600x400/ADD8E6/000000?text=City+Retreat' },
    { id: '2', name: 'The Ritz-Carlton', location: 'Paris, France', image: 'https://placehold.co/600x400/90EE90/000000?text=Parisian+Charm' },
    { id: '3', name: 'Marina Bay Sands', location: 'Singapore', image: 'https://placehold.co/600x400/FFB6C1/000000?text=Skyline+Luxury' },
];

const Rooms = () => {
    const [roomList, setRoomList] = useState(rooms); // Initialize with mock data
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterHotel, setFilterHotel] = useState("");
    const [sortBy, setSortBy] = useState("roomType");
    const [showModal, setShowModal] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        hotelId: "",
        roomType: "",
        pricePerNight: "",
        image: "",
        amenities: []
    });

    // State for confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [roomToDeleteId, setRoomToDeleteId] = useState(null);

    // Initial load and filter/sort effect
    useEffect(() => {
        // No need to set roomList from 'rooms' again if it's already initialized with it
        // setRoomList(rooms); // This might cause infinite loop if rooms changes
        setFilteredRooms(roomList); // Initial filter/sort on mount
    }, [roomList]); // Depend on roomList so updates trigger re-filter/sort

    // Filter and Sort rooms whenever relevant state changes
    useEffect(() => {
        let filtered = roomList.filter(room => {
            const hotel = hotels.find(h => h.id === room.hotelId);
            const matchesSearch =
                room.roomType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel?.name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesHotel = !filterHotel || room.hotelId === filterHotel;

            return matchesSearch && matchesHotel;
        });

        // Sort rooms
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "roomType":
                    return a.roomType?.localeCompare(b.roomType);
                case "price":
                    return (a.pricePerNight || 0) - (b.pricePerNight || 0);
                case "hotel":
                    const hotelA = hotels.find(h => h.id === a.hotelId)?.name || "";
                    const hotelB = hotels.find(h => h.id === b.hotelId)?.name || "";
                    return hotelA.localeCompare(hotelB);
                default:
                    return 0;
            }
        });

        setFilteredRooms(filtered);
    }, [roomList, searchTerm, filterHotel, sortBy]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Open add room modal
    const handleAddRoom = () => {
        setEditingRoom(null); // Clear any editing state
        setFormData({ // Reset form data
            id: "",
            hotelId: "",
            roomType: "",
            pricePerNight: "",
            image: "",
            amenities: []
        });
        setShowModal(true);
    };

    // Open edit room modal and pre-fill form
    const handleEditRoom = (room) => {
        setEditingRoom(room);
        setFormData({
            id: room.id,
            hotelId: room.hotelId,
            roomType: room.roomType,
            pricePerNight: room.pricePerNight?.toString() || "", // Convert number to string for input value
            image: room.image || "",
            amenities: room.amenities || []
        });
        setShowModal(true);
    };

    // Trigger confirmation modal for deletion
    const handleDeleteRoomClick = (roomId) => {
        setRoomToDeleteId(roomId);
        setShowConfirmModal(true);
    };

    // Confirm deletion and update room list
    const confirmDeleteRoom = () => {
        const updatedRooms = roomList.filter(room => room.id !== roomToDeleteId);
        setRoomList(updatedRooms);
        setShowConfirmModal(false); // Close confirmation modal
        setRoomToDeleteId(null); // Clear room to delete ID
    };

    // Handle form submission (add or update)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation (can be enhanced)
        if (!formData.hotelId || !formData.roomType || !formData.pricePerNight) {
            console.error("Please fill all required fields.");
            // In a real app, display a user-friendly error message
            return;
        }

        if (editingRoom) {
            // Update existing room
            const updatedRooms = roomList.map(room =>
                room.id === editingRoom.id
                    ? {
                        ...formData,
                        pricePerNight: parseInt(formData.pricePerNight), // Convert back to number
                        amenities: formData.amenities
                    }
                    : room
            );
            setRoomList(updatedRooms);
        } else {
            // Add new room
            const newRoom = {
                ...formData,
                id: `room-${Date.now()}`, // Generate a unique ID
                pricePerNight: parseInt(formData.pricePerNight),
                amenities: formData.amenities
            };
            setRoomList([...roomList, newRoom]);
        }

        setShowModal(false); // Close the add/edit modal
    };

    // Handle amenity checkbox changes
    const handleAmenityChange = (amenity) => {
        const updatedAmenities = formData.amenities.includes(amenity)
            ? formData.amenities.filter(a => a !== amenity)
            : [...formData.amenities, amenity];

        setFormData({ ...formData, amenities: updatedAmenities });
    };

    // Common amenities list for checkboxes
    const commonAmenities = [
        "WiFi", "Air Conditioning", "TV", "Mini Bar", "Room Service",
        "Balcony", "Sea View", "City View", "Bathtub", "Shower",
        "Safe", "Coffee Maker", "Refrigerator", "Desk", "Sofa"
    ];

    // Helper to get hotel name by ID
    const getHotelName = (hotelId) => {
        const hotel = hotels.find(h => h.id === hotelId);
        return hotel?.name || "Unknown Hotel";
    };

    // Helper to render star ratings (mocking 4.5 for consistency if no rating data)
    const renderStars = (rating = 4.5) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="text-yellow-400">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" className="text-yellow-400">½</span>); // Using half star symbol
        }
        // Add empty stars to make up to 5
        for (let i = stars.length; i < 5; i++) {
            stars.push(<span key={`empty-${i}`} className="text-gray-300">★</span>);
        }
        return stars;
    };

    return (
        <div className="min-h-screen bg-gray-50 font-[Inter]">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
                            <p className="text-gray-600 mt-1">Manage hotel rooms and their details</p>
                        </div>
                        <button
                            onClick={handleAddRoom}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Room
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h10M7 15h10" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                            <p className="text-2xl font-bold text-gray-900">{roomList.length}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Available</p>
                            <p className="text-2xl font-bold text-gray-900">{filteredRooms.length}</p> {/* Shows available based on filter */}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                            <p className="text-2xl font-bold text-gray-900">
                                ₹{roomList.length > 0 ? Math.round(roomList.reduce((sum, room) => sum + (room.pricePerNight || 0), 0) / roomList.length).toLocaleString('en-IN') : 0}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Hotels</p>
                            <p className="text-2xl font-bold text-gray-900">{hotels.length}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Rooms</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search by room type or hotel..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="filterHotel" className="block text-sm font-medium text-gray-700 mb-2">Filter by Hotel</label>
                            <select
                                id="filterHotel"
                                value={filterHotel}
                                onChange={(e) => setFilterHotel(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none pr-8 transition-colors duration-200"
                            >
                                <option value="">All Hotels</option>
                                {hotels.map(hotel => (
                                    <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                            <select
                                id="sortBy"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white appearance-none pr-8 transition-colors duration-200"
                            >
                                <option value="roomType">Room Type</option>
                                <option value="price">Price</option>
                                <option value="hotel">Hotel Name</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Rooms Grid */}
                {filteredRooms.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-xl shadow-lg">
                        <p className="text-gray-600 text-lg">No rooms found matching your criteria.</p>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredRooms.map((room) => {
                            const hotel = hotels.find(h => h.id === room.hotelId);
                            return (
                                <div key={room.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                    <div className="relative h-48">
                                        <img
                                            src={room.image || 'https://placehold.co/600x400/A0A0A0/FFFFFF?text=No+Image'}
                                            alt={room.roomType}
                                            className="w-full h-full object-cover rounded-t-xl"
                                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/A0A0A0/FFFFFF?text=Image+Unavailable'; }}
                                        />
                                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                                            ₹{room.pricePerNight?.toLocaleString('en-IN') || 'N/A'} / night
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-gray-900 mb-1">{room.roomType}</h2>
                                        <p className="text-gray-600 mb-3">
                                            <span className="font-medium">{hotel?.name || "Unknown Hotel"}</span> ({hotel?.location || "N/A"})
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500 mb-3">
                                            {renderStars(hotel?.rating)} {/* Assuming hotel might have a rating */}
                                            <span className="ml-2">({hotel?.rating || '4.5'} Rating)</span>
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="text-md font-semibold text-gray-800 mb-2">Amenities:</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {room.amenities && room.amenities.length > 0 ? (
                                                    room.amenities.map((amenity, index) => (
                                                        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            {amenity}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500 text-sm">No specific amenities listed.</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-3 mt-4">
                                            <button
                                                onClick={() => handleEditRoom(room)}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteRoomClick(room.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Add/Edit Room Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 font-[Inter]">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 animate-scale-in">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {editingRoom ? "Edit Room" : "Add New Room"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="hotelId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Hotel
                                </label>
                                <select
                                    id="hotelId"
                                    name="hotelId"
                                    value={formData.hotelId}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select a Hotel</option>
                                    {hotels.map(hotel => (
                                        <option key={hotel.id} value={hotel.id}>{hotel.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-2">
                                    Room Type
                                </label>
                                <input
                                    type="text"
                                    id="roomType"
                                    name="roomType"
                                    value={formData.roomType}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., Deluxe King, Executive Suite"
                                />
                            </div>
                            <div>
                                <label htmlFor="pricePerNight" className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Per Night (₹)
                                </label>
                                <input
                                    type="number"
                                    id="pricePerNight"
                                    name="pricePerNight"
                                    value={formData.pricePerNight}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    step="100"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., 5000"
                                />
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g., https://example.com/room.jpg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {commonAmenities.map((amenity) => (
                                        <div key={amenity} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`amenity-${amenity}`}
                                                name="amenities"
                                                value={amenity}
                                                checked={formData.amenities.includes(amenity)}
                                                onChange={() => handleAmenityChange(amenity)}
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                                                {amenity}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md"
                                >
                                    {editingRoom ? "Update Room" : "Add Room"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Custom Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4 font-[Inter]">
                    <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm transform scale-95 animate-scale-in">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this room? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowConfirmModal(false)}
                                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={confirmDeleteRoom}
                                className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Rooms;
