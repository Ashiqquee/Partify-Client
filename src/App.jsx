import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "@/components/user/login";
import Register  from "./components/user/register";
import UserHome from '@/pages/user/Home';
import AdminHome from './pages/admin/Home'
import Service from "./pages/admin/Service";
import UserList from '../src/pages/admin/User';
import ProviderSignup from '../src/components/provider/Signup';
import ProviderList from "./pages/admin/Provider";
import ProviderHome from "./pages/provider/Home";
import ManageServices from "./pages/provider/ManageSerice";


const App = () => {
  const userAuth = Boolean(useSelector((state) => state.user.token));
  const adminAuth = Boolean(useSelector((state) => state.admin.token));
  const providerAuth = Boolean(useSelector((state) => state.provider.token))

  return (

    <BrowserRouter >
      <Routes>

        {/* User Pages */}


        <Route path="/" element={<UserHome />}></Route>
        <Route path="/login" element={userAuth ? <Navigate to='/' /> : <Login name='user'  url= 'login' /> }></Route>
        <Route path="/signup" element={userAuth ? <Navigate to='/' /> : <Register />}></Route>


        {/* Admin Pages */}


        <Route path="/admin/login" element={adminAuth ? <Navigate to='/admin' /> : <Login name='admin' url='admin/login' />}></Route>
        <Route path="/admin" element={adminAuth ? <AdminHome /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/services" element={adminAuth ? <Service /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/users" element={adminAuth ? <UserList /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/providers" element={adminAuth ? <ProviderList /> : <Navigate to='/admin/login' />}></Route>




         {/* Provider Pages */}

        <Route path="/provider/signup" element={providerAuth ? <Navigate to='/provider'/> : <ProviderSignup/>}></Route>
        <Route path="/provider" element={providerAuth ? <ProviderHome/> : <Navigate to='/provider/login' />}></Route>
        <Route path="/provider/login" element={providerAuth ? <Navigate to='/provider' /> : <Login name='Provider' url='provider/login' />}></Route>
        <Route path="/provider/services" element={providerAuth ? <ManageServices/> : <Navigate to='/provider/login' />}></Route>


        

        



      </Routes>
    </BrowserRouter >

  )
}

export default App
