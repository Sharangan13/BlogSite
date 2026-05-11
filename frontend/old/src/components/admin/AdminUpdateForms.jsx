import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AdminUpdateUserDetails, getUser } from '../../actions/AdminAction';
import { adminUpdateUserDetailClear, clearError } from '../../slices/UserSlice';
import Loader from '../layouts/Loder';
import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';

const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all";

function AdminUpdateForm({ title, redirectPath }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const { error, user, isAdminUpdateUser, loading } = useSelector((s) => s.userState);
  const [fields, setFields] = useState({ name: '', email: '', role: '' });
  const onChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value });
  useEffect(() => { dispatch(getUser(userId)); }, [userId, dispatch]);
  useEffect(() => { if (user) setFields({ name: user.name, email: user.email, role: user.role }); }, [user]);
  useEffect(() => {
    if (isAdminUpdateUser) { toast.success('Updated successfully!', { position: 'bottom-center', onOpen: () => dispatch(adminUpdateUserDetailClear()) }); navigate(redirectPath); }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearError()) }); }
  }, [isAdminUpdateUser, error, dispatch, navigate, redirectPath]);
  const handleSubmit = (e) => { e.preventDefault(); dispatch(AdminUpdateUserDetails(userId, fields)); };

  return (
    <>
      <MetaData title={title} />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />
        <div className="flex-1 px-8 py-10">
          <h1 className="text-2xl font-bold mb-8 text-gray-900" style={{fontFamily:'var(--font-display)'}}>{title}</h1>
          {loading ? <Loader /> : (
            <div className="max-w-[480px]">
              <form className="bg-white border border-gray-200 rounded-2xl p-10 flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">Name</label><input name="name" type="text" value={fields.name} onChange={onChange} className={inputCls} /></div>
                <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">Email</label><input name="email" type="email" value={fields.email} onChange={onChange} className={inputCls} /></div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-600">Role</label>
                  <select name="role" required value={fields.role} onChange={onChange} className={`${inputCls} appearance-none cursor-pointer`}>
                    <option value="">Select role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white border-none rounded-md text-sm font-semibold mt-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">Save Changes</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function UpdateUserDetails() { return <AdminUpdateForm title="Edit Blogger" redirectPath="/admin/users" />; }
export function UpdateAdminDetails() { return <AdminUpdateForm title="Edit Admin" redirectPath="/admin/admins" />; }
