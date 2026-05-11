import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store';
import { loadUser } from './actions/UserActions';

// Layout
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

// Route guard
import ProtectedRoute from './components/route/ProtectedRoute';

// Public pages
import Home from './components/Home';
import BlogDetails from './components/blog/BlogDetails';
import SearchBlog from './components/blog/SearchBlog';
import Login from './components/user/Login';
import Register from './components/user/Register';

// Authenticated user pages
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

// Blog management
import CreateBlog from './components/blog/CreateBlog';
import UpdateBlog from './components/blog/UpdateBlog';
import MyBlogs from './components/blog/MyBlogs';

// Admin pages
import Dashboard from './components/admin/Dashboard';
import BlogList from './components/admin/BlogList';
import UserList from './components/admin/UserList';
import AdminList from './components/admin/AdminList';
import AdminUpdateUser from './components/admin/UpdateUserDetails';
import AdminUpdateAdminDetails from './components/admin/UpdateAdminDetails';

function App() {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen ">
        <Header />
        <ToastContainer position="bottom-center" theme="dark" />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<SearchBlog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route path="/myprofile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/myprofile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
            <Route path="/myprofile/update/password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
            <Route path="/myblogs" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
            <Route path="/blog/new" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
            <Route path="/blog/update/:id" element={<ProtectedRoute><UpdateBlog /></ProtectedRoute>} />

            <Route path="/admin/dashboard" element={<ProtectedRoute isAdmin><Dashboard /></ProtectedRoute>} />
            <Route path="/admin/blogs" element={<ProtectedRoute isAdmin><BlogList /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute isAdmin><UserList /></ProtectedRoute>} />
            <Route path="/admin/admins" element={<ProtectedRoute isAdmin><AdminList /></ProtectedRoute>} />
            <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin><AdminUpdateUser /></ProtectedRoute>} />
            <Route path="/admin/admin/:id" element={<ProtectedRoute isAdmin><AdminUpdateAdminDetails /></ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;
