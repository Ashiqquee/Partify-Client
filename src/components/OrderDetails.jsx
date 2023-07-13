import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../api/axios";
import { toast } from 'react-toastify'

const OrderDetails = ({ token }) => {
    const [orderStatus, setOrderStatus] = useState('');
    const [payClicked, setPayClicked] = useState(false);
    const details = ['orderId', 'Customer Name', 'Customer Phone', 'Alternative Number', 'Order Date', 'Event Date'];
    const providerDetails = ['Provider Name', 'Provider Phone', 'Status', 'Services', 'Amount', 'Advance Amount'];
    const address = ['Street', 'City', 'Zip', 'District'];
    const payment = ['Total Amount', 'Advance Amount', 'Advance Paid', 'Wallet Used', 'Remaining Amount', '', ''];
    const navigate = useNavigate();
    const [order, setOrder] = useState('');
    const location = useLocation();
    const [role, setRole] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const { id } = useParams();
    const [selectedOption, setSelectedOption] = useState('');



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
            const response = await axiosInstance.get(api + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setOrder(response.data.order);
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
                                toast.error('Something Went Wrong');
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
                                toast.error('Something Went Wrong');
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


    useEffect(() => {
        if (location.pathname.startsWith('/provider')) {
            setRole('provider');
            fetchOrder('/provider/order/', '/provider/orders');
        } else if (location.pathname.startsWith('/order')) {
            setRole('user');
            fetchOrder('/order/', '/profile');
        }

    }, [])

    return (
        <>
            <div className="flex w-full justify-center font-semibold text-lg">
                <h1>ORDER </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 ">
                <div className="order-1 bg-gray-100 m-4 p-1">
                    <div>
                        <h1 className="flex justify-center font-bold p-2"> DETAILS </h1>
                        {
                            details.map((details, index) => {
                                return (
                                    <div key={index} className="flex justify-between mt-2  p-2">
                                        <div className="order-1">
                                            <span className="order-label font-bold font-sans">{details}</span>
                                        </div>
                                        <div className="order-2">
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
                <div className="order-1 bg-gray-100 m-4 p-1">
                    <div>
                        <h1 className="flex justify-center font-bold p-2">ORDER DETAILS </h1>
                        {
                            providerDetails.map((details, index) => {
                                return (
                                    <div key={index} className="flex justify-between mt-2  p-2">
                                        <div className="order-1">
                                            <span className="order-label font-bold">{details}</span>
                                        </div>
                                        <div className="order-2">
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
                <div className="order-1 bg-gray-100 m-4 p-1">
                    <div>
                        <h1 className="flex justify-center font-bold p-2">ADDRESS DETAILS </h1>
                        {
                            address.map((address, index) => {
                                return (
                                    <div key={index} className="flex justify-between mt-2  p-2">
                                        <div className="order-1">
                                            <span className="order-label font-bold">{address}</span>
                                        </div>
                                        <div className="order-2">
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
                <div className="order-1 bg-gray-100 m-4 p-1">
                    <div>
                        <h1 className="flex justify-center font-bold p-2">PAYMENT DETAILS </h1>
                        {
                            payment.map((details, index) => {
                                return (
                                    <div key={index} className="flex justify-between mt-2  p-2">
                                        <div className="order-1">
                                            <span className="order-label font-bold"> {index !== payment.length - 1 && index !== payment.length - 2 ? (

                                                details
                                            ) : index === payment.length - 2 && role === 'user' && order?.remainingAmount!==0 ? (

                                                <>
                                                    <label htmlFor="">Use Wallet</label> : $.{order?.customerId?.wallet || 0}
                                                </>
                                            ) : index === payment.length - 1 && role === 'user' && order?.remainingAmount!==0 ? (


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
                                                                <p className="bg-green-100 font-bold text-center">The payment for the order has been settled </p>
                                                    </div>
                                                    : null }</span>

                                        </div>
                                        <div className="order-2">
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
                                            ) : index === 5 && order?.remainingAmount !== 0 && role === 'user' ? (
                                                <input
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                    type="checkbox"
                                                    className="checkbox checkbox-primary checkbox-xs ml-3"
                                                />
                                            ) : null}

                                            {index === 6 && order?.remainingAmount !== 0 && role === 'user' ? (
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
                </div>

            </div>

        </>
    )
}

export default OrderDetails;