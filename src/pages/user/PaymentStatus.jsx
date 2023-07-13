import PaymentSuccess from "../../components/user/PaymentSuccess";
import Sidebar from "../../components/user/Sidebar";

const PaymentStatus = () => {
    return(
        <>
            <Sidebar />
            <div className="  md:ml-64  lg:ml-64">
                <PaymentSuccess/>

            </div>
        </>
    )
}

export default PaymentStatus;