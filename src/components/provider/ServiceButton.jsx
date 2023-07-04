import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSquarePlus, faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';


const ServiceButton = () => {


    const [serviceList, setServiceList] = useState([]);
    const [remainingServices, setRemainingServices] = useState([]);


    const token = useSelector((state) => state.provider.token);



    const providerServices = async () => {

        try {
            const response = await axiosInstance.get('/provider/services', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServiceList(response?.data?.serviceList);
            setRemainingServices(response?.data?.remainingServices);

        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }


    const removeService = async (serviceId) => {
        try {

            const response = await axiosInstance.patch(`/provider/removeService/${serviceId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.status === 200);
            if (response.status === 200) {
                const removedService = serviceList.find((service) => service._id === serviceId);
                
                const updatedRemaining = [...remainingServices, removedService];
                
                setRemainingServices(updatedRemaining);


                const updatedList = serviceList.filter((service) => service._id !== serviceId);
                setServiceList(updatedList);
                console.log(remainingServices);


            }


        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    };


    const addService = async (serviceId) => {
        try {

            const response = await axiosInstance.patch(`/provider/addService/${serviceId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.status === 200);

            if (response.status === 200) {
                setServiceList(prevRemaining => {
                    const addedService = remainingServices.find(service => service._id === serviceId);
                    const updatedServices = [...prevRemaining, addedService];
                    return updatedServices;
                })

                setRemainingServices(prevList => {
                    const updatedList = prevList.filter(service => service._id !== serviceId);
                    return updatedList;
                });
            }


        } catch (error) {
            toast.error('Something went wrong');
            console.log(error);
        }
    }

    useEffect(() => {
        providerServices();
    }, [])

    return (
        <div className="flex flex-col w-full mt-3">
            <div >
                <h1 className=" text-center font-black">YOUR SERVICES</h1>
            </div>
            {serviceList.length === 0 ? (
                <div className="p-4 font-bold text-center">
                    <span className="m-2">
                        <FontAwesomeIcon icon={faFaceSadCry} />
                    </span>
                    Service list is empty
                </div>
            ) : (
                <div className="container mt-4 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {serviceList.map((services) => (
                        <div
                            key={services._id}
                            className="bg-blue-300 p-4 text-white font-bold text-center mx-6"
                        >
                            {services.serviceName}
                            <span onClick={() => removeService(services._id)} className="mx-2 hover:cursor-pointer">
                                <FontAwesomeIcon icon={faTrash} className="hover:text-red-600" />
                            </span>
                        </div>
                    ))}
                </div>
            )}




            <div className="mt-6">
                <h1 className=" text-center font-black">ADD NEW SERVICE</h1>
            </div>
            <div className="container mt-4 grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {remainingServices.map((service) => (
                    <div
                        key={service._id}
                        className="bg-blue-300 p-4 text-white font-bold text-center mx-6"
                    >
                        {service.serviceName}
                        <span
                            onClick={() => addService(service._id)}
                            className="mx-2 hover:cursor-pointer"
                        >
                            <FontAwesomeIcon
                                icon={faSquarePlus}
                                className="hover:text-green-600"
                            />
                        </span>
                    </div>
                ))}

            </div>

        </div>
    )
}


export default ServiceButton;