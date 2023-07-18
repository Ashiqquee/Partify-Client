import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';

const OrderForm = ({ formData, onFormChange, onSubmit, action,  }) => {
  
   const {token} = useSelector(state => state.provider);
    const keralaDistricts = [
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

    const[services,setServices] = useState([]);
    
    const serviceOption = services.map((service) => ({
        label: service.serviceName,
        value: service._id,
    }));

    

    const fetchServices = async() => {
        try {
            const response = await axiosInstance.get('/provider/services',{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            
            setServices(response.data.serviceList);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFormChange = (name, value) => {
        onFormChange(name, value);
    };

   

    useEffect(() =>{
        fetchServices()
    },[])

   return(
       <div className="border-b border-gray-900/10 pb-12">
           {
            action === 'add' ? 
                   <h2 className="text-base font-semibold leading-7 text-gray-900">Order Information</h2>
            :
                   <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Information</h2>

           }
     
           <form onSubmit={onSubmit} >
           <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
               {action === 'add' ?
                       <div className="sm:col-span-3">
                           <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                               User Number
                           </label>
                           <div className="mt-2">
                               <input
                                   type="text"
                                   name="phone"
                                   value={formData.phone || ''}
                                   onChange={(e) => handleFormChange('phone', e.target.value)}
                                   id="phone"
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   placeholder="Registered Number"
                               />
                           </div>
                       </div>
                       
                    : null}

                   <div className={action === 'add' ? 'sm:col-span-3' : 'sm:col-span-4'}>
                   <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                       Alternative Number
                   </label>
                   <div className="mt-2">
                       <input
                               value={formData?.alternativePhone || ''}
                               onChange={(e) => handleFormChange('alternativePhone', e.target.value)}
                           type="text"
                           name="alternativePhone"
                           id="alternativePhone"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           
                       />
                   </div>
               </div>

               <div className="sm:col-span-4">
                   <label htmlFor="services" className="block text-sm font-medium leading-6 text-gray-900">
                       Serivices
                   </label>
                   <div className="mt-2">
                       <Select
                           name="services"
                           options={serviceOption}
                           onChange={(selectedOptions) => handleFormChange("services", selectedOptions)}
                               value={formData?.services?.map((service) => serviceOption.find((option) => option.value === service.value)) || []}

                           isMulti          
                       />
                   </div>
               </div>

                   <div className={action === 'add' ? 'sm:col-span-3' : 'sm:col-span-4'}>
                   <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                       Full Amount
                   </label>
                   <div className="mt-2">
                       <input
                               value={formData.amount || ''}
                               onChange={(e) => handleFormChange('amount', e.target.value)}

                           type="text"
                           name="amount"
                           id="amount"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                   </div>
               </div>

               {
                action === 'add' ? 
                           <div className="sm:col-span-3">
                               <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                   Advance Amount
                               </label>
                               <div className="mt-2">
                                   <input
                                       value={formData.advanceAmount || ''}
                                       onChange={(e) => handleFormChange('advanceAmount', e.target.value)}

                                       type="text"
                                       name="advanceAmount"
                                       id="advanceAmount"
                                       autoComplete="advanceAmount"
                                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                   />
                               </div>
                           </div>
                           :null
               }
              

                   <div className={action === 'add' ? 'sm:col-span-3' : 'sm:col-span-4'}>
                   <label htmlFor="Event Date" className="block text-sm font-medium leading-6 text-gray-900">
                       Event Date
                   </label>
                   <div className="mt-2">
                     
                       <DatePicker
                           id="datepicker"
                               selected={formData.eventDate || ''}
                               onChange={(date) => handleFormChange('eventDate', date)}
                           name='eventDate'
                           dateFormat="dd/MM/yyyy"
                           placeholderText="Select a date"
                           className="w-full px-3 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                       />
                       
                   </div>
               </div>

               <div className="sm:col-span-2 sm:col-start-1">
                   <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                       Street
                   </label>
                   <div className="mt-2">
                       <input
                               value={formData.street || ''}
                               onChange={(e) => handleFormChange('street', e.target.value)}

                           type="text"
                           name="street"
                           id="street"
                           autoComplete="address-level2"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                   </div>
               </div>

               <div className="sm:col-span-2">
                   <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                      City
                   </label>
                   <div className="mt-2">
                       <input
                               value={formData.city || ''}
                               onChange={(e) => handleFormChange('city', e.target.value)}

                           type="text"
                           name="city"
                           id="city"
                           autoComplete="postal-code"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                       />
                   </div>
               </div>

               <div className="sm:col-span-3">
                   <label htmlFor="zip" className="block text-sm font-medium leading-6 text-gray-900">
                       Zip/Postal-Code
                   </label>
                   <div className="mt-2">
                       <input
                               value={formData.zip || ''}
                               onChange={(e) => handleFormChange('zip', e.target.value)}

                           type="text"
                           name="zip"
                           id="zip"
                           autoComplete="advanceAmount"
                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                       />

                   </div>
               </div>

               <div className="sm:col-span-2">
                   <label htmlFor="district" className="block text-sm font-medium leading-6 text-gray-900">
                       District
                   </label>
                   <div className="mt-2">
                       <select
                           id="district"
                           name="district"
                               value={formData.district || ''}
                               onChange={(e) => handleFormChange('district', e.target.value)}

                           className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                       >
                           {keralaDistricts &&
                               keralaDistricts.map((place) => (
                                   <option key={place} value={place}>
                                       {place}
                                   </option>
                               ))}
                       </select>
                   </div>
               </div>
           </div>
               <button type='submit' className='btn btn-sm mt-4 bg-indigo-500 text-white' >
                    Submit
               </button>
           </form>
       </div>
   )
}

export default OrderForm;