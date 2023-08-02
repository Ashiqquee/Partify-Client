import Sidebar from "../../components/user/Sidebar";
import Profile from "../../components/user/Profile";
import Footer from "../../components/Footer";

const ProfilePage = () => {
    return(
       <>
            <Sidebar />
            <div className="flex md:ml-72 lg:ml-72 ">
            <Profile />
            </div>
            <div className="flex  md:ml-64  lg:ml-64 ">
                <Footer />
            </div>
       </>

    )
}

export default ProfilePage;
