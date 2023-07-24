import { useEffect, useState } from "react";
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Select from 'react-select';
import PostComponent from '../Post'

const Profile = () => {
    const token = useSelector(state => state.provider.token);
    
    const[posts,setPosts] = useState([]);
    const [dp, setDp] = useState('');
    const [loading,setLoading] = useState(false)
    const [profile, setProfile] = useState({
        name: '',
        places: [],
        phone: '',
        services: [],
        place: '',
        profilePic:'',
        coverPic:'',
    });

    const deletePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    };

    const providerPosts = async() => {
        try {
          const response = await axiosInstance.get('/provider/post',{
              headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data',
              },
          })  ;
            
            
          setPosts(response.data.posts)
        } catch (error) {
            console.log(error);
        }
    }

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        phone: '',
        places: [],
        coverPic:'',

    });
    const [showModal, setShowModal] = useState(false);


    const imageSrc = dp ? URL.createObjectURL(dp) : (profile?.profilePic || 'https://cdn.icon-icons.com/icons2/3298/PNG/512/ui_user_profile_avatar_person_icon_208734.png');

    const handleFile = async (event) => {
        const file = event.target.files[0];
        setDp(file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('dp', "yes");


        try {
            const response = await axiosInstance.patch('/provider/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setProfile(prev => ({
                    ...prev,
                    profilePic: response.data.image
                }));

                setDp('');

                toast.success('Profile Updated');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setShowModal(false)
            toast.error('Something went wrong')
        }



    };

    const fetchProfile = async () => {
        try {
            const response = await axiosInstance.get('/provider/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { name, places, phone, services, profilePic,coverPic,description } = response.data.profile;

            setProfile({
                name,
                services,
                phone,
                description,
                coverPic,
                profilePic,
                places,
                
            });


        } catch (error) {
            console.log(error);
        }
    };


    const editDetails = async (event) => {
        event.preventDefault();

        if (formData?.name !== profile.name || !formData?.places?.every(place => profile?.places?.includes(place)) || formData?.phone !== profile?.phone || formData?.description !== profile?.description || formData?.coverPic !== profile?.coverPic) {
            try {
                setLoading(true);
                const editformData = new FormData();
                editformData.append('file', formData?.coverPic);
                editformData.append('name', formData?.name);
                editformData.append('phone', formData?.phone);
                editformData.append('description', formData?.description);
                editformData.append('places', formData?.places);
                
                const response = await axiosInstance.patch('/provider/profile', editformData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    setLoading(false);
                    setShowModal(false);
                    setProfile(prev => ({
                        ...prev,
                        name: formData.name,
                        places: formData.places,
                        description: formData.description,
                        phone: formData.phone,
                        coverPic:response?.data?.image
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
            places: profile?.places,
            description: profile?.description,
            phone: profile?.phone,
            coverPic:profile?.coverPic
        });

        console.log(formData);
    };

    const handleCoverPicChange = (event) => {
        const file = event.target.files[0]; 

        setFormData((prevFormData) => ({
            ...prevFormData,
            coverPic: file, 
        }));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const keralaDistricts = [
        "All Kerala",
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
        providerPosts()
    }, []);



    return (
        <section className=" flex ml-6 ">
            <div className="container py-5 ">


                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">
                    <div className="col-span-1 ">
                        <div className=" rounded-md  mb-4  " >
                          

                            <div className="p-4 text-cente h-48 rounded" style={{ backgroundImage: `url(${profile?.coverPic})`, backgroundSize: 'cover' }}>
                                <div className="avatar ">
                                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={imageSrc} alt="profile" />
                                    </div>
                                </div>

                                
                            </div>
                            <div className="flex justify-center mb-2 mt-1">
                                <input type="file" onChange={handleFile} className="hidden" id="fileInput" accept="image/*" />
                                <label htmlFor="fileInput" className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-md mr-1 cursor-pointer">Change dp</label>
                                <button onClick={() => setShowModal(true) || editForm()} type="button" className="border border-indigo-500 text-indigo-500 font-medium py-2 px-4 rounded-md">Edit Profile</button>
                            </div>
                        </div>

                    </div>
                    <div className="col-span-3">
                        <div className="bg-white rounded-md shadow-md mb-4">
                            <div className="p-4">
                                <div className="flex items-center">
                                    <div className="w-1/3">
                                        <p className="mb-0">Company Name</p>
                                    </div>
                                    <div className="w-2/3">
                                        <p className="text-gray-500 mb-0">{profile?.name}</p>
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
                                        <p className="mb-0">Description</p>
                                    </div>
                                    <div className="w-2/3">
                                        {profile?.description === undefined ? (
                                            <>
                                                <p className="text-blue-500 font-semibold mb-0 hover:cursor-pointer" onClick={() => setShowModal(true) || editForm()}>Add description +</p>


                                            </>


                                        ) : (
                                            <p className="text-gray-500 mb-0">{profile?.description}</p>
                                        )}
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <div className="flex items-center">
                                    <div className="w-1/3">
                                        <p className="mb-0">Places</p>
                                    </div>
                                    <div className="w-2/3">
                                        <p className="text-gray-500 mb-0">{profile?.places?.map((place,index) => <span key={index}> {place } ,</span> )}</p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                               
                                <div className="flex items-center">
                                    <div className="w-1/3">
                                        <p className="mb-0">Services</p>
                                    </div>
                                    <div className="w-2/3">
                                        <p className="text-gray-500 mb-0">{profile?.services?.map((service) => <span key={service?._id}> {service.serviceName} ,</span>)}</p>

                                    </div>
                                </div>
                          
                            </div>
                        </div>
                        {showModal && (
                            // <dialog id="my_modal_3" className="modal">

                            //     <form method="dialog" onSubmit={editDetails} className="modal-box flex justify-center  w-full">
                            //         <p className=" btn-ghost absolute right-2 top-2 hover:cursor-pointer" onClick={() => closeModal()}>✕</p>

                            //         <div className="border-b border-gray-900/10 pb-12">
                            //             <h2 className="text-base font-bold leading-7 text-gray-900">Edit Company Information</h2>
                            //             <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent phone where you can receive updates.</p>

                            //             <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                            //                 <div className="sm:col-span-4">
                            //                     <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                            //                     <div className="mt-2">
                            //                         <input type="text" name="name" onChange={handleChange} value={formData?.name} placeholder={formData?.name} id="name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            //                     </div>
                            //                 </div>

                            //                 <div className="sm:col-span-4">
                            //                     <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            //                     <div className="mt-2">
                            //                         <textarea
                            //                             id="description"
                            //                             name="description"
                            //                             onChange={handleChange}
                            //                             value={formData?.description || ''}
                            //                             placeholder={formData?.description || ''}
                            //                             autoComplete="description"
                            //                             rows="4" 
                            //                             className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            //                         ></textarea>
                            //                     </div>
                            //                 </div>

                            //                 <div className="sm:col-span-4">
                            //                     <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                            //                     <div className="mt-2">
                            //                         <input id="phone" name="phone" type="text" onChange={handleChange} value={formData.phone} placeholder={formData.phone} autoComplete="phone" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            //                     </div>
                            //                 </div>

                            //                 <div className="sm:col-span-3">
                            //                     <label htmlFor="Place" className="block text-sm font-medium leading-6 text-gray-900">Place</label>
                            //                     <div className="mt-2">
                            //                         <Select
                            //                         isMulti
                            //                             name="places"
                            //                             options={keralaDistricts.map(place => ({
                            //                                 value: place,
                            //                                 label: place
                            //                             }))}
                            //                             value={formData?.places?.map(place => ({
                            //                                 value: place,
                            //                                 label: place
                            //                             }))}
                            //                             onChange={selectedOptions => {
                            //                                 const selectedDistrict = selectedOptions.map(option => option.value);
                            //                                 if (selectedDistrict.includes('All Kerala')) {
                            //                                     if (selectedDistrict.length > 1) {
                            //                                         toast.warn('Already Selected All Kerala');
                            //                                     }
                            //                                     setFormData(prevFormData => ({
                            //                                         ...prevFormData,
                            //                                         places: ['All Kerala']
                            //                                     }));
                            //                                 } else {
                            //                                     setFormData(prevFormData => ({
                            //                                         ...prevFormData,
                            //                                         places: selectedDistrict.filter(place => place !== 'All Kerala')
                            //                                     }));
                            //                                 }
                            //                             }}
                            //                         />

                            //                     </div>
                            //                 </div>


                            //                 <div className="sm:col-span-4">
                            //                     <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Cover Pic</label>
                            //                     <div className="mt-2">
                            //                         <input id="coverPic"
                            //                             name="coverPic"
                            //                             type="file"
                            //                             onChange={handleCoverPicChange} className="file-input file-input-sm w-full max-w-xs" />
                            //                     </div>
                            //                 </div>
                            //                 <div className="sm:col-span-4">
                            //                 {formData.coverPic && (
                            //                         <img
                            //                             src={(typeof formData.coverPic === 'string' && formData.coverPic.startsWith('https:')) ? formData.coverPic : URL.createObjectURL(formData.coverPic)}
                            //                             className="w-16 h-16"
                            //                             alt="Selected Cover Image"
                            //                         />

                            //                 )}
                            //                 </div>
                            //             </div>
                            //             <button onClick={closeModal} type="submit" className="bg-blue-500 mt-4 text-white font-medium py-2 px-4 rounded-md mr-1 cursor-pointer mb-3">Submit</button>

                            //         </div>
                            //     </form>
                            // </dialog>
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
                                            {formData.coverPic &&  (
                                                <img className=" rounded-lg w-64 h-48" src={(typeof formData.coverPic === 'string' && formData.coverPic.startsWith('https:')) ? formData.coverPic : URL.createObjectURL(formData.coverPic)} alt="Selected" />
                                            )}
                                        </div>

                                        <form onSubmit={editDetails} encType="multipart/form-data">

                                            <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                <input
                                                    type="text"
                                                    id="name" name="name" onChange={handleChange} value={formData?.name} placeholder={formData?.name} 
                                                    className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                                />


                                            </div>
                                            <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                <Select
                                                    isMulti
                                                        name="places"
                                                        options={keralaDistricts.map(place => ({
                                                            value: place,
                                                            label: place
                                                        }))}
                                                        value={formData?.places?.map(place => ({
                                                            value: place,
                                                            label: place
                                                        }))}
                                                        onChange={selectedOptions => {
                                                            const selectedDistrict = selectedOptions.map(option => option.value);
                                                            if (selectedDistrict.includes('All Kerala')) {
                                                                if (selectedDistrict.length > 1) {
                                                                    toast.warn('Already Selected All Kerala');
                                                                }
                                                                setFormData(prevFormData => ({
                                                                    ...prevFormData,
                                                                    places: ['All Kerala']
                                                                }));
                                                            } else {
                                                                setFormData(prevFormData => ({
                                                                    ...prevFormData,
                                                                    places: selectedDistrict.filter(place => place !== 'All Kerala')
                                                                }));
                                                            }
                                                        }}
                                                    />

                                            </div>
                                            <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                <input
                                                    type="text"
                                                    id="phone" name="phone"  onChange={handleChange} value={formData.phone} placeholder={formData.phone}
                                                    className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                                />


                                            </div>
                                            {/* <div className="flex items-center justify-between w-full mt-5 gap-x-2">
                                                <textarea
                                                    type="text"
                                                    id="description" name="description" onChange={handleChange}
                                                      value={formData?.description || ''}
                                                     placeholder={formData?.description || ''}
                                                    
                                                ></textarea>


                                            </div> */}
                                            <div>
                                                <label htmlFor="Description" className="block text-sm text-gray-500 dark:text-gray-300">Description</label>

                                                <textarea className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                                                    id="description" name="description" onChange={handleChange}
                                                    value={formData?.description || ''}
                                                    placeholder={formData?.description || ''}
                                                ></textarea>

                                                
                                            </div>
                                            <div>
                                                <label htmlFor="image" className="block text-sm text-gray-500 dark:text-gray-300 mt-4">Cover Pic</label>

                                                <input type="file" onChange={handleCoverPicChange} name="file" className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300" />
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

                    <div className="bg-white rounded-md shadow-md lg:w-3/4">
                        <div className="p-4  ">
                            <p className="mb-4">
                                <span className="text-indigo-500 italic font-medium mr-1">Latest</span> posts
                            </p>
                            <PostComponent posts={posts} role={'provider'} onDeletePost={deletePost} />    
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


 export default Profile;