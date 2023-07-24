import { useEffect, useState } from "react";
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ServiceList = () => {

    const token = useSelector((state) => state.admin.token);
    const [loading, setLoading] = useState(false);
    const [serviceList, setServiceList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');


    const [formData, setFormData] = useState({
        name: '',
        file: null,
        link: '',

    });



    const validateFormData = () => {
        const { file, name, link } = formData;
        const errors = {};

        if (name.trim().length < 3) {
            errors.name = 'Enter a valid Name';
        }

        if (!file) {
            errors.file = 'Add a service Image';
        }
        if (link.trim().length < 3) {
            errors.name = 'Enter a valid Link';
        }

        return errors;
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

                const response = await axiosInstance.post('/admin/ads', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (response.status === 200) {

                    setServiceList(prevServiceList => [...prevServiceList, response.data.newAd])
                    toast.success('Service Added');
                    setLoading(false);
                    setIsOpen(false);

                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                toast.error(error.response.data.errMsg);
            }

        } else if (Object.keys(errors).length === 3) {
            toast.error('Enter all fields')
        } else if (errors.name) {
            toast.error(errors.name)
        }
        else if (errors.file) {
            toast.error(errors.file)
        } else if (errors.link) {
            toast.error(errors.link)
        }
    };



    const getServiceList = async () => {
        try {
            const response = await axiosInstance.get('/admin/ads', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            setServiceList(response.data.adsList)


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

                                            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                                                <div className="flex items-center justify-center mx-auto">
                                                    {formData.file instanceof File ? (
                                                        <img className=" rounded-lg w-64 h-48" src={URL.createObjectURL(formData.file)} alt="Selected" />
                                                    ) : null}
                                                </div>

                                                <form onSubmit={handleSubmit} encType="multipart/form-data">

                                                    <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                        <input
                                                            type="text"
                                                            id="name" name="name" placeholder="Ad name here" value={formData.name} onChange={handleChange}
                                                            className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                                        />


                                                    </div>
                                                    <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                        <input
                                                            type="text"
                                                            id="link" name="link" placeholder="Redirect link here" value={formData.link} onChange={handleChange}
                                                            className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                                        />


                                                    </div>
                                                    <div>
                                                        <label htmlFor="image" className="block text-sm text-gray-500 dark:text-gray-300 mt-4">Image</label>

                                                        <input type="file" onChange={handleFileChange} name="file" className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" />
                                                    </div>

                                                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                                        <button
                                                            onClick={() => setIsOpen(false)}
                                                            className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
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
                                    placeholder="Search Ads.."
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
                                                    <span> Name</span>

                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Image
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>Link</span>

                                                </button>
                                            </th>

                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>



                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {serviceList?.length > 0 ? (
                                            serviceList.filter((service) => service.name.toLowerCase().includes(searchText)).map((service) => (
                                                <tr key={service._id}>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-black">{service?.name}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap ">
                                                        <div>
                                                            <img className="h-12 font-bold ml-9" src={service.adImage} alt="Service Image" />
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-black">{service?.adLink}</h2>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">

                                                        <button className="px-4 py-2 mx-auto tracking-wide btn btn-sm text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80" >Delete</button>




                                                    </td>



                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500" colSpan={3}>
                                                    No Ads found
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