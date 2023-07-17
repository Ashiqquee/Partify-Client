import Sidebar from "../../components/provider/Sidebar";
import ChatUi from "../../components/provider/ChatUi";

const Chat = () => {
    return (
        <div>


            <Sidebar />
            <div className="flex md:ml-64 lg:ml-64 ">

                <ChatUi />
            </div>

        </div>
    );
}

export default Chat;