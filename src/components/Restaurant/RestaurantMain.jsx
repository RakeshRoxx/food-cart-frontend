import { useNavigate } from "react-router-dom";

const RestaurantMain = () => {

    const navigate = useNavigate();

    const backToHome = () => {
        navigate("/");
    }

    return (
        <div>
            <h2>Restaurant Admin Page</h2>
            <button onClick={backToHome}>Go Back</button>
        </div>
    );
}

export default RestaurantMain;