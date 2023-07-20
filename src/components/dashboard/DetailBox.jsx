

const DetailBox = ({ details }) => {

    return(
        <>
            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                <div className="flex items-center -mx-2">
                    <svg className="mx-2" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="35" cy="35" r="35" fill="#713BDB" fillOpacity="0.05" />
                        <path d="M26 44C26 40.625 30.5 40.625 32.75 38.375C33.875 37.25 30.5 37.25 30.5 31.625C30.5 27.8754 31.9996 26 35 26C38.0004 26 39.5 27.8754 39.5 31.625C39.5 37.25 36.125 37.25 37.25 38.375C39.5 40.625 44 40.625 44 44" stroke="#6F52ED" strokeWidth="2" strokeLinecap="square" />
                    </svg>

                    <div className="mx-2">
                        <h3 className="text-2xl font-medium text-gray-800">{details.totalUsers}</h3>
                        <p className="mt-1 text-sm text-gray-500">Users</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                <div className="flex items-center -mx-2">
                        <svg className="mx-2" width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="35" cy="35" r="35" fill="#33D69F" fillOpacity="0.07" />
                            <path d="M26 39L31 34" stroke="#21B8C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M32 34C32.5523 34 33 33.5523 33 33C33 32.4477 32.5523 32 32 32C31.4477 32 31 32.4477 31 33C31 33.5523 31.4477 34 32 34Z" stroke="#21B8C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M37 39C37.5523 39 38 38.5523 38 38C38 37.4477 37.5523 37 37 37C36.4477 37 36 37.4477 36 38C36 38.5523 36.4477 39 37 39Z" stroke="#21B8C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M38 37L44 31M33 34L36 37L33 34Z" stroke="#21B8C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                    <div className="mx-2">
                        <h3 className="text-2xl font-medium text-gray-800">{details.totalProviders}</h3>
                        <p className="mt-1 text-sm text-gray-500">Providers</p>
                    </div>
                </div>
            </div>


            <div className="flex items-center px-6 py-8 bg-white rounded-lg shadow-md shadow-gray-200">
                <div className="flex items-center -mx-2">
                    <svg
                        className="mx-2"
                        width="70"
                        height="70"
                        viewBox="0 0 70 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="35" cy="35" r="35" fill="#33D69F" fillOpacity="0.07" />
                        <path
                            d="M17 27V17C17 15.3431 18.3431 14 20 14H50C51.6569 14 53 15.3431 53 17V27M23 32H47C48.1046 32 49 32.8954 49 34C49 35.1046 48.1046 36 47 36H23C21.8954 36 21 35.1046 21 34C21 32.8954 21.8954 32 23 32ZM25 42C24.4477 42 24 42.4477 24 43C24 43.5523 24.4477 44 25 44C25.5523 44 26 43.5523 26 43C26 42.4477 25.5523 42 25 42ZM33 42C32.4477 42 32 42.4477 32 43C32 43.5523 32.4477 44 33 44C33.5523 44 34 43.5523 34 43C34 42.4477 33.5523 42 33 42ZM41 42C40.4477 42 40 42.4477 40 43C40 43.5523 40.4477 44 41 44C41.5523 44 42 43.5523 42 43C42 42.4477 41.5523 42 41 42ZM29 32V30C29 29.4477 29.4477 29 30 29H40C40.5523 29 41 29.4477 41 30V32M25 44H26M33 44H34M41 44H42"
                            stroke="#21B8C7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <div className="mx-2">
                        <h3 className="text-2xl font-medium text-gray-800">
                         <span className="text-xl text-gray-600">{details.totalOrders}</span>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">Orders</p>
                    </div>
                </div>
            </div>

           
        </>
    )
}

export default DetailBox;