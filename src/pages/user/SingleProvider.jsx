import Footer from "../../components/Footer";
import Sidebar from "../../components/user/Sidebar";
import SinglePage from "../../components/user/SingleProvider";

const SingleProvider = () => {
    return (
        <>
            <Sidebar />
            <div className="flex md:ml-72 lg:ml-64 ">
                <SinglePage />
            </div>
            <div className="flex  md:ml-64  lg:ml-64 ">
                <Footer />
            </div>
        </>

    )
}

export default SingleProvider;
