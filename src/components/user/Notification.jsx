import { useEffect, useState } from 'react';
import Post from '../Post'
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/axios';
import Spinner from '../Spinner';

const Notification = () => {
    const [posts,setPosts] = useState([]);
    const {token} = useSelector(state => state.user);
    const [notification,setNotification] = useState([])
    const[savedPosts,setSavedPosts] = useState([]);
    const[spinner,setSpinner] = useState(true)
    const fetchFavPosts = async() => {
        try {
            const response = await axiosInstance.get('/favPosts',{
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });
            const postId = response?.data?.posts?.map((post) => post._id);
            setNotification(response?.data?.notification)
            setSavedPosts(postId);
            setPosts(response?.data?.posts);
            setSpinner(false);
        } catch (error) {
            console.log(error);
        }
    };

    const removeSavedPost = (id) => {
        const updatedPosts = posts.filter(post => post._id !== id);
        setPosts(updatedPosts)
    }

    useEffect(() => {
        fetchFavPosts();
    },[])

    return(
        <>
        {
            spinner ? 
            <Spinner/>
            :
                    <section className="grid grid-cols-1 gap-8 px-6 xl:grid-cols-3 2xl:grid-cols-3 md:grid-cols-1 w-full">


                        <div className={`flex flex-col justify-center  md:px-8 md:py-6 bg-white rounded-lg ${posts.length > 0 ? 'shadow-md shadow-gray-200 ' : 'h-full mt-20 shadow-md shadow-gray-200'} md:col-span-2 md:row-span-2 gap-y-4 gap-x-8`}>

                            <h1 className={`font-medium uppercase font-sans ${posts.length > 0 ? '' : '-mt-36'}`}>Saved Posts</h1>

                            {
                                posts.length > 0 ?
                                    <Post role='user' posts={posts} savedPosts={savedPosts} removeSavedPost={removeSavedPost} />

                                    :
                                    <div className="post bg-white  mt-8 mb-8  " >
                                        <div className="info flex justify-center items-center px-4">
                                            <h1 className='my-2 font-sans font-semibold'>You dont have any saved posts,<span className='font-bold text-indigo-500 hover:cursor-pointer ml-2'>Head back to the base</span> </h1>
                                        </div>
                                    </div>
                            }

                        </div>


                        <div className="flex flex-col py-8 pl-6 pr-2  bg-white flex-shrink-0 w-full ">
                            <h1 className='font-bold'>Notifications</h1>

                            <div className='flex   items-cente border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg h-full     '>

                                <div>

                                    {
                                        notification.length > 0 ?
                                            notification.map(noti => {
                                                return (
                                                    <div key={noti?._id} className="w-full p-3 mt-8 bg-white rounded flex">
                                                        <div tabIndex="0" aria-label="heart icon" role="img" className="focus:outline-none w-8 h-8 border rounded-full border-gray-200 flex items-center justify-center">
                                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4.30325 12.6667L1.33325 15V2.66667C1.33325 2.48986 1.40349 2.32029 1.52851 2.19526C1.65354 2.07024 1.82311 2 1.99992 2H13.9999C14.1767 2 14.3463 2.07024 14.4713 2.19526C14.5963 2.32029 14.6666 2.48986 14.6666 2.66667V12C14.6666 12.1768 14.5963 12.3464 14.4713 12.4714C14.3463 12.5964 14.1767 12.6667 13.9999 12.6667H4.30325ZM5.33325 6.66667V8H10.6666V6.66667H5.33325Z" fill="#4338CA" />
                                                            </svg>
                                                        </div>
                                                        <div className="pl-3">
                                                            <p tabIndex="0" className="focus:outline-none text-sm leading-none">
                                                                <span className="text-indigo-700">{noti?.from} </span>: {noti?.content}
                                                            </p>
                                                            <p tabIndex="0" className="focus:outline-none text-xs leading-3 pt-1 text-gray-500"> {new Date(noti?.sendedAt).toDateString()} </p>
                                                        </div>
                                                    </div>
                                                )
                                            }) : <div>
                                                <p>No Notifications.</p>
                                            </div>
                                    }

                                </div>




                            </div>


                        </div>

                    </section>

        }

        </>
    )

}

export default Notification;