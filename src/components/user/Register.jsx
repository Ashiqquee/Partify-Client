import { useState } from "react";
import axiosInstance from '../../api/axios'
import { useNavigate } from 'react-router-dom'
import {  toast } from 'react-toastify';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from "../../api/firebase";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [clicked, setClicked] = useState(true)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const validateFormData = () => {
        const { name, phone, password, email } = formData;
        const errors = {};

        if (name.trim().length < 2) {
            errors.name = 'Enter a valid name';
        }

        if (phone.trim().length !== 10) {
            errors.phone = 'Phone number must be 10 digits';
        }

        if (password.trim().length < 4) {
            errors.password = 'Password must be at least 4 characters long';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Enter a valid email address';
        }

        return errors;
    };


    const [otpValue, setOtpValue] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        

    };


    const navigate = useNavigate();
    const onCaptchaVerify = () => {

        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                size: 'invisible',
                callback: () => {
                    
                    sendOtp()
                },
                'expired-callback': () => {
                    toast.error('TimeOut')
                }
            }, auth);
        }

    }

    const sendOtp = async () => {
        const errors = validateFormData();

        if (Object.keys(errors).length === 0) {
        onCaptchaVerify()

        const phoneNo = '+91'+formData.phone;
        const appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(auth, phoneNo, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setClicked(false);
                toast('Otp sended succesfully');
            }).catch((error) => {
                toast.error(error);
            });
        }
        else if (Object.keys(errors).length === 4) {
            toast.error('Enter all fields')
        } else if (errors.name) {
            toast.error(errors.name)
        }
        else if (errors.email) {
            toast.error(errors.email)
        }

        else if (errors.phone) {
            toast.error(errors.phone)
        }
        else if (errors.password) {
            toast.error(errors.password)
        }
       


    }

    const otpVerify = () => {
        if (otpValue.length === 6) {
        const otpNumber = otpValue;
        window.confirmationResult.confirm(otpNumber).then(async () => {
            handleSubmit()
            
        }).catch(() => {
            toast.error('Enter a valid otp')
        })
        } else {
            toast.error('Enter a valid otp ')
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axiosInstance.post(`/signup`, formData);

            if (response.status === 200) {
                navigate('/login?signup=success');
            }
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error(error.response.data.errMsg);
            } else {
               
                toast.error('Something went wrong');
            }
        }
    };




    return (
        <div className="flex min-h-screen bg-white">
          
            {
                clicked ? 
                    <div className="container mx-auto mt-16">
                        <div className="flex items-center justify-center">
                            <div className="max-w-2xl">
                                <div className="flex flex-col md:flex-row">
                                    <div className="shadow-md rounded-lg flex">
                                    <div className="w-full md:w-2/3 bg-white  px-8 py-6">
                                        {/* <h4 className="text-xl font-black mb-2">User Registration</h4> */}
                                        <p className="text-black font-bold mb-6">Everything is simple with Signup.</p>

                                        <div className="mb-4">
                                            <label htmlFor="username" className="block text-black font-semibold">Username</label>
                                            <input type="text" placeholder="Your username here" value={formData.name} name="name" onChange={handleChange} className="form-input p-1 mt-1 block w-full h-10" />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-black font-semibold">Email</label>
                                            <input type="text" placeholder="Your email here" value={formData.email} name="email" onChange={handleChange} className="form-input p-1 mt-1 block w-full h-10" />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="phone" className="block text-black font-semibold">Phone</label>
                                            <input type="text" placeholder="Your phone here" name="phone" value={formData.phone} onChange={handleChange} className="form-input p-1 mt-1 block w-full h-10" />
                                        </div>

                                        <div className="mb-4">
                                            <label htmlFor="password" className="block text-black font-semibold">Password</label>
                                            <input type="password" value={formData.password} onChange={handleChange} placeholder="Your password here" name="password" className="form-input mt-1 p-1 block w-full h-10" />
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900" onClick={sendOtp}>Continue</button>
                                            <p onClick={() => navigate('/login ')} className="text-blue-500 text-sm hover:cursor-pointer">Already have an account?</p>
                                        </div>
                                    </div>
                                        <div className="hidden md:block w-2/3 " style={{ backgroundImage: "url('https://wallpapers.com/images/hd/abstract-background-6m6cjbifu3zpfv84.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
                                        <h4 className="text-xl font-black mt-36 ml-12 text-white">SIGNUP WITH 
                                        PARTIFY</h4>
                                            <p className="text-white font-semibold mt-3 ml-6">Parties Simplified | India's Largest Party <span className="ml-12">Management Application</span></p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="recaptcha-container"></div>
                    </div>

                :
                    <div className="container mx-auto">
                        <div className="flex items-center justify-center h-screen">
                            <div className="w-full max-w-md">
                                <div className="bg-white shadow-md rounded-lg px-8 py-6">
                                    <h4 className="text-xl font-black mb-2">Partify</h4>
                                    <p className="text-black font-bold mb-6">Everything is simple with Login.</p>
                                    <div className="mb-4">
                                        <label htmlFor="otp" className="block text-black font-semibold">otp</label>
                                        <input type="text" value={otpValue}
                                            onChange={(e) => setOtpValue(e.target.value)} placeholder="Your otp here" className="form-input mt-1 p-1 block w-full h-10" />
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900" onClick={otpVerify}>continue</button>
                                        <div id="recaptcha-container"></div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>


            }
        </div>
    )
};

export default Register;