import { useState } from "react";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { auth } from "../../api/firebase";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [clicked, setClicked] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    referalCode: ""
  });

  const validateFormData = () => {
    const { name, phone, password, email } = formData;
    const errors = {};

    if (name.trim().length < 2) {
      errors.name = "Enter a valid name";
    }

    if (phone.trim().length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    }

    if (password.trim().length < 4) {
      errors.password = "Password must be at least 4 characters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address";
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
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            toast("Otp sended succesfully");
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

  const sendOtp = async () => {
    const errors = validateFormData();

    if (Object.keys(errors).length === 0) {
      onCaptchaVerify();

      const phoneNo = "+91" + formData.phone;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNo, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setClicked(false);

        })
        .catch((error) => {
          toast.error(error);
        });
    } else if (Object.keys(errors).length === 4) {
      toast.error("Enter all fields");
    } else if (errors.name) {
      toast.error(errors.name);
    } else if (errors.email) {
      toast.error(errors.email);
    } else if (errors.phone) {
      toast.error(errors.phone);
    } else if (errors.password) {
      toast.error(errors.password);
    }
  };

  const otpVerify = () => {
    if (otpValue.length === 6) {
      const otpNumber = otpValue;
      window.confirmationResult
        .confirm(otpNumber)
        .then(async () => {
          handleSubmit();
        })
        .catch(() => {
          toast.error("Enter a valid otp");
        });
    } else {
      toast.error("Enter a valid otp ");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`/signup`, formData);

      if (response.status === 200) {
        navigate("/login?signup=success");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(error.response.data.errMsg);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8 ">
          <div className=" ">
          {clicked ?
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h1 className="font-sans text-center font-black text-indigo-500 text-3xl ">PARTIFY | SIGNUP</h1>
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
                      Username
                    </p>
                    <input
                      placeholder="John"
                      value={formData.name}
                      name="name"
                      onChange={handleChange}
                      type="text"
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
                      Phone
                    </p>
                    <input
                      placeholder="1234567890"
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
                    <p className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 absolute">
                      Email
                    </p>
                    <input
                      placeholder="123@ex.com"
                      value={formData.email}
                      name="email"
                      onChange={handleChange}
                      type="email"
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
                      Referal Code
                    </p>
                    <input
                      placeholder="Referal Code (if any)"
                      type="text"
                      value={formData.referalCode}
                      onChange={handleChange}
                      name="referalCode"
                      className="border placeholder-gray-400 focus:outline-none
                  focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                  border-gray-300 rounded-md"
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
                    <h3 className='text-indigo-500  hover:cursor-pointer mb-5' onClick={() => navigate('/login')}>Already have an account?</h3>
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
              )}
            </div>
          </div>
          </div>
        </div>


        <div id="recaptcha-container"></div>
      </>
    </>
  );
};

export default Register;
