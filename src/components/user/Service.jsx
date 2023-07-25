

const Service = ({ services }) => {



    return (
        <>
            {services.map((service) => (
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


                    </div>
                </div>
            ))}
        </>
    )
}

export default Service;