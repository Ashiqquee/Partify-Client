import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import useWidthSize from "../../utils/useWidthSize";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SortProvider from "./SortProvider";
import Spinner from "../Spinner";

const ProviderBox = () => {
    const { token } = useSelector(state => state.user)
    const [providers, setProviders] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');
    const size = useWidthSize();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedService, setSelectedService] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState([]);
    const [spinner, setSpinner] = useState(true)
    const fetchProviders = async () => {
        try {
            const response = await axiosInstance.get('/providersList');
            setProviders(response.data.providerData);
            setSpinner(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProviders()
    }, []);

    const handleMessage = async (providerId) => {
        try {
            if (!token) return navigate('/login');


            const response = await axiosInstance.post('/chat', { providerId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                const chatId = response?.data?.chat._id;

                navigate(`/chat?id=${chatId}`);
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleSelectChange = (event) => {
        let values = event.value;
        setSelectedValue(values);
        setSelectedOptions(event);
    };




    const handleSearch = (value) => {
        setSearchText(value)
    };


    return (
        <>
            {
                spinner ?
                    <Spinner />
                    :
                    <section className="bg-white dark:bg-gray-900 ">
                        <div className="container px-6 py-10 mx-auto">
                            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">Providers</h1>

                            <p className="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">

                                Discover service providers that meet your criteria and connect with them through messaging to place your orders.
                            </p>


                            <SortProvider setSelectedServiceId={setSelectedServiceId} selectedService={selectedService} setSelectedService={setSelectedService} searchText={searchText} selectedOptions={selectedOptions} setSearchText={handleSearch} handleChange={handleSelectChange} />



                            <div className={size > 880 ? "grid grid-cols-1 gap-8 mt-8 xl:mt-16 xl:grid-cols-3 h-5 md:grid-cols-2" : "grid grid-cols-1 gap-8 mt-8 xl:mt-16 xl:grid-cols-3 h-5 md:grid-cols-1"}>


                                {

                                    providers.filter((provider) => provider.name.toLowerCase().includes(searchText)

                                        && (provider.places[0]
                                            .split(',').join().includes(selectedValue)
                                            || provider.places[0].split(',').join().includes("All Kerala"))
                                        && provider.services.some((service) => {
                                            return selectedServiceId.includes(service._id);
                                        })
                                    )



                                        .map((provider) => {
                                            return (
                                                <div key={provider._id} className="flex flex-col items -center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-indigo-500 dark:border-gray-700 dark:hover:border-transparent " onClick={() => navigate(`/user/provider/${provider._id}`)}>
                                                    <div className="w-full h-40" style={{ backgroundImage: `url(${provider?.coverPic})`, backgroundSize: 'cover' }}>

                                                        <div className="avatar">
                                                            <div className="w-20 mt-3 ml-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                <img src={provider?.profilePic} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                                                        <h1>{provider?.name}</h1>
                                                        {
                                                            provider?.isUpgraded ?
                                                                <p className="mt-1.5 ml-1 tooltip" data-tip='verified badge'>
                                                                    <svg width="20" height="24" strokeWidth="1.5"
                                                                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor">
                                                                        <path d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
                                                                            stroke="#ffffff" strokeWidth="0"
                                                                            id="mainIconPathAttribute" fill="blue">
                                                                        </path> <path d="M9 12L11 14L15 10"
                                                                            stroke="#ffffff" strokeLinecap="round"
                                                                            strokeLinejoin="round" id="mainIconPathAttribute"
                                                                            fill="blue"></path> </svg>
                                                                </p>
                                                                : null
                                                        }

                                                    </div>

                                                    <p className="mt-2 text-gray-500 capitalize group-hover:text-white">{provider?.description}</p>

                                                    <div className="flex mt-3 -mx-2 ">


                                                        <p className="mx-2 text-white d btn btn-sm bg-indigo-500  group-hover:text-indigo-500 group-hover:bg-white font-bold " onClick={() => handleMessage(provider?._id)}>
                                                            MESSAGE
                                                        </p>


                                                    </div>
                                                </div>
                                            )
                                        })}

                                {

                                    providers.filter((provider) => provider.name.toLowerCase().includes(searchText)

                                        && (provider.places[0]
                                            .split(',').join().includes(selectedValue)
                                            || provider.places[0].split(',').join().includes("All Kerala"))
                                        && provider.services.some((service) => {
                                            return selectedServiceId.includes(service._id);
                                        })
                                    )



                                        .map((provider) => {
                                            return (
                                                <div key={provider._id} className="flex flex-col items -center p-8 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-indigo-500 dark:border-gray-700 dark:hover:border-transparent " onClick={() => navigate(`/user/provider/${provider._id}`)}>
                                                    <div className="w-full h-40" style={{ backgroundImage: `url(${provider?.coverPic})`, backgroundSize: 'cover' }}>

                                                        <div className="avatar">
                                                            <div className="w-20 mt-3 ml-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                <img src={provider?.profilePic} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 flex text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                                                        <h1>{provider?.name}</h1>
                                                        {
                                                            provider?.isUpgraded ?
                                                                <p className="mt-1.5 ml-1 tooltip" data-tip='verified badge'>
                                                                    <svg width="20" height="24" strokeWidth="1.5"
                                                                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor">
                                                                        <path d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
                                                                            stroke="#ffffff" strokeWidth="0"
                                                                            id="mainIconPathAttribute" fill="blue">
                                                                        </path> <path d="M9 12L11 14L15 10"
                                                                            stroke="#ffffff" strokeLinecap="round"
                                                                            strokeLinejoin="round" id="mainIconPathAttribute"
                                                                            fill="blue"></path> </svg>
                                                                </p>
                                                                : null
                                                        }

                                                    </div>

                                                    <p className="mt-2 text-gray-500 capitalize group-hover:text-white">{provider?.description}</p>

                                                    <div className="flex mt-3 -mx-2 ">


                                                        <p className="mx-2 text-white d btn btn-sm bg-indigo-500  group-hover:text-indigo-500 group-hover:bg-white font-bold " onClick={() => handleMessage(provider?._id)}>
                                                            MESSAGE
                                                        </p>


                                                    </div>
                                                </div>
                                            )
                                        })}
                                {providers.filter((provider) => provider.name.toLowerCase().includes(searchText)

                                    && (provider.places[0]
                                        .split(',').join().includes(selectedValue)
                                        || provider.places[0].split(',').join().includes("All Kerala"))
                                    && provider.services.some((service) => {
                                        return selectedServiceId.includes(service._id);
                                    })
                                ).length === 0 && (
                                        <div className="flex justify-center lg:mt-20  items-center lg:w-96  lg:ml-80 text-gray-500   ml">
                                            0 Results
                                        </div>
                                    )}

                            </div>

                        </div>
                    </section>
            }
        </>
    )
}

export default ProviderBox;