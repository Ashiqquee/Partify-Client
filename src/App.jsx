import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "@/components/user/login";
import Register  from "./components/user/register";
import UserHome from '@/pages/user/Home';
import AdminHome from './pages/admin/Home'
import Service from "./pages/admin/Service";



const App = () => {
  const userAuth = Boolean(useSelector((state) => state.user.token));
  const adminAuth = Boolean(useSelector((state) => state.admin.token))


  return (

    <BrowserRouter >
      <Routes>
        <Route path="/" element={<UserHome />}></Route>
        <Route path="/login" element={userAuth ? <Navigate to='/' /> : <Login name='user'  url= 'login' /> }></Route>
        <Route path="/signup" element={userAuth ? <Navigate to='/' /> : <Register />}></Route>
        <Route path="/admin/login" element={adminAuth ? <Navigate to='/admin' /> : <Login name='admin' url='admin/login' />}></Route>
        <Route path="/admin" element={adminAuth ? <AdminHome /> : <Navigate to='/admin/login' />}></Route>
        <Route path="/admin/serviceDetails" element={adminAuth ? <Service /> : <Navigate to='/admin/login' />}></Route>
        



      </Routes>
    </BrowserRouter >

  )
}

export default App
