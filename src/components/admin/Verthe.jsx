import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";

const Verthe  = () => {
    const { providerId } = useParams();
    const [provider, setProvider] = useState('');

    const fetchProvider = async () => {
        const response = await axiosInstance.get(`/provider/${providerId}`);

        console.log(response.data.provider);
        setProvider(response.data.provider)
    }


    useEffect(() => {
        fetchProvider()
    }, [])

    return (
        <>

           
                
                <section className="  w-full  ">
                <div className="container mx-auto px-4 bg-gray-100 ">
                    <div className=" flex flex-col min-w-0 break-words  w-full mb-6  rounded-lg pt-5 ">
                            <div className="px-6">
                               
                                <div className="text-center ">
                                <div className="avatar  mt-2">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 ">
                                            <img src={provider?.profilePic} />
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-semibold leading-normal  text-blueGray-700 mb-2 ">
                                        {provider?.name}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2  font-bold uppercase">
                                     
                                        {provider?.places?.map((place, index) => {
                                            return (
                                                <p key={index}>{place}</p>
                                            );
                                        })}

                                    </div>
                                  
                                    <div className="mt-2 pt-10   border-b border-blueGray-200 text-center">
                                        <div className="flex justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4  leading-relaxed font-bold uppercase">
                                                    {provider?.description}
                                                </p>
                                             
                                            </div>
                                        </div>
                                    </div>
                                    
                                   
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </section>
           

        </>
    );
};


export default Verthe