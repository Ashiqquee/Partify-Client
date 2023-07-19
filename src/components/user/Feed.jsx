import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
// import FavProvider from "../../components/user/FavProvider";
import PostComponent from '../Post'
import useWidth from "../../utils/useWidthSize";
import { useSelector } from "react-redux";

const Feed = () => {

    const userId = useSelector(state => state.user.id);
    const [posts, setPosts] = useState([]);
    const width = useWidth()

    const fetchFeed = async() => {
        try {
            const response = await axiosInstance.get('/feed');
            
            setPosts(response.data.post)
        } catch (error) {
          console.log(error);  
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

    useEffect(() => {

        fetchFeed()

    },[])

    return(
        <section className="main w-screen  flex ">
            <div className={width > 1118 ? "wrapper px-4 w-5/6 " : "wrapper px-4 w-full" }>
                <div className="left-col ">
                   
                    <PostComponent posts={posts} role={'user'} onUnlike={onUnLike} onLike={onLike} addComment={addComment}/>
                    
                 
                </div>
            </div>
            {
                width < 1118 ? null : (
                    <div className="wrapper px-4 w-2/4 ">
                        {/* <FavProvider /> */}
                    </div>
                )
            }
        </section>


    )
}

export default Feed;


