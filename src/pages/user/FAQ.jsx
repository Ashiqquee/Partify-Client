import FAQ from "../../components/FAQ";
import Sidebar from "../../components/user/Sidebar";



const FAQPage = () => {
    return(
        <>
        <Sidebar/>
            <div className="flex  md:ml-72  lg:ml-96 ">
                <FAQ/>
            </div>
        </>
    )
}

export default FAQPage;