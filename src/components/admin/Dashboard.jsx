import { useState } from "react";
import { useEffect } from "react";
import DetailBox from "../dashboard/DetailBox";
import axiosInstance from '../../api/axios'
import { useSelector } from "react-redux";
import HitProviders from "../dashboard/HitProviders";
import ChartComponent from "../dashboard/Chart";


const Dashboard = () => {
  const [details,setDetails] = useState({
    totalUsers:'',
    totalOrders:'',
    totalProviders:''
  });

  const [frequentProvider, setFrequentProvider] = useState([]);
  const [chartData,setChartData] = useState([]);
  const {token} = useSelector(state => state.admin)
  const fetchDetails = async() => {
    try {
      const response = await axiosInstance.get('/admin/dashboard',{
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
      });
     
      const { totalUsers,  totalOrders, totalProviders } = response.data;
 
      setDetails({
        totalUsers,
        totalOrders,
        totalProviders
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChartData = async() => {
    try {
      const respo = await axiosInstance.get('/admin/chart', {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      });
  
      setChartData(respo.data.result)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFreuquentProvider = async() => {
    try {
      const response = await axiosInstance.get('/admin/frequentProviders', {
        headers: {
          Authorization: `Bearer ${token}`,

        },
      });

      setFrequentProvider(response?.data?.mostFrequentProviders);

    } catch (error) {
      console.log(error);
    }
 
  }


  useEffect(() => {
    fetchDetails();
    fetchFreuquentProvider();
    fetchChartData();
  }, [])
  

    return (
        <>
        <main id="content" className="flex-1 pb-12 space-y-6   bg-gray-100  md:space-y-8">

        <section className="flex flex-col w-full px-6 md:justify-between md:items-center md:flex-row">
          <div>
            <h2 className="text-3xl font-medium text-gray-800">Admin Dashboard</h2>
           
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 px-6 xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-2 ">
          
          <DetailBox details={details}/>

         
            <ChartComponent chartData={chartData} />


            <div className="flex flex-col justify-center px-8 py-6 bg-white rounded-lg shadow-md shadow-gray-200 md:col-span-1 md:row-span-1 gap-y-1 gap-x-8 ">
              <h2 className="font-medium text-gray-700">Famous Providers</h2>
              <div className="sm:flex sm:items-center sm:justify-between ">
                
                <HitProviders frequentProvider={frequentProvider} />
              </div>
     
           

            </div>
        </section>
        </main>
        </>

        
    )
};

export default Dashboard;