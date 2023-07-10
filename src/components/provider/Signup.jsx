import { useState, useEffect } from 'react';
import Select from 'react-select';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from "../../api/firebase";
import { useNavigate } from 'react-router-dom'


const Signup = () => {
    const [clicked, setClicked] = useState(true)
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        services: [],
        places: [],
    });
    const [otpValue, setOtpValue] = useState("");

    const handleChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;

            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));

        }
    };

    const validateFormData = () => {
        const { name, phone, password, services, places } = formData;
        const errors = {};

        if (name.trim().length < 1) {
            errors.name = 'Enter a valid name'
        }
        
        if (phone.trim().length !== 10) {
            errors.phone = "Phone number must be 10 digits";
        }

        
        if (password.trim().length < 4) {
            errors.password = "Password must be at least 4 characters long";
        }

        
        if (services.length < 1) {
            errors.services = "Please select at least one service";
        }

        
        if (places.length < 1) {
            errors.places = "Please select at least one place";
        }

        return errors;
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
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            onCaptchaVerify()

            const phoneNo = '+91' + formData.phone;
            const appVerifier = window.recaptchaVerifier
            signInWithPhoneNumber(auth, phoneNo, appVerifier)
                .then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    setClicked(false);
                    toast('Otp sended succesfully');
                }).catch((error) => {
                    toast.error(error);
                });
        } else if (Object.keys(errors).length === 5) {
            toast.error('Enter all fields')
        } else if (errors.name) {
            toast.error(errors.name)
        }
        else if (errors.password) {
            toast.error(errors.password)
        }
        else if (errors.phone) {
            toast.error(errors.phone)
        }
        else if (errors.services) {
            toast.error(errors.services)
        }
        else if (errors.places) {
            toast.error(errors.places)
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
            const response = await axiosInstance.post(`/provider/signup`, formData);

            if (response.status === 200) {
                navigate('/provider/login');
            }
        } catch (error) {
            if (error.response?.status === 409) {
                toast.error(error.response.data.errMsg);
            } else {

                toast.error('Something went wrong');
            }
        }


    };





    const [serviceList, setServiceList] = useState([])

    const getServiceList = async () => {
        try {
            const response = await axiosInstance.get('/provider/serviceList');

            setServiceList(response.data.serviceList)
        } catch (error) {
            toast.error('Something went wrong');
        }

    }

    const options = serviceList.map((service) => ({
        label: service.serviceName,
        value: service._id,
    }));

    const keralaDistricts = [
        "All Kerala",
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
    ];
    const keralaDistrictsOptions = keralaDistricts.map((district) => ({
        value: district,
        label: district,
    }));


    useEffect(() => {
        getServiceList();
    }, [])

    return (
        <>
            <div className="flex min-h-screen bg-white">

                {
                    clicked ? <div className="container mx-auto">
                        <div className="flex items-center justify-center h-screen">
                            <div className="w-full max-w-md">
                                <div className="bg-white shadow-md rounded-lg px-8 py-6">
                                    <h4 className="text-xl font-black mb-2">Partify</h4>
                                    <p className="text-black font-bold mb-6">Everything is simple with Login.</p>

                                    <div className="mb-4">
                                        <label htmlFor="username" className="block text-black font-semibold">Company Name</label>
                                        <input type="text" placeholder="Your Company name here" value={formData.name} name="name"
                                            onChange={handleChange} className="form-input p-1 mt-1 block w-full  h-10" />
                                    </div>



                                    <div className="mb-4">
                                        <label htmlFor="phone" className="block text-black font-semibold">Phone</label>
                                        <input type="text" placeholder="Your phone here" name="phone" value={formData.phone}
                                            onChange={handleChange} className="form-input p-1 mt-1 block w-full  h-10" />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="block text-black font-semibold">Password</label>
                                        <input type="password" value={formData.password}
                                            onChange={handleChange} placeholder="Your password here" name="password" className="form-input mt-1 p-1 block w-full h-10" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="services" className="block text-black font-semibold">Services</label>
                                        <Select
                                            name="services"
                                            options={options}
                                            isMulti
                                            value={formData.services.map((service) =>
                                                options.find((option) => option.value === service)
                                            )}
                                            onChange={(selectedOptions) => {
                                                const selectedServices = selectedOptions.map((option) => option.value);
                                                setFormData((prevFormData) => ({
                                                    ...prevFormData,
                                                    services: selectedServices,
                                                }));
                                            }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="services" className="block text-black font-semibold">Place</label>
                                        <Select
                                            name="places"
                                            options={keralaDistrictsOptions}
                                            isMulti
                                            value={formData.places.map((place) => ({
                                                value: place,
                                                label: place,
                                            }))}

                                            onChange={(selectedOptions) => {
                                                const selectedDistrict = selectedOptions.map((option) => option.value);
                                                if (selectedDistrict.includes('All Kerala')) {
                                                    if (selectedDistrict.length > 1) {
                                                        toast.warn('Already Selected All Kerala');
                                                    }
                                                    setFormData((prevFormData) => ({
                                                        ...prevFormData,
                                                        places: ['All Kerala']
                                                    }))
                                                } else {
                                                    setFormData((prevFormData) => ({
                                                        ...prevFormData,
                                                        places: selectedDistrict.filter((place) => place !== "All Kerala"),
                                                    }));
                                                }
                                            }}

                                        />




                                    </div>


                                    <div className="flex items-center justify-between mt-2">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900" onClick={sendOtp}>continue</button>

                                        <a href="account-password-recovery.html" className="text-blue-500">Already have an account?</a>
                                    </div>



                                </div>
                            </div>
                        </div>
                        <div id="recaptcha-container"></div>
                    </div> :
                        <div className="container mx-auto">
                            <div className="flex items-center justify-center h-screen">
                                <div className="w-full max-w-md">
                                    <div className="bg-white shadow-md rounded-lg px-8 py-6">
                                        <h4 className="text-xl font-black mb-2">Partify</h4>
                                        <p className="text-black font-bold mb-6">Enter Your Otp</p>
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

        </>
    )



}


export default Signup;