import Sidebar from '../../components/user/Sidebar';
import ProviderBox from '../../components/user/ProviderBox';


const ProviderPage = () => {
    return(

        <>
            <Sidebar />
            <div className=" md:ml-64 lg:ml-72 ">
                
                <ProviderBox />
            </div>
        </>

    )
};

export default ProviderPage;