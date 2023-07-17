import { useEffect,useState } from 'react';
import {useLocation} from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../api/axios';
import {userLogin} from '../store/slice/user';
import {adminLogin} from '../store/slice/admin'
import {providerLogin} from '../store/slice/provider'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
const Login = ({url,name}) => {
   
   const dispatch = useDispatch();
   const navigate = useNavigate()
   const currentURL = useLocation();

   useEffect(() => {
      if (currentURL.search === '?signup=success') {
         toast.success('Registeration Success')
      }
      
   },[]);

   const[formData,setFormData] = useState({
      phone:'',
      password:''

   });

   const validateFormData = () => {
      const { phone, password} = formData;
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
      const {name,value} = e.target;
      setFormData((prev) => ({
         ...prev,
         [name] : value
      }))
      console.log(formData);
   }; 

   const handleSubmit = async(e) => {
      const errors = validateFormData();
      e.preventDefault();
      if (Object.keys(errors).length === 0) {
      try {
         const response = await axiosInstance.post(`/${url}`, formData);
         if (response.status === 200){
            
            const name = response?.data?.name;
            const token = response?.data?.token;
            const role = response?.data?.role;
            const id = response?.data?.id;
            console.log(role,name,token,id);
            if(role==='user'){
               dispatch(userLogin({ name, token, role,id }));
               navigate('/')
            } else if(role === 'admin'){
               
               dispatch(adminLogin({ name, token, role }));
               navigate('/admin')
            } else if(role === 'provider'){
               dispatch(providerLogin({ name, token, role, id }));
               navigate('/provider')
            }
         }
      } catch (error) {
         if(error.response?.status===401){
            toast.error(error?.response?.data?.errMsg)
         } else if (error.response?.status === 402){
            toast.error(error?.response?.data?.errMsgx)

         }else {
            toast.error('Something went wrong')
         }
      }
      } else if (Object.keys(errors).length === 2){
         toast.error('Enter all fields')
      } else if (errors.phone) {
         toast.error(errors.phone)
      } else if (errors.password) {
         toast.error(errors.password)
      }
   }

   return(
      
      <div className="bg-white relative lg:py-20">
         <div
            className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
                            xl:px-5 lg:flex-row"
         >
            <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
               <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12">
                  <div className="flex flex-col items-center justify-center w-full h-full relative lg:pr-10">
                     <img
                        src="https://res.cloudinary.com/macxenon/image/upload/v1631570592/Run_-_Health_qcghbu.png"
                        className="btn-"
                     />
                  </div>
               </div>
               <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                  <div
                     className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
                      relative z-10"
                  >
                     <p className="w-full text-4xl font-medium text-center leading-snug font-serif">
                        <span className="font-medium">partify | </span>
                        Login
                     </p>
                     <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                       
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
                        </form>

                         
                     
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login;