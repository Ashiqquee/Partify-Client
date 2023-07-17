import { useEffect, useState,useRef } from 'react'
import axiosInstace from '../../api/axios'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
const ENDPOINT = "http://localhost:4000";

let socket;

const ChatUi = () => {
    const token = useSelector(state => state.provider.token);
    const providerId = useSelector(state => state.provider.id);
    const [allChat, setAllChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const[newMessage,setNewMessage] = useState('')
    const [selectedChat, setSelectedChat] = useState(null);
    const [initalImage, setInitialImage] = useState(null);
    const bottomRef = useRef(null);



    const fetchProviderChat = async () => {
        try {
            const response = await axiosInstace.get('/provider/chat', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { chats } = response.data;
            console.log(chats);
            setInitialImage(chats[0]?.providerId?.profilePic);
            setAllChat(chats)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log("Connecting to Socket.io...");
        socket = io(ENDPOINT);
        socket.emit('setup', providerId);
        console.log(providerId);
        socket.on('connection');

    }, []);

    const handleProvider = (chatId) => {
        setSelectedChat(chatId)
        fetchChat(chatId);
    }

    const handleNewMessage = (event) => {
        let message = event.target.value;
        setNewMessage(message);
        
    };

    const handleSubmit = async(event) => {
      try {
          event.preventDefault();
          const toGetProfile = messages.find((message) => message.senderId.profilePic);
          const profilePic = toGetProfile?.senderId?.profilePic || initalImage;
          const addedMessage = [...messages, { content: newMessage, senderId: { _id: providerId, profilePic: profilePic },createdAt:Date.now() }];
          setMessages(addedMessage)

          const content = newMessage;
          const chatId = selectedChat;
          const response = await axiosInstace.post('/provider/message', { content, chatId }, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          response.data.message.profilePic = profilePic || initalImage;
         
          socket.emit('new message', response?.data?.message)
          setNewMessage('');
      } catch (error) {
        console.log(error);
      }


    }

    

    const fetchChat = async (chatId) => {
        try {

            const response = await axiosInstace.get(`/provider/message/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { messages } = response.data;
            setMessages(messages)
            socket.emit('join chat', chatId)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProviderChat();
        fetchChat();

    }, []);

    useEffect(() => {
        socket.on('messageResponse', (message) => {
            if (message.senderId !== providerId && selectedChat === message?.chatId?.toString()) {
                const addedMessage = [...messages, message];
                console.log(message);
                setMessages(addedMessage);
            }

        });
        bottomRef.current?.scrollIntoView({ behaviour: 'smooth' })

    })


    return (
        <>
            <div className="flex h-screen antialiased text-gray-800 w-full">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col py-8 pl-6 pr-2  bg-white flex-shrink-0 w-1/4">
                        <div className="font-monoton text-2xl cursor-pointer flex items-center bg-white">


                            Users

                        </div>
                        {allChat.map((chat) => {
                            return (
                                <>
                                    <div className={`flex  items-cente border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg ${selectedChat===chat._id ? 'bg-indigo-300' : 'bg-slate-100'}  `} onClick={() => handleProvider(chat?._id)}>
                                        <div className="h-12 w-12 rounded-full border overflow-hidden">
                                            <img
                                                src={chat.userId.image }
                                                alt="Avatar"
                                                className="h-full w-full"
                                            />
                                        </div>
                                        <div className="text-sm font-semibold mt-3 ml-2">
                                            {chat.userId.name}
                                        </div>

                                    </div>
                                </>
                            )
                        })}


                    </div>
                    <div className="flex flex-col flex-auto h-full p-6 w-full">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                            <div className="flex flex-col h-full overflow-x-auto scrollbar-hide mb-4">
                                <div className="flex flex-col h-full">
                                  
                                    {selectedChat ?
                                        messages.map((message) => (
                                            <div key={message._id} className="grid grid-cols-12 gap-y-2">
                                                {message?.senderId?._id?.toString() === providerId || message?.senderId === providerId ? (
                                                    <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                                        <>
                                                            <div className="flex items-center justify-start flex-row-reverse mt-1">
                                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                    <img
                                                                        src={message?.senderId?.profilePic}
                                                                        alt="Avatar"
                                                                        className="h-full w-full rounded-full"
                                                                    />
                                                                </div>
                                                                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                                    <div>{message.content}</div>
                                                                    <small className="text-xs text-gray-400">{new Date(message?.createdAt).toLocaleString('en-US', {
                                                                        hour: 'numeric',
                                                                        minute: 'numeric',
                                                                        hour12: true
                                                                    })}</small>
                                                                </div>
                                                            </div>
                                                        </>
                                                    </div>
                                                ) : (
                                                    <div className="col-start-1 col-end-7 p-3 rounded-lg">
                                                        <div className="flex flex-row items-center">
                                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                <img
                                                                    src={message.senderId.image || message.image}
                                                                    alt="Avatar"
                                                                    className="h-full w-full rounded-full"
                                                                />
                                                            </div>
                                                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                                <div>{message.content}</div>
                                                                    <small>{new Date(message?.createdAt).toLocaleString('en-US', {
                                                                        hour: 'numeric',
                                                                        minute: 'numeric',
                                                                        hour12: true
                                                                    })}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                <div ref={bottomRef} />

                                            </div>
                                        )) : 
                                        
                                        <div className=' w-full h-full flex justify-center '>
                                            <h1 className='mt-72 font-bold  text-2xl'>Select Any Chats</h1>
                                        </div>
                                        }
                                
                                </div>

                            </div>

                            {
                                selectedChat ? 
                                    <form onSubmit={handleSubmit}>
                                        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                                            <div className="flex-grow ml-4">
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                                                        placeholder="Type your message..."
                                                        value={newMessage}
                                                        onChange={handleNewMessage}
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
                                    </form> : null
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default ChatUi;