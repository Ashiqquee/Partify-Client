import { useEffect, useState } from "react";
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const Profile = () => {

    const token = useSelector(state => state.user.token);

    const [dp, setDp] = useState('');
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
    const [showModal, setShowModal] = useState(true);

    const closeModal = () => {
        let close = setTimeout(() => {
            setShowModal(false);
            clearTimeout(close);
        }, 50);

        let show = setTimeout(() => {
            setShowModal(true);
            clearTimeout(show);
        }, 100);
    };

    const imageSrc = dp ? URL.createObjectURL(dp) : (profile?.image || 'https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg');

    const handleFile = async (event) => {
        const file = event.target.files[0];
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


        } catch (error) {
            console.log(error);
        }
    };


    const editDetails = async (event) => {
        event.preventDefault();

        if (formData.email !== profile.email || formData.name !== profile.name || formData.place !== profile.place || formData.phone !== profile.phone) {
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
                    toast.success('Profile Updated');
                } else {
                    toast.error('Something went wrong');
                }

            } catch (error) {
                console.log(error);
                toast.error('Something went wrong');
            }
        } else {
            toast('Nothing to change')
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
                                    <input type="file" onChange={handleFile} className="hidden" id="fileInput" />
                                    <label htmlFor="fileInput" className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md mr-1 cursor-pointer">Change dp</label>
                                    <button onClick={() => window.my_modal_3.showModal() || editForm()} type="button" className="border border-blue-500 text-blue-500 font-medium py-2 px-4 rounded-md">Edit Profile</button>
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
                                                <p className="text-blue-500 font-semibold mb-0 hover:cursor-pointer" onClick={() => window.my_modal_3.showModal() || editForm()}>Add place +</p>


                                            </>


                                        ) : (
                                            <p className="text-gray-500 mb-0">{profile.place}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {showModal && (
                            <dialog id="my_modal_3" className="modal">

                                <form method="dialog" onSubmit={editDetails} className="modal-box flex justify-center">
                                    <p className=" btn-ghost absolute right-2 top-2 hover:cursor-pointer" onClick={() => closeModal()}>✕</p>

                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-bold leading-7 text-gray-900">Edit Personal Information</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent phone where you can receive updates.</p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                            <div className="sm:col-span-4">
                                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                                                <div className="mt-2">
                                                    <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder={formData.name} id="name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                                <div className="mt-2">
                                                    <input id="email" name="email" type="email" onChange={handleChange} value={formData.email} placeholder={formData.email} autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                                <div className="mt-2">
                                                    <input id="phone" name="phone" type="text" onChange={handleChange} value={formData.phone} placeholder={formData.phone} autoComplete="phone" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="Place" className="block text-sm font-medium leading-6 text-gray-900">Place</label>
                                                <div className="mt-2">
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
                                            </div>





                                        </div>
                                        <button onClick={closeModal} type="submit" className="bg-blue-500 mt-4 text-white font-medium py-2 px-4 rounded-md mr-1 cursor-pointer">Submit</button>

                                    </div>
                                </form>
                            </dialog>
                        )}
                    </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-1">

                    <div className="bg-white rounded-md shadow-md">
                        <div className="p-4">
                            <p className="mb-4">
                                <span className="text-blue-500 italic font-medium mr-1">Latest</span> Orders
                            </p>
                            <h1>You haven't placed any order yet.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



export default Profile;