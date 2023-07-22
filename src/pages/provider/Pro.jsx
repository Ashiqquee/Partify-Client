import Pricing from "../../components/provider/Pricing";
import Sidebar from "../../components/provider/Sidebar";


const Pro = () => {
    return (
        <>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">

                <Pricing />
            </div>

        </>
    )
}

export default Pro;