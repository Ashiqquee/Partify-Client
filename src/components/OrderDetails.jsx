import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../api/axios";
import { toast } from 'react-toastify'
import OrderForm from "./provider/OrderForm";
import Review from "./user/Review";
import Spinner from "./Spinner";
import useWidth from '../utils/useWidthSize'
const OrderDetails = ({ token }) => {

    const [showReview, setShowReview] = useState(false)
    const navigate = useNavigate();
    const [order, setOrder] = useState('');
    const location = useLocation();
    const [role, setRole] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { id } = useParams();
    const [modalOpen, setModalOpen] = useState(true)
    const [selectedOption, setSelectedOption] = useState('');
    const [confirmAction, setConfirmAction] = useState(false);
    const [editFormData, setEditFormData] = useState({
        alternativePhone: '',
        eventDate: '',
        services: [],
        amount: '',
        street: '',
        city: '',
        zip: '',
        district: '',

    });
    const [spinner, setSpinner] = useState(true)

    const width = useWidth()

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axiosInstance.patch(`/provider/order/${order?._id}`, editFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response?.status === 200) {
                console.log(response?.data?.updatedOrder);
                setOrder(response?.data?.updatedOrder);
                setTimeout(() => {

                    setModalOpen(false)
                }, 50);
                setTimeout(() => {
                    setModalOpen(true)
                }, 100);



                toast.success('Updated Succesfully')

            }


        } catch (error) {
            console.log(error);
        }
    }

    const handleFormChange = (field, value) => {
        setEditFormData((prevFormData) => ({
            ...prevFormData,
            [field]: value,
        }));
    };


    const handleSelectChange = (event) => {

        setSelectedOption(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        const newCheckedValue = event.target.checked;
        setIsChecked(newCheckedValue);

        if (newCheckedValue && order?.customerId?.wallet === 0) {
            toast.warn('0 balance')
            setIsChecked(false);
        }
    }

    const fetchOrder = async (api, navigation) => {
        try {
            console.log(token);
            const response = await axiosInstance.get(api + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setOrder(response.data.order);
                const { alternativeNumber, eventDate, services, totalAmount, address } = response.data.order;
                console.log(services);
                const serviceIds = services.map(service => ({ value: service._id, serviceName: service.serviceName }));
                setEditFormData({
                    alternativePhone: alternativeNumber,
                    eventDate: new Date(eventDate),
                    amount: totalAmount,
                    services: serviceIds,
                    street: address.street,
                    zip: address.zip,
                    city: address.city,
                    district: address.district
                })
            }
            setSpinner(false);
        } catch (error) {
            console.log(error);

            navigate(navigation)

        }
    }

    const handlePayment = async (orderId) => {

        if (selectedOption.length > 3) {
            try {
                let wallet = 0;

                if (isChecked) {

                    wallet = order?.customerId?.wallet || 0;

                    if (selectedOption === 'advanceAmount') {


                        if (wallet >= order?.advanceAmount) {
                            try {
                                const response = await axiosInstance.get(`/orderSuccess/${orderId}?wallet=${order?.advanceAmount}&selectedOption=${selectedOption}&stripe=no`);
                                if (response.status === 200) {
                                    navigate('/profile')
                                }

                            } catch (error) {
                                return toast.error('Something Went Wrong');
                            }
                        }
                    }

                    if (selectedOption === 'fullAmount') {
                        if (wallet >= order?.totalAmount) {
                            try {
                                const response = await axiosInstance.get(`/orderSuccess/${orderId}?wallet=${order?.remainingAmount}&selectedOption=${selectedOption}&stripe=no`);
                                if (response.status === 200) {
                                    return navigate('/profile')
                                }
                            } catch (error) {
                                return toast.error('Something Went Wrong');
                            }
                        }
                    }
                }
                const response = await axiosInstance.post(`/payment/${orderId}`, { wallet, selectedOption }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.url) {
                    window.location.href = response.data.url;
                }

            } catch (error) {
                toast.error('Something Went Wrong');

            }
        } else {
            toast.error('Select any payment option')
        }


    }

    const handleConfirmation = () => {
        setConfirmAction(true);
    };

    const cancelOrder = async (orderId) => {
        try {
            let cancel = 'yes';
            const response = await axiosInstance.patch(`/provider/order/${orderId}`, { cancel }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setOrder((prevOrder) => ({
                    ...prevOrder,
                    status: 'cancelled by provider',

                }))
                toast.success('Cancelled Successfully');
            }

        } catch (error) {
            toast.error('Something went wrong');

        }
    }

    const handleCompleted = async (orderId) => {
        try {
            let completed = 'yes';
            const response = await axiosInstance.patch(`/provider/order/${orderId}`, { completed }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setOrder((prevOrder) => ({
                    ...prevOrder,
                    status: 'completed',

                }))
                toast.success('Amount has been credited to your wallet');
            }
        } catch (error) {

            console.log(error);
        }
    }

    useEffect(() => {
        if (location.pathname.startsWith('/provider')) {
            setRole('provider');
            fetchOrder('/provider/order/', '/provider/orders');
        } else if (location.pathname.startsWith('/order')) {
            setRole('user');
            fetchOrder('/order/', '/profile');
        } else {
            setRole('admin');
            fetchOrder('/admin/order/', '/admin/orders');
        }

    }, [])

    return (
        <>

            {modalOpen ?
                <>
                    <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">

                            <OrderForm onFormChange={handleFormChange} formData={editFormData} onSubmit={handleSubmit} action='edit' />
                            <div className="modal-action">
                                <label htmlFor="my_modal_6" className="btn btn-sm">Close!</label>
                            </div>
                        </div>
                    </div>
                </> : null
            }


            {
                spinner ?
                    <Spinner />
                    :
                    <>
                        <section className={`grid grid-cols-1 gap-8 px-6 xl:grid-cols-3 mt-2 2xl:grid-cols-3 ${width > 1150 ? 'grid-cols-3' : 'grid-cols-1'} `}>
                            {confirmAction && (
                                toast.info(
                                    <div>
                                        <p>Are you sure you want to proceed?</p>
                                        <button
                                            className="btn-sm bg-indigo-500 text-white rounded-md"
                                            onClick={() => cancelOrder(order._id)}
                                        >
                                            Confirm
                                        </button>
                                        <button
                                            className="btn-sm bg-red-500 ml-1 text-white rounded-md"
                                            onClick={() => setConfirmAction(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>,
                                    {
                                        toastId: '',
                                        autoClose: false,
                                        closeOnClick: true,
                                        draggable: false,
                                    }
                                )
                            )}
                            <div className="flex flex-col justify-center px-8 py-6 bg-white rounded-lg shadow-md shadow-gray-200 md:col-span-1 md:row-span-1 ">
                                <h1 className="text-gray-600 font-sans font-medium">GENERAL</h1>
                                <div>
                                    <label htmlFor="status" className="block text-sm text-gray-500 mt-1 font-semibold ">Status</label>

                                    <input
                                        type="text"
                                        value={order?.status}

                                        disabled
                                        className="mt-2 block w-full placeholder-gray-400/70  border border-gray-200 bg-white px-5 py-2.5 text-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                                    />

                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-sm text-gray-500 mt-1 font-semibold ">Event Date</label>

                                    <input
                                        type="text"
                                        disabled
                                        value={new Date(order?.eventDate).toDateString()}
                                        className="mt-2 block w-full placeholder-gray-400/70  border border-gray-200 bg-white px-5 py-2.5 text-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                                    />

                                </div>
                                <div>
                                    <label htmlFor="district" className="block text-sm text-gray-500 mt-1 font-semibold ">District</label>

                                    <input
                                        type="text"
                                        value={order?.address?.district}

                                        disabled
                                        className="mt-2 block w-full placeholder-gray-400/70  border border-gray-200 bg-white px-5 py-2.5 text-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                                    />

                                </div>
                            </div>






                            <div className="flex flex-col justify-center px-8 py-2 bg-white rounded-lg shadow-md shadow-gray-200 md:col-span-2 md:row-span-2 ">

                                <div className="w-full flex ">
                                    <div className="w-1/2   text-sm text-gray-500  font-semibold" >
                                        <h1 className="text-gray-800 font-sans font-medium">ADDRESS</h1>
                                        <p className="pt-2">{order?.address?.street},</p>
                                        <p className="pt-2">{order?.address?.city},</p>
                                        <p className="pt-2">{order?.address?.zip},</p>
                                        <p className="pt-2">{order?.address?.district}.</p>
                                    </div>
                                    <div className="w-1/2  text-sm text-gray-500  font-semibold ml-3" >
                                        <h1 className="text-gray-800 font-sans font-medium">USER DETAILS</h1>
                                        <p className="pt-2">   name : {order?.customerId?.name}</p>
                                        <p className="pt-2">phone : {order?.customerId?.phone}</p>
                                        <p className="pt-2">alternative : {order?.alternativeNumber}</p>

                                    </div>
                                </div>

                                <div className="w-full flex mt-4">

                                    <div className="w-1/2 text-sm text-gray-500 mt-1 font-semibold">
                                        <h1 className="text-gray-800 font-sans font-medium">ORDER DETAILS</h1>
                                        <p className="pt-2">Order Id : {order?._id?.slice(0, 10)} </p>
                                        <p className="pt-2">Order Date : {new Date(order?.orderDate).toDateString()}</p>
                                        <p className="pt-2">Wallet : {order?.walletAmount || 0}</p>


                                    </div>
                                    <div className="w-1/2  text-sm text-gray-500 mt-1 font-semibold ml-3">
                                        <h1 className="text-gray-800 font-sans font-medium">PROVIDER</h1>
                                        <p className="pt-2">{order?.providerId?.name}</p>
                                        <p className="pt-2">{order?.providerId?.phone}</p>

                                    </div>
                                </div>



                            </div>

                        </section>
                        <section className={` mt-5   grid grid-cols-1 gap-8 px-6 xl:grid-cols-3 2xl:grid-cols-3 ${width > 1150 ? 'grid-cols-3' : 'grid-cols-1'} `}>
                            <div className="flex flex-col justify-center px-8 py-2 bg-white rounded-lg shadow-md shadow-gray-200 md:col-span-2 md:row-span-2 ">
                                <h1 className="text-gray-600 font-sans font-medium">Services</h1>

                                <div className="flex flex-col mt-6 mb-5">
                                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden border border-gray-200  md:rounded-lg">

                                                <table className="min-w-full divide-y divide-gray-200  ">
                                                    <thead className="bg-gray-50 ">
                                                        <tr>
                                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                                Name
                                                            </th>
                                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                                                Image
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200 ">
                                                        {
                                                            order?.services?.map(service => {
                                                                return (
                                                                    <tr key={service._id}>
                                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap pl-12">
                                                                            {service.serviceName}
                                                                        </td>
                                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap pl-12">
                                                                            <img src={service.serviceImage} className="w-24 h-20" alt="" />
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </table>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>




                            <div className="flex flex-col   p-5 bg-white  rounded shadow-sm">
                                <div className="mb-6">

                                    <div>
                                        <p className="text-gray-600 font-sans font-medium">PAY</p>
                                        <div className="flex justify-between text-md text-gray-700 mt-1 font-semibold pt-2 ml-0.1">
                                            <p >Total amount <span className="ml-20 ">:</span> </p>

                                            <p>{order?.totalAmount}</p>

                                        </div>
                                        <div className="flex justify-between text-md text-gray-700 mt-1 font-semibold pt-2">
                                            <p >Advance amount  <span className="ml-12 p-1.5">:</span></p>

                                            <p>{order?.advanceAmount}</p>

                                        </div>
                                        <div className="flex justify-between text-md text-gray-700 mt-1 font-semibold pt-2">
                                            <p >Remaining Amount <span className="ml-8 pl-1">:</span></p>

                                            <p>{order?.remainingAmount}</p>

                                        </div>
                                        {
                                            role === 'user' && order?.remainingAmount !== 0 && (order?.status === 'pending' || order?.status === 'confirmed') ?
                                                <>
                                                    <div className="flex justify-between text-md text-gray-700 mt-1 font-semibold pt-2">
                                                        <p >Wallet - {order?.customerId?.wallet || 0}  </p>
                                                        <p>:</p>
                                                        <p>  <input
                                                            checked={isChecked}
                                                            onChange={handleCheckboxChange}
                                                            type="checkbox"
                                                            className="checkbox checkbox-primary checkbox-xs mt-0.5"
                                                        /></p>

                                                    </div>

                                                    <select
                                                        id="option"
                                                        name="amount"
                                                        className="block w-full h-10 mt-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                        value={selectedOption}
                                                        onChange={handleSelectChange}
                                                    >
                                                        {order?.status === "pending"  ? (
                                                            <>
                                                                <option value="" disabled>Select Payment</option>
                                                                <option value="advanceAmount">Advance Amount</option>
                                                                <option value="fullAmount">Pay Full Amount</option>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="" disabled>Select Payment</option>
                                                                <option value="fullAmount">Pay Full Amount</option>
                                                            </>
                                                        )}
                                                    </select>
                                                </>
                                                :
                                                (
                                                    order?.remainingAmount === 0 ?
                                                        <p className="font-semibold text-indigo-500 mt-7">Payment for this order has been completed</p> : null
                                                )
                                        }

                                    </div>
                                </div>
                                {
                                    role === 'user' && order?.remainingAmount !== 0 && (order?.status === 'pending' || order?.status === 'confirmed') ?
                                        <div>
                                            <p

                                                className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white bg-indigo-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:cursor-pointer hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"

                                                onClick={() => handlePayment(order?._id)}
                                            >
                                                PAY NOW
                                            </p>

                                        </div> :
                                        (role === 'provider' ?
                                            <>

                                                {
                                                    order?.status === 'pending' ?
                                                        <> <div>
                                                            <label
                                                                htmlFor="my_modal_6"
                                                                className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white bg-indigo-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:cursor-pointer hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"


                                                            >
                                                                Edit
                                                            </label>

                                                        </div>
                                                            <div>
                                                                <p

                                                                    className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white bg-red-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:cursor-pointer hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"

                                                                    onClick={handleConfirmation}
                                                                >
                                                                    Cancel
                                                                </p>

                                                            </div>

                                                        </> : null
                                                }
                                                {
                                                    order.status === 'confirmed' && Date.now() > new Date(order?.eventDate).getTime() + 24 * 60 * 60 * 1000 ?
                                                        <button className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white bg-green-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:cursor-pointer hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none" onClick={() => handleCompleted(order?._id)}>Complete</button>
                                                        : null
                                                }


                                            </>
                                            : null)
                                }

                            </div>
                        </section>
                    </>
            }
        </>
    )
}

export default OrderDetails;