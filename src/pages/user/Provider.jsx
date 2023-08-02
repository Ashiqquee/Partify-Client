import Sidebar from '../../components/user/Sidebar';
import ProviderBox from '../../components/user/ProviderBox';
import Footer from '../../components/Footer';


const ProviderPage = () => {
    return(

        <>
            <Sidebar />
            <div className=" md:ml-64 lg:ml-72 ">
                
                <ProviderBox />
            </div>
            {/* <div className="flex  md:ml-64  lg:ml-64 ">
                <Footer />
            </div> */}
        </>

    )
};

export default ProviderPage;