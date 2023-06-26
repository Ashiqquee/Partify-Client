import { useDispatch } from "react-redux";
import { userLogout } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(userLogout())
        navigate('/login')
    }
    return (
        <>
            <h1>Home</h1>
            <button onClick={logout}>Logout</button>
        </>
    )
}

export default Home;