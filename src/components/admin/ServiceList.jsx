import { useEffect, useState } from "react";
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ServiceList = () => {

    const token = useSelector((state) => state.admin.token);
    const [loading, setLoading] = useState(false);
    const [serviceList, setServiceList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editService, setEditService] = useState(null);
    const [imageEdited, setImageEdited] = useState(true);

    const openEditModal = ({ serviceImage, serviceName,_id}) => {
        setEditService(serviceName)
        setEditFormData({ serviceName,file:serviceImage,_id });
        
    };
    const [searchText, setSearchText] = useState('');


    const [formData, setFormData] = useState({
        name: '',
        file: null,

    });

    const [editFormData, setEditFormData] = useState({
        serviceName: '',
        file: null,
        _id:null,
    });

    const validateFormData = () => {
        const { file, name } = formData;
        const errors = {};

        if (name.trim().length < 3) {
            errors.name = 'Enter a valid Name';
        }

        if (!file) {
            errors.file = 'Add a service Image';
        }

        return errors;
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        
        setEditFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleEditFileChange = (event) => {
        
        setImageEdited(false);
        const file = event.target.files[0];
        setEditFormData(prevFormData => ({
            ...prevFormData,
            file
        }));
    

    };


    const handleChange = (event) => {

        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData(prevFormData => ({
            ...prevFormData,
            file
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateFormData();


        if (Object.keys(errors).length === 0) {
            setLoading(true);

            try {

                const response = await axiosInstance.post('/admin/addService', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {

                    setServiceList(prevServiceList => [...prevServiceList, response.data.newService])
                    toast.success('Service Added');
                    setLoading(false);
                    setIsOpen(false);

                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error(error.response.data.errMsg);
            }
          
        } else if (Object.keys(errors).length === 2) {
            toast.error('Enter all fields')
        } else if (errors.name) {
            toast.error(errors.name)
        }
        else if (errors.file) {
            toast.error(errors.file)
        }
    };

   const handleEditService  = async(event) => {
    event.preventDefault()
       const editService = serviceList.find(services => services._id===editFormData._id);
     
       if (editService.serviceName !== editFormData.serviceName || editService.serviceImage !== editFormData.file){
        setLoading(true);
           try {
               const response = await axiosInstance.patch('/admin/services', editFormData, {
                   headers: {
                       Authorization: `Bearer ${token}`,
                       'Content-Type': 'multipart/form-data'
                   }
               });
            
               if (response.status === 200) {
                   setLoading(true);
                   toast.success('Updated Successfully');
                   setServiceList(prevList => {
                    const updatedList = prevList.map(services => {
                        if(services._id===editFormData._id){
                            return {
                                ...services,
                                serviceImage:response?.data?.service?.serviceImage,
                                serviceName:response?.data?.service?.serviceName,
                            }
                        }
                        return services;
                    });
                    return updatedList;
                   })
                   setEditOpen(false)
                   setEditFormData({
                       serviceName: '',
                       file: null,
                       _id: null,
                   })
               }
               
           } catch (error) {
               setLoading(true);
            toast.error(error?.response?.data?.errMsg)
                
           }
           
        }
        else {
            setEditOpen(false);
            toast('No Changes Made')
        }
    }

    const getServiceList = async () => {
        try {
            const response = await axiosInstance.get('/admin/serviceList', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            setServiceList(response.data.serviceList)
            

        } catch (error) {
            toast.error('Something went wrong')
        }
    }

  

    ;


    useEffect(() => {
        getServiceList()
    }, []);

    return (
        <>
            <section className="container px-4 mx-auto ">
                <div className="sm:flex sm:items-center sm:justify-between  ">
                    <div className="flex w-full ">
                        <div className="flex items-center gap-x-3">
                  <div className="relative flex justify-center">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="px-4 py-2 mx-auto tracking-wide btn btn-sm text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                >
                                    Add +
                                </button>

                                {isOpen && (
                                    <div
                                        className="fixed inset-0 z-10 overflow-y-auto"
                                        aria-labelledby="modal-title"
                                        role="dialog"
                                        aria-modal="true"
                                    >
                                        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                                &#8203;
                                            </span>
                                    
                                            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl -bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                                                <div className="flex items-center justify-center mx-auto">
                                                    {formData.file instanceof File ? (
                                                        <img className=" rounded-lg w-64 h-48" src={URL.createObjectURL(formData.file)} alt="Selected" />
                                                    ) : null}
                                                </div>

                                                <form onSubmit={handleSubmit} encType="multipart/form-data">

                                                <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                    <input
                                                        type="text"
                                                        id="name" name="name" placeholder="Service name here" value={formData.name} onChange={handleChange}
                                                        className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md -bg-gray-900 -text-gray-300 -border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 -focus:border-blue-300 focus:outline-none focus:ring"
                                                    />

                                                
                                                </div>
                                                <div>
                                                    <label htmlFor="image" className="block text-sm text-gray-500 -text-gray-300 mt-4">Image</label>

                                                    <input type="file" onChange={handleFileChange}  name="file" className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full -file:bg-gray-800 -file:text-gray-200 -text-gray-300 placeholder-gray-400/70 -placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 -border-gray-600 -bg-gray-900 -focus:border-blue-300" />
                                                </div>

                                                <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                                    <button
                                                        onClick={() => setIsOpen(false)}
                                                        className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium -text-gray-200 -border-gray-700 -hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        type="submit" className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                    >
                                                            {loading ? <span className="loading loading-dots loading-xs"> </span> : 'Confirm'}
                                                    </button>
                                                </div>
                                                </form>
                                            </div>
                                           
                                        </div>
                                    </div>
                                )}
                            </div>
       


                        </div>
                       
                        <div className="mt-6 w-64 ml-4">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative h-10 m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none -border-neutral-600 -text-neutral-200 -placeholder:text-neutral-200 -focus:border-primary"
                                    placeholder="Search Service"
                                    aria-label="Search"
                                    aria-describedby="button-addon1"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />



                            </div>
                        </div>

                    </div>
                </div>


                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 -border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 -divide-gray-700">
                                    <thead className="bg-gray-50 -bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>Service Name</span>

                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">
                                                Service Image
                                            </th>
                                            
                                            
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">Action</th>



                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 -divide-gray-700 -bg-gray-900">
                                        {serviceList?.length > 0 ? (
                                            serviceList.filter((service) => service.serviceName.toLowerCase().includes(searchText)).map((service) => (
                                                <tr key={service._id}>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-black">{service?.serviceName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap ">
                                                        <div>
                                                            <img className="h-12 font-bold ml-9" src={service.serviceImage} alt="Service Image" />
                                                        </div>
                                                    </td>
                                                   
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                      
                                                        <button className="px-4 py-2 mx-auto tracking-wide btn btn-sm text-white capitalize transition-colors duration-300 transform bg-indigo-500 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" onClick={() => openEditModal(service) || setEditOpen(true) }>Edit</button>
                                                        
                                
                                                       
                                                                {

                                                                    editService && editOpen && 
                                                                    
                                                                 
                                                                <div
                                                                    className="fixed inset-0 z-10 overflow-y-auto"
                                                                    aria-labelledby="modal-title"
                                                                    role="dialog"
                                                                    aria-modal="true"
                                                                >
                                                                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                                                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                                                            &#8203;
                                                                        </span>

                                                                        <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl -bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                                                                            <div className="flex items-center justify-center mx-auto">
                                                                                
                                                                                    <img className=" rounded-lg w-64 h-48" src={imageEdited ? editFormData.file : (editFormData.file instanceof File ? URL.createObjectURL(editFormData.file) : null)} />
                                                                                    
                                                                               
                                                                            </div>

                                                                            <form encType="multipart/form-data" onSubmit={handleEditService}>

                                                                                <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                                                    <input
                                                                                        type="text"
                                                                                        id="name" 
                                                                                          name="serviceName"
                                                                                    placeholder={editFormData.serviceName}
                                                                                    value={editFormData.serviceName}
                                                                                    onChange={handleEditChange}
                                                                                        className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md -bg-gray-900 -text-gray-300 -border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 -focus:border-blue-300 focus:outline-none focus:ring"
                                                                                    />


                                                                                </div>
                                                                                <div>
                                                                                    <label htmlFor="image" className="block text-sm text-gray-500 -text-gray-300 mt-4">Image</label>

                                                                                    <input type="file"
                                                                                        onChange={handleEditFileChange} name="serviceImage"
                                                                                     
                                                                                     className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full -file:bg-gray-800 -file:text-gray-200 -text-gray-300 placeholder-gray-400/70 -placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 -border-gray-600 -bg-gray-900 -focus:border-blue-300" />
                                                                                </div>

                                                                                <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                                                                    <button
                                                                                        onClick={() => setEditOpen(false)}
                                                                                        className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium -text-gray-200 -border-gray-700 -hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                                                                    >
                                                                                        Cancel
                                                                                    </button>

                                                                                    <button
                                                                                        type="submit" className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                                                                                    >
                                                                                        {loading ? <span className="loading loading-dots loading-xs"> </span> : 'Confirm'}
                                                                                    </button>
                                                                                </div>
                                                                            </form>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                    
                                                                    }

                                                       
                                                    </td>

                                                 

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500" colSpan={3}>
                                                    No Services found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>






        </>

    )

};

export default ServiceList;