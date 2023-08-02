import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../Post";
import Service from "./Service";
import ReviewSection from "./ReviewSection";
import { useSelector } from "react-redux";
import Spinner from '../Spinner'

const Verthe = () => {
    const [provider, setProvider] = useState({});

    const { providerId } = useParams();
    const {token} = useSelector(state => state.user);
    const [posts, setPosts] = useState([]);
    const [services, setServices] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [spinner,setSpinner] = useState(true);    
    const navigate = useNavigate();
    
    const fetchProviderPosts = async () => {
        try {
            const response = await axiosInstance.get(`/post/${providerId}`);

           
            setPosts(response?.data?.posts);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProviderPosts();
    }, [])

    const fetchProvider = async () => {
        try {
            const response = await axiosInstance.get(`/user/${providerId}`);
            setServices(response?.data?.provider?.services);
            setProvider(response?.data?.provider);
            setSpinner(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProvider();
    }, []);

    const handleMessage = async () => {
        try {

            if(!token) return navigate('/login');

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

    return (
        <>
        {
            spinner ?
            <Spinner/>
            :
                    <main className="profile-page w-full ">

                        <section className="relative py-16 bg-blueGray-200">
                            <div className="container mx-auto px-4 " >
                                <div className="relative flex flex-col min-w-0 break-words bg-gray-200 w-full mb-6 shadow-sm rounded-lg ">
                                    <div className="px-6">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                                <div className="relative h-48 w-48 ">

                                                    <div className="avatar mt-3">
                                                        <div className="w-full rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                            <img src={provider.profilePic} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center mt-12">
                                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 uppercase">
                                                    {provider?.name}
                                                    {provider?.isUpgraded ?



                                                        <p className="ml-2 mt-1 tooltip hover:cursor-pointer" data-tip='verified badge'>
                                                            <svg width="30" height="30" strokeWidth="1.5"
                                                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor">
                                                                <path d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
                                                                    stroke="#ffffff" strokeWidth="0"
                                                                    id="mainIconPathAttribute" fill="blue">
                                                                </path> <path d="M9 12L11 14L15 10"
                                                                    stroke="#ffffff" strokeLinecap="round"
                                                                    strokeLinejoin="round" id="mainIconPathAttribute"
                                                                    fill="blue"></path> </svg>
                                                        </p>



                                                        : null}
                                                </h3>
                                                <div className="text-sm leading-normal mt-0 mb-2  font-bold uppercase">
                                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>
                                                    {provider?.places?.map((place) => place)}
                                                </div>
                                                <div className=" mt-10 sm:mt-0">
                                                    <button
                                                        className="bg-indigo-500 active:bg-indigo-600 md:ml-4 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => handleMessage()}
                                                    >
                                                        Message
                                                    </button>
                                                </div>

                                            </div>

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

                        </section>
                        <section className="grid grid-cols-1 gap-8 px-6 xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-1 w-full  ">

                            <div className={`flex flex-col  sm:px-8 sm:py-6 bg-white rounded-lg ${posts.length > 0 ? 'shadow-lg shadow-gray-200' : 'h-full shadow-lg shadow-gray-200'} md:col-span-2 md:row-span-2 gap-y-4 gap-x-8`}>



                                {
                                    posts.length > 0 ?
                                        <Post role='user' posts={posts} savedPosts={savedPosts} />

                                        :
                                        <div className="post bg-white  mt-8 mb-8  " >
                                            <div className="info flex justify-center items-center px-4">
                                                <h1 className='my-2  font-sans font-semibold uppercase'><span className='font-bold  text-indigo-500 hover:cursor-pointer ml-2'>{provider.name}</span> didn't post <span className="ml-2 md:ml-0"> anything yet</span> </h1>
                                            </div>
                                        </div>
                                }

                            </div>


                            <div className="flex flex-col py-8  pr-2  flex-shrink-0 w-full ">
                                <h1 className='font-bold uppercase font-sans'>Services</h1>

                                <div className='   items-cente   mt-4 w-full py-6 px-4 rounded-lg h-full     '>


                                    <Service services={services} />


                                </div>

                            </div>


                        </section>


                        <ReviewSection providerId={providerId} />



                    </main>

        }
        


        </>
    );
};


export default Verthe