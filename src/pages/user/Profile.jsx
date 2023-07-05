import Sidebar from "../../components/user/Sidebar";
import Profile from "../../components/user/Profile";

const ProfilePage = () => {
    return(
       <>
            <Sidebar />
            <div className="flex md:ml-72 lg:ml-72 ">
            <Profile />
            </div>
       </>

    )
}

export default ProfilePage;
