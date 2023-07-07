import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";



const ProviderBox = () => {

    const[providers,setProviders] = useState([]);

    const fetchProviders = async() => {
        try {
            const response =await  axiosInstance.get('/providersList');

            console.log(response.data.providerData);
            setProviders(response.data.providerData)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProviders()
    },[])
    

    return(
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Providers</h1>

                <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
                   
                    Discover service providers that meet your criteria and connect with them through messaging to place your orders.
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-4">

                    {providers.map((provider) => {
                       return(
                           <div key={provider._id} className="flex flex-col items -center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-blue-500 dark:border-gray-700 dark:hover:border-transparent">
                               <img className="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg" alt="" />

                               <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">{provider?.name}</h1>

                               <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">{provider?.services[0]?.serviceName}</p>

                               <div className="flex mt-3 -mx-2">
                                   <a href="#" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white" aria-label="Reddit">

                                      

                                   </a>

                                   <a href="#" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white" aria-label="Facebook">
                                       <h1>{provider?.places[0]}</h1>
                                   </a>

                                   <a href="#" className="mx-2 text-gray-600 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300 group-hover:text-white" aria-label="Github">
                                       <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                       </svg>
                                   </a>
                               </div>
                           </div>
                       )
                    })}




                    
                   
                </div>
                
            </div>
        </section>
    )
}

export default ProviderBox;