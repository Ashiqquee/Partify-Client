

const serviceBox = ({ services, removeService, addService,status }) => {

    const handleRemove = serviceId => {
        removeService(serviceId)
    };

    const handleAdd = serviceId => {
        addService(serviceId)
    };

    return(
        
            services.map((service) => (
                <div key={service?._id} className="overflow-hidden transition-shadow duration-300 bg-white rounded">
                    <p >
                        <img
                            src={service?.serviceImage}
                            className="object-cover w-full h-64 rounded"
                            alt=""
                        />
                    </p>
                    <div className="py-5 flex justify-between">
                        <p className="-mt-16 btn btn-sm ml-2 text-xs font-semibold bg-indigo-500 text-white uppercase hover:text-black">
                            {service?.serviceName}
                        </p>
                        {status === 'remove' ? 
                            <p className="-mt-16 btn btn-sm bg-indigo-600 mr-2 text-xs font-semibold text-white uppercase hover:text-black" onClick={() => handleRemove(service?._id)}>
                                Remove
                            </p>
                            : 
                            <p className="-mt-16 btn btn-sm bg-indigo-600 mr-2 text-xs font-semibold text-white uppercase hover:text-black" onClick={() => handleAdd(service?._id)}>
                                Add
                            </p>
                            // <button className="-mt-16 btn btn-sm flex items-center mr-2 text-sm font-medium  bg-green-500 transition-colors duration-200 sm:text-base sm:px-6 hover:bg-green-600 text-white gap-x-3 ">
                            //     <svg
                            //         xmlns="http://www.w3.org/2000/svg"
                            //         fill="none"
                            //         viewBox="0 0 24 24"
                            //         strokeWidth="1.5"
                            //         stroke="currentColor"
                            //         className="w-5 h-5 sm:w-6 sm:h-6"
                            //     >
                            //         <path
                            //             strokeLinecap="round"
                            //             strokeLinejoin="round"
                            //             d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                            //         />
                            //     </svg>
                            //     <span>Add</span>
                            // </button>
                            
                            }


                    </div>
                </div>
            ))
        
    )
}

export default serviceBox;