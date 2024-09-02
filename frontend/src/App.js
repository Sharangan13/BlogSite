import './App.css';
import Home from './components/Home';
import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlogDetails from './components/blog/BlogDetails';
import SearchBlog from './components/blog/SearchBlog';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useEffect } from 'react';
import store from './store'
import { loadUser } from './actions/UserActions';
import Profile from './components/user/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/user/UpdateProfile';
import CreateBlog from './components/blog/CreateBlog';
import UpdatePassword from './components/user/UpdatePassword';
import ResetPassword from './components/user/ResetPassword';
import ForgotPassword from './components/user/ForgotPassword';
import Dashboard from './components/admin/Dashboard';
import BlogList from './components/admin/BlogList';
import UserList from './components/admin/UserList';
import AdminList from './components/admin/AdminList';
import MyBlogs from './components/blog/MyBlogs';
import UpdateBlog from './components/blog/UpdateBlog';
import AdminUpdateUser from './components/admin/UpdateUserDetails';
import AdminUpdateAdminDetails from './components/admin/UpdateAdminDetails';


function App() {

  useEffect(()=>{
     store.dispatch(loadUser)

  })



  return (
    <Router>
    <div className="App">

      <HelmetProvider>
     <Header/>
<ToastContainer/>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/search/:keyword' element={<SearchBlog/>}/>
        <Route path='/blog/:id' element={<BlogDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/myblogs' element={<ProtectedRoute><MyBlogs/></ProtectedRoute>}/>
        <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
        <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
        <Route path='/blog/new' element={<ProtectedRoute><CreateBlog/></ProtectedRoute>}/>
        <Route path='/password/forgot' element={<ForgotPassword/>}/>
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route path='/blog/update/:id' element={<ProtectedRoute><UpdateBlog/></ProtectedRoute>}/>

     </Routes>


      {/* ------------------------Admin routs-------------------------- */}
     <Routes>
     <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
     <Route path='/admin/blogs' element={<ProtectedRoute isAdmin={true}><BlogList/></ProtectedRoute>}/>
     <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute>}/>

     <Route path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><AdminUpdateUser/></ProtectedRoute>}/>
     <Route path='/admin/admin/:id' element={<ProtectedRoute isAdmin={true}><AdminUpdateAdminDetails/></ProtectedRoute>}/>

     <Route path='/admin/admins' element={<ProtectedRoute isAdmin={true}><AdminList/></ProtectedRoute>}/>
    


     </Routes>
     
     <Footer/>
     </HelmetProvider>
    </div>
    </Router>
  );
}

export default App;
