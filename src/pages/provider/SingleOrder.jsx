import OrderDetails from "../../components/OrderDetails";
import Sidebar from "../../components/provider/Sidebar";
import { useSelector } from "react-redux";

const SingleOrder = () => {
    let token = useSelector(state => state.provider.token);

    return(
        <div className="bg-gray-100">
            <Sidebar />


            <div className="md:ml-64 lg:ml-64 ">

                <OrderDetails token={token}/>
            </div>
            \
        </div>
    )
}


export default SingleOrder;