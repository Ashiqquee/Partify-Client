import { useEffect, useState } from "react";
import { useParams, useNavigate,useLocation } from 'react-router-dom';
import axiosInstance from "../api/axios";
import StripeCheckout from 'react-stripe-checkout';

const OrderDetails = ({token}) => {
    
    const details = ['orderId', 'Customer Name', 'Customer Phone', 'Alternative Number', 'Order Date', 'Event Date'];
    const providerDetails = ['Provider Name', 'Provider Phone', 'Status', 'Services', 'Amount', 'Advance Amount'];
    const address = ['Street', 'City', 'Zip', 'District'];
    const payment = ['Total Amount', 'Advance Amount', 'Advance Paid', 'Wallet Used', 'Remaining Amount',  ''];
    const navigate = useNavigate();
    const [order, setOrder] = useState('');
    const location = useLocation();
    const[role,setRole] = useState('');

    const { id } = useParams();


    const fetchOrder = async (api,navigation) => {
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

    useEffect(() => {
        if (location.pathname.startsWith('/provider')) {
            setRole('provider');
            fetchOrder('/provider/order/','/provider/orders');
        } else if (location.pathname.startsWith('/order')) {
            setRole('user');
            fetchOrder('/order/','/profile');
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
                                            ) : index === 5  && order?.eventDate ? (
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
                                            )  : null}
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
                                            <span className="order-label font-bold">{index !== payment.length - 1 ? details : ''}</span>
                                        </div>
                                        <div className="order-2">
                                            {index === 0 ? (
                                                <p className="font-medium font-sans">{order?.totalAmount}</p>
                                            ) : index === 1 ? (
                                                    <p className="font-medium font-sans">{order?.advanceAmount}</p>
                                            ) : index === 2 ? (
                                                 <p className="font-medium font-sans">{order?.advancePaymentDate ? 'Yes' : 'No'}</p>
                                            ) : index === 3 ? (
                                                <p className="font-medium font-sans">{order?.walletAmount || 0 }</p>
                                            ) : index === 4 ? (
                                               <p className="font-medium font-sans">{order?.advancePaymentDate ? order?.totalAmount - order?.advanceAmount : order?.totalAmount }</p>
                                                ) : role === 'user' ? (<button className="btn btn-sm bg-indigo-500 text-white hover:text-black">Pay Now</button>): null }
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