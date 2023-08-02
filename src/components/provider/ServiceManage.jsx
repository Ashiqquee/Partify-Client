import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faFaceSadCry } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import ServiceBox from './ServiceBox'
import Spinner from '../Spinner'
const ServiceButton = () => {


    const [serviceList, setServiceList] = useState([]);
    const [remainingServices, setRemainingServices] = useState([]);
    const [spinner, setSpinner] = useState(true);


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
            setSpinner(false);
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

    const handleRemove = serviceId => {
        removeService(serviceId)
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
    };

    const handleAdd = serviceId => {
        console.log(serviceId);
        addService(serviceId);
    }

    useEffect(() => {
        providerServices();
    }, [])

    return (
<>
            {
                spinner ?
                    <Spinner /> :
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
                            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                                <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                                    <ServiceBox services={serviceList} removeService={handleRemove} status={'remove'} />

                                </div>
                            </div>
                        )}




                        <div >
                            <h1 className=" text-center font-black">ADD NEW SERVICE</h1>
                        </div>
                        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                            <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
                                <ServiceBox services={remainingServices} addService={handleAdd} status={'add'} />

                            </div>
                        </div>
                    </div>
            }
</>

      
    )
}


export default ServiceButton;