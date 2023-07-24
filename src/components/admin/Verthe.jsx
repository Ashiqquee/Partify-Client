import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useParams } from "react-router-dom";

const Verthe  = () => {
    const [provider,setProvider] = useState({});

    const { providerId } = useParams();

    

    const fetchProvider = async() => {
        try {
            const response = await axiosInstance.get(`/user/${providerId}`);
            setProvider(response?.data?.provider);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProvider();
    },[])
   
    return (
        <>
            <main className="profile-page w-full ">
                
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4 " >
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center">
                                    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                        <div className="relative h-48 w-48 ">
                                          
                                            <div className="avatar">
                                                <div className="w-full rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={provider.profilePic} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-12">
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 uppercase">
                                            {provider?.name}
                                        </h3>
                                        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                            {provider?.places?.map((place) => place)}
                                        </div>
                                       
                                    </div>
                                    {/* <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Posts</span>
                                            </div>
                                            
                                        </div>
                                    </div> */}
                                    {/* <div className="w-full lg:w-1/12 px-4 lg:order-3 lg:text-right lg:self-center ">
                                        <div className=" mt-10 sm:mt-0">
                                            <button
                                                className="bg-indigo-500 active:bg-indigo-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                Message
                                            </button>
                                        </div>
                                    </div> */}
                                </div>
                              
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center ">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg font-semibold leading-relaxed text-blueGray-700 uppercase">
                                                {provider?.description}
                                            </p>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-wrap items-center md:justify-between justify-center">
                                <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                    <div className="text-sm text-blueGray-500 font-semibold py-1">
                                        Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                </section>
            </main>


        </>
    );
};


export default Verthe