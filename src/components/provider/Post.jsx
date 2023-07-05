import axiosInstance from '../../api/axios';
import { useSelector } from "react-redux";
import { useEffect, useState } from 'react';

const Post = () => {
    const token = useSelector(state => state.provider.token);
    const [post, setPost] = useState([]);

    const fetchPost = async () => {
        try {
            const response = await axiosInstance.get('/provider/post', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data.post);
            setPost(response.data.post);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            {/* Post Header */}
            <div className="flex items-center mb-4">
                <img
                    src={post[0]?.providerId?.profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                    <h4 className="font-semibold">{post[0]?.providerId?.name}</h4>
                    <p className="text-gray-500 text-sm">{post[0]?.tagline}</p>
                </div>
            </div>

            {/* Post Images */}
            <div className="grid grid-cols-3 gap-2">
                {post[0]?.postImages?.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Post Image ${index + 1}`}
                        className="rounded-md object-cover"
                    />
                ))}
            </div>

            {/* Caption */}
            <div className="mt-4">
                <p>{post.caption}</p>
            </div>
        </div>
    );
};

export default Post;
