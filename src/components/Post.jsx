
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

const Post = ({ posts, role }) => {
    const [showOptionIndex, setShowOptionIndex] = useState(null);
    const [showOption, setShowOption] = useState(false)

    const handleOptions = (index) => {
        if (showOption && showOptionIndex === index) {
            setShowOption(false);
        } else {
            setShowOption(true);
            setShowOptionIndex(index);
        }
    };


    return (
        <>
            {posts?.map((post, index) => (
                <div className="post bg-white border  border-gray-300 mt-8" key={index}>
                    <div className="info flex justify-between items-center px-4">
                        <div className="user flex items-center">
                            <div className="profile-pic h-16 w-10">
                                <div className="avatar">
                                    <div className="w-11 my-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={post.providerId?.profilePic} alt="" />

                                    </div>
                                </div>
                            </div>
                            <p className="username font-bold text-black text-sm ml-10 ">
                                {post.providerId?.name}
                            </p>

                        </div>
                        <div className="relative">
                       
                            <FontAwesomeIcon
                                icon={faEllipsisVertical}
                                onClick={() => handleOptions(index)}
                            />
                            <div className="absolute z-10 right-0 mt-2 w-40 bg-white rounded shadow-lg">
                                 
                                    {showOption && showOptionIndex === index ? 
                                    <>
                                        <ul className="py-2">
                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >
                                                Delete
                                            </li> <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" >
                                                Edit
                                            </li>
                                        </ul>
                                    </>
                                    : ''}
                            
                            </div>

                        </div>

                    </div>
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
                        <div className="reaction-wrapper flex items-center mt-0">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="h-6"
                                style={{ color: "#c1c8c9" }}
                            />
                            <FontAwesomeIcon
                                icon={faComment}
                                className="h-6 ml-2"
                                style={{ color: "#c1c8c9" }}
                            />
                        </div>
                        <p className="likes font-bold">
                            {post.likes?.length || 0} Likes
                        </p>
                        <p className="description mt-2 text-sm font-semibold leading-5">
                            <span className="font-bold">{post.providerId?.name}</span>{" "}
                            {post.caption}
                        </p>
                        <p className="post-time text-sm text-gray-500 mt-1 mb-2">
                            {post.createdAt ? new Date(post.createdAt).toDateString() : ""}
                        </p>
                    </div>
                    {
                        role === 'user' && (
                            <div className="comment-wrapper w-full h-12 mt-2 border-t border-gray-300 flex justify-between items-center">
                                <div className="avatar">
                                    <div className="w-8 ml-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src="https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg" alt="" />
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
                        )
                    }
                </div>
            ))}
        </>
    );
}

export default Post;