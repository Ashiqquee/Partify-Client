import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../api/firebase";
import { toast } from 'react-toastify'
import axiosInstance from "../../api/axios";

const ForgotPassword = ({ role }) => {

    const [otpValue, setOtpValue] = useState('');
    const [clicked, setClicked] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sendingOtp, setSendingOtp] = useState(false);
    const [timer, setTimer] = useState(60);
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const onCaptchaVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: () => {
                        toast.success("Otp sended succesfully");
                        sendOtp();
                    },
                    "expired-callback": () => {
                        toast.error("TimeOut");
                    },
                },
                auth
            );
        }
    };

    const handleUser = async () => {
        try {
            if (formData.phone.length !== 10) return toast.error("Enter a valid number");


            let api = role === 'user' ? '/forgotPassword' : '/provider/forgotPassword';
            let check = "yes";
            let phone = formData.phone;
            const response = await axiosInstance.patch(api, { check, phone });
            if (response.status === 200) sendOtp();



        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.errMsg);
        }
    }

    const sendOtp = async () => {

        onCaptchaVerify();

        const phoneNo = "+91" + formData.phone;
        const appVerifier = window.recaptchaVerifier;
        setSendingOtp(true);
        signInWithPhoneNumber(auth, phoneNo, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setClicked(false);

            })
            .catch((error) => {
                toast.error(error);
            });
    };

    const otpVerify = () => {
        if (otpValue.length === 6) {
            if (formData.password.length < 4) return toast.error('Enter atleast 4 digit password');
            if (formData.password !== confirmPassword) return toast.error('The entered passwords do not match');

            const otpNumber = otpValue;
            window.confirmationResult
                .confirm(otpNumber)
                .then(async () => {
                    handleSubmit();
                })
                .catch(() => {
                    toast.error("The entered otp do not match ");
                });
        } else {
            toast.error("Enter a valid otp ");
        }
    };

    const handleSubmit = async () => {
        try {


            let api = role === 'user' ? '/forgotPassword' : '/provider/forgotPassword';

            const response = await axiosInstance.patch(api, formData);

            if (response.status === 200) {
                toast.success("Password changed successfully");
                let redirect = role === 'user' ? '/login' : '/provider/login';
                navigate(redirect)
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        let intervalId;

        if (sendingOtp && timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else {
            setSendingOtp(false);
            setTimer(60);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [sendingOtp, timer]);

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8 ">
                <div className=" ">
                    {clicked ?
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-24">
                            <h1 className="font-sans text-center font-black text-indigo-500 text-3xl ">PARTIFY </h1>
                            <p className="text-sm font-semibold text-center ">parties simplified</p>

                        </div> : null}

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">

                        <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                            {clicked ? (
                                <>

                                    <div className="relative">
                                        <p
                                            className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                             absolute"
                                        >
                                            Phone
                                        </p>
                                        <input
                                            placeholder="Registered mobile"
                                            value={formData.phone}
                                            name="phone"
                                            onChange={handleChange}
                                            type="text"
                                            className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
                                        />
                                    </div>


                                    <div className="relative">
                                        <p
                                            className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease hover:cursor-pointer"
                                            onClick={handleUser}
                                        >
                                            Continue
                                        </p>
                                    </div>



                                    <div>
                                        <h3 className='text-indigo-500  hover:cursor-pointer mb-5 uppercase' onClick={() => navigate('/login')}>Back to login?</h3>
                                    </div>

                                </>
                            ) : (
                                <>
                                    <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-32">
                                        <h1 className="font-sans text-center font-black text-indigo-500 text-3xl ">PARTIFY | SIGNUP</h1>
                                        <p className="text-sm font-semibold text-center ">parties simplified</p>

                                    </div>


                                    <div className="relative mt-10">
                                        <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                                            OTP
                                        </p>
                                        <input
                                            placeholder="123456"
                                            value={otpValue}
                                            onChange={(e) => setOtpValue(e.target.value)}
                                            name="otp"
                                            type="text"
                                            className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
                                        />

                                        <div className="relative">
                                            <p
                                                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                                                      absolute"
                                            >
                                                Password
                                            </p>
                                            <input
                                                placeholder="Password"
                                                type="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                name="password"
                                                className="border placeholder-gray-400 focus:outline-none
                                                 focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                                                border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="relative">
                                            <p
                                                className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                                                      absolute"
                                            >
                                                Password
                                            </p>
                                            <input
                                                placeholder="Confirm password"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                name="confirmPassword"
                                                className="border placeholder-gray-400 focus:outline-none
                                                 focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                                                border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="relative mt-2">
                                            <p
                                                className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease hover:cursor-pointer"
                                                onClick={otpVerify}
                                            >
                                                Signup
                                            </p>
                                        </div>
                                        <button className="mt-2 flex justify-end w-full" onClick={sendOtp} disabled={timer !== 60}>
                                            {timer === 60 ? <span className="text-indigo-500">Resend OTP</span> : `Resend OTP in ${timer} seconds`}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <div id="recaptcha-container"></div>
        </>
    )
}

export default ForgotPassword;