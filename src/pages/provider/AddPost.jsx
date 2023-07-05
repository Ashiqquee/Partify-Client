import AddPost from "../../components/provider/AddPost";
import Sidebar from "../../components/provider/Sidebar";


const AddNewPost = () => {
    return (
        <>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">

                <AddPost />
            </div>
            \
        </>
    )
}

export default AddNewPost;