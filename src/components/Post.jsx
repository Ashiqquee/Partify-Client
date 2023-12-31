
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faEllipsisVertical, faTrash, faBookmark, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import axiosInstance from '../api/axios'
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'



const Post = ({ posts, onDeletePost, role, onUnlike, onLike, addComment, savedPosts, profile, onSavePost, onUnsavePost, removeSavedPost }) => {

    const [newComment, setNewComments] = useState('');
    const [showOptionIndex, setShowOptionIndex] = useState(null);
    const [showOption, setShowOption] = useState(false);
    const token = useSelector(state => state.provider.token);
    const userToken = useSelector(state => state.user.token);
    const userId = useSelector(state => state.user.id);
    console.log(userId);
    const navigate = useNavigate();
    const [confirmAction, setConfirmAction] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [liked, setLiked] = useState(false);
    const handleOptions = (index) => {
        if (showOption && showOptionIndex === index) {
            setShowOption(false);
        } else {
            setShowOption(true);
            setShowOptionIndex(index);
        }
    };

    const handleRemoveSavedPost = (id) => {
        console.log(id + ":idddd");
        removeSavedPost(id)
    }


    const handleDelete = async (postId) => {
        try {
            const response = await axiosInstance.delete(`/provider/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setShowOption(false);
                toast.success('Post Deleted');
                handlePostState(postId);
            }
        } catch (error) {
            console.log(error);
        }
    };




    const handleLike = async (postId) => {
        try {
            if (!userToken) return navigate('/login');
            setLiked(!liked)
            let like = 'yes';
            const response = await axiosInstance.patch(`/post/${postId}`, { like }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.status === 200) {
                onLike(postId)
            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleUnLike = async (postId) => {
        if (!userToken) return navigate('/login');
        setLiked(!liked)

        let like = 'no';
        const response = await axiosInstance.patch(`/post/${postId}`, { like }, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        if (response.status === 200) {
            onUnlike(postId)
        }

    }

    const handleConfirmation = () => {
        setConfirmAction(true);
    };

    const handlePostState = (postId) => {
        onDeletePost(postId);
    };



    const [formData, setFormData] = useState({
        _id: '',
        caption: '',
        tagline: '',
        file: []
    });
    const [loading, setLoading] = useState(false);




    const validateFormData = () => {
        const { caption, tagline, file } = formData;
        const errors = {};

        if (caption.trim().length < 1) {
            errors.phone = 'Caption needed';
        }

        if (tagline.trim().length < 1) {
            errors.password = 'add some tags';
        }

        if (file.length < 1) {
            errors.file = "Add atleast 1 image"
        }


        return errors;
    };

    // const handleEditPost = (postId) => {
    //     const post = posts?.find((post) => post._id === postId);
    //     setFormData({
    //         _id: post?._id,
    //         caption: post?.caption,
    //         tagline: post?.tagline,
    //         file: post?.postImages
    //     })
    // };


    const handleNewComment = (event) => {
        setNewComments(event.target.value);
    }

    const addNewComment = async (postId) => {
        if (!userToken) return navigate('/login');
        try {
            if (newComment.length < 1) return null;
            let comment = 'yes';
            const response = await axiosInstance.patch(`/post/${postId}`, { comment, content: newComment }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            addComment(response?.data?.updatedPost);
            setNewComments('');
            setSelectedPost(response?.data?.updatedPost)

        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validateFormData();

        if (Object.keys(errors).length === 0) {
            setLoading(true);
            try {
                const form = new FormData();
                form.append('caption', formData.caption)
                form.append('tagline', formData.tagline)
                formData.file.forEach((file) => {
                    form.append('file', file);
                });

                const response = await axiosInstance.post('/provider/post', form, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status === 200) {
                    setLoading(false);
                    navigate('/provider/profile');

                }
            } catch (error) {
                console.log(error);
            }
        } else if (Object.keys(errors).length === 3) {
            toast.error('Enter all fields')
        } else if (errors.caption) {
            toast.error(errors.caption)
        } else if (errors.tagline) {
            toast.error(errors.tagline)
        } else if (errors.file) {
            toast.error(errors.file)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));


    };

    const handleSavePost = async (postId) => {
        if (!userToken) return navigate('/login');

        try {

            const { data } = await axiosInstance.patch(`/savePost/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });


            onSavePost(data.likedPost)
        } catch (error) {
            console.log(error);
        }
    };

    const handleUnsavePost = async (postId) => {

        if (!userToken) return navigate('/login');

        try {
            const { data } = await axiosInstance.patch(`/unsavePost/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });

            if (onSavePost) {
                onUnsavePost(data.likedPost);

            }

        } catch (error) {
            console.log(error);
        }
    };

    const handleReport = async (postId) => {
        try {

            if(!userToken) return navigate('/login')

            const { status } = await axiosInstance.patch(`/report/${postId}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log(status);
            if (status === 200) {
                setShowOption(null)
                toast.warn('Post has been reported')
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handlePostClick = (postId) => {

        setSelectedPost(postId);
    };




    return (
        <>
            {posts?.map((post, index) => (
                <div className="post bg-white border  border-gray-300 mt-8 mb-8 " key={index}>
                    <div className="info flex justify-between items-center px-4 ">
                        <div className="user flex items-center hover:cursor-pointer " onClick={() => navigate(`/user/provider/${post?.providerId?._id}`)} >
                            <div className="profile-pic h-16 w-10">
                                <div className="avatar">
                                    <div className="w-11 my-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img 
                                        src={post?.providerId?.profilePic} alt="" />

                                    </div>
                                </div>
                            </div>
                            <div className="username flex  font-bold text-black text-sm ml-6 ">
                                <p  >{post.providerId?.name}</p>
                                {
                                    post?.providerId?.isUpgraded ?

                                        <p className="ml-2 tooltip hover:cursor-pointer" data-tip='verified badge'>
                                            <svg width="20" height="24" strokeWidth="1.5"
                                                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor">
                                                <path d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32435C18.7614 4.26934 19.7307 5.23857 19.6757 6.41554L19.6049 7.92905C19.5771 8.52388 19.8158 9.10016 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7307 18.7614 18.7614 19.7307 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10016 19.8158 8.52388 19.5771 7.92905 19.6049L6.41553 19.6757C5.23857 19.7307 4.26934 18.7614 4.32435 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10016 4.42288 8.52388 4.39508 7.92905L4.32435 6.41553C4.26934 5.23857 5.23857 4.26934 6.41554 4.32435L7.92905 4.39508C8.52388 4.42288 9.10016 4.18418 9.50111 3.74391L10.5213 2.62368Z"
                                                    stroke="#ffffff" strokeWidth="0"
                                                    id="mainIconPathAttribute" fill="blue">
                                                </path> <path d="M9 12L11 14L15 10"
                                                    stroke="#ffffff" strokeLinecap="round"
                                                    strokeLinejoin="round" id="mainIconPathAttribute"
                                                    fill="blue"></path> </svg>
                                        </p>

                                        : null
                                }
                            </div>

                        </div>
                        <div className="relative">

                            {role === 'provider' || role === 'user' ?
                                <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    onClick={() => handleOptions(index)}
                                /> : null}
                            <div className="absolute z-10 right-0 mt-2 w-40 bg-white rounded shadow-lg">

                                {showOption && showOptionIndex === index ?
                                    <>
                                        <ul className="py-2">
                                            {
                                                role === 'provider' ?
                                                    <>
                                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleConfirmation}  >
                                                            Delete
                                                        </li>
                                                        {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleEditPost(post?._id) || window.my_modal_2.showModal()}>
                                                            Edit
                                                        </li> */}
                                                    </> :
                                                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleReport(post._id)}  >
                                                        Report
                                                    </li>
                                            }
                                            <dialog id="my_modal_2" className="modal">
                                                <div method="dialog" className="modal-box">
                                                    <form className="flex justify-center p-4  w-full" onSubmit={handleSubmit}>
                                                        <div className="border-b border-gray-900/10 pb-12 ">
                                                            <h2 className="text-base font-black leading-7 text-gray-900">Add New Post</h2>
                                                            <p className="mt-1 text-sm leading-6 text-gray-600">Publishing new posts enhances your ability to attract and engage with users.</p>

                                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                <div className="col-span-full">
                                                                    <label htmlFor="about" className="block font-bold text-sm  leading-6 text-gray-900">Caption</label>
                                                                    <div className="mt-2">
                                                                        <textarea id="about" value={formData.caption} onChange={handleChange} name="caption" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                                                    </div>
                                                                    <p className="mt-3 text-sm leading-6 text-gray-600">Insights shared in the post</p>
                                                                </div>
                                                                <div className="col-span-full">
                                                                    <label htmlFor="about" className="block font-bold text-sm  leading-6 text-gray-900">Tagline</label>
                                                                    <div className="mt-2">
                                                                        <textarea id="about" placeholder="eg: #latest #new" name="tagline" value={formData.tagline} onChange={handleChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                                                    </div>
                                                                    <p className="mt-3 text-sm leading-6 text-gray-600">Write some Tagline.</p>
                                                                </div>




                                                                <div className="col-span-full">
                                                                    <label htmlFor="cover-photo" className="block text-sm font-bold leading-6 text-gray-900">Cover photo</label>
                                                                    <div className="mt-2 flex  rounded-lg border border-dashed border-gray-900/25 px-6 py-4">
                                                                        <div className="flex">
                                                                            {formData.file.length > 0 && (
                                                                                <ul className="flex list-none p-0">
                                                                                    {formData.file.map((file, index) => (
                                                                                        <li key={index} className="mr-4">
                                                                                            {typeof file === 'string' ? (
                                                                                                <img
                                                                                                    src={file}
                                                                                                    alt={`Image ${index + 1}`}
                                                                                                    className="w-24 h-28 mt-1"
                                                                                                />
                                                                                            ) : (
                                                                                                <img
                                                                                                    src={URL.createObjectURL(file)}
                                                                                                    alt={`Image ${index + 1}`}
                                                                                                    className="w-24 h-28 mt-1"
                                                                                                />
                                                                                            )}
                                                                                            <FontAwesomeIcon icon={faTrash}

                                                                                            />
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </div>
                                                                    </div>


                                                                </div>
                                                                {
                                                                    loading ? <button type="submit" className="loading loading-dots loading-md   font-medium text-center text-white bg-indigo-500
                                                                    rounded-lg transition duration-200 hover:bg-indigo-600 ease"></button>
                                                                        : <button type="submit" className="w-full btn-sm  font-medium text-center text-white bg-indigo-500
                                                                     rounded-lg transition duration-200 hover:bg-indigo-600 ease">Add</button>
                                                                }



                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                                <form method="dialog" className="modal-backdrop">
                                                    <button>close</button>
                                                </form>
                                            </dialog>

                                        </ul>
                                    </>
                                    : ''}

                            </div>

                        </div>

                    </div>
                    {confirmAction && (
                        toast.info(
                            <div>
                                <p>Are you sure you want to proceed?</p>
                                <button
                                    className="btn-sm bg-indigo-500 text-white rounded-md"
                                    onClick={() => handleDelete(post?._id)}
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
                    <div className="h-80  carousel carousel-vertical w-full">
                        {post?.postImages?.map((image, index) => {
                            return (
                                <div className="carousel-item h-full" key={index}>
                                    <img
                                        src={image}
                                        className="post-image w-full h-80 object-cover"
                                        alt=""
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="post-content px-4">
                        {role === 'user' ?
                            <div className="reaction-wrapper flex items-center mt-0">
                                <div className="flex justify-between  w-full">
                                    <div>
                                        {post?.likes?.includes(userId) ?
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                className={`h-6 text-indigo-500  `}
                                                onClick={() => handleUnLike(post?._id)}
                                            /> : <FontAwesomeIcon
                                                icon={faHeart}
                                                className={`h-6 text-gray-400`}
                                                onClick={() => handleLike(post?._id)}
                                            />
                                        }
                                        {selectedPost?._id === post?._id ? <FontAwesomeIcon
                                            icon={faComment}
                                            className="h-6   text-gray-400 ml-3"
                                            onClick={() => setSelectedPost(false)}

                                        /> : <FontAwesomeIcon
                                            icon={faComment}
                                            className="h-6   text-gray-400 ml-3"
                                            onClick={() => handlePostClick(post)}

                                        />}
                                    </div>
                                    <div>
                                        {
                                            savedPosts?.includes(post?._id) ?
                                                <FontAwesomeIcon icon={faBookmark} className="h-6 text-indigo-500"
                                                    onClick={() => handleRemoveSavedPost(post?._id) || handleUnsavePost(post?._id)}
                                                />
                                                : <FontAwesomeIcon icon={faBookmark} className="h-6 text-gray-400"

                                                    onClick={() => handleSavePost(post?._id)}

                                                />
                                        }
                                    </div>
                                </div>

                            </div> :

                            selectedPost ? <FontAwesomeIcon
                                icon={faComment}
                                className="h-6   text-gray-400"
                                onClick={() => setSelectedPost(false)}

                            /> : <FontAwesomeIcon
                                icon={faComment}
                                className="h-6   text-gray-400"
                                onClick={() => handlePostClick(post)}

                            />


                        }
                        <p className="likes font-bold">
                            {post.likes?.length || 0} Likes
                        </p>
                        <p className="description mt-2 text-sm font-semibold leading-5">
                            <span className="font-bold">{post.providerId?.name}</span>{" "}
                            {post.caption}
                        </p>
                        <div className="flex justify-between">
                            <p className="post-time text-sm text-gray-500 mt-1 mb-2">
                                {post.createdAt ? new Date(post.createdAt).toDateString() : ""}
                            </p>
                            {
                                selectedPost?._id === post?._id ?
                                    <p className="post-time text-md text-indigo-500 mb-2 hover:cursor-pointer">
                                        show more
                                    </p> : null
                            }

                        </div>
                    </div>
                    {
                        role === 'user' && selectedPost?._id !== post?._id && (
                            <div className="comment-wrapper w-full h-12 mt-2 border-t border-gray-300 flex justify-between items-center">
                                <div className="avatar">
                                    <div className="w-8 ml-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        {
                                            profile == '' || profile == undefined ?
                                                <img src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg" alt="" />
                                                : <img src={profile} alt="" />

                                        }
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    className="comment-box w-4/5 h-full border-none outline-none text-sm ml-2"
                                    placeholder="Add a comment"
                                    value={newComment}
                                    onChange={handleNewComment}
                                />
                                <button className="comment-btn w-16 h-full bg-transparent border-none outline-none capitalize text-blue-500  text-base" onClick={() => addNewComment(post?._id)}>
                                    post
                                </button>
                            </div>

                        )
                    }


                    {
                        selectedPost?._id === post?._id ?

                            selectedPost?.comments?.reverse()?.map((comment) => {
                                return (
                                    <div key={comment?._id} className="flex mb-3 mt-3   border-t-2">
                                        <a>
                                            <div className="avatar mt-2.5 pl-2">
                                                <div className="w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img src={comment?.userId?.image} />
                                                </div>
                                            </div>
                                        </a>
                                        <div>
                                            <div className="bg-light rounded-3 flex ">
                                                <p className=" mb-0 mt-1.5 ml-3 text-sm font-sans font-bold">
                                                    {comment?.userId?.name}
                                                </p>
                                                <p className="text-md d-block ml-1 mt-1 font-sans font-medium">

                                                    : {comment?.content}

                                                </p>

                                            </div>
                                            <p className="text-xs  ml-3">
                                                {new Date(comment?.createdAt).toDateString()}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                            : null
                    }


                </div>
            ))}
        </>
    );
}

export default Post;