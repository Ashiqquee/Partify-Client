import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
// import FavProvider from "../../components/user/FavProvider";
import PostComponent from '../Post'
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
                   
                    <PostComponent posts={posts} role={'user'}/>
                    
                 
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


