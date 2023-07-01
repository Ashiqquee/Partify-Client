
const Navbar = () => {
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"></div>
                        </div>
                        <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Partify</div>
                        </div>
                    </div>
                    {/* Add any other items to the right side of the navbar */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;