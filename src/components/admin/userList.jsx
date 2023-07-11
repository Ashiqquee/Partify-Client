import { useState, useEffect } from "react";
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserList = () => {

    const token = useSelector((state) => state.admin.token);

    const [loading, setLoading] = useState(true);

    const [confirmAction, setConfirmAction] = useState(false)

    const [userList, setUserList] = useState([]);

    

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get('/admin/userList', {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            });

            setUserList(response.data.userData);
            setLoading(false);
        } catch (error) {
            toast.error('Something went wrong')
        }
    }


    const handleUnBlock = async (userId) => {
        try {

            const response = await axiosInstance.patch(`/admin/UnblockUser/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success('Unblocked Successfully');
                setUserList(prevList => {
                    const updatedList = prevList.map(user => {
                        if (user._id === userId) {
                            return {
                                ...user,
                                isBanned: false
                            };
                        }
                        return user;
                    });
                    return updatedList;
                });
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.errMsg);
        }
    };

    const handleBlock = async (userId) => {
        try {

            const response = await axiosInstance.patch(`/admin/blockUser/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success('Blocked Successfully');
                setUserList(prevList => {
                    const updatedList = prevList.map(user => {
                        if (user._id === userId) {
                            return {
                                ...user,
                                isBanned: true
                            };
                        }
                        return user;
                    });
                    return updatedList;
                });
            }

        } catch (error) {
            toast.error(error.response.data.errMsg);
        }
    };

    const handleConfirmation = () => {
        setConfirmAction(true); 
    };

    const handleConfirmAction = (id,action) => {
       if(action===true){
            handleUnBlock(id)
       }else {
        handleBlock(id)
       }
    };

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <>
           
            <div className="flex justify-center bg-white w-full m-12 border-solid border-2 border-gray-300 shadow-lg rounded-lg">
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
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            {userList.length > 0 ? (
                                <>
                                    <thead className="w-full">
                                        <tr className="w-full">
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">#
                                            </th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Name</th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Phone</th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Email</th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Status</th>
                                            <th className="px-4 py-2 border-solid border-2 border-gray-300">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList.map((obj, index) => (
                                            <tr key={obj._id}>
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300">
                                                    {index + 1}
                                                </td>
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">{obj.name}</td>
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">{obj.phone}</td>
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">{obj.email}</td>
                                                <td className="px-4 py-2 font-bold border-solid border-2 border-gray-300 text-center">{obj.isBanned ? (
                                                    <p>Blocked</p>
                                                ) : (
                                                    <p>Accessible</p>
                                                )}</td>
                                                <td className="px-4 py-2 border-solid border-2 border-gray-300 text-center">
                                                    {obj.isBanned ? (
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
                                                    )}
                                                    {confirmAction && (
                                                        toast.info(
                                                            <div>
                                                                <p>Are you sure you want to proceed?</p>
                                                                <button className="btn-sm bg-indigo-500 text-white rounded-md" onClick={() => handleConfirmAction(obj._id, obj.isBanned)}>Confirm</button>
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
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td className="font-black p-24 text-center" colSpan="4">
                                            <FontAwesomeIcon icon={faUser} /> User List is empty
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

export default UserList;