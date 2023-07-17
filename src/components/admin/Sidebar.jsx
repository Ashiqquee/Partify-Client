import { useState } from "react";

import { faUser, faHouse, faServer, faWeightHanging, faRightFromBracket,faImage } from '@fortawesome/free-solid-svg-icons'
import useWidthSize from "../../utils/useWidthSize";
import NavItem from "../NavItem";

const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const widthSize = useWidthSize();

    const toggleSidebar = () => {
        setIsOpen(true);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };


  
    return (

        <div className="flex ">

            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-black  border-r  border-black-100 shadow transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:translate-x-0`}
            >
                <div className=" ">

                    {widthSize < 768 && (
                        <button
                            onClick={closeSidebar}
                            className="text-black hover:text-gray-500 focus:text-gray-500 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>
                <div >

                    <div className="mt-5 ml-5">
                        <h1 className="font-sans font-black text-indigo-500 text-3xl ">PARTIFY</h1>
                        <p className="text-sm font-semibold pb-6">parties simplified</p>

                    </div>

                  

                    <NavItem icon={faHouse} name={"HOME"} path={'/admin'}/>
                    <NavItem icon={faUser} name={"USERS"} path={'/admin/users'} />
                    <NavItem icon={faWeightHanging} name={"PROVIDER"} path={'/admin/providers'} />
                    <NavItem icon={faServer} name={"SERVICES"} path={'/admin/services'} />
                    <NavItem icon={faImage} name={'POSTS'} path={'/admin/posts'} />
                    <NavItem icon={faRightFromBracket} name={'LOGOUT'} path={'/admin/login'}/>
                    

                    


                        

                    

                </div>
            </div>


            <div className="flex flex-col flex-grow">

                <div className="border-r  border-black-100 shadow transition-transform duration-300 ease-in-out transform">
                    <div className="flex items-center justify-between px-4 py-3 bg-white">
                        <div >

                            <button
                                onClick={toggleSidebar}
                                className="block text-gray-500 hover:text-white focus:text-white focus:outline-none md:hidden"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="h-9 text-black">
                            <h1 className="px-3 text-lg font-black antialiased" >PARTIFY</h1>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>


                <div className="flex-grow p-4">

                </div>
            </div>


            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 cursor-pointer"
                    onClick={closeSidebar}
                />
            )}
        </div>
    );

};

export default Sidebar;