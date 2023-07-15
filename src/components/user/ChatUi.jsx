// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

// const navigation = [
//     { name: 'Dashboard', href: '#', current: true },
//     { name: 'Team', href: '#', current: false },
//     { name: 'Projects', href: '#', current: false },
//     { name: 'Calendar', href: '#', current: false },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }
import { useEffect, useState } from 'react'
import axiosInstace from '../../api/axios'
import { useSelector } from 'react-redux'

const ChatUi = () => {
    const token = useSelector(state => state.user.token)
    const[allChat,setAllChat] = useState([]);
    const[messages,setMessages] = useState([]);

    const fetchUserChat = async() => {
        try {
           const response = await axiosInstace.get('/chat',{
               headers: {
                   Authorization: `Bearer ${token}`,
               },
           }) ;
           
           const {chats} = response.data;
           console.log(chats);
           setAllChat(chats)

        } catch (error) {
          console.log(error);  
        }
    }

    const fetchChat = async () => {
        try {
            const chatId = '64b23644aa60151a9e387681'
            const response = await axiosInstace.get(`/message/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { messages } = response.data;
            console.log(messages);
            setMessages(messages)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserChat();
        fetchChat()
    },[])

    return(
        <>
            <div className="flex h-screen antialiased text-gray-800">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                        <div className="font-monoton text-2xl cursor-pointer flex items-center bg-white">
                            
                            
                                Providers
                           
                        </div>
                        {allChat.map((chat) => {
                            return(
                                <>
                                    <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                                        <div className="h-20 w-20 rounded-full border overflow-hidden">
                                            <img
                                                src={chat.providerId.profilePic}
                                                alt="Avatar"
                                                className="h-full w-full"
                                            />
                                        </div>
                                        <div className="text-sm font-semibold mt-2">
                                           {chat.providerId.name}
                                        </div>

                                    </div>
                                </>
                            )
                        }) }
                        
                        
                    </div>
                    <div className="flex flex-col flex-auto h-full p-6">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                            <div className="flex flex-col h-full overflow-x-auto mb-4">
                                <div className="flex flex-col h-full">
                                    {/* Messages loop */}
                                    <div className="grid grid-cols-12 gap-y-2">
                                        {/* Self message */}
                                        <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                          
                                            {messages.map((message) => {
                                                return (
                                                    <>
                                                        <div className="flex items-center justify-start flex-row-reverse mt-1">
                                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                <img
                                                                    src={message.senderId.image}
                                                                    alt="Avatar"
                                                                    className="h-full w-full rounded-full"
                                                                />
                                                            </div>
                                                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                                <div>{message.content}</div>
                                                                <small className="text-xs text-gray-400">Message Time</small>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </div>
                                        {/* Organizer message */}
                                        <div className="col-start-1 col-end-7 p-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                    <img
                                                        src="organizer_avatar_image_url"
                                                        alt="Avatar"
                                                        className="h-full w-full rounded-full"
                                                    />
                                                </div>
                                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>Organizer Message Content</div>
                                                    <small>Message Time</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End of messages loop */}
                                </div>
                            </div>
                            <form>
                                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                    <div className="flex-grow ml-4">
                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                                placeholder="Type your message..."
                                            />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                                        >
                                            <span>Send</span>
                                            <span className="ml-2">

                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default ChatUi;