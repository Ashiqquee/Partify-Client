import { useState, useEffect } from 'react';
import Select from 'react-select';
import axiosInstance from '../../api/axios';
import { toast } from 'react-toastify'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from "../../api/firebase";
import { useNavigate } from 'react-router-dom';


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
                    toast('Otp sended succesfully');
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
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8 ">
                {clicked ?
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h1 className="font-sans text-center font-black text-indigo-500 text-3xl ">PARTIFY | SIGNUP</h1>
                        <p className="text-sm font-semibold text-center ">parties simplified</p>

                    </div> : null}
            
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">

                        <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                        { clicked ? 

<>

                                <div className="relative">
                                    <p
                                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                                                              absolute"
                                    >
                                        Company Name
                                    </p>
                                    <input
                                        placeholder="Your company name here" value={formData.name} name="name"
                                        onChange={handleChange}
                                        type="text"
                                        className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
                                    />
                                </div>


                                <div className="relative mt-3">
                                    <p
                                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                                                              absolute"
                                    >
                                        Phone
                                    </p>
                                    <input
                                        placeholder="Your phone here" name="phone" value={formData.phone}
                                        onChange={handleChange}
                                        type="text"
                                        className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="relative mt-3">
                                    <p
                                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                                                              absolute"
                                    >
                                        Password
                                    </p>
                                    <input
                                        value={formData.password}
                                        onChange={handleChange} placeholder="Your password here" name="password"
                                        type="text"
                                        className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="relative mt-4">
                                    <p
                                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                                                              "
                                    >
                                        Services
                                    </p>
                                    <Select
                                        className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
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

                                <div className="relative mt-4">
                                    <p
                                        className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                                                              "
                                    >
                                        Places
                                    </p>
                                    <Select
                                        className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                             border-gray-300 rounded-md"
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








                                <div className="relative">
                                    <p
                                        className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                  rounded-lg transition duration-200 hover:bg-indigo-600 ease hover:cursor-pointer"
                                        onClick={sendOtp}
                                    >
                                        Continue
                                    </p>
                                </div>



                                <div>
                                    <h3 className='text-indigo-500 font-semibold hover:cursor-pointer mb-5' onClick={() => navigate('/provider/login')}>Already have an account?</h3>
                                </div>



                    <div id="recaptcha-container"></div>
               
                </>
 :
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

                                    <div className="relative mt-2">
                                        <p
                                            className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500 rounded-lg transition duration-200 hover:bg-indigo-600 ease hover:cursor-pointer"
                                            onClick={otpVerify}
                                        >
                                            Signup
                                        </p>
                                    </div>
                                </div>
                            </>

                      
                }
                    </div>
                </div>
            </div>
                    


        </>
    )



}


export default Signup;