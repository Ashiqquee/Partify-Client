import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../api/axios";
import { toast } from 'react-toastify'
import OrderForm from "./provider/OrderForm";
import Review from "./user/Review";
import useWidth from '../utils/useWidthSize'
const OrderDetails = ({ token }) => {

    const details = ['orderId', 'Customer Name', 'Customer Phone', 'Alternative Number', 'Order Date', 'Event Date'];
    const providerDetails = ['Provider Name', 'Provider Phone', 'Status', 'Services', 'Amount', 'Advance Amount'];
    const address = ['Street', 'City', 'Zip', 'District'];
    const payment = ['Total Amount', 'Advance Amount', 'Advance Paid', 'Wallet Used', 'Remaining Amount', '', ''];
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
                setOrder((prevOrder) => ({
                    ...prevOrder,
                    alternativeNumber: editFormData.alternativePhone,
                    eventDate: editFormData.eventDate,
                    totalAmount: editFormData.amount,
                    services: editFormData.services.map((service) => ({
                        _id: service.value,
                        serviceName: service.label,
                    })),
                    address: {
                        ...prevOrder.address,
                        city: editFormData.city,
                        district: editFormData.district,
                        zip: editFormData.zip,
                        street: editFormData.street,
                    },
                }));
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
            {/* {
                role === 'provider' ? 
                    <div className="flex w-full justify-between  font-semibold ">
                        
                        {order?.status === 'pending' ? (
                            <label htmlFor="my_modal_6" className="btn btn-sm bg-indigo-500 text-white hover:text-black ml-2">
                                Edit
                            </label>
                        ) : null}
                        {modalOpen ?
                            <>
                            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                
                                <OrderForm onFormChange={handleFormChange} formData={editFormData} onSubmit={handleSubmit}  action='edit' />
                                <div className="modal-action">
                                    <label htmlFor="my_modal_6" className="btn btn-sm">Close!</label>
                                </div>
                            </div>
                        </div>
                            </> : null}
                        {
                            (order.status === 'pending' || order.status === 'confirmed') && (Date.now() < new Date(order?.eventDate)  - 48 * 60 * 60 * 1000) ? 
                                <button className="btn btn-sm bg-red-500 text-white hover:text-black" onClick={handleConfirmation}>Cancel</button>
                                :null
                        }

                        {
                            order.status === 'confirmed' && Date.now() > new Date(order?.eventDate).getTime() + 24 * 60 * 60 * 1000 ?
                                <button className="btn btn-sm bg-green-700 text-white hover:text-black ml-1" onClick={() => handleCompleted(order?._id)}>Done</button>
                                : null
                        }

                    </div> 
                    : null
            }

          
            <div className="flex w-full justify-center font-semibold text-lg mt-2">
                <h1>ORDER </h1>
                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div className="order-1 bg-gray-200 m-4 p-1 shadow-md">
                    <div>
                        <h1 className="flex justify-center font-bold p-2 "> DETAILS </h1>
                        {
                            details.map((details, index) => {
                                return (
                                    <div key={index} className="flex justify-between mt-2  p-2">
                                        <div className="order-1">
                                            <span className="order-label font-bold font-sans">{details}</span>
                                        </div>
                                        <div className="order-2 mx-5">
                                            {index === 0 ? (
                                                <p className="font-medium font-sans">{order?._id}</p>
                                            ) : index === 1 ? (
                                                <p className="font-medium font-sans">{order?.customerId?.name}</p>
                                            ) : index === 2 ? (
                                                <p className="font-medium font-sans">{order?.customerId?.phone}</p>
                                            ) : index === 3 ? (
                                                <p className="font-medium font-sans">{order?.alternativeNumber}</p>
                                            ) : index === 4 && order?.orderDate ? (
                                                <p className="font-medium font-sans">{new Date(order?.orderDate).toDateString()}</p>
                                            ) : index === 5 && order?.eventDate ? (
                                                <p className="font-medium font-sans">{new Date(order?.eventDate).toDateString()}</p>

                                            ) : null}
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
                <div className="order-1 bg-gray-200 m-4 p-1 shadow-md">
                    <div>
                        <h1 className="flex justify-center font-bold p-2">ORDER DETAILS </h1>
                        {
                            providerDetails.map((details, index) => {
                                return (
                                    <div key={index} className="flex justify-between mt-2  p-2">
                                        <div className="order-1">
                                            <span className="order-label font-bold">{details}</span>
                                        </div>
                                        <div className="order-2 mx-5">
                                            {index === 0 ? (
                                                <p className="font-medium font-sans">{order?.providerId?.name}</p>
                                            ) : index === 1 ? (
                                                <p className="font-medium font-sans">{order?.providerId?.phone}</p>
                                            ) : index === 2 ? (
                                                <p className="font-medium font-sans">{order?.status}</p>
                                            ) : index === 3 ? (
                                                <>

                                                    <label htmlFor="my_modal_7" className="btn btn-sm bg-indigo-500 text-white hover:text-black">Services</label>


                                                    <input type="checkbox" id="my_modal_7" className="modal-toggle" />
                                                    <div className="modal">
                                                        <div className="modal-box">
                                                            <h3 className="text-lg font-bold">Services</h3>
                                                            {
                                                                order?.services?.map((service) => {
                                                                    return (
                                                                        <p className="py-4" key={service?._id}>{service?.serviceName}</p>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
                                                    </div>
                                                </>
                                            ) : index === 4 ? (
                                                <p className="font-medium font-sans">{order?.totalAmount}</p>
                                            ) : index === 5 && order?.orderDate ? (
                                                <p className="font-medium font-sans">{order?.advanceAmount}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
                <div className="order-1 bg-gray-200 m-4 p-1 shadow-md">
                    <div>
                        <h1 className="flex justify-center font-bold p-2">ADDRESS DETAILS </h1>
                        {
                            address.map((address, index) => {
                                return (
                                    <div key={index} className="flex justify-between mt-2  p-2">
                                        <div className="order-1">
                                            <span className="order-label font-bold">{address}</span>
                                        </div>
                                        <div className="order-2 mx-5">
                                            {index === 0 ? (
                                                <p className="font-medium font-sans">{order?.address?.street}</p>
                                            ) : index === 1 ? (
                                                <p className="font-medium font-sans">{order?.address?.city}</p>
                                            ) : index === 2 ? (
                                                <p className="font-medium font-sans">{order?.address?.zip}</p>
                                            ) : index === 3 ? (
                                                <p className="font-medium font-sans">{order?.address?.district}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
                <div className="order-1 bg-gray-200 m-4 p-1 shadow-md">
                    {
                        order?.status === 'completed' && role === 'user' ? 

                        <div className="mb-4">
                                <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                                    <path
                                        fill="currentColor"
                                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                                    ></path>
                                </svg>
                                <div className="text-center">
                                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Order Completed!</h3>
                                    <p className="text-gray-600 my-2">Thank you for completing your order with us.</p>
                                    <p className="text-indigo-500 font-semibold  my-2 hover:cursor-pointer" onClick={() =>setShowReview(true)} >Review the Provider</p>
                                    {
                                        showReview ? <Review setShowReview={setShowReview} providerName={order?.providerId?.name} providerId={order?.providerId?._id} /> : null
                                    }
                                    <p> Have a great day! </p>
                                </div>
                            </div>

                        :
                            <div>
                                <h1 className="flex justify-center font-bold p-2">PAYMENT DETAILS </h1>
                                {
                                    payment.map((details, index) => {
                                        return (
                                            <div key={index} className="flex justify-between mt-2  p-2">
                                                <div className="order-1">
                                                    <span className="order-label font-bold"> {index !== payment.length - 1 && index !== payment.length - 2 ? (

                                                        details
                                                    ) : index === payment.length - 2 && role === 'user' && order?.remainingAmount !== 0 && (order?.status === 'pending' || order?.status === 'confirmed') ? (

                                                        <>
                                                            <label htmlFor="">Use Wallet</label> : $.{order?.customerId?.wallet || 0}
                                                        </>
                                                    ) : index === payment.length - 1 && role === 'user' && order?.remainingAmount !== 0 && (order?.status === 'pending' || order?.status === 'confirmed') ? (


                                                        <div>
                                                            <select
                                                                id="district"
                                                                name="district"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                                value={selectedOption}
                                                                onChange={handleSelectChange}
                                                            >
                                                                {order?.status === "pending" ? (
                                                                    <>
                                                                        <option value="" disabled>Select Any</option>
                                                                        <option value="advanceAmount">Advance Amount</option>
                                                                        <option value="fullAmount">Pay Full Amount</option>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <option value="" disabled>Select Any</option>
                                                                        <option value="fullAmount">Pay Full Amount</option>
                                                                    </>
                                                                )}
                                                            </select>
                                                        </div>

                                                    ) : order?.remainingAmount === 0 && index !== payment.length - 2 ?
                                                        <div className=" lg:ml-36 md:ml-16 ">
                                                            {
                                                                (order?.status === 'confirmed' || order?.status === 'completed') ?
                                                                    <p className="bg-green-100 font-bold text-center">The payment for the order has been settled </p>
                                                                    :
                                                                    role === 'user' ? (
                                                                        <p className="bg-green-100 font-bold text-center">Your  refund has been credited to your wallet.</p>
                                                                    ) : null
                                                            }

                                                        </div>
                                                        : null}</span>

                                                </div>
                                                <div className="order-2 mx-5">
                                                    {index === 0 ? (
                                                        <p className="font-medium font-sans">{order?.totalAmount}</p>
                                                    ) : index === 1 ? (
                                                        <p className="font-medium font-sans">{order?.advanceAmount}</p>
                                                    ) : index === 2 ? (
                                                        <p className="font-medium font-sans">{order?.status !== 'pending' ? 'Yes' : 'No'}</p>
                                                    ) : index === 3 ? (
                                                        <p className="font-medium font-sans">{order?.walletAmount || 0}</p>
                                                    ) : index === 4 ? (
                                                        <p className="font-medium font-sans">{order?.remainingAmount}</p>
                                                    ) : index === 5 && order?.remainingAmount !== 0 && role === 'user' && (order?.status === 'pending' || order?.status === 'confirmed') ? (
                                                        <input
                                                            checked={isChecked}
                                                            onChange={handleCheckboxChange}
                                                            type="checkbox"
                                                            className="checkbox checkbox-primary checkbox-xs ml-3"
                                                        />
                                                    ) : null}

                                                    {index === 6 && order?.remainingAmount !== 0 && role === 'user' && (order?.status === 'pending' || order?.status === 'confirmed') ? (
                                                        <button
                                                            className="btn btn-sm bg-indigo-500 text-white hover:text-black"
                                                            onClick={() => handlePayment(order?._id)}
                                                        >
                                                            Pay Now
                                                        </button>
                                                    ) : null}

                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                    }
                </div>

            </div> */}

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
                            <p className="pt-2">Order Id : {order?._id?.slice(0,10)} </p>
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
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">

                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                role === 'user' && order?.remainingAmount !== 0 ?
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
                                            {order?.status === "pending" ? (
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
                        role === 'user' && order?.remainingAmount !== 0 ?
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
                                                <p

                                                    className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white bg-indigo-500 transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:cursor-pointer hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"

                                                    onClick={() => handlePayment(order?._id)}
                                                >
                                                    Edit
                                                </p>

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



                                </>
                                : null)
                    }

                </div>








            </section>
        </>
    )
}

export default OrderDetails;