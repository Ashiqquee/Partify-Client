import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const PostList = () => {
    const token = useSelector(state => state.admin.token);
    const [posts,setPosts] = useState([]);
    const[deleteId,setDeleteId] = useState([]);
    const [confirmAction, setConfirmAction] = useState(false);
    const [selectedPost, setSelectedPost] = useState([]);
    const [searchText, setSearchText] = useState('');
    const[imageOpen,setImageOpen] = useState(false);
    const [captionOpen, setCaptionOpen] = useState(false);
    const [tagOpen, setTagOpen] = useState(false);



    const setPost = (post,open) => {
        setSelectedPost(post);
        if (open === 'caption') return setCaptionOpen(true);
        if(open === 'tags') return setTagOpen(true);
        setImageOpen(true);
    }

    const fetchPosts = async() => {
        try {
            const response = await axiosInstance.get('/admin/posts', {
                headers: {
                    Authorization: `Bearer ${token}`,

                }
            });
            setPosts(response.data.post)
            
        } catch (error) {
            console.log(error);
        }
    };
    const handleConfirmation = (postId) => {
        setDeleteId(postId)
        setConfirmAction(true);
    };


   const deletePost = async() => {
       const response = await axiosInstance.delete(`/admin/posts/${deleteId}`, {
           headers: {
               Authorization: `Bearer ${token}`,

           }
       });
       setConfirmAction(false)
       if (response.status === 200) {
           toast.success('Deleted Successfully');
           setPosts(prevList => prevList.filter(post => post._id !== deleteId));
       }


    }


    useEffect(() => {
        fetchPosts();
    },[])


    return(
        <>

            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-start">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Posts</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{posts?.length || 0}</span>
                        </div>
                       
                    </div>
                    <div className="mt-6 w-64 ml-4">
                        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <input
                                type="search"
                                className="relative h-10 m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                placeholder="Search Post"
                                aria-label="Search"
                                aria-describedby="button-addon1"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />



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
                                                    <span>Provider</span>
                                                    <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                Post Images
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                caption
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Tags</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Reports</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Action</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody className=" divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 ">
                                        
                                     {
                                     posts?.length > 0 ? (
                                                posts?.filter((post) => post?.providerId.name.toLowerCase().includes(searchText)).map((post) => (
                                        <tr key={post._id}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-black">{post?.providerId.name}</h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
{/*                                                 
                                                 <button className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900" onClick={() => setPost(post)|| window.my_modal_2.showModal()}>Images</button>
                                                     <dialog id="my_modal_2" className="modal">
                                                         <form method="dialog" className="modal-box">
                                                             <h3 className="font-bold text-lg text-center ">Post Images</h3>
                                                             <div className="py-4 font-sans font-semibold">
                                                               
                                                             {selectedPost && selectedPost?.postImages?.length > 0  && (
                                                                 <div className="py-4 font-sans font-semibold">
                                                                     {selectedPost?.postImages?.map((images) => (
                                                                         <div key={images} className="flex justify-center">
                                                                             <img src={images} alt="postImages" className="w-64 h-36 mt-2" />
                                                                         </div>
                                                                     ))}
                                                                 </div>
                                                             )}
                                                             
                                                             </div>
                                                         </form>
                                                         <form method="dialog" className="modal-backdrop">
                                                             <button>close</button>
                                                         </form>
                                                     </dialog> */}
                                                            <button
                                                                onClick={() => setPost(post, 'image')}
                                                                className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                            >
                                                                Images
                                                            </button>

                                                            {imageOpen && (
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


                                                                                <div className="mt-2 ">
                                                                                    <h3 className="text-lg text-center font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                                                                        Images
                                                                                    </h3>
                                                                                    {selectedPost && selectedPost?.postImages?.length > 0 && (
                                                                                        <div className="py-4 font-sans font-semibold">
                                                                                            {selectedPost?.postImages?.map((images) => (
                                                                                                <div key={images} className="flex justify-center">
                                                                                                    <img src={images} alt="postImages" className="w-64 h-36 mt-2" />
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                            <div className="mt-5 sm:flex sm:items-center sm:justify-between">

                                                                                <div className="sm:flex sm:items-center ">
                                                                                    <button
                                                                                        onClick={() => setImageOpen(false)}
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
                                              
                                            </td>
                                            <td className="px-4 py-4 text-sm " >
                                                            <button
                                                                onClick={() => setPost(post, 'caption')}
                                                                className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                            >
                                                                Caption
                                                            </button>

                                                            {captionOpen && (
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
                                                                               

                                                                                <div className="mt-2 ">
                                                                                    <h3 className="text-lg text-center font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                                                                        Caption
                                                                                    </h3>
                                                                                    <p  className="p-4  text-clip overflow-hidden ">
                                                                                        {selectedPost?.caption}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="mt-5 sm:flex sm:items-center sm:justify-between">

                                                                                <div className="sm:flex sm:items-center ">
                                                                                    <button
                                                                                        onClick={() => setCaptionOpen(false)}
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
                                                 
                                               
                                            </td>
                                            <td className="px-4 py-4 text-sm ">
                                                            <button
                                                                onClick={() => setPost(post, 'tags')}
                                                                className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                                            >
                                                                Tags
                                                            </button>

                                                            {tagOpen && (
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


                                                                                <div className="mt-2 ">
                                                                                    <h3 className="text-lg text-center font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
                                                                                        Tags
                                                                                    </h3>
                                                                                    <p className="p-4  text-clip overflow-hidden ">
                                                                                        {selectedPost?.tagline}
                                                                                    </p>
                                                                                </div>
                                                                            </div>

                                                                            <div className="mt-5 sm:flex sm:items-center sm:justify-between">

                                                                                <div className="sm:flex sm:items-center ">
                                                                                    <button
                                                                                        onClick={() => setTagOpen(false)}
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
                                            </td>
                                             <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                 <div>
                                                     <h2 className="font-medium text-black">{post?.reports?.length}</h2>
                                                 </div>
                                             </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                 <button className="btn-sm  bg-red-500 text-white rounded-md hover:bg-red-900" 
                                                     onClick={() => handleConfirmation(post._id)}
                                                
                                                 >Delete</button>
                                            </td>
                                             {confirmAction && (
                                                 toast.info(
                                                     <div>
                                                         <p>Are you sure you want to proceed?</p>
                                                         <button
                                                             className="btn-sm bg-indigo-500 text-white rounded-md"
                                                             onClick={() => deletePost()}
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
                                        </tr>
                                        ))) : (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500" colSpan={3}>
                                                    No Posts found
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

export default PostList;