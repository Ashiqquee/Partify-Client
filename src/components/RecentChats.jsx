
const RecentChats = ({ allChat, selectedChat, handleProvider, role }) => {

    const setChats = (chatId) => {
        handleProvider(chatId)
    };

    return (
        <div className="flex flex-col mt-6 overflow-hidden ml-2">
            <h1 className="font-semibold font-sans ml-3">RECENT CHATS</h1>
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 scrollbar-hide ">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="  flex ">
                        {allChat.map((chat) => {
                            return (
                                <>
                                    <div className={`flex items-center border bg-indigo-300 border-gray-200 mt-4 py-6 px-4 rounded-lg w-72 lg:w-64 ml-2 ${selectedChat === chat._id ? 'bg-indigo-300 ' : 'bg-slate-200 '
                                        }`}
                                        onClick={() => setChats(chat?._id)}>
                                        <div className="h-12 w-12 rounded-full border overflow-hidden ">
                                            <img
                                                src={role === 'user' ? chat.providerId.profilePic : chat.userId.image || 'https://res.cloudinary.com/dq0tq9rf5/image/upload/v1688557091/tpqthkuzphqpykfyre7i.jpg'}
                                                alt="Avatar"
                                                className="h-full w-full"
                                            />
                                        </div>
                                        <div className="text-sm   font-semibold ml-3 text-black">
                                            {role === 'user' ? chat.providerId.name : chat?.userId.name}
                                        </div>

                                    </div>
                                </>)
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentChats;