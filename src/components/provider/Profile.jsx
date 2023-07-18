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
            console.log(response.data.posts);
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
    const [showModal, setShowModal] = useState(true);

    const closeModal = () => {
        let close = setTimeout(() => {
            setShowModal(false);
            clearTimeout(close);
        }, 10);

        let show = setTimeout(() => {
            setShowModal(true);
            clearTimeout(show);
        }, 20);
    };

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
                          

                            <div className="p-4 text-cente h-48" style={{ backgroundImage: `url(${profile?.coverPic})`, backgroundSize: 'cover' }}>
                                <div className="avatar ">
                                    <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={imageSrc} alt="profile" />
                                    </div>
                                </div>

                                
                            </div>
                            <div className="flex justify-center mb-2 mt-1">
                                <input type="file" onChange={handleFile} className="hidden" id="fileInput" accept="image/*" />
                                <label htmlFor="fileInput" className="bg-indigo-500 text-white font-medium py-2 px-4 rounded-md mr-1 cursor-pointer">Change dp</label>
                                <button onClick={() => window.my_modal_3.showModal() || editForm()} type="button" className="border border-indigo-500 text-indigo-500 font-medium py-2 px-4 rounded-md">Edit Profile</button>
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
                                                <p className="text-blue-500 font-semibold mb-0 hover:cursor-pointer" onClick={() => window.my_modal_3.showModal() || editForm()}>Add description +</p>


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
                            <dialog id="my_modal_3" className="modal">

                                <form method="dialog" onSubmit={editDetails} className="modal-box flex justify-center  w-full">
                                    <p className=" btn-ghost absolute right-2 top-2 hover:cursor-pointer" onClick={() => closeModal()}>✕</p>

                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-bold leading-7 text-gray-900">Edit Company Information</h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent phone where you can receive updates.</p>

                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                            <div className="sm:col-span-4">
                                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Full name</label>
                                                <div className="mt-2">
                                                    <input type="text" name="name" onChange={handleChange} value={formData?.name} placeholder={formData?.name} id="name" autoComplete="family-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                                <div className="mt-2">
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        onChange={handleChange}
                                                        value={formData?.description || ''}
                                                        placeholder={formData?.description || ''}
                                                        autoComplete="description"
                                                        rows="4" 
                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                    ></textarea>
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
                                            </div>


                                            <div className="sm:col-span-4">
                                                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Cover Pic</label>
                                                <div className="mt-2">
                                                    <input id="coverPic"
                                                        name="coverPic"
                                                        type="file"
                                                        onChange={handleCoverPicChange} className="file-input file-input-sm w-full max-w-xs" />
                                                </div>
                                            </div>
                                            <div className="sm:col-span-4">
                                            {formData.coverPic && (
                                                    <img
                                                        src={(typeof formData.coverPic === 'string' && formData.coverPic.startsWith('https:')) ? formData.coverPic : URL.createObjectURL(formData.coverPic)}
                                                        className="w-16 h-16"
                                                        alt="Selected Cover Image"
                                                    />

                                            )}
                                            </div>
                                        </div>
                                        <button onClick={closeModal} type="submit" className="bg-blue-500 mt-4 text-white font-medium py-2 px-4 rounded-md mr-1 cursor-pointer mb-3">Submit</button>

                                    </div>
                                </form>
                            </dialog>
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