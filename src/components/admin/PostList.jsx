import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';

const PostList = () => {
    const token = useSelector(state => state.admin.token);
    const [posts,setPosts] = useState([]);
    const [confirmAction, setConfirmAction] = useState(false);
    const [selectedPost, setSelectedPost] = useState([]);
    
    const setPost = (post) => {
        setSelectedPost(post);
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
    const handleConfirmation = () => {
        setConfirmAction(true);
    };


   const deletePost = async(postId) => {
       const response = await axiosInstance.delete(`/admin/posts/${postId}`, {
           headers: {
               Authorization: `Bearer ${token}`,

           }
       });
       setConfirmAction(false)
       if (response.status === 200) {
           toast.success('Deleted Successfully');
           setPosts(prevList => prevList.filter(post => post._id !== postId));
       }


    }


    useEffect(() => {
        fetchPosts();
    },[])


    return(
        <>

            <section className="container px-4 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Posts</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{posts?.length || 0}</span>
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
                                     posts?.map((post) => (
                                        <tr key={post._id}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-black">{post?.providerId.name}</h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                
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
                                                     </dialog>
                                              
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap" >
                                               
                                                 <button className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900" onClick={() => setPost(post) || window.my_modal_3.showModal()}>Caption</button>
                                                     <dialog id="my_modal_3" className="modal">
                                                         <form method="dialog" className="modal-box">
                                                             <button className="btn btn-sm btn-circle btn-ghost absolute">✕</button>
                                                             <h3 className="font-bold text-lg text-center ">Caption</h3>
                                                         {selectedPost  && (
                                                             <p className="py-4 font-sans font-bold">
                                                                 {selectedPost?.caption}
                                                             </p>

                                                         )}
                                                         </form>
                                                     </dialog>
                                               
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                 <button className="btn-sm  bg-indigo-500 text-white rounded-md hover:bg-indigo-900" onClick={() => setPost(post) || window.my_modal_5.showModal()}>Tagline</button>
                                                 <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                                     <form method="dialog" className="modal-box">
                                                         <h3 className="font-bold text-lg">Taglines</h3>
                                                         {selectedPost && (
                                                             <p className="py-4">{selectedPost?.tagline}</p>
                                                         )}
                                                         <div className="modal-action">
                                                            
                                                             <button className="btn btn-sm">Close</button>
                                                         </div>
                                                     </form>
                                                 </dialog>
                                            </td>
                                             <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                 <div>
                                                     <h2 className="font-medium text-black">{post?.reports?.length}</h2>
                                                 </div>
                                             </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                 <button className="btn-sm  bg-red-500 text-white rounded-md hover:bg-red-900" 
                                                     onClick={() => handleConfirmation(posts?._id)}
                                                
                                                 >Delete</button>
                                            </td>
                                             {confirmAction && (
                                                 toast.info(
                                                     <div>
                                                         <p>Are you sure you want to proceed?</p>
                                                         <button
                                                             className="btn-sm bg-indigo-500 text-white rounded-md"
                                                             onClick={() => deletePost(post._id)}
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