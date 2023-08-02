import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { useSelector } from "react-redux";

const Orders = () => {
    const token = useSelector(state => state.user.token);
    const[orders,setOrders] = useState([]);
    const navigate = useNavigate()
    const handleView = (orderId) => {
        navigate('/order/'+orderId)
    }

    const fetchOrders = async() => {
        try {
            const response = await axiosInstance.get('/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    
                },
            });

            setOrders(response?.data?.orders);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrders()
    },[])

    return (
        <>
            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between ">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800 -text-white">Orders</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full -bg-gray-800 -text-blue-400">{orders?.length || 0}</span>
                        </div>
                      
                    </div>
                </div>


                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 -border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 -divide-gray-700">
                                    <thead className="bg-gray-50 -bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>OrderId</span>
                                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">
                                                Provider
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">
                                                Event Date
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">Place</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">Status</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 -divide-gray-700 -bg-gray-900">
                                        {orders?.length > 0 ? (
                                            orders.map((order) => (
                                                <tr key={order._id}>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-black">{order?._id}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-bold">{order?.providerId?.name}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-bold">{new Date(order?.eventDate).toDateString()}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-bold">{order?.address.city}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-bold">{order?.status}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>

                                                            <button className="bg-indigo-500 btn btn-sm text-white hover:text-black" onClick={() => handleView(order._id)}>View</button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500" colSpan={3}>
                                                    No orders found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Orders;