import { useEffect, useState } from "react";
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShimmerPostDetails } from "react-shimmer-effects";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';



const ServiceList = () => {

    const token = useSelector((state) => state.admin.token);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [serviceList, setServiceList] = useState([]);
    const [modalShow, setModalShow] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        file: null,

    });

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

    };


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
        const timeoutId = setTimeout(() => {
            setModalShow(false);
        }, 0);

        return () => clearTimeout(timeoutId); 
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

            <div onClick={showModal} className="font-black text-sm m-1  text-blue-500 hover: cursor-pointer">
                NEW+
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
                                    <img className="h-12 font-bold mt-3" src={URL.createObjectURL(formData.file)} alt="Selected" />
                                </div>
                            )}
                        </form>
                        
                    </dialog>
                }
            </div>


            <ToastContainer autoClose={2000} />


            <div className="flex justify-center bg-white w-full my-12 mr-24 border-solid border-2 border-gray-300 shadow-lg rounded-lg">

                {loading ? (
                    <ShimmerPostDetails card cta variant="SIMPLE" />
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
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300">{obj.serviceName}</td>
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300">
                                                    <img className="h-12 font-bold " src={obj.serviceImage} alt="Service Image" />
                                                </td>
                                                <td className="px-4 py-2 border-solid border-2 border-gray-300">
                                                    <button
                                                        onClick={() => navigate(`/admin/user_edit/${obj._id}`)}
                                                        className="btn bg-gray-900 text-white rounded shadow hover:bg-gray-800"
                                                    >
                                                        Edit
                                                    </button>
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

            </div>

        </>

    )

};

export default ServiceList;