import Post from "../../components/provider/Post";
import Sidebar from "../../components/provider/Sidebar";


const PostPage = () => {
    return (
        <>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">

                <Post />
            </div>
            \
        </>
    )
}

export default PostPage;