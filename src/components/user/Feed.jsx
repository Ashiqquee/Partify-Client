import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import PostComponent from '../Post'
import useWidth from "../../utils/useWidthSize";
import { useSelector } from "react-redux";
import Ad from "../../components/user/Ad";
import Spinner from "../Spinner";

const Feed = () => {

    const userId = useSelector(state => state.user.id);
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState([]);
    const width = useWidth();
    const { token } = useSelector(state => state.user)
    const [savedPosts, setSavedPosts] = useState([]);
    const [spinner, setSpinner] = useState(true);
    const fetchFeed = async () => {
        try {
            const response = await axiosInstance.get('/feed');
            setPosts(response.data.post);
            setSpinner(false);
        } catch (error) {
            console.log("error"+error);
        }
    }
    const onUnLike = (postId) => {


        const updatedPosts = posts.map(post => {
            if (post._id === postId) {

                const updatedLikes = post.likes.filter(id => id !== userId);
                return { ...post, likes: updatedLikes };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    const onLike = (postId) => {

        const updatedPosts = posts.map(post => {
            if (post._id === postId) {

                const updatedLikes = [...post.likes, userId];
                return { ...post, likes: updatedLikes };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    const addComment = (newPost) => {
        const indexToUpdate = posts.findIndex((post) => post?._id === newPost?._id);
        const updatedPosts = [...posts];
        updatedPosts[indexToUpdate] = newPost;
        setPosts(updatedPosts);
    }


    const userSavedPosts = async () => {
        try {
            if (!token) return setSavedPosts([]);

            const { data } = await axiosInstance.get('/details', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSavedPosts(data?.user?.likedPost);
            setProfile(data?.user?.image);
        } catch (error) {
            console.log(error);
        }
    };

    const onSavePost = (posts) => {
        setSavedPosts(posts);
    };

    const onUnsavePost = posts => {
        setSavedPosts(posts)
    }


    useEffect(() => {
        fetchFeed()
        userSavedPosts()

    }, [])

    return (
        <>
            {
                spinner ?
                    <Spinner/>
                    :
                    <section className="main w-screen  flex ">
                        <div className={width > 1100 ? "wrapper px-4 w-5/6 " : "wrapper px-4 w-full"}>
                            <div className="left-col ">
                
                                <PostComponent posts={posts} role={'user'} onUnlike={onUnLike} onLike={onLike} addComment={addComment} savedPosts={savedPosts} profile={profile} onSavePost={onSavePost} onUnsavePost={onUnsavePost} />


                            </div>
                        </div>
                        {
                            width < 1170 ? null : (
                                <div className="wrapper px-4 w-2/4 ">
                                    <Ad />
                                </div>
                            )
                        }
                    </section>
            }


        </>


    )
}

export default Feed;


