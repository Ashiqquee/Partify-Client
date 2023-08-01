

const Spinner = () => {
    return(
        <div className="flex items-center justify-center w-full  h-screen">
            <div className="flex">
                <p className="loading loading-infinity loading-lg "></p>
                <p className="ml-2 mt-2 font-sans font-black text-gray-900">Loading...</p>
            </div>

        </div>
    )
}

export default Spinner;