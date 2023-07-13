import { useEffect } from 'react';
import { useParams,useNavigate } from 'react-router';

const PaymentSuccess = () => {
    const { status } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        if (status !== 'success' && status !== 'fail') {
            navigate('/')
        }
    })

    return (
        <div className=" bg-gray-100 h-screen ">
            <div className=" p-6  md:mx-auto ">
                {status === 'success' ? (
                    <>
                        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
                            <path
                                fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                            ></path>
                        </svg>
                        <div className="text-center">
                            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h3>
                            <p className="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                            <p className="text-gray-600 my-2">Your Order has been confirmed</p>
                            <p> Have a great day! </p>
                        </div>
                    </>
                ) : (
                    <>
                        <svg viewBox="0 0 24 24" className="text-red-600 w-16 h-16 mx-auto my-6">
                            <path
                                fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.619,17.646a1,1,0,0,1-1.414,0L12,13.414l-5.205,5.232a1,1,0,0,1-1.414-1.414L10.586,12,5.381,6.768a1,1,0,0,1,1.414-1.414L12,10.586l5.205-5.232a1,1,0,0,1,1.414,1.414L13.414,12Z"
                            ></path>
                        </svg>
                        <div className="text-center">
                            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Failed!</h3>
                            <p className="text-gray-600 my-2">Try again later after some time.</p>
                            
                        </div>
                    </>
                )}

                <div className="py-10 text-center">
                    <a onClick={() => navigate('/profile')} className="px-12 bg-indigo-500 hover:bg-indigo-600 hover:cursor-pointer text-white font-semibold py-3">
                        GO BACK
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
