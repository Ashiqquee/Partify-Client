import Sidebar from "../../components/admin/Sidebar";
import OrderList from "../../components/admin/OrderList";

const Order = () => {

    return (
        <div className='bg-gray-100 min-h-screen min-w-screen font-sans'>
            <Sidebar />


            <div className="flex md:ml-64 lg:ml-64 ">
                <OrderList />
            </div>
        </div>
    )

}

export default Order;