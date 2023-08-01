import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const ReviewSection = ({ providerId }) => {

    const[reviews,setReviews] = useState([]);

    const fetchReview = async() => {
        try {
            const response = await  axiosInstance.get(`/review/${providerId}`);
            console.log(response?.data?.reviews);
            setReviews(response?.data?.reviews);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchReview()
    },[])

    return(
        <section className="py-24 2xl:py-44 bg-blueGray-100 rounded-t-10xl overflow-hidden 
        ">
            <div className="container px-4 mx-auto">


                <div className="w-full md:w-1/2 xl:w-1/5 px-2">

                </div>
                <p className="inline-block mb-14 text-3xl font-heading font-medium " >{reviews?.length} reviews</p>
               {
                reviews?.map(review => {
                    return(
                     
                            <div key={review?._id} className="mb-2 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
                                <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
                                    <div className="flex flex-wrap items-center">
                                    <div className="avatar">
                                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={review?.userId?.image} />
                                        </div>
                                    </div>
                                        <h4 className="w-full md:w-auto text-xl font-heading font-medium mt-3 sm:mt-0 sm:ml-2">{review?.userId?.name}</h4>
                                        <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
                                    <span className="mr-4 text-xl font-heading font-medium">{review?.rating}</span>
                                    <div className="rating rating-md">
                                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked={review?.rating === 1} />
                                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked={review?.rating === 2} />
                                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked={review?.rating === 3} />
                                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked={review?.rating === 4} />
                                        <input type="radio" name="rating-7" className="mask mask-star-2 bg-orange-400" checked={review?.rating === 5} />
                                    </div>


                                    </div>
                                </div>
                                <div className="px-4 overflow-hidden md:px-16 pt-8 pb-12 bg-white">
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-2/3 mb-6 md:mb-0">
                                            <p className="mb-8 max-w-2xl text-darkBlueGray-400 leading-loose">{review?.reviewContent}</p>
                                            <div className="-mb-2">
                                                <div className="inline-flex w-full md:w-auto md:mr-2 mb-2">

                                                </div>

                                            </div>
                                        </div>
                                        <div className="w-full md:w-1/3 text-right">
                                            <p className="mb-8 text-sm text-gray-300">{new Date(review?.createdAt).toDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                      
                    )
                })
               }


            </div>

        </section>
    )
}

export default ReviewSection;