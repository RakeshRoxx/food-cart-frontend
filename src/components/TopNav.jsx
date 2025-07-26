function TopNav() {
    return (
        <div className="flex justify-between w-full h-16 bg-amber-400 items-center px-20">
            <div className="text-red-400">
                FoodCart
            </div>
            <div>
                <span>Location</span>
                <span>Search</span>
            </div>
            <div>
                Profile
            </div>
        </div >
    );
}

export default TopNav;