import { useSelector } from "react-redux";
import axiosInstance from "../../api/axios";
import { useEffect, useState } from "react";

const Pricing = () => {
    const {token} = useSelector(state => state.provider);
    const [upgraded,setUpgraded] = useState(false);

    const fetchProvider = async() => {
        const {data} = await axiosInstance.get('/provider/profile',{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setUpgraded(data?.profile?.isUpgraded);
        console.log(data?.profile?.isUpgraded);

    }

    const payAmount = async() => {
        try {
            const response = await axiosInstance.post(`/provider/payment`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProvider();
    },[])

    return(
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-indigo-500 uppercase rounded-full bg-teal-accent-400">
                        Upgrade
                    </p>
                </div>
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        
                        <span className="relative">Transparent</span>
                    </span>{' '}
                    pricing. Easy payment.
                </h2>
                <p className="text-base text-indigo-500 md:text-lg">
                    Upgrade to our pro plans now and enjoy brand new features for an enhanced experience. 
                    Unlock the full potential of our service with our premium subscription.
                </p>
            </div>
            <div className="grid max-w-md gap-10 row-gap-5 sm:row-gap-10 lg:max-w-screen-md lg:grid-cols-2 sm:mx-auto">
                <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
                    <div className="mb-6">
                        <div className="flex items-center justify-between pb-6 mb-6 border-b">
                            <div>
                               
                                <p className="text-5xl font-extrabold">Free</p>
                            </div>
                            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-gray-50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlSpace="preserve"
                                    width="50"
                                    height="50"
                                    style={{
                                        shapeRendering: 'geometricPrecision',
                                        textRendering: 'geometricPrecision',
                                        imageRendering: 'optimizeQuality',
                                        fillRule: 'evenodd',
                                        clipRule: 'evenodd',
                                    }}
                                    viewBox="0 0 6.827 6.827"
                                >
                                    <path
                                        d="m2.939 1.183 2.967 2.968a.23.23 0 0 1 0 .325l-1.43 1.43a.23.23 0 0 1-.326 0L1.192 2.947c-.123-.123-.114-.18-.143-.362C1 2.29.929 1.76.866 1.322.837 1.114.856.992.928.923c.07-.067.19-.085.394-.057.417.06.826.109 1.137.157.196.03.352.032.48.16zm-1.57-.025a.15.15 0 1 1-.21.212.15.15 0 0 1 .21-.212z"
                                        style={{ fill: '#767676' }}
                                    />
                                    <path
                                        d="m2.79 1.418 2.81 2.81a.114.114 0 0 1 0 .162L4.34 5.65a.042.042 0 0 1-.06 0L1.419 2.79a.042.042 0 0 1 0-.059L2.73 1.418a.042.042 0 0 1 .06 0z"
                                        style={{ fill: '#8b8b8b' }}
                                    />
                                    <path
                                        d="m4.665 3.933.284.284.15-.15-.449-.447-1.045 1.045.448.448.149-.15-.284-.283.306-.306.226.225.15-.149-.226-.226.291-.29zm-.55-.55.284.284.15-.149L4.1 3.07 3.055 4.115l.448.448.15-.149-.284-.284.306-.306.225.226.15-.15-.226-.225.291-.291zm-.52-.52c.028.028.04.058.037.089-.004.03-.024.065-.062.101l-.103.104a.213.213 0 0 1-.077.053.102.102 0 0 1-.07.001.173.173 0 0 1-.062-.043l-.064-.064.321-.32.08.078zm-.63 1.163a.304.304 0 0 1 .044-.074.892.892 0 0 1 .065-.071l.162-.161a.607.607 0 0 0 .088-.109.281.281 0 0 0 .041-.11.22.22 0 0 0-.016-.113c.054.02.107.02.16.003a.419.419 0 0 0 .16-.108l.082-.082a.432.432 0 0 0 .109-.16.236.236 0 0 0 0-.158.447.447 0 0 0-.112-.166L3.5 2.47 2.455 3.515l.164.164.425-.425.057.056c.025.025.041.05.048.074a.112.112 0 0 1-.007.078.315.315 0 0 1-.066.089l-.164.164a1.996 1.996 0 0 0-.082.09.407.407 0 0 0-.032.053l.167.168zm.036-1.757.27.27.15-.149-.435-.434L1.941 3l.164.164.432-.431.212.212.15-.15-.213-.211.315-.316z"
                                        style={{ fill: '#fefefe' }}
                                    />
                                    <path
                                        d="M1.376 1.152a.158.158 0 1 1-.224.224.158.158 0 0 1 .224-.224zm-.016.038a.13.13 0 1 1-.185.185.13.13 0 0 1 .185-.185z"
                                        style={{ fill: '#585959' }}
                                    />
                                    <path style={{ fill: 'none' }} d="M0 0h6.827v6.827H0z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p className="mb-2 font-bold tracking-wide">Features</p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="mr-2">
                                        <svg
                                            className="w-4 h-4 text-deep-purple-accent-400"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                        >
                                            <polyline
                                                fill="none"
                                                stroke="currentColor"
                                                points="6,12 10,16 18,8"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                fill="none"
                                                r="11"
                                                stroke="currentColor"
                                            />
                                        </svg>

                                    </div>
                                    <p className="font-medium text-gray-800">
                                        Unlimited Orders
                                    </p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-2">
                                        <svg
                                            className="w-4 h-4 text-deep-purple-accent-400"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                        >
                                            <polyline
                                                fill="none"
                                                stroke="currentColor"
                                                points="6,12 10,16 18,8"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                fill="none"
                                                r="11"
                                                stroke="currentColor"
                                            />
                                        </svg>

                                    </div>
                                    <p className="font-medium text-gray-800">
                                        10-5 support
                                    </p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-2">
                                        <svg
                                            className="w-4 h-4 text-deep-purple-accent-400"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                        >
                                            <line
                                                fill="none"
                                                stroke="currentColor"
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            />
                                            <line
                                                fill="none"
                                                stroke="currentColor"
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            />
                                        </svg>

                                    </div>
                                    <p className="font-medium text-gray-800">Blue tick verification</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-2">
                                        <svg
                                            className="w-4 h-4 text-deep-purple-accent-400"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                        >
                                            <line
                                                fill="none"
                                                stroke="currentColor"
                                                x1="6"
                                                y1="6"
                                                x2="18"
                                                y2="18"
                                            />
                                            <line
                                                fill="none"
                                                stroke="currentColor"
                                                x1="18"
                                                y1="6"
                                                x2="6"
                                                y2="18"
                                            />
                                        </svg>

                                    </div>
                                    <p className="font-medium text-gray-800">Boost on profile</p>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <div>
                        <p
                           
                            className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                        >
                            Get started
                        </p>
                        <p className="text-sm text-gray-600">
                            If you have any queries or need assistance regarding the pro plan,
                             please feel free to reach out to the administrator at ashiqquee@gmail.com.

                        </p>
                    </div>
                   
                </div>
                <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
                    <div className="mb-6">
                        <div className="flex items-center justify-between pb-6 mb-6 border-b">
                            <div>
                               
                                <p className="text-5xl font-extrabold">$399</p>
                            </div>
                            <div className="flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50">
                                <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 48 48">
                                    <defs>
                                        <style>{`.cls-1{fill:#201602}`}</style>
                                    </defs>
                                    <g id="Layer_2" data-name="Layer 2">
                                        <g id="layer_1-2" data-name="layer 1">
                                            <path className="cls-1" d="M32 7h2v4h-2zM33 48a1 1 0 0 1-.6-.2L29 45.25l-3.4 2.55a1 1 0 0 1-1.2 0L21 45.25l-3.4 2.55a1 1 0 0 1-1.2 0L13 45.25 9.6 47.8a1 1 0 0 1-1.2 0L5 45.25 1.6 47.8a1 1 0 0 1-1 .09A1 1 0 0 1 0 47V7a7 7 0 0 1 7-7v2a5 5 0 0 0-5 5v38l2.4-1.8a1 1 0 0 1 1.2 0L9 45.75l3.4-2.55a1 1 0 0 1 1.2 0l3.4 2.55 3.4-2.55a1 1 0 0 1 1.2 0l3.4 2.55 3.4-2.55a1 1 0 0 1 1.2 0L32 45v-8h2v10a1 1 0 0 1-.55.89A1 1 0 0 1 33 48z" />
                                            <path className="cls-1" d="M39 8H13a1 1 0 0 1-1-1 5 5 0 0 0-5-5 1 1 0 0 1 0-2h26a7 7 0 0 1 7 7 1 1 0 0 1-1 1zM13.93 6h24A5 5 0 0 0 33 2H11.89a6.92 6.92 0 0 1 2.04 4zM36 31a4 4 0 0 1-4-4h2a2 2 0 1 0 2-2 4 4 0 1 1 4-4h-2a2 2 0 1 0-2 2 4 4 0 0 1 0 8z" />
                                            <path className="cls-1" d="M35 30h2v3h-2zM35 15h2v3h-2zM42 23h2v2h-2zM28 23h2v2h-2z" />
                                            <path className="cls-1" d="M25 41a.89.89 0 0 1-.36-.07A1 1 0 0 1 24 40V24a12 12 0 1 1 7 10.92l-5.28 5.76A1 1 0 0 1 25 41zm11-27a10 10 0 0 0-10 10v13.43L30.05 33a1 1 0 0 1 1.21-.2A10 10 0 1 0 36 14zM5 17h4v2H5zM5 12h11v2H5zM12 17h11v2H12zM5 22h4v2H5zM12 22h8v2h-8zM5 27h4v2H5zM12 27h10v2H12zM5 32h4v2H5zM12 32h6v2h-6zM5 37h4v2H5zM12 37h10v2H12z" />
                                        </g>
                                    </g>
                                </svg> 
                            </div>
                        </div>
                        <div>
                            <p className="mb-2 font-bold tracking-wide">Features</p>
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <div className="mr-2">
                                        <svg
                                            className="w-4 h-4 text-deep-purple-accent-400"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                        >
                                            <polyline
                                                fill="none"
                                                stroke="currentColor"
                                                points="6,12 10,16 18,8"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                fill="none"
                                                r="11"
                                                stroke="currentColor"
                                            />
                                        </svg>

                                    </div>
                                    <p className="font-medium text-gray-800">
                                        Unlimited Orders
                                    </p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-2">
                                        <svg
                                            className="w-4 h-4 text-deep-purple-accent-400"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                        >
                                            <polyline
                                                fill="none"
                                                stroke="currentColor"
                                                points="6,12 10,16 18,8"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                fill="none"
                                                r="11"
                                                stroke="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <p className="font-medium text-gray-800">Blue tick verification</p>
                                </li>
                                <li className="flex items-center">
                                    <div className="mr-2">
                                        <svg
                                            className="w-4 h-4 text-deep-purple-accent-400"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                        >
                                            <polyline
                                                fill="none"
                                                stroke="currentColor"
                                                points="6,12 10,16 18,8"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                fill="none"
                                                r="11"
                                                stroke="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <p className="font-medium text-gray-800">
                                       Boost on profile
                                    </p>
                                </li>
                             
                                <li className="flex items-center">
                                    <div className="mr-2">
                                        <svg
                                            className="w-4 h-4 text-deep-purple-accent-400"
                                            viewBox="0 0 24 24"
                                            strokeLinecap="round"
                                            strokeWidth="2"
                                        >
                                            <polyline
                                                fill="none"
                                                stroke="currentColor"
                                                points="6,12 10,16 18,8"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                fill="none"
                                                r="11"
                                                stroke="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <p className="font-medium text-gray-800">24/7 support</p>
                                </li>
                              
                            </ul>
                            
                        </div>
                        
                    </div>
                    <div>

                        {upgraded
                        ?
                            <p
                                
                                className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 bg-indigo-700 rounded shadow-md hover:bg-indigo-900 focus:shadow-outline focus:outline-none hover:cursor-pointer"
                            >
                                You are already upgraded
                            </p>
                        :
                            <p
                                onClick={payAmount}
                                className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 bg-indigo-700 rounded shadow-md hover:bg-indigo-900 focus:shadow-outline focus:outline-none hover:cursor-pointer"
                            >
                                Upgrade
                            </p>
                        }
                      
                        <p className="text-sm text-gray-600">
                            If you have any queries or need assistance regarding the pro plan,
                            please feel free to reach out to the administrator at ashiqquee@gmail.com.
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Pricing;