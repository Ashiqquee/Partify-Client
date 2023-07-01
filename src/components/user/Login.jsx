import { useEffect,useState } from 'react';
import {useLocation} from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../api/axios';
import {userLogin} from '../../store/slice/user';
import {adminLogin} from '../../store/slice/admin'
import {providerLogin} from '../../store/slice/provider'
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

   const[formData,setFormDate] = useState({
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
      setFormDate((prev) => ({
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
            console.log(role,name,token);
            if(role==='user'){
               dispatch(userLogin({ name, token, role }));
               navigate('/')
            } else if(role === 'admin'){
               
               dispatch(adminLogin({ name, token, role }));
               navigate('/admin')
            } else if(role === 'provider'){
               dispatch(providerLogin({name,token,role}));
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
      <div className="container mx-auto">
        
         <div className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md">
               <div className="bg-white shadow-md rounded-lg px-8 py-6">
                  <h4 className="text-xl font-black mb-2">Partify</h4>
                 {
                     name == 'user' ? <p className="text-black font-bold mb-6">Everything is simple with Login.</p> : 
                        <p className="text-black font-bold mb-6"  >Welcome Back {name}</p>
                 }

                  <form onSubmit={handleSubmit}>

                     <div className="mb-4">
                        <label htmlFor="phone" className="block font-semibold">Phone</label>
                        <input type="text" id="phone" name="phone" placeholder="Your Phone here" value={formData.phone} onChange={handleChange}  className=" text-black font-semibold form-input p-1 mt-1 block w-full  h-10" />
                     </div>

                     <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Your password here" className="text-black font-semibold form-input mt-1 p-1 block w-full h-10" />
                     </div>



                     <div className="flex items-center justify-between mt-2">
                        <button type='submit' className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900">Login</button>

                        <a href="account-password-recovery.html" className="text-blue-500">Forgot password?</a>
                     </div>

                  </form>

               </div>
            </div>
         </div>
      </div>
   )
}

export default Login;