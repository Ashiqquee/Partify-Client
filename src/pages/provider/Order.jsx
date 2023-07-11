import OrderComponent from "../../components/provider/Order";
import Sidebar from "../../components/provider/Sidebar";


const Order = () => {
    return (
        <>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">

                <OrderComponent />
            </div>
            \
        </>
    )
}

export default Order;