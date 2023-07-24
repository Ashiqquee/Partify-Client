import Sidebar from "../../components/admin/Sidebar";
import AdsList from "../../components/admin/AdsList";

const Ads = () => {

    return (
        <div className='bg-gray-100 min-h-screen min-w-screen font-sans overflow-hidden'>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                <AdsList />
            </div>
        </div>
    )

}

export default Ads;