import PaymentSuccess from "../../components/user/PaymentSuccess";
import Sidebar from "../../components/user/Sidebar";
import Footer from "../../components/Footer";

const PaymentStatus = () => {
    return(
        <>
            <Sidebar />
            <div className="  md:ml-64  lg:ml-64">
                <PaymentSuccess/>

            </div>
            <div className="flex  md:ml-64  lg:ml-64 ">
                <Footer />
            </div>
        </>
    )
}

export default PaymentStatus;