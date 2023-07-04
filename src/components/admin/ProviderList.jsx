import { useState, useEffect } from "react";
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ShimmerPostDetails } from "react-shimmer-effects";
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProviderList = () => {

    const token = useSelector((state) => state.admin.token);

    const [loading, setLoading] = useState(true);

    const [confirmAction, setConfirmAction] = useState(false)

    const [providerList, setProviderList] = useState([]);



    const getUserData = async () => {
        try {
            const response = await axiosInstance.get('/admin/providerList', {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            });
           
            setProviderList(response.data.providerData);
            console.log(response.data.providerData);

            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong')
        }
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

    const handleConfirmation = () => {
        setConfirmAction(true);
    };

    const handleConfirmAction = (id, action, adminConfirmed) => {
        if(!adminConfirmed){
            handleTBC(id)
        }
        else if (action === true) {
            handleUnBlock(id)
        } else {
            handleBlock(id)
        }
    };

    useEffect(() => {
        getUserData();
    }, [])


    return (
        <>

            <div className="flex justify-center bg-white w-full m-12 border-solid border-2 border-gray-300 shadow-lg rounded-lg">
                {loading ? (
                    <ShimmerPostDetails card cta variant="SIMPLE" />
                ) : (
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                                {providerList?.length > 0 ? (
                                <>
                                    <thead className="w-full">
                                        <tr className="w-full">
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">#
                                            </th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Name</th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Phone</th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300 ">Services</th>
                                                <th className="px-4 py-2 border-solid border-2 border-gray-300">Places</th>

                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Status</th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {providerList.map((obj, index) => (
                                            <tr key={obj._id}>
                                                    <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">
                                                    {index + 1}
                                                </td>
                                                    <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">{obj.name}</td>
                                                    <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">{obj.phone}</td>
                                                    <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">
                                                        <button className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900" onClick={() => window.my_modal_2.showModal()}>Services</button>
                                                        <dialog id="my_modal_2" className="modal">
                                                            <form method="dialog" className="modal-box">
                                                                <h3 className="font-bold text-lg text-center ">Services</h3>
                                                                <div className="py-4 font-sans font-semibold">
                                                                    {obj?.services.map((x) => (
                                                                        <span key={x._id}>{x.serviceName}<br /></span>
                                                                    ))}
                                                                </div>
                                                            </form>
                                                            <form method="dialog" className="modal-backdrop">
                                                                <button>close</button>
                                                            </form>
                                                        </dialog>
                                                </td>
                                                    <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center"><button className=" btn-sm bg-indigo-500 text-white rounded shadow hover:bg-indigo-900" onClick={() => window.my_modal_3.showModal()}>Service Place</button>
                                                        <dialog id="my_modal_3" className="modal">
                                                            <form method="dialog" className="modal-box">
                                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                                <h3 className="font-bold text-lg text-center">Service Places</h3>
                                                                
                                                                    <p className="py-4 font-sans font-semibold">
                                                                        {obj?.places.map((x) => (
                                                                            <span key={x}>{x}<br /></span>
                                                                        ))}
                                                                    </p>
                                                               

                                                            </form>
                                                        </dialog>
                                                    </td>

                                                    <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">
                                                        {obj?.adminConfirmed ? (
                                                            obj?.isBanned ? (
                                                                <p>Blocked</p>
                                                            ) : (
                                                                <p>Accessible</p>
                                                            )
                                                        ) : (
                                                            <h1>TBC</h1>
                                                        )}
                                                    </td>
                                                <td className="px-4 py-2 border-solid border-2 border-gray-300">
                                                        {obj.adminConfirmed ? (
                                                            obj.isBanned ? (
                                                                <button
                                                                    onClick={handleConfirmation}
                                                                    className="btn-sm bg-green-900 text-white rounded shadow hover:bg-green-950"
                                                                >
                                                                    access
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={handleConfirmation}
                                                                    className="btn-sm bg-red-500 text-white rounded shadow hover:bg-red-900"
                                                                >
                                                                    block
                                                                </button>
                                                            )
                                                        ) : (
                                                            
                                                            
                                                                    <button
                                                                        onClick={handleConfirmation}
                                                                        className="btn-sm bg-indigo-500 text-white rounded shadow hover:bg-indigo-900"
                                                                    >
                                                                        Confirm
                                                                    </button>
                                                               
                                                        )}
                                                    <div>
                                                             {confirmAction && (
                                                                    toast.info(
                                                                        <div>
                                                                            <p>Are you sure you want to proceed?</p>
                                                                            <button
                                                                                className="btn-sm bg-indigo-500 text-white rounded-md"
                                                                                onClick={() => handleConfirmAction(obj._id, obj.isBanned,obj.adminConfirmed)}
                                                                            >
                                                                                Confirm
                                                                            </button>
                                                                            <button
                                                                                className="btn-sm bg-red-500 ml-1 text-white rounded-md"
                                                                                onClick={() => setConfirmAction(false)}
                                                                            >
                                                                                Cancel
                                                                            </button>
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
                                        ))}
                                    </tbody>
                                </>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className="font-black p-24 text-center" colSpan="4">
                                            <FontAwesomeIcon icon={faUser} /> provider List is empty
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
}

export default ProviderList;