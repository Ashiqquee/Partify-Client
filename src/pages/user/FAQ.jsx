import FAQ from "../../components/user/FAQ";
import Sidebar from "../../components/user/Sidebar";
import Footer from '../../components/Footer'


const FAQPage = () => {
    return(
        <>
        <Sidebar/>
            <div className="flex  md:ml-64  lg:ml-64 ">
                <FAQ/>
            </div>
            <div className="flex  md:ml-64  lg:ml-64 ">
                <Footer />
            </div>
        </>
    )
}

export default FAQPage;