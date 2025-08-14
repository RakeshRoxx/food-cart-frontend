import { Salad, X } from "lucide-react";
import { useState } from "react";

const DishDetails = (props) => {

    const { selectedDishForDetails, closeDishDetails } = props;

    const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
    const [dishDescription, setDishDescription] = useState('');

    const generateDishDescription = () => {
        console.log("Generating GEMINI");;

    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
            <div className="bg-white dark:bg-gray-850 rounded-2xl shadow-xl p-6 w-full max-w-md relative animate-fade-in-scale">
                <button
                    onClick={closeDishDetails}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 text-3xl transition-colors duration-200"
                >
                    <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-400">{selectedDishForDetails.name}</h3>
                <div className="flex items-center space-x-4 mb-4">
                    <img src={selectedDishForDetails.imageUrl} alt={selectedDishForDetails.name} className="w-24 h-24 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
                    <div>
                        <p className="text-lg font-semibold">${selectedDishForDetails.price.toFixed(2)}</p>
                        <p className="text-gray-600 dark:text-gray-400">Cuisine: {selectedDishForDetails.restaurantCuisine}</p>
                        {selectedDishForDetails.isVeg && <p className="text-red-600 dark:text-red-400 flex items-center mt-1"><Salad className="inline-block w-5 h-5 mr-1" />Vegetarian</p>}
                    </div>
                </div>

                <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-100">Description:</h4>
                {isGeneratingDescription ? (
                    <p className="text-gray-500 dark:text-gray-400 italic">Generating description...</p>
                ) : (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{dishDescription || "Click 'Generate Description' to learn more about this dish!"}</p>
                )}

                <button
                    onClick={generateDishDescription}
                    disabled={isGeneratingDescription}
                    className="w-full py-3 bg-red-500 text-white rounded-xl text-lg font-bold shadow-md hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isGeneratingDescription ? 'Generating...' : '✨ Generate Description'}
                </button>
            </div>
        </div>
    )
};

export default DishDetails;