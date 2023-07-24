import { useState, useEffect } from "react";
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const ProviderList = () => {

    const token = useSelector((state) => state.admin.token);

    const [searchText, setSearchText] = useState('');

    const [confirmAction, setConfirmAction] = useState(false)

    const [providerList, setProviderList] = useState([]);

    const [providerAction,setProviderAction] = useState({});

    const [selectedProvider, setSelectedProvider] = useState([]);
    
    const [isOpen, setIsOpen] = useState(false);

    const [placeOpen, setPlaceOpen] = useState(false);


    


    const placeModalClose = () => setPlaceOpen(false);

   

    const closeModal = () => setIsOpen(false);

    const getProviderData = async () => {
        try {
            const response = await axiosInstance.get('/admin/providerList', {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            });
           
            setProviderList(response.data.providerData);
            

          
        } catch (error) {
            toast.error('Something went wrong')
        }
    };


    const setProvider = (provider,modal) => {
        setSelectedProvider(provider);
        modal === 'service' ? setIsOpen(true) : setPlaceOpen(true);
    }

    const handleUnBlock = async (providerId) => {
        try {

            const response = await axiosInstance.patch(`/admin/UnblockProvider/${providerId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success('Unblocked Successfully');
                setProviderList(prevList => {
                    const updatedList = prevList.map(provider => {
                        if (provider._id === providerId) {
                            return {
                                ...provider,
                                isBanned: false
                            };
                        }
                        return provider;
                    });
                    return updatedList;
                });
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.errMsg);
        }
    };

    const handleBlock = async (providerId) => {
        try {

            const response = await axiosInstance.patch(`/admin/blockProvider/${providerId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success('Blocked Successfully');
                setProviderList(prevList => {
                    const updatedList = prevList.map(provider => {
                        if (provider._id === providerId) {
                            return {
                                ...provider,
                                isBanned: true
                            };
                        }
                        return provider;
                    });
                    return updatedList;
                });
            }

        } catch (error) {
            toast.error(error.response.data.errMsg);
        }
    };


    const handleTBC = async (providerId) => {
        try {

            const response = await axiosInstance.patch(`/admin/confirmProvider/${providerId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success('Confirmed Successfully');
                setProviderList(prevList => {
                    const updatedList = prevList.map(provider => {
                        if (provider._id === providerId) {
                            return {
                                ...provider,
                                adminConfirmed: true
                            };
                        }
                        return provider;
                    });
                    return updatedList;
                });
            }

        } catch (error) {
            toast.error(error.response.data.errMsg);
        }
    }

    const handleConfirmation = (id) => {
        
        const provider = providerList.find((provider) => provider._id === id);
       
        setProviderAction(provider);
        setConfirmAction(true);
    };

    const handleConfirmAction = () => {
       
        if(!providerAction.adminConfirmed){
            handleTBC(providerAction._id)
        }
        else if (providerAction.isBanned === true) {
            handleUnBlock(providerAction._id)
        } else {
            handleBlock(providerAction._id)
        }
    };

    useEffect(() => {
        getProviderData();
    }, [])


    return (
        <>
            <section className="container px-4 mx-auto ">
                <div className="sm:flex sm:items-center sm:justify-between ">
                    <div className="flex  justify-start w-full ">
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Providers</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{providerList?.length || 0}</span>
                        </div>
                        <div className="max-w-md mx-auto ml-8">
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
                                    placeholder="Search Provider.."
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
                                                    <span>Name</span>

                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Services
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Places</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>



                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {providerList?.length > 0 ? (
                                            providerList.filter((provider) => provider.name.toLowerCase().includes(searchText)).map((provider) => (
                                                <tr key={provider._id}>
                                                    
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-black">{provider?.name}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-bold">{provider?.phone}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div className="relative flex justify-center">
                                                            <button
                                                                onClick={() => setProvider(provider,'service')}
                                                                className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                            >
                                                                Services
                                                            </button>

                                                            {isOpen && (
                                                                <div
                                                                    className="fixed inset-0 z-10 overflow-y-auto"
                                                                    aria-labelledby="modal-title"
                                                                    role="dialog"
                                                                    aria-modal="true"
                                                                >
                                                                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                                                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                                                                        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                                                            <div>
                                                                              

                                                                                <div className="mt-2 text-center">
                                                                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                                                                        Services
                                                                                    </h3>
                                                                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                                                        {selectedProvider && selectedProvider?.services?.length > 0 && (
                                                                                            <div className="py-4 font-sans font-semibold">


                                                                                                {selectedProvider?.services.map((service) => (
                                                                                                    <div key={service._id} className="text-center">
                                                                                                        <h1 >{service.serviceName}<br /></h1>
                                                                                                    </div>
                                                                                                ))}
                                                                                            </div>
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="mt-5 sm:flex sm:items-center sm:justify-between">

                                                                                <div className="sm:flex sm:items-center ">
                                                                                    <button
                                                                                        onClick={closeModal}
                                                                                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                                                                    >
                                                                                        Cancel
                                                                                    </button>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="relative flex justify-center">
                                                            <button
                                                                onClick={() => setProvider(provider,'place')}
                                                                className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                            >
                                                                Places
                                                            </button>

                                                            {placeOpen && (
                                                                <div
                                                                    className="fixed inset-0 z-10 overflow-y-auto"
                                                                    aria-labelledby="modal-title"
                                                                    role="dialog"
                                                                    aria-modal="true"
                                                                >
                                                                    <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                                                                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                                                                        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                                                                            <div>
                                                                                <div className="flex items-center justify-center">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg"  version="1.1" width="30" height="30" viewBox="0 0 256 256">

                                                                                        <defs>
                                                                                        </defs>
                                                                                        <g
                                                                                            style={{
                                                                                                stroke: 'none',
                                                                                                strokeWidth: 0,
                                                                                                strokeDasharray: 'none',
                                                                                                strokeLinecap: 'butt',
                                                                                                strokeLinejoin: 'miter',
                                                                                                strokeMiterlimit: 10,
                                                                                                fill: 'none',
                                                                                                fillRule: 'nonzero',
                                                                                                opacity: 1,
                                                                                            }}
                                                                                            transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                                                                                        >
                                                                                            <path
                                                                                                d="M 48.647 69.718 c 13.692 0.652 24.265 4.924 24.265 10.098 C 72.912 85.44 60.415 90 45 90 s -27.912 -4.56 -27.912 -10.184 c 0 -5.173 10.573 -9.446 24.265 -10.098"
                                                                                                style={{
                                                                                                    stroke: 'none',
                                                                                                    strokeWidth: 1,
                                                                                                    strokeDasharray: 'none',
                                                                                                    strokeLinecap: 'butt',
                                                                                                    strokeLinejoin: 'miter',
                                                                                                    strokeMiterlimit: 10,
                                                                                                    fill: 'rgb(221,200,47)',
                                                                                                    fillRule: 'nonzero',
                                                                                                    opacity: 1,
                                                                                                }}
                                                                                                transform="matrix(1 0 0 1 0 0)"
                                                                                                strokeLinecap="round"
                                                                                            />
                                                                                            <path
                                                                                                d="M 45 79.665 l 21.792 -6.211 c -3.033 -1.381 -7.032 -2.466 -11.622 -3.122 L 45 79.665 z"
                                                                                                style={{
                                                                                                    stroke: 'none',
                                                                                                    strokeWidth: 1,
                                                                                                    strokeDasharray: 'none',
                                                                                                    strokeLinecap: 'butt',
                                                                                                    strokeLinejoin: 'miter',
                                                                                                    strokeMiterlimit: 10,
                                                                                                    fill: 'rgb(168,149,38)',
                                                                                                    fillRule: 'nonzero',
                                                                                                    opacity: 1,
                                                                                                }}
                                                                                                transform="matrix(1 0 0 1 0 0)"
                                                                                                strokeLinecap="round"
                                                                                            />
                                                                                            <path
                                                                                                d="M 45 0 C 30.802 0 19.291 11.51 19.291 25.709 c 0 20.07 21.265 33.961 25.709 53.956 C 48.304 53.11 48.304 26.555 45 0 z"
                                                                                                style={{
                                                                                                    stroke: 'none',
                                                                                                    strokeWidth: 1,
                                                                                                    strokeDasharray: 'none',
                                                                                                    strokeLinecap: 'butt',
                                                                                                    strokeLinejoin: 'miter',
                                                                                                    strokeMiterlimit: 10,
                                                                                                    fill: 'rgb(255,49,64)',
                                                                                                    fillRule: 'nonzero',
                                                                                                    opacity: 1,
                                                                                                }}
                                                                                                transform="matrix(1 0 0 1 0 0)"
                                                                                                strokeLinecap="round"
                                                                                            />
                                                                                            <path
                                                                                                d="M 45 14.965 c -6.011 0 -10.885 4.873 -10.885 10.885 S 38.989 36.735 45 36.735 C 47.897 29.478 47.897 22.222 45 14.965 z"
                                                                                                style={{
                                                                                                    stroke: 'none',
                                                                                                    strokeWidth: 1,
                                                                                                    strokeDasharray: 'none',
                                                                                                    strokeLinecap: 'butt',
                                                                                                    strokeLinejoin: 'miter',
                                                                                                    strokeMiterlimit: 10,
                                                                                                    fill: 'rgb(255,255,255)',
                                                                                                    fillRule: 'nonzero',
                                                                                                    opacity: 1,
                                                                                                }}
                                                                                                transform="matrix(1 0 0 1 0 0)"
                                                                                                strokeLinecap="round"
                                                                                            />
                                                                                            <path
                                                                                                d="M 45 0 c 14.198 0 25.709 11.51 25.709 25.709 c 0 20.07 -21.265 33.961 -25.709 53.956 V 0 z"
                                                                                                style={{
                                                                                                    stroke: 'none',
                                                                                                    strokeWidth: 1,
                                                                                                    strokeDasharray: 'none',
                                                                                                    strokeLinecap: 'butt',
                                                                                                    strokeLinejoin: 'miter',
                                                                                                    strokeMiterlimit: 10,
                                                                                                    fill: 'rgb(199,34,46)',
                                                                                                    fillRule: 'nonzero',
                                                                                                    opacity: 1,
                                                                                                }}
                                                                                                transform="matrix(1 0 0 1 0 0)"
                                                                                                strokeLinecap="round"
                                                                                            />
                                                                                            <path
                                                                                                d="M 45 14.965 c 6.011 0 10.885 4.873 10.885 10.885 S 51.011 36.735 45 36.735 V 14.965 z"
                                                                                                style={{
                                                                                                    stroke: 'none',
                                                                                                    strokeWidth: 1,
                                                                                                    strokeDasharray: 'none',
                                                                                                    strokeLinecap: 'butt',
                                                                                                    strokeLinejoin: 'miter',
                                                                                                    strokeMiterlimit: 10,
                                                                                                    fill: 'rgb(240,240,240)',
                                                                                                    fillRule: 'nonzero',
                                                                                                    opacity: 1,
                                                                                                }}
                                                                                                transform="matrix(1 0 0 1 0 0)"
                                                                                                strokeLinecap="round"
                                                                                            />
                                                                                        </g>
                                                                                    </svg>
                                                                                </div>

                                                                                <div className="mt-2 text-center">
                                                                                    <h3 className="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                                                                        Places
                                                                                    </h3>
                                                                                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                                                        {selectedProvider && selectedProvider?.places?.length > 0 && (
                                                                                            <p className="py-4 font-sans font-semibold " key={selectedProvider?.places}>

                                                                                                {selectedProvider?.places}

                                                                                            </p>
                                                                                        )}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="mt-5 sm:flex sm:items-center sm:justify-between">

                                                                                <div className="sm:flex sm:items-center ">
                                                                                    <button
                                                                                        onClick={placeModalClose}
                                                                                        className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                                                                    >
                                                                                        Cancel
                                                                                    </button>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            {provider?.adminConfirmed ? (
                                                                provider?.isBanned ? (
                                                                    <p>Blocked</p>
                                                                ) : (
                                                                    <p>Accessible</p>
                                                                )
                                                            ) : (
                                                                <h1>TBC</h1>
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>

                                                            {provider.adminConfirmed ? (
                                                                provider.isBanned ? (
                                                                    <button
                                                                        onClick={() => handleConfirmation(provider._id)}
                                                                        className="btn-sm bg-green-900 text-white rounded shadow hover:bg-green-950"
                                                                    >
                                                                        access
                                                                    </button>
                                                                ) : (
                                                                    <button
                                                                            onClick={() => handleConfirmation(provider._id)}
                                                                        className="btn-sm bg-red-500 text-white rounded shadow hover:bg-red-900"
                                                                    >
                                                                        block
                                                                    </button>
                                                                )
                                                            ) : (


                                                                <button
                                                                        onClick={() => handleConfirmation(provider._id)}
                                                                    className="btn-sm bg-indigo-500 text-white rounded shadow hover:bg-indigo-900"
                                                                >
                                                                    Confirm
                                                                </button>

                                                            )}
                                                          
                                                            {confirmAction && (
                                                                toast.info(
                                                                    <div>
                                                                        <p>Are you sure you want to proceed?</p>
                                                                        <button className="btn-sm bg-indigo-500 text-white rounded-md" onClick={() => handleConfirmAction()}>Confirm</button>
                                                                        <button className="btn-sm bg-red-500 ml-1 text-white rounded-md" onClick={() => setConfirmAction(false)}>Cancel</button>
                                                                    </div>,
                                                                    {
                                                                        toastId: '',
                                                                        autoClose: false,
                                                                        closeOnClick: true,
                                                                        draggable: false,
                                                                    }
                                                                )
                                                            )}
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500" colSpan={3}>
                                                    No Provider found
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
}

export default ProviderList;