import Sidebar from "../../components/user/Sidebar";
import ChatUi from "../../components/user/ChatUi";

const Chat = () => {
    return (
        <>
            <Sidebar />
            <div className="flex md:ml-72 lg:ml-72 ">
                <ChatUi />
            </div>
        </>

    )
}

export default Chat;
