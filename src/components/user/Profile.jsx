import { useEffect, useState } from "react";
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Orders from './Orders'
import Spinner from "../Spinner";
const Profile = () => {

    const token = useSelector(state => state.user.token);
    const [dp, setDp] = useState('');
    const[loading,setLoading] = useState(false);
    const[spinner,setSpinner] = useState(true);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        phone: '',
        image: '',
        place: '',
        referalNumber: '',
        wallet: '',

    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        place: '',

    });

    const validateFormData = () => {
        const { name, email, phone, place } = formData;
        const errors = {};

       

        if (name?.trim().length < 2) {
            errors.name = 'add valid name';
        }

        if (place.length < 2) {
            errors.file = "add valid place"
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = "Enter a valid email address";
        }
        console.log();
        if (phone.toString().length!==10) {
            errors.phone = 'Enter 10 digits';
        }
        return errors;
    };
    const [showModal, setShowModal] = useState(false);

  

    const imageSrc = dp ? URL.createObjectURL(dp) : (profile?.image || 'https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg');

    const handleFile = async (event) => {
        const file = event.target.files[0];
        if(!file){
          return  toast.error('Add a image')
        }
        setDp(file);
        const formData = new FormData();
        formData.append('file', file)

        try {
            const response = await axiosInstance.patch('/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setProfile(prev => ({
                    ...prev,
                    image: response.data.image
                }));
                setDp('');
                toast.success('Profile Updated');
                
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }



    };

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get('/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { name, email, phone, referalNumber, image, place, wallet } = response.data.user;

            setProfile({
                name,
                email,
                phone,
                referalNumber,
                image,
                place,
                wallet
            });

            setSpinner(false);
        } catch (error) {
            console.log(error);
        }
    };


    const editDetails = async (event) => {
        event.preventDefault();
        const errors = validateFormData();
        console.log(errors);
        if (Object.keys(errors).length === 0) {

        if (formData.email !== profile.email || formData.name !== profile.name || formData.place !== profile.place || formData.phone !== profile.phone) {
            setLoading(true);
            try {

                const response = await axiosInstance.patch('/profile', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    setProfile(prev => ({
                        ...prev,
                        name: formData.name,
                        email: formData.email,
                        place: formData.place,
                        phone: formData.phone
                    }));
                    setLoading(false);
                    setShowModal(false);
                    toast.success('Profile Updated');
                } else {
                    toast.error('Something went wrong');
                }

            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
            }
        }
         else {
            toast('Nothing to change')
        }
        } else if (Object.keys(errors).length === 4) {
            toast.error('Enter all fields')
        } else if (errors.name) {
            
            toast.error(errors.name)
        }
         else if (errors.email) {
            toast.error(errors.email)
        }
        else if (errors.phone) {
            toast.error(errors.phone)
        } else if (errors.place) {
            toast.error(errors.place)
        }


    }

    const editForm = () => {
        setFormData({
            name: profile?.name,
            place: profile?.place,
            email: profile?.email,
            phone: profile?.phone,
        });

        console.log(formData);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

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

    useEffect(() => {
        fetchProfile();

    }, []);



    return (
        <>
        {
            spinner ? 
            <Spinner/>
            :
                    <section className=" flex ml-6 ">
                        <div className="container py-5 ">


                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
                                <div className="col-span-1 ">
                                    <div className="bg-white rounded-md shadow-md mb-4 ">
                                        <div className="p-4 text-center">
                                            <div className="avatar">
                                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={imageSrc} alt="profile" />
                                                </div>
                                            </div>
                                            <h5 className="my-3">{profile.name}</h5>

                                            <div className="flex justify-center mb-2">
                                                <input type="file" onChange={handleFile} className="hidden" id="fileInput" accept="image/*" />
                                                <label htmlFor="fileInput" className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md mr-1 cursor-pointer">Change dp</label>
                                                <button onClick={() => setShowModal(true) || editForm()} type="button" className="border border-blue-500 text-blue-500 font-medium py-2 px-4 rounded-md">Edit Profile</button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-span-3">
                                    <div className="bg-white rounded-md shadow-md mb-4">
                                        <div className="p-4">
                                            <div className="flex items-center">
                                                <div className="w-1/3">
                                                    <p className="mb-0">Full Name</p>
                                                </div>
                                                <div className="w-2/3">
                                                    <p className="text-gray-500 mb-0">{profile?.name}</p>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="flex items-center">
                                                <div className="w-1/3">
                                                    <p className="mb-0">Email</p>
                                                </div>
                                                <div className="w-2/3">
                                                    <p className="text-gray-500 mb-0">{profile?.email}</p>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="flex items-center">
                                                <div className="w-1/3">
                                                    <p className="mb-0">Phone</p>
                                                </div>
                                                <div className="w-2/3">
                                                    <p className="text-gray-500 mb-0">{profile?.phone}</p>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="flex items-center">
                                                <div className="w-1/3">
                                                    <p className="mb-0">Referal Number</p>
                                                </div>
                                                <div className="w-2/3">
                                                    <p className="text-gray-500 mb-0">{profile?.referalNumber}</p>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="flex items-center">
                                                <div className="w-1/3">
                                                    <p className="mb-0">Wallet</p>
                                                </div>
                                                <div className="w-2/3">
                                                    {profile?.wallet === undefined ? (
                                                        <>
                                                            <p className="text-gray-500 mb-0">$ 0</p>


                                                        </>


                                                    ) : (
                                                        <p className="text-gray-500 mb-0"> $ {profile.wallet}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <hr className="my-4" />
                                            <div className="flex items-center">
                                                <div className="w-1/3">
                                                    <p className="mb-0">Place</p>
                                                </div>
                                                <div className="w-2/3">
                                                    {profile?.place === undefined ? (
                                                        <>
                                                            <p className="text-blue-500 font-semibold mb-0 hover:cursor-pointer" onClick={() => setShowModal(true) || editForm()}>Add place +</p>


                                                        </>


                                                    ) : (
                                                        <p className="text-gray-500 mb-0">{profile.place}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {showModal && (

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


                                                    <form onSubmit={editDetails} encType="multipart/form-data">

                                                        <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                            <input
                                                                type="text"
                                                                id="name" name="name" onChange={handleChange} value={formData?.name} placeholder={formData?.name}
                                                                className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                                            />


                                                        </div>

                                                        <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                            <input
                                                                type="text"
                                                                id="phone" name="phone" onChange={handleChange} value={formData.phone} placeholder={formData.phone}
                                                                className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                                            />


                                                        </div>
                                                        <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                            <input

                                                                id="email" name="email" type="email" onChange={handleChange} value={formData.email} placeholder={formData.email}
                                                                className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                                            />


                                                        </div>

                                                        <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                            <select
                                                                id="Place"
                                                                name="Place"
                                                                autoComplete="Place"
                                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                                                value={formData.place}
                                                                onChange={(e) =>
                                                                    setFormData({ ...formData, place: e.target.value })
                                                                }
                                                            >
                                                                <option value="" disabled hidden>
                                                                    {formData.place ? formData.place : "Select a place"}
                                                                </option>
                                                                {keralaDistricts.map((district) => (
                                                                    <option key={district} value={district}>
                                                                        {district}
                                                                    </option>
                                                                ))}
                                                            </select>



                                                        </div>


                                                        <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                                            <button
                                                                onClick={() => setShowModal(false)}
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
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-1">

                                <div className="bg-white rounded-md shadow-md">
                                    <div className="p-4">

                                        <Orders />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
        }
        </>
    );
};



export default Profile;