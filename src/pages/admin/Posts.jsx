import Sidebar from "../../components/admin/Sidebar";
import PostList from "../../components/admin/PostList";

const Provider = () => {
    return (
        <div className='bg-gray-100 h-full min-h-screen min-w-screen font-sans overflow-x-hidden'>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                <PostList />
            </div>
        </div>
    )
}

export default Provider;