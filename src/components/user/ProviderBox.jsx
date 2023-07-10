import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import useWidthSize from "../../utils/useWidthSize";



const ProviderBox = () => {

    const[providers,setProviders] = useState([]);
    const size = useWidthSize()
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

                <div className={size > 880 ? "grid grid-cols-1 gap-8 mt-8 xl:mt-16 xl:grid-cols-3 h-5 md:grid-cols-2" : "grid grid-cols-1 gap-8 mt-8 xl:mt-16 xl:grid-cols-3 h-5 md:grid-cols-1"}>


                    {providers.map((provider) => {
                       return(
                           <div key={provider._id} className="flex flex-col items -center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-indigo-500 dark:border-gray-700 dark:hover:border-transparent">
                               <div className="w-full h-40" style={{ backgroundImage: `url(${provider?.coverPic})`, backgroundSize: 'cover' }}>
                                   
                                   <div className="avatar">
                                       <div className="w-20 mt-3 ml-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                           <img src={provider?.profilePic} />
                                       </div>
                                   </div>
                               </div>
                               <h1 className="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">{provider?.name}</h1>

                               <p className="mt-2 text-gray-500 capitalize group-hover:text-white">{provider?.description}</p>

                               <div className="flex mt-3 -mx-2 ">
                          

                                   <p className="mx-2 text-white d btn btn-sm bg-indigo-500  group-hover:text-indigo-500 group-hover:bg-white font-bold ">
                                    MESSAGE
                                   </p>

                                
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