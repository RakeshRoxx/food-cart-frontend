import { useState } from 'react';
import HeroBanner from './HeroBanner';
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
            <TopNav />

            <main className="pt-24 pb-8 px-4 md:px-8">
                <HeroBanner />
                <Restaurant showVegOnly={showVegOnly} />
            </main>
        </div>
    );
};

// export default MainScreen;