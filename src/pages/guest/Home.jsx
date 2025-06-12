const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            Welcome to
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {" "}HotelPro
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            The ultimate hotel management platform that streamlines operations,
                            enhances guest experiences, and maximizes your revenue potential.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
                                Get Started
                            </button>
                            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose HotelPro?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover the features that make us the preferred choice for hotels worldwide
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Reservations</h3>
                            <p className="text-gray-600">
                                Intelligent booking system with real-time availability and automated confirmations
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Guest Management</h3>
                            <p className="text-gray-600">
                                Comprehensive guest profiles with preferences and personalized service tracking
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
                            <p className="text-gray-600">
                                Detailed insights and reports to optimize operations and increase profitability
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                        <div>
                            <div className="text-4xl font-bold mb-2">500+</div>
                            <div className="text-blue-100">Hotels Managed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">50K+</div>
                            <div className="text-blue-100">Happy Guests</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">99.9%</div>
                            <div className="text-blue-100">Uptime</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-blue-100">Support</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Ready to Transform Your Hotel Management?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Join thousands of hotels worldwide who trust HotelPro to manage their operations efficiently
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg">
                            Start Free Trial
                        </button>
                        <button className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 font-semibold py-3 px-8 rounded-lg transition duration-300">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
