import {useNavigate} from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    return(
        <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 border-t">
            <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                    <h1 className="font-sans font-black text-indigo-500 text-3xl ">PARTIFY</h1>
                    <p className="text-sm font-semibold pb-6">parties simplified</p>
                    <div className="mt-6 lg:max-w-sm">
                        <p className="text-sm text-gray-800">
                            Partify is a event management web application for customer and event teams.
                        </p>
                        <p className="mt-4 text-sm text-gray-800">
                            This platform facilitates seamless communication and order placement 
                            between customers and event teams, tailored to individual customer requirements. Through real-time chat,
                             clients can engage with the event team, ensuring personalized and efficient service for all their event-related needs.
                        </p>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <p className="text-base font-bold tracking-wide text-gray-900">
                        Contacts
                    </p>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Phone:</p>
                        <a
                            
                            aria-label="Our phone"
                            title="Our phone"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            1234567891
                        </a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Email:</p>
                        <a
                            
                            aria-label="Our email"
                            title="Our email"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            ashiqqquee@gmail.com
                        </a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 text-gray-800">Address:</p>
                        <a
                         
                        
                            rel="noopener noreferrer"
                            aria-label="Our address"
                            title="Our address"
                            className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
                        >
                            Zareena's, FnR ,Kannur
                        </a>
                    </div>
                </div>
                <div>
                    <span className="text-base font-bold tracking-wide text-gray-900">
                        Social
                    </span>
                    <div className="flex items-center mt-1 space-x-3">
                       
                        <a
                            href="https://github.com/Ashiqquee"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:cursor-pointer"
                        >
                            <svg
                                height="30"
                                target="_blank"
                                style={{ enableBackground: 'new 0 0 512 512' }}
                                version="1.1"
                                viewBox="0 0 512 512"
                                width="30"
                                xmlSpace="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <g id="_x37_1-github">
                                    <g>
                                        <g>
                                            <g>
                                                <path
                                                    d="M255.969,21.733c-131.739,0-238.572,107.541-238.572,240.206 c0,106.107,68.362,196.121,163.205,227.91c11.929,2.22,16.285-5.196,16.285-11.567 c0-5.713-0.205-20.817-0.33-40.856 c-66.36,14.507-80.375-32.208-80.375-32.208 c-10.828-27.756-26.489-35.139-26.489-35.139 c-21.684-14.893,1.613-14.591,1.613-14.591 c23.948,1.701,36.534,24.759,36.534,24.759 c21.295,36.694,55.866,26.105,69.465,19.947 c2.146-15.521,8.318-26.105,15.154-32.116 c-52.974-6.073-108.69-26.681-108.69-118.699 c0-26.229,9.31-47.668,24.576-64.478 c-2.475-6.071-10.646-30.507,2.329-63.554 c0,0,20.045-6.455,65.613,24.614 c19.031-5.325,39.432-7.982,59.742-8.072 c20.25,0.123,40.676,2.747,59.738,8.105 c45.547-31.074,65.559-24.614,65.559-24.614 c13.002,33.077,4.832,57.482,2.387,63.549 c15.297,16.81,24.516,38.25,24.516,64.482 c0,92.258-55.773,112.563-108.92,118.512 c8.559,7.422,16.191,22.069,16.191,44.471 c0,32.124-0.297,58.019-0.297,65.888 c0,6.427,4.293,13.903,16.402,11.54 c94.697-31.824,162.998-121.805,162.998-227.883 C494.604,129.273,387.771,21.733,255.969,21.733L255.969,21.733z"
                                                    style={{ fill: '#6879D9' }}
                                                />
                                            </g>
                                        </g>
                                    </g>
                                </g>
                                <g id="Layer_1" />
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com/in/ashiqquee"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
                        >
                          
                            <svg
                                enableBackground="new 0 0 32 32"
                                height="30"
                                id="Layer_1"
                                version="1.0"
                                viewBox="0 0 32 32"
                                width="30"
                                xmlSpace="preserve"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                            >
                                <g>
                                    <circle cx="16" cy="16" fill="#007BB5" r="16" />
                                    <g>
                                        <rect fill="#FFFFFF" height="14" width="4" x="7" y="11" />
                                        <path
                                            d="M20.499,11c-2.791,0-3.271,1.018-3.499,2v-2h-4v14h4v-8c0-1.297,0.703-2,2-2c1.266,0,2,0.688,2,2v8h4v-7    C25,14,24.479,11,20.499,11z"
                                            fill="#FFFFFF"
                                        />
                                        <circle cx="9" cy="8" fill="#FFFFFF" r="2" />
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        If you have any queries, feel free to connect with me through these apps. I'm here to help! Whether it's on these platforms or elsewhere, I'm ready to assist you with any questions you may have.
                    </p>
                </div>
            </div>
            <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
                <p className="text-sm text-gray-600">
                    © Copyright 2023 Ashiqquee. All rights reserved.
                </p>
                <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                    <li>
                        <a
                        onClick={() => navigate('/help')}
                            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:cursor-pointer"
                        >
                            F.A.Q
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => navigate('/help')}
                            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:cursor-pointer"
                        >
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => navigate('/help')}
                            className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400 hover:cursor-pointer"
                        >
                            Terms &amp; Conditions
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;