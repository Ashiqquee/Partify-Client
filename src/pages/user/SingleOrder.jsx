import Sidebar from "../../components/user/Sidebar";
import OrderDetails from "../../components/OrderDetails";
import { useSelector } from "react-redux";

const SingleOrder = () => {

    let token = useSelector(state => state.user.token);
    return (
        <>
            <Sidebar />
            <div className="  md:ml-64  lg:ml-64">
                <OrderDetails token={token}/>

            </div>
        </>
    )
}

export default SingleOrder;