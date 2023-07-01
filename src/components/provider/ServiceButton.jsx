import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";
import { useEffect,useState } from "react";


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

                console.log(response.data.serviceList);
                setServiceList(response.data.serviceList)


               

            } catch (error) {
                // toast.error('Something went wrong')
                console.log(error);
            }
        }


        useEffect(() => {
            providerServices()
        },[])
    
    return(
        <>
        
            <div className="container mx-auto mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {serviceList.map((services, index) => (
                    <div
                        key={services._id}
                        className="bg-blue-300 p-4 text-white font-bold text-center"
                    >
                        {services.serviceName}
                    </div>
                ))}
            </div>
        </>
    )
}


export default ServiceButton;