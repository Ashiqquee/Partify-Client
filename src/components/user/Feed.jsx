import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faComment } from '@fortawesome/free-solid-svg-icons'
import FavProvider from "../../components/user/FavProvider";
import useWidth from "../../utils/useWidthSize";

const Feed = () => {


    const [posts, setPosts] = useState([]);
    const width = useWidth()

    const fetchFeed = async() => {
        try {
            const response = await axiosInstance.get('/feed');
            console.log(response.data.post);
            setPosts(response.data.post)
        } catch (error) {
          console.log(error);  
        }
    }

    useEffect(() => {

        fetchFeed()

    },[])

    return(
        <section className="main w-screen  flex ">
            <div className={width > 1118 ? "wrapper px-4 w-5/6 " : "wrapper px-4 w-full" }>
                <div className="left-col ">
                    
                    <div className="post bg-white border border-gray-300 mt-8">
                        <div className="info flex justify-between items-center px-4">
                            <div className="user flex items-center">
                                <div className="profile-pic h-16 w-10">
                                    <div className="avatar">
                                        <div className="w-11 my-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <p className="username font-bold text-black text-sm ml-10">
                                    {posts[0]?.providerId?.name}
                                </p>
                            </div>
                            <img src="img/option.PNG" className="options" alt="" />
                        </div>
                        <div className="h-80 carousel carousel-vertical w-full">
                            <div className="carousel-item h-full">
                        <img
                            src={posts[0]?.postImages[0]}
                            className="post-image w-full h-80 object-cover"
                            alt=""
                        />
                        </div>
                            <div className="carousel-item h-full">
                                <img
                                    src={posts[0]?.postImages[1]}
                                    className="post-image w-full h-80 object-cover"
                                    alt=""
                                />
                            </div>
                        </div>

                        <div className="post-content px-4">
                            <div className="reaction-wrapper flex items-center mt-0">
                                <FontAwesomeIcon icon={faHeart} className="h-6" style={{ color: " #c1c8c9", }} />
                                <FontAwesomeIcon icon={faComment} className="h-6 ml-2" style={{ color: " #c1c8c9", }} />
                            </div>
                            <p className="likes font-bold">{posts[0]?.likes?.length || 0} Likes</p>
                            <p className="description mt-2 text-sm font-semibold leading-5">
                                <span className="font-bold">{posts[0]?.providerId?.name}</span> {posts[0]?.caption}
                            </p>
                            <p className="post-time text-sm text-gray-500">2 minutes ago</p>
                        </div>
                        <div className="comment-wrapper w-full h-12 mt-2 border-t border-gray-300 flex justify-between items-center">
                            <div className="avatar">
                                <div className="w-8 ml-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg" />
                                </div>
                            </div>
                            <input
                                type="text"
                                className="comment-box w-4/5 h-full border-none outline-none text-sm ml-2"
                                placeholder="Add a comment"
                            />
                            <button className="comment-btn w-16 h-full bg-transparent border-none outline-none capitalize text-blue-500 opacity-50 text-base">
                                post
                            </button>
                        </div>
                    </div>

                    
                    {/* +5 more post elements */}
                </div>
            </div>
            {
                width < 1118 ? null : (
                    <div className="wrapper px-4 w-2/4 ">
                        <FavProvider />
                    </div>
                )
            }
        </section>


    )
}

export default Feed;


