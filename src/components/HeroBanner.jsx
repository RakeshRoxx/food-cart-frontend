

const HeroBanner = () => {
    return (
        <>
            {/* Hero Banner */}
            <section className="container mx-auto mt-6 rounded-3xl overflow-hidden shadow-xl h-64 md:h-96 flex items-center justify-center p-6 bg-gradient-to-r from-red-600 to-red-800 relative">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} // General food image for banner
                ></div>
                <div className="relative text-center text-white z-10 p-4">
                    <h1 className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
                        Your Next <span className="text-red-200">Craving</span>, Delivered.
                    </h1>
                    <p className="mt-3 md:mt-5 text-lg md:text-xl max-w-2xl mx-auto opacity-90 animate-fade-in-up delay-100">
                        Explore a world of flavors from your favorite local spots, right to your doorstep.
                    </p>
                    <button className="mt-8 px-10 py-4 bg-white text-red-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fade-in-up delay-200">
                        Start Your Order
                    </button>
                </div>
            </section>
        </>
    );
};

export default HeroBanner;