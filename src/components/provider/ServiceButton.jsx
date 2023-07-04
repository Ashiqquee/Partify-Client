import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";
import { useEffect,useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import service from "../../../../partify-server/controllers/service";


const ServiceButton = () => {
    const [serviceList,setServiceList] = useState([]);

    const token = useSelector((state) => state.provider.token);

    

    const providerServices = async() => {
       
            try {
                const response = await axiosInstance.get('/provider/services', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setServiceList(response?.data?.serviceList)
            } catch (error) {
                toast.error('Something went wrong');
                console.log(error);
            }
        }


    const removeService = async(serviceId) => {
        try {

            const response = await axiosInstance.patch(`/provider/removeService/${serviceId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if(response.status === 200){
                setServiceList(prevList => {
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
            providerServices()
        },[])
    
    return(
        <div className="flex flex-col w-full ">
            <div className="">
                <h1 className=" text-center font-black">YOUR SERVICES</h1>
            </div>
            <div className="container  mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {serviceList.map((services) => (
                    <div
                        key={services._id}
                        className="bg-blue-300 p-4 text-white font-bold text-center mx-6"
                    >
                        {services.serviceName}
                        <span onClick={() => removeService(services._id)} className="mx-2 hover:cursor-pointer" ><FontAwesomeIcon icon={faTrash} className="hover:text-red-600"/></span>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default ServiceButton;