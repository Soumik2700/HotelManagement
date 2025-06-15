import { useState } from "react";
import { Link } from "react-router-dom";
import { hotels as hotelsData } from "../../utils/mockData";

const defaultNewHotel = {
    name: "",
    location: "",
    description: "",
    image: "",
};

const Hotels = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [hotels, setHotels] = useState(hotelsData);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newHotel, setNewHotel] = useState(defaultNewHotel);

    // Filter hotels based on search term
    const filteredHotels = hotels.filter(hotel =>
        hotel?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        hotel?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );

    // Sort hotels
    const sortedHotels = [...filteredHotels].sort((a, b) => {
        switch (sortBy) {
            case "name":
                return a?.name?.localeCompare(b?.name);
            case "location":
                return a?.location?.localeCompare(b?.location);
            default:
                return 0;
        }
    });

    // Handle add hotel
    const handleAddHotel = (e) => {
        e.preventDefault();
        if (!newHotel.name || !newHotel.location || !newHotel.description || !newHotel.image) return;
        setHotels([
            ...hotels,
            {
                ...newHotel,
                id: (hotels.length + 1).toString(),
            }
        ]);
        setShowAddModal(false);
        setNewHotel(defaultNewHotel);
    };

    console.log(newHotel)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Discover Amazing Hotels
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        Find your perfect stay from our collection of premium hotels
                    </p>
                    <div className="flex items-center justify-center gap-6 text-blue-100">
                        <div className="flex items-center">
                            <span className="text-3xl font-bold text-white">{hotels.length}</span>
                            <span className="ml-2 text-lg">Premium Hotels</span>
                        </div>
                        <span className="text-2xl">•</span>
                        <div className="flex items-center">
                            <span className="text-3xl font-bold text-white">24/7</span>
                            <span className="ml-2 text-lg">Support</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Add Hotel Button */}
                <div className="flex justify-end mb-6">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition-all"
                    >
                        + Add Hotel
                    </button>
                </div>

                {/* Add Hotel Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl"
                                onClick={() => setShowAddModal(false)}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Hotel</h2>
                            <form onSubmit={handleAddHotel} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Hotel Name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                    value={newHotel.name}
                                    onChange={e => setNewHotel({ ...newHotel, name: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                    value={newHotel.location}
                                    onChange={e => setNewHotel({ ...newHotel, location: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Description"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                    value={newHotel.description}
                                    onChange={e => setNewHotel({ ...newHotel, description: e.target.value })}
                                    required
                                />
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                                    value={newHotel.image}
                                    onChange={e => setNewHotel({ ...newHotel, image: e.target.value })}
                                    required
                                />
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        type="button"
                                        className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700"
                                    >
                                        Add Hotel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Search and Filter Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search hotels by name or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
                            />
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-4">
                            <label className="text-sm font-semibold text-gray-700 whitespace-nowrap">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white min-w-[150px]"
                            >
                                <option value="name">Hotel Name</option>
                                <option value="location">Location</option>
                            </select>
                        </div>
                    </div>

                    {/* Search Results Info */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-800">{sortedHotels.length}</span> hotel{sortedHotels.length !== 1 ? 's' : ''} found
                                {searchTerm && (
                                    <span> for "<span className="font-semibold text-blue-600">{searchTerm}</span>"</span>
                                )}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="text-red-600 hover:text-red-700 font-medium flex items-center text-sm"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Clear Search
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hotels Grid */}
                {sortedHotels.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                        <div className="text-8xl text-gray-300 mb-6">🏨</div>
                        <h3 className="text-3xl font-bold text-gray-600 mb-4">No Hotels Found</h3>
                        <p className="text-gray-500 mb-8 text-lg max-w-md mx-auto">
                            We couldn't find any hotels matching your search. Try a different search term.
                        </p>
                        <button
                            onClick={() => setSearchTerm("")}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold"
                        >
                            Show All Hotels
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedHotels.map((hotel) => (
                            <div key={hotel.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Location Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                                        <div className="flex items-center text-sm font-semibold text-gray-800">
                                            <svg className="w-4 h-4 mr-1 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            {hotel.location}
                                        </div>
                                    </div>

                                    {/* Premium Badge */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                        PREMIUM
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="mb-4">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                            {hotel.name}
                                        </h2>
                                        <div className="flex items-center text-gray-600 mb-3">
                                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-medium">{hotel.location}</span>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                                    </div>

                                    {/* Rating Stars */}
                                    <div className="flex items-center mb-6">
                                        <div className="flex text-yellow-400 mr-2">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-gray-600 font-medium">4.8 (124 reviews)</span>
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {['WiFi', 'Pool', 'Spa', 'Restaurant'].map((feature, index) => (
                                            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price and Book Button */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">₹4,999</p>
                                            <p className="text-sm text-gray-500">per night</p>
                                        </div>
                                        <Link
                                            to={`/hotels/${hotel.id}`}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                        >
                                            View Rooms
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Call to Action Section */}
                {sortedHotels.length > 0 && (
                    <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Can't Find What You're Looking For?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Our travel experts are here to help you find the perfect accommodation for your needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                                Contact Support
                            </button>
                            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-all duration-300">
                                Request Custom Package
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Hotels;
