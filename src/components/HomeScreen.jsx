import { useState } from 'react';
import Restaurant from './Restaurant';
import TopNav from './TopNav';

// Main App Component
export const MainScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showVegOnly, setShowVegOnly] = useState(false);

    // State for Dish Details Modal and LLM Description
    // const [dishDescription, setDishDescription] = useState('');
    // const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);





    // Function to generate dish description using Gemini API with exponential backoff
    // const generateDishDescription = async () => {
    //     if (!selectedDishForDetails) return;

    //     setIsGeneratingDescription(true);
    //     setDishDescription(''); // Clear previous description before generating new one

    //     const maxRetries = 5;
    //     let retries = 0;
    //     let delay = 1000; // 1 second

    //     while (retries < maxRetries) {
    //         try {
    //             const prompt = `Write a short, appetizing description for a food item called "${selectedDishForDetails.name}", typically found in ${selectedDishForDetails.restaurantCuisine} cuisine. Mention its key ingredients or characteristics. Keep it under 60 words.`;
    //             let chatHistory = [];
    //             chatHistory.push({ role: "user", parts: [{ text: prompt }] });
    //             const payload = { contents: chatHistory };
    //             const apiKey = ""; // If you want to use models other than gemini-2.5-flash-preview-05-20 or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
    //             const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    //             const response = await fetch(apiUrl, {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify(payload)
    //             });

    //             const result = await response.json();

    //             if (response.ok && result.candidates && result.candidates.length > 0 &&
    //                 result.candidates[0].content && result.candidates[0].content.parts &&
    //                 result.candidates[0].content.parts.length > 0) {
    //                 const text = result.candidates[0].content.parts[0].text;
    //                 setDishDescription(text);
    //                 break; // Success, exit loop
    //             } else {
    //                 console.error("Gemini API error or unexpected response structure:", result);
    //                 throw new Error("Failed to generate description.");
    //             }
    //         } catch (error) {
    //             retries++;
    //             console.error(`Attempt ${retries} failed:`, error.message);
    //             if (retries < maxRetries) {
    //                 await new Promise(res => setTimeout(res, delay));
    //                 delay *= 2; // Exponential backoff
    //             } else {
    //                 setDishDescription("Failed to generate description. Please try again later.");
    //             }
    //         } finally {
    //             if (retries === maxRetries || dishDescription !== '') {
    //                 setIsGeneratingDescription(false);
    //             }
    //         }
    //     }
    // };


    return (
        // Apply dark mode classes directly to the outermost div
        <div className={`font-sans min-h-screen bg-red-50 text-gray-900 transition-colors duration-500 ${isDarkMode ? 'dark:bg-gray-950 dark:text-gray-50' : ''}`}>
            {/* Navbar */}
            <TopNav />

            <main className="pt-24 pb-8 px-4 md:px-8">
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

                {/* Vegetarian Option Filter */}
                <section className="container mx-auto my-8 flex justify-end">
                    <label className="flex items-center cursor-pointer">
                        <span className="mr-3 text-base md:text-lg font-medium text-gray-800 dark:text-gray-100">Show Vegetarian Only</span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={showVegOnly}
                                onChange={() => setShowVegOnly(!showVegOnly)}
                            />
                            <div className={`toggle__line w-12 h-6 rounded-full shadow-inner transition-colors duration-300 ${showVegOnly ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                            <div className={`toggle__dot absolute w-5 h-5 bg-white rounded-full shadow inset-y-0.5 transition-all duration-300 ${showVegOnly ? 'left-6' : 'left-0.5'}`}></div>
                        </div>
                    </label>
                </section>

                <Restaurant showVegOnly={showVegOnly} />
            </main>



            {/* Tailwind CSS Custom Styles & Animations */}
            <style>{`
        /* Toggle Switch Styles */
        .toggle__line {
          width: 3rem; /* w-12 */
          height: 1.5rem; /* h-6 */
          border-radius: 9999px; /* rounded-full */
        }
        .toggle__dot {
          width: 1.25rem; /* w-5 */
          height: 1.25rem; /* h-5 */
          background-color: white;
          border-radius: 9999px; /* rounded-full */
          top: 0.25rem; /* inset-y-0.5 */
        }

        /* Custom Animations */
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in-scale {
            animation: fade-in-scale 0.2s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

// export default MainScreen;