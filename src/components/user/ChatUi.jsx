import { useEffect, useRef, useState } from 'react'
import axiosInstace from '../../api/axios'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom';
import RecentChats from '../RecentChats';


const ENDPOINT = "http://localhost:4000";

let socket;

const ChatUi = () => {
    const token = useSelector(state => state.user.token);
    const userId = useSelector(state => state.user.id)
    const [allChat, setAllChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [initalImage, setInitialImage] = useState(null);
    const bottomRef = useRef(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryChatId = queryParams.get('id');

    const fetchUserChat = async () => {
        try {
            const response = await axiosInstace.get('/chat', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { chats } = response.data;

            setInitialImage(chats[0]?.userId?.image);
            setAllChat(chats);
            allChat.forEach((chat) => {
                chat.updatedAt = new Date(chat.updatedAt);
            });

            allChat.sort((a, b) => b.updatedAt - a.updatedAt);

        } catch (error) {
            console.log(error);
        }
    };

    const handleProvider = (chatId) => {
        setSelectedChat(chatId)
        fetchChat(chatId);
    }
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('setup', userId);
        socket.on('connection');
        return () => {
            socket.disconnect();
        };

    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const toGetProfile = messages.find((message) => message.senderId.image);

        const image = toGetProfile?.senderId?.image || initalImage;
        console.log(image);
        const addedMessage = [...messages, { content: newMessage, senderId: { _id: userId, image: image }, createdAt: Date.now() }];
        setMessages(addedMessage)

        const content = newMessage;
        const chatId = selectedChat;
        const response = await axiosInstace.post('/message', { content, chatId }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        response.data.message.image = image || initalImage;
        console.log(response.data.message.image);
        socket.emit('new message', response?.data?.message)
        setNewMessage('');

    }

    const handleNewMessage = (event) => {
        let message = event.target.value;
        setNewMessage(message);
    };

    const fetchChat = async (chatId) => {
        try {
            if (!chatId) return null;
            const response = await axiosInstace.get(`/message/${chatId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { messages } = response.data;
            setMessages(messages);
            socket.emit('join chat', chatId);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUserChat();
        fetchChat(queryChatId);
        setSelectedChat(queryChatId)
    }, []);

    useEffect(() => {
        socket.on('messageResponse', (message) => {

            if (message.senderId !== userId && selectedChat === message?.chatId?.toString()) {
                const addedMessage = [...messages, message];
                setMessages(addedMessage);



            }

        })

        bottomRef.current?.scrollIntoView({ behaviour: 'smooth' });
    })


    return (
        <>
            <div className='flex overflow-hidden flex-col w-full '>
               
                <RecentChats allChat={allChat} selectedChat={selectedChat} handleProvider={handleProvider} role={'user'} />



                <div>
                    <div className="flex h-screen antialiased text-gray-800 w-full ">
                        <div className="flex flex-row h-full w-full overflow-x-hidden">

                            <div className="flex flex-col flex-auto mt-1 sm:p-6 w-full">
                                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                                    <div className="flex flex-col h-full overflow-x-auto scrollbar-hide mb-4">
                                        <div className="flex flex-col h-full">

                                            {selectedChat ?
                                                messages.map((message) => (
                                                    <div key={message._id} className="grid grid-cols-12 gap-y-2">
                                                        {message?.senderId?._id?.toString() === userId || message?.senderId === userId ? (
                                                            <div className="col-start-7 col-end-13 p-3 rounded-lg">
                                                                <>
                                                                    <div className="flex items-center justify-start flex-row-reverse mt-1">
                                                                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                            <img
                                                                                src={message.senderId.image ||'https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg' }
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
                                                            <div key={message._id} className="col-start-1 col-end-7 p-3 rounded-lg">
                                                                <div className="flex flex-row items-center">
                                                                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                                        <img
                                                                                src={message?.senderId?.profilePic || message?.profilePic || 'https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg'}
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
                                                    <h1 className='mt-64 font-semibold  text-2xl'>Select Any Chats</h1>
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
                </div>
            </div>

        </>
    )

}

export default ChatUi;