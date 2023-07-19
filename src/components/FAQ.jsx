import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import {useSelector} from 'react-redux'

const FAQ = () => {


    const {name} = useSelector(state => state.user)

    const steps = [
        {
            id: '0',
            message: `How i can help you`,
            trigger: '1',
        },
        {
            id: '1',
            message: 'Please enter your registered number',
            trigger: '2',
        },
        {
            id: '2',
            user: true,
            validator: (value) => {
                if (value.length < 10) {
                    return '10 digits required';
                }
                return true;
            },
            trigger: '3',
        },
        {
            id: '3',
            message: `hi ${name}, how can I help you?`,
            trigger: '4',
        },
        {
            id: '7',
            message: `Do you need any other assistance?`,
            trigger: '4',
        },
        {
            id: '4',
            options: [
                { value: 1, label: 'How to make a referral', trigger: '5' },
                { value: 2, label: 'How to contact admin', trigger: '6' },
                
            ],
           
        },
        {
            id: '5',
            message: "Go to Profile -> Get your referral number -> Send the referral link to your friends -> When friends use your referral link during signup, you will get $100 -> Success! ",
            trigger:'7'
          
        },
        {
            id: '6',
            message: "Contact admin : ashiqqquee@gmail.com",
            trigger: '7'

        },
    ];

  
    const theme = {
        background: 'white',
        headerBgColor: '#3F51B5',
        headerFontSize: '20px',
        botBubbleColor: '#edeef2',
        headerFontColor: 'white',
        botFontColor: 'black',
        userBubbleColor: 'black',
        userFontColor: 'white',
    };

  
    const config = {
        botAvatar: "https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg",
        floating: true,
    };

    return(
        <>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <div>
                        <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-indigo-500 uppercase rounded-full bg-teal-accent-400">
                            How to make orders
                        </p>
                    </div>
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        <span className="relative inline-block">
                            <svg
                                viewBox="0 0 52 24"
                                fill="currentColor"
                                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                            >
                                <defs>
                                    <pattern
                                        id="b902cd03-49cc-4166-a0ae-4ca1c31cedba"
                                        x="0"
                                        y="0"
                                        width=".135"
                                        height=".30"
                                    >
                                        <circle cx="1" cy="1" r=".7" />
                                    </pattern>
                                </defs>
                                <rect
                                    fill="url(#b902cd03-49cc-4166-a0ae-4ca1c31cedba)"
                                    width="52"
                                    height="24"
                                />
                            </svg>
                            <span className="relative">The</span>
                        </span>{' '}
                        quick, overview 
                    </h2>
                    <p className="text-base text-indigo-500 md:text-lg font-sans">
                        If you face any problem with your orders, please contact ashiqqquee@gmail.com.
                    </p>
                </div>
                
                <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-2">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-2xl font-bold">Step 1</p>
                            <svg
                                className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <line
                                    fill="none"
                                    strokeMiterlimit="10"
                                    x1="2"
                                    y1="12"
                                    x2="22"
                                    y2="12"
                                />
                                <polyline
                                    fill="none"
                                    strokeMiterlimit="10"
                                    points="15,5 22,12 15,19 "
                                />
                            </svg>
                        </div>
                        <p className="text-gray-600">
                          To sign up and access your account, you can conveniently register using your email address, phone number, or chosen username.
                           This allows for easy login and ensures a seamless experience across platforms 
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-2xl font-bold">Step 2</p>
                            <svg
                                className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <line
                                    fill="none"
                                    strokeMiterlimit="10"
                                    x1="2"
                                    y1="12"
                                    x2="22"
                                    y2="12"
                                />
                                <polyline
                                    fill="none"
                                    strokeMiterlimit="10"
                                    points="15,5 22,12 15,19 "
                                />
                            </svg>
                        </div>
                        <p className="text-gray-600">
                            Choose the most suitable service provider from the available options in the providers section, tailored to your specific needs and location. 
                            By doing so, you can ensure that you receive the best.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-2xl font-bold">Step 3</p>
                            <svg
                                className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <line
                                    fill="none"
                                    strokeMiterlimit="10"
                                    x1="2"
                                    y1="12"
                                    x2="22"
                                    y2="12"
                                />
                                <polyline
                                    fill="none"
                                    strokeMiterlimit="10"
                                    points="15,5 22,12 15,19 "
                                />
                            </svg>
                        </div>
                        <p className="text-gray-600">
                            Engage in a direct and interactive conversation with the selected service provider, articulating your unique needs clearly to ensure they fully understand your requirements.
                             Once all details are agreed upon, proceed to make a payment and advance amount talks.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-2xl font-bold">Step 4</p>
                            <svg
                                className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <line
                                    fill="none"
                                    strokeMiterlimit="10"
                                    x1="2"
                                    y1="12"
                                    x2="22"
                                    y2="12"
                                />
                                <polyline
                                    fill="none"
                                    strokeMiterlimit="10"
                                    points="15,5 22,12 15,19 "
                                />
                            </svg>
                        </div>
                        <p className="text-gray-600">
                            Subsequently, the service provider will send you a comprehensive link containing all the essential order details, providing you with an opportunity to review and verify the information for accuracy and completeness. 
                            Once you've ensured that everything aligns with your requirements, you can confidently ready to make the payment
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-2xl font-bold">Step 5</p>
                            <svg
                                className="w-6 text-gray-700 transform rotate-90 sm:rotate-0"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <line
                                    fill="none"
                                    strokeMiterlimit="10"
                                    x1="2"
                                    y1="12"
                                    x2="22"
                                    y2="12"
                                />
                                <polyline
                                    fill="none"
                                    strokeMiterlimit="10"
                                    points="15,5 22,12 15,19 "
                                />
                            </svg>
                        </div>
                        <p className="text-gray-600">
                            Take advantage of Stripe, recognized as one of the finest and most reliable payment gateways available, to effortlessly settle your payment.
                            Utilize your card details securely on the platform, ensuring a smooth and seamless transaction process.
                        </p>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-6 ">
                            <p className="text-2xl font-bold">Success</p>
                            <svg
                                className="w-8 text-gray-600"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <polyline
                                    fill="none"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    points="6,12 10,16 18,8"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-600">
                            Congratulations! Your order has been successfully processed and completed without any issues. Rest assured, your chosen items or services are on their way or being prepared as per your specifications.
                          
                        </p>
                    </div>
                </div>
            </div>
            <ThemeProvider theme={theme}>
                <ChatBot

                    headerTitle="PARTIFY"
                    steps={steps}
                    {...config}

                />
            </ThemeProvider>
       
        </>

    )
}

export default FAQ;