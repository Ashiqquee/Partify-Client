import Sidebar from "../../components/user/Sidebar";
import ChatUi from "../../components/user/ChatUi";
import Footer from '../../components/Footer'
const Chat = () => {
    return (
        <>
            <Sidebar />
            <div className="flex md:ml-72 lg:ml-72 ">
                <ChatUi />
            </div>
            <div className="flex  md:ml-64  lg:ml-64 ">
                <Footer />
            </div>
        </>

    )
}

export default Chat;
