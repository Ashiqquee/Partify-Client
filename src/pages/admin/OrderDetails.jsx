import { useSelector } from "react-redux";
import Sidebar from "../../components/admin/Sidebar";
import OrderDetails from "../../components/OrderDetails";

const SingleOrder = () => {
    let token = useSelector(state => state.admin.token);

    return (
        <div className=' min-h-screen min-w-screen font-sans'>
            <Sidebar />


            <div className=" md:ml-64 lg:ml-64 ">
                <OrderDetails token={token} />
            </div>
        </div>
    )

}

export default SingleOrder;