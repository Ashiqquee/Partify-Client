import Notification from "../../components/user/Notification";
import Sidebar from "../../components/user/Sidebar";

const More = () => {
    return(
        <>
            <Sidebar />
            <div className="flex  md:ml-64  lg:ml-64 ">
                <Notification />

            </div>
        </>
    )
}

export default More;