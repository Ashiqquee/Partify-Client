import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";
import DetailBox from "../dashboard/DetailBox";
import ChartComponent from "../dashboard/Chart";
import HitProviders from "../dashboard/HitProviders";

const Dashboard = () => {

    const [details, setDetails] = useState({
        interaction: '',
        totalOrders: '',
        mostInteracted:'',
    });
    const[mostLikedPost,setMostLikedPosts] = useState([]);
    const [chartData, setChartData] = useState([]);
    const { token } = useSelector(state => state.provider);

    const fetchChartData = async() => {
        try {
            const response = await axiosInstance.get('/provider/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });

            setChartData(response.data.result);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchInteraction = async() => {
        try {
            const response = await axiosInstance.get('/provider/interaction', {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
       
            
            setDetails((prevDetails) => ({
                ...prevDetails,
                interaction: response?.data?.interaction
            }));
        } catch (error) {
            console.log(error);
        }
    };

    const fetchOrderCount = async () => {
        try {
            const response = await axiosInstance.get('/provider/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
            setDetails((prevDetails) => ({
                ...prevDetails,
                totalOrders: response?.data?.orders?.length
            }));
            
        } catch (error) {
            console.log(error);
        }
    };

    const fetchMostLiked = async () => {
        try {
            const response = await axiosInstance.get('/provider/mostLiked', {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
            setMostLikedPosts(response?.data?.posts);

        } catch (error) {
            console.log(error);
        }
    };


    

    useEffect(() => {
        fetchChartData();
        fetchInteraction();
        fetchOrderCount();
        fetchMostLiked();
    },[])

   return(
    <>
           <main id="content" className="flex-1 pb-12 space-y-6  md:space-y-8">

               <section className="flex flex-col w-full px-6 md:justify-between md:items-center md:flex-row">
                   <div>
                       <h2 className="text-3xl font-medium text-gray-800">Provider Dashboard</h2>

                   </div>
               </section>

               <section className="grid grid-cols-1 gap-8 px-6 xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-2 ">

                   <DetailBox details={details} role={'provider'}/>


                   <ChartComponent chartData={chartData} />


                   <div className="flex flex-col justify-center px-8 py-6 bg-white rounded-lg shadow-md shadow-gray-200 md:col-span-1 md:row-span-1 gap-y-1 gap-x-8 ">
                       <h2 className="font-medium text-gray-700">Most Interacted Post</h2>
                       <div className="sm:flex sm:items-center sm:justify-between ">

                           <HitProviders mostLikedPost={mostLikedPost} role={'provider'} />
                       </div>



                   </div>
               </section>
           </main>
    </>
   )
   
}

export default Dashboard;