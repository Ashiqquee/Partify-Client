import { useState } from "react";
import {useSelector} from 'react-redux'
import axiosInstance from '../../api/axios'
import {toast} from 'react-toastify'

const Review = ({ setShowReview, providerName,providerId }) => {
        
    const {token} = useSelector(state => state.user);

        const[formData,setFormData] = useState({
            rating:5,
            message:'',
        });

    const handleReview = (event) => {
        setFormData({...formData,message:event.target.value});
    }

    const handleRatingChange = (event) => {
        const selectedRating = parseInt(event.target.value);
        setFormData({...formData,rating:selectedRating});
    };

    const addReview = async() => {
        try {
            const response = await axiosInstance.post(`/review/${providerId}` , {formData},{
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            });

            if(response.status === 200){
                setShowReview(false)
                toast.success("Review Added")
            }


        } catch (error) {
            console.log(error);
        }
    }


    return (


        <div
            className="fixed inset-0 z-10 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
            >
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl -bg-gray-900 sm:my-8 sm:w-full sm:p-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col items-center justify-center mx-auto">
                        <h1 className="uppercase">Review <span className="uppercase text-indigo-500"> {providerName}</span> </h1>

                        <div className="rating rating-md mt-2">
                            <input type="radio" name="rating-7" value={1} onChange={handleRatingChange} className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-7" value={2} onChange={handleRatingChange} className="mask mask-star-2 bg-orange-400"  />
                            <input type="radio" name="rating-7" value={3} onChange={handleRatingChange} className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-7" value={4} onChange={handleRatingChange} className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-7" value={5} onChange={handleRatingChange} className="mask mask-star-2 bg-orange-400" />
                        </div>
                    </div>


                    <div className="flex items-center justify-center w-full mt-5 gap-x-2 ">
                        <div>
                            <label htmlFor="Description" className="block text-sm text-gray-500 -text-gray-300">Review</label>

                            <textarea placeholder="Enter your review.."
                            value={formData.message} onChange={handleReview}
                            className="block mt-2 w-full placeholder-gray-400/70 -placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 -border-gray-600 -bg-gray-900 -text-gray-300 -focus:border-blue-300"></textarea>

                           
                        </div>


                    </div>

                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                        <button
                            onClick={() => setShowReview(false)}
                            className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium -text-gray-200 -border-gray-700 -hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                        >
                            Cancel
                        </button>

                        <button
                            className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                            onClick={addReview}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
      
    )
}

export default Review;