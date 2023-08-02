import Notification from "../../components/user/Notification";
import Sidebar from "../../components/user/Sidebar";

const More = () => {
    return(
        <div className="bg-gray-100 ">
            <Sidebar />
            <div className="flex  md:ml-64  lg:ml-64  mt-3">
                <Notification />

            </div>
        </div>
    )
}

export default More;