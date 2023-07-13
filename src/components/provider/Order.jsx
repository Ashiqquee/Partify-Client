import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useSelector } from "react-redux";
import OrderForm from "./OrderForm";
import { toast } from 'react-toastify';
import{useNavigate} from 'react-router-dom'

const Order = () => {
    const token = useSelector(state => state.provider.token);
    const [orders, setOrders] = useState([]);
    
    const navigate = useNavigate();

    


    const handleView = (orderId) => {
        navigate('/provider/order/'+orderId)
    }

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get('/provider/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            });
            console.log(response.data.orders);
            setOrders(response.data.orders)

        } catch (error) {
            console.log(error);
        }
    };



    const [formData, setFormData] = useState({
        phone: '',
        alternativePhone: '',
        services: [],
        amount: '',
        advanceAmount: '',
        eventDate: '',
        street: '',
        zip: '',
        city: '',
        district: '',
    });

    const validateFormData = () => {
        const errors = {};


        if (!/^\d{10}$/.test(formData?.phone)) {
            errors.phone = 'Phone number must be a 10-digit number';
        }
        if (!/^\d{10}$/.test(formData?.alternativePhone)) {
            errors.alternativePhone = 'Alternative phone number must be a 10-digit number';
        }



        if (isNaN(formData?.amount) || isNaN(formData?.advanceAmount)) {
            errors.amount = 'Amount and advance amount must be numbers';
        } else if (Number(formData?.amount) <= Number(formData?.advanceAmount)) {
            errors.amount = 'Amount must be greater than advance amount';
        }


        const selectedDate = new Date(formData.eventDate);
        const currentDate = new Date();
        if (selectedDate <= currentDate) {
            errors.eventDate = 'Event date must be in the future';
        }


        if (formData?.services?.length === 0) {
            errors.services = 'At least one service must be selected';
        }


        if (!/^\d{6}$/.test(formData.zip)) {
            errors.zip = 'Zip code must be a 6-digit number';
        }

        if (formData?.city?.trim() < 2) {
            errors.city = "Enter a valid city"
        }


        if (formData?.street?.trim() < 2) {
            errors.street = "Enter a valid street"
        }
        if (formData?.district?.trim() < 2) {
            errors.district = "Enter a valid district"
        }

        return errors;
    };



    const handleFormChange = (field, value) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateFormData();
        if (Object.keys(errors).length === 0) {
            
            const response = await axiosInstance.post('/provider/orders', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response.status === 200){
                toast.success('Order Added');

            }
        }
        else if (errors.phone) {
            toast.error(errors.phone)
        }
        else if (Object.keys(errors).length === 8) {
            toast.error("Enter All fields")
        } else if (errors.alternativePhone) {
            toast.error(errors.alternativePhone)
        } 
        else if (errors.services) {
            toast.error(errors.services)
        } else if (errors.amount) {
            toast.error(errors.amount)
        }else if (errors.eventDate) {
            toast.error(errors.eventDate)
        } else if (errors.zip) {
            toast.error(errors.zip)
        } else if (errors.city) {
            toast.error(errors.city)
        } else if (errors.street) {
            toast.error(errors.street)
        }
        else if (errors.district) {
            toast.error(errors.district)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, [])


    return (
        <>

            <section className="container px-4 mx  ">
                <div className="sm:flex sm:items-center sm:justify-between ">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Orders</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{orders?.length || 0}</span>
                        </div>
                        <div className="ml-auto">
                            <h2 className="btn btn-sm bg-indigo-500 text-white hover:text-black" onClick={() => window.my_modal_2.showModal()}>ADD ORDER +</h2>
                            <dialog id="my_modal_2" className="modal">
                                <div method="dialog" className="modal-box">
                                    <OrderForm onFormChange={handleFormChange} formData={formData} onSubmit={handleSubmit} action='add'/>
                                </div>
                                <form method="dialog" className="modal-backdrop">
                                    <button>close</button>
                                </form>
                            </dialog>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>OrderId</span>
                                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                User
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Event Date
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Place</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
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
                                                            <h2 className="font-medium text-bold">{order?.customerId?.name}</h2>
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

export default Order;