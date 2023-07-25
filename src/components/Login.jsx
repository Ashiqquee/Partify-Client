import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../api/axios';
import { userLogin } from '../store/slice/user';
import { adminLogin } from '../store/slice/admin'
import { providerLogin } from '../store/slice/provider'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = ({ url, name }) => {

   const dispatch = useDispatch();
   const navigate = useNavigate()
   const currentURL = useLocation();
   const [googleProfile, setGoogleProfile] = useState({});


   const googleLogin = useGoogleLogin({
      onSuccess: (codeResponse) => setGoogleProfile(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
   });

   const configureGoogleLogin = async () => {

      try {
         const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleProfile.access_token}`, {
            headers: {
               Authorization: `Bearer ${googleProfile.access_token}`,
               Accept: 'application/json'
            }
         });

         const userEmail = response?.data?.email;

         const userAvailable = await axiosInstance.post('/login/google', { userEmail });

         const { name, token, role, id } = userAvailable.data

         dispatch(userLogin({ name, token, role, id }));
         navigate('/');

      } catch (error) {
         if (error?.response?.status === 402) {
            toast.error('User not found')
         }
      }

   }

   useEffect(
      () => {
         if (googleProfile) {
            configureGoogleLogin()
         }
      },
      [googleProfile]
   );

   useEffect(() => {
      if (currentURL.search === '?signup=success') {
         toast.success('Registeration Success')
      }

   }, []);

   const [formData, setFormData] = useState({
      phone: '',
      password: ''

   });

   const validateFormData = () => {
      const { phone, password } = formData;
      const errors = {};

      if (phone.trim().length !== 10) {
         errors.phone = 'Phone number must be 10 digits';
      }

      if (password.trim().length < 4) {
         errors.password = 'Password must be at least 4 characters long';
      }


      return errors;
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value
      }))
      console.log(formData);
   };

   const navigateSignup = () => {
      if (name === 'user') {
         navigate('/signup')
      } else if (name === 'Provider') {
         navigate('/provider/signup')
      }
   }

   const handleSubmit = async (e) => {
      const errors = validateFormData();
      e.preventDefault();
      if (Object.keys(errors).length === 0) {
         try {
            const response = await axiosInstance.post(`/${url}`, formData);
            if (response.status === 200) {

               const name = response?.data?.name;
               const token = response?.data?.token;
               const role = response?.data?.role;
               const id = response?.data?.id;
               console.log(role, name, token, id);
               if (role === 'user') {
                  dispatch(userLogin({ name, token, role, id }));
                  navigate('/')
               } else if (role === 'admin') {

                  dispatch(adminLogin({ name, token, role }));
                  navigate('/admin')
               } else if (role === 'provider') {
                  dispatch(providerLogin({ name, token, role, id }));
                  navigate('/provider')
               }
            }
         } catch (error) {
            
            if (error.response?.status === 401) {
               toast.error(error?.response?.data?.errMsg)
            } else if (error.response?.status === 402) {
               toast.warn(error?.response?.data?.errMsg)

            } else {
               toast.error('Something went wrong')
            }
         }
      } else if (Object.keys(errors).length === 2) {
         toast.error('Enter all fields')
      } else if (errors.phone) {
         toast.error(errors.phone)
      } else if (errors.password) {
         toast.error(errors.password)
      }
   }



   return (

      <>
         <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8 mt-20">
            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <h1 className="font-sans text-center font-black text-indigo-500 text-3xl ">PARTIFY | LOGIN</h1>
                  <p className="text-sm font-semibold text-center ">parties simplified</p>

               </div>
               <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                  <form onSubmit={handleSubmit}>
                     <div className="relative">
                        <p
                           className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                                                              absolute"
                        >
                           Phone
                        </p>
                        <input
                           placeholder="1234567890"
                           name="phone" value={formData.phone} onChange={handleChange}
                           type="text"
                           className="border placeholder-gray-400 focus:outline-none
                             focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-4 mr-0 mb-0 ml-0 text-base block bg-white
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
                           className=" border placeholder-gray-400 focus:outline-none
                                focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-4 mr-0 mb-0 ml-0 text-base block bg-white
                                 border-gray-300 rounded-md"
                        />
                     </div>
                     <div className="relative">
                        <button
                           type='submit'
                           className="w-full inline-block pt-4 pr-5 pb-4 pl-5 mt-3 text-xl font-medium text-center text-white bg-indigo-500
                                  rounded-lg transition duration-200 hover:bg-indigo-600 ease"

                        >
                           Continue
                        </button>
                     </div>
                     {
                        name === 'user' ?
                           <div className="relative mt-3">
                              <GoogleLogin onSuccess={googleLogin} />
                           </div> : null
                     }
                  </form>

                  {
                     name !== 'admin' ?
                        <div className='flex justify-between'>
                           <div>
                              <h3 className='text-indigo-500 hover:cursor-pointer mt-3' onClick={navigateSignup}>Don't have an account?</h3>
                           </div>
                           <div>
                              <h3 className='text-indigo-500 hover:cursor-pointer mt-3' onClick={() => navigate(name === 'user' ? '/forgotPassword' : '/providers/forgotPassword')}>Forgot Password?</h3>
                           </div>
                        </div>

                        : null}


               </div>
            </div>

         </div>

      </>
   )
}

export default Login;