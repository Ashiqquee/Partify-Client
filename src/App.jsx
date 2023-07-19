import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/Login";
import Register  from "./components/user/register";
import UserHome from '@/pages/user/Home';
import AdminHome from './pages/admin/Home'
import Service from "./pages/admin/Service";
import UserList from './pages/admin/User';
import ProviderSignup from './components/provider/Signup';
import ProviderList from "./pages/admin/Provider";
import ProviderHome from "./pages/provider/Home";
import ManageServices from "./pages/provider/ManageSerice";
import Verthe from "./components/admin/Verthe";
import Profile from "./pages/user/Profile";
import AddPost from "./pages/provider/AddPost";
import ProviderPage from "./pages/user/Provider";
import ProviderProfile from './pages/provider/Profile'
import PostsList from "./pages/admin/Posts";
import Chat from './pages/user/Chat'
import ProviderOrder from './pages/provider/Order'
import SingleOrderProvider from './pages/provider/SingleOrder';
import SingleOrder from "./pages/user/SingleOrder";
import PaymentStatus from "./pages/user/paymentStatus";
import AdminOrders from "./pages/admin/Order";
import AdminOrderDetails from "./pages/admin/OrderDetails";
import ProviderChat from './pages/provider/Chat'
import UserFAQ from './pages/user/FAQ'

const App = () => {
  const userAuth = Boolean(useSelector((state) => state.user.token));
  const adminAuth = Boolean(useSelector((state) => state.admin.token));
  const providerAuth = Boolean(useSelector((state) => state.provider.token));

  return (

    <BrowserRouter >
      <Routes>

        {/* User Pages */}


        <Route path="/" element={<UserHome />}></Route>
        <Route path="/login" element={userAuth ? <Navigate to='/' /> : <Login name='user'  url= 'login' /> }></Route>
        <Route path="/signup" element={userAuth ? <Navigate to='/' /> : <Register />}></Route>
        <Route path="/profile" element={userAuth ? <Profile /> : <Navigate to='/login' />}></Route>
        <Route path="/user/providers" element={<ProviderPage /> }></Route>
        <Route path="/order/:id" element={userAuth ? <SingleOrder /> : <Navigate to='/login' />}></Route>
        <Route path="/chat" element={userAuth ? <Chat /> : <Navigate to='/login' />}></Route>
        <Route path="/payment/:status" element={userAuth ? <PaymentStatus /> : <Navigate to='/login' />}></Route>
        <Route path="/help" element={<UserFAQ />}></Route>





        {/* Admin Pages */}


        <Route path="/admin/login" element={adminAuth ? <Navigate to='/admin' /> : <Login name='admin' url='admin/login' />}></Route>
        <Route path="/admin" element={adminAuth ? <AdminHome /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/services" element={adminAuth ? <Service /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/users" element={adminAuth ? <UserList /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/providers" element={adminAuth ? <ProviderList /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/posts" element={adminAuth ? <PostsList /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/orders" element={adminAuth ? <AdminOrders /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/order/:id" element={adminAuth ? <AdminOrderDetails /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/verthe" element={adminAuth ? <Verthe /> : <Navigate to='/admin/login' />}></Route>
        




         {/* Provider Pages */}

        <Route path="/provider/signup" element={providerAuth ? <Navigate to='/provider'/> : <ProviderSignup/>}></Route>
        <Route path="/provider" element={providerAuth ? <ProviderHome/> : <Navigate to='/provider/login' />}></Route>
        <Route path="/provider/login" element={providerAuth ? <Navigate to='/provider' /> : <Login name='Provider' url='provider/login' />}></Route>
        <Route path="/provider/services" element={providerAuth ? <ManageServices/> : <Navigate to='/provider/login' />}></Route>
        <Route path="/provider/addPost" element={providerAuth ? <AddPost /> : <Navigate to='/provider/login' />}></Route>
        <Route path="/provider/profile" element={providerAuth ? <ProviderProfile /> : <Navigate to='/provider/login' />}></Route>
        <Route path="/provider/orders" element={providerAuth ? <ProviderOrder /> : <Navigate to='/provider/login' />}></Route>
        <Route path="/provider/order/:id" element={providerAuth ? <SingleOrderProvider /> : <Navigate to='/provider/login' />}></Route>
        <Route path="/provider/chat" element={providerAuth ? <ProviderChat /> : <Navigate to='/provider/login' />}></Route>








        

        



      </Routes>
    </BrowserRouter >

  )
}

export default App
