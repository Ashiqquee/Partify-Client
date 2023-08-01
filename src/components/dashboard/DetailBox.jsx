
import { faBagShopping, faMoneyBillTrendUp, faUser, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DetailBox = ({ details, role }) => {

    return (
        <>
            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                <div className="flex items-center -mx-2">
                    <FontAwesomeIcon icon={faUser} className=' h-8 text-indigo-400 font-semibold' />


                    <div className="mx-2">
                        <h3 className="text-2xl font-medium text-gray-800 ml-2">{role === 'admin' ? details?.totalUsers : details?.interaction}</h3>
                        <p className="mt-1 font-sans text-sm text-gray-500 ml-2 font-semibold">{role === 'admin' ? 'Users' : 'User Interactions'}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                <div className="flex items-center -mx-2">
                    {role === 'admin' ?
                        <>
                            <FontAwesomeIcon icon={faUserSecret} className=' h-8 text-indigo-400' />
                            <div className="mx-2">
                                <h3 className="text-2xl font-medium text-gray-800 ml-2">{details.totalProviders}</h3>
                                <p className="mt-1 text-sm text-gray-500 ml-2">Providers</p>
                            </div>

                        </> :
                        <>
                            <FontAwesomeIcon icon={faMoneyBillTrendUp} className=' h-8 text-indigo-400' />
                            <div className="mx-2">
                                <h3 className="text-2xl font-medium text-gray-800 ml-2">{details.totalProviders || 0} </h3>
                                <p className="mt-1 text-sm text-gray-500 ml-2 font-semibold">Revenue</p>
                            </div>
                        </>
                    }

                    
                </div>
            </div>


            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                <div className="flex items-center -mx-2">
                    <FontAwesomeIcon icon={faBagShopping} className=' h-8 text-indigo-400' />

                    <div className="mx-2">
                        <h3 className="text-2xl font-medium text-gray-800">
                            <span className="text-xl text-gray-600 ml-2">{details.totalOrders}</span>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 ml-2 font-semibold ">Orders</p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default DetailBox;