import Sidebar from "../../components/provider/Sidebar";
import ProfileComponent from "../../components/provider/Profile";

const Profile = () => {
    return (
        <div>
           

            <Sidebar />
            <div className="flex md:ml-64 lg:ml-64 ">

                <ProfileComponent />
            </div>

        </div>
    );
}

export default Profile;