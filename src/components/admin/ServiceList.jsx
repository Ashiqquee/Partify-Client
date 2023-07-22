import { useEffect, useState } from "react";
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const ServiceList = () => {

    const token = useSelector((state) => state.admin.token);
    const [loading, setLoading] = useState(true);
    const [serviceList, setServiceList] = useState([]);
    const [modalShow, setModalShow] = useState(true);
    const [editService, setEditService] = useState(null);
    const [imageEdited, setImageEdited] = useState(true)
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

        const errors = validateFormData();

        event.preventDefault();

        if (Object.keys(errors).length === 0) {

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
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.errMsg);
            }
            setModalShow(true);
        }
    };

   const handleEditService  = async() => {
  
       const editService = serviceList.find(services => services._id===editFormData._id);
     
       if (editService.serviceName !== editFormData.serviceName || editService.serviceImage !== editFormData.file){
           try {
               const response = await axiosInstance.patch('/admin/services', editFormData, {
                   headers: {
                       Authorization: `Bearer ${token}`,
                       'Content-Type': 'multipart/form-data'
                   }
               });
            
               if (response.status === 200) {
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
                   setEditFormData({
                       serviceName: '',
                       file: null,
                       _id: null,
                   })
               }
               
           } catch (error) {
            toast.error(error?.response?.data?.errMsg)
                
           }
           
        }
        else {
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
            setLoading(false);

        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const handleModal = () => {
        const errors = validateFormData();

        if (Object.keys(errors).length === 0) {
            const timeoutId = setTimeout(() => {
                setModalShow(false);
            }, 0);

            return () => clearTimeout(timeoutId);
        } else if (Object.keys(errors).length === 2) {
            toast.error('Enter all fields')
        } else if (errors.name) {
            toast.error(errors.name)
        }
        else if (errors.file) {
            toast.error(errors.file)
        }
    }


    const showModal = () => {
        const dialogElement = document.getElementById('my_modal_5');
        if (dialogElement && !dialogElement.hasAttribute('open')) {
            dialogElement.showModal();
        }
    };


    useEffect(() => {
        getServiceList()
    }, []);

    return (
        <>
            <section className="container px-4 mx-auto ">
                <div className="sm:flex sm:items-center sm:justify-between  ">
                    <div className="flex w-full ">
                        <div className="flex items-center gap-x-3">
                            <button onClick={showModal} className="font-bold text-white text-sm m-1 btn  bg-indigo-500 hover: cursor-pointer">ADD</button>

            
                {modalShow &&
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <form onSubmit={handleSubmit} className="modal-box" encType="multipart/form-data">
                            <h3 className="font-bold text-lg">Add New Service</h3>
                            <div className="mb-4 mt-3">
                                <label htmlFor="name" className="block font-semibold">Service Name</label>
                                <input type="text" id="name" name="name" placeholder="Service name here" value={formData.name} onChange={handleChange} className="text-black font-semibold form-input p-1 mt-1 block w-full h-10" />
                            </div>
                            <div className="mb-4">
                                <input onChange={handleFileChange} type="file" name="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
                            </div>
                            <div className="modal-action">
                                <button type="submit" onClick={handleModal} className="px-4 font-semibold py-2 bg-blue-500 text-white rounded hover:bg-blue-900 my_modal_6">Add</button>
                            </div>
                            {formData.file && (
                                <div className="mt-3">
                                    <h4>Selected Image:</h4>
                                   { formData.file instanceof File ? (
                                    <img className="h-12 font-bold mt-3" src={URL.createObjectURL(formData.file)} alt="Selected" />
                                    ) : null}
                                </div>
                            )}
                        </form>

                    </dialog>
                }
       


                        </div>
                       
                        <div className="max-w-md mx-auto ml-8 mt-1">
                            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                                <div className="grid place-items-center h-full w-12 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                <input
                                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                    type="text"
                                    id="search"
                                    placeholder="Search Services.."
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
                            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>Service Name</span>

                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Service Image
                                            </th>
                                            
                                            
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>



                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {serviceList?.length > 0 ? (
                                            serviceList.filter((user) => user.serviceName.toLowerCase().includes(searchText)).map((user) => (
                                                <tr key={user._id}>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-black">{user?.serviceName}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap ">
                                                        <div>
                                                            <img className="h-12 font-bold ml-9" src={user.serviceImage} alt="Service Image" />
                                                        </div>
                                                    </td>
                                                   
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <label htmlFor="my_modal_6" onClick={() => openEditModal(user)} className="btn w-14 h-1 bg-green-700 text-white rounded-md hover:cursor-pointer ">Edit</label>


                                                        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                                                        <div className="modal">
                                                            <div className="modal-box">
                                                                {

                                                                    editService && <form className="modal-box" encType="multipart/form-data">
                                                                        <h3 className="font-bold text-lg">Edit Service</h3>
                                                                        <div className="mb-4 mt-3">
                                                                            <label htmlFor="edit_name" className="block font-semibold">Service Name</label>
                                                                            <input
                                                                                type="text"
                                                                                id="edit_name"
                                                                                name="serviceName"
                                                                                placeholder={editFormData.serviceName}
                                                                                value={editFormData.serviceName}
                                                                                onChange={handleEditChange}
                                                                                className="text-black font-semibold form-input p-1 mt-1 block w-full h-10"
                                                                            />
                                                                        </div>


                                                                        <div className="mt-3">
                                                                            <h4>Previous Image:</h4>
                                                                            <img
                                                                                className="h-12 font-bold mt-3"
                                                                                src={imageEdited ? editFormData.file : (editFormData.file instanceof File ? URL.createObjectURL(editFormData.file) : null)}
                                                                                alt="Selected"
                                                                            />
                                                                        </div>

                                                                        <div className="mb-4 mt-2">
                                                                            <input
                                                                                onChange={handleEditFileChange}
                                                                                type="file"
                                                                                name="serviceImage"

                                                                                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                                                            />
                                                                        </div>
                                                                        <div className="modal-action">

                                                                            <label onClick={handleEditService} htmlFor="my_modal_6" className="btn px-4 font-semibold py-2 bg-blue-500 text-white rounded hover:bg-blue-900">Update</label>

                                                                        </div>

                                                                    </form>}

                                                            </div>
                                                        </div>
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



{/* 
            <div className="flex justify-center bg-white w-full my-12 mr-24 border-solid border-2 border-gray-300 shadow-lg rounded-lg">

                {loading ? (
                    <section className="bg-white dark:bg-gray-900">
                        <div className="container px-6 py-8 mx-auto animate-pulse">
                            <div className="text-center">
                                <p className="w-32 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></p>

                                <div className="flex flex-wrap justify-center gap-4 mt-10">
                                    <p className="w-24 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    <p className="w-24 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    <p className="w-24 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    <p className="w-24 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    <p className="w-24 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                </div>

                            </div>

                            <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

                            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                                <p className="w-24 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>

                                <p className="w-64 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            </div>
                        </div>
                    </section>
                ) : (
                    <div className="w-full">
                        <table className="w-full">
                            {serviceList.length > 0 ? (
                                <>
                                    <thead className="w-full">
                                        <tr className="w-full">
                                            <th className="px-4 text-center w-96 py-2 border-solid border-2 border-gray-300">#
                                            </th>
                                            <th className="px-4 w-1/4 py-2 border-solid border-2 border-gray-300">Name</th>
                                            <th className="px-4 w-1/4 py-2 border-solid border-2 border-gray-300">IMAGE</th>
                                            <th className="px-4 w-1/4 py-2 border-solid border-2 border-gray-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {serviceList.map((obj, index) => (
                                            <tr key={obj._id}>
                                                <td className="px-4 py-2 font-s font-bold border-solid border-2 border-gray-300">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">{obj.serviceName}</td>
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">
                                                    <img className="h-12 font-bold " src={obj.serviceImage} alt="Service Image" />
                                                </td>
                                                <td className="px-4 py-2 border-solid border-2 border-gray-300 ">
                                                    <label htmlFor="my_modal_6" onClick={() => openEditModal(obj)} className="btn w-14 h-1 bg-green-700 text-white rounded-md hover:cursor-pointer ">Edit</label>


                                                    <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                                                    <div className="modal">
                                                        <div className="modal-box">
                                                            {

                                                                editService && <form className="modal-box" encType="multipart/form-data">
                                                                    <h3 className="font-bold text-lg">Edit Service</h3>
                                                                    <div className="mb-4 mt-3">
                                                                        <label htmlFor="edit_name" className="block font-semibold">Service Name</label>
                                                                        <input
                                                                            type="text"
                                                                            id="edit_name"
                                                                            name="serviceName"
                                                                            placeholder={editFormData.serviceName}
                                                                            value={editFormData.serviceName}
                                                                            onChange={handleEditChange}
                                                                            className="text-black font-semibold form-input p-1 mt-1 block w-full h-10"
                                                                        />
                                                                    </div>


                                                                    <div className="mt-3">
                                                                        <h4>Previous Image:</h4>
                                                                        <img
                                                                            className="h-12 font-bold mt-3"
                                                                            src={imageEdited ? editFormData.file : (editFormData.file instanceof File ? URL.createObjectURL(editFormData.file) : null)}
                                                                            alt="Selected"
                                                                        />
                                                                    </div>

                                                                    <div className="mb-4 mt-2">
                                                                        <input
                                                                            onChange={handleEditFileChange}
                                                                            type="file"
                                                                            name="serviceImage"

                                                                            className="file-input file-input-bordered file-input-sm w-full max-w-xs"
                                                                        />
                                                                    </div>
                                                                    <div className="modal-action">
                                                            
                                                                        <label onClick={handleEditService} htmlFor="my_modal_6" className="btn px-4 font-semibold py-2 bg-blue-500 text-white rounded hover:bg-blue-900">Update</label>

                                                                    </div>

                                                                </form>}
                                                         
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className="font-black p-24 text-center" colSpan="4">
                                            <FontAwesomeIcon icon={faFile} /> Service List is empty
                                        </td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                    </div>
                )}

            </div> */}


        </>

    )

};

export default ServiceList;