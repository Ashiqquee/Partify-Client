import FAQ from "../../components/user/FAQ";
import Sidebar from "../../components/user/Sidebar";



const FAQPage = () => {
    return(
        <>
        <Sidebar/>
            <div className="flex  md:ml-64  lg:ml-64 ">
                <FAQ/>
            </div>
        </>
    )
}

export default FAQPage;