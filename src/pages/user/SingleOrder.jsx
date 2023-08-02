import Sidebar from "../../components/user/Sidebar";
import OrderDetails from "../../components/OrderDetails";
import { useSelector } from "react-redux";

const SingleOrder = () => {

    let token = useSelector(state => state.user.token);
    return (
        < div className="bg-gray-100">
            <Sidebar />
            <div className="  md:ml-64  lg:ml-64">
                <OrderDetails token={token}/>

            </div>
        </div>
    )
}

export default SingleOrder;