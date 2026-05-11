import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AdminDeleteUser, adminGetUsersDetails } from '../../actions/AdminAction';
import { clearError, isAdminDeleteUserClear } from '../../slices/UsersSlice';
import Loader from '../layouts/Loder';
import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';

function UserRow({ user, onDelete, editPath, isSelf }) {
  return (
    <tr className="hover:[&>td]:bg-gray-50">
      <td className="px-5 py-4 text-sm text-gray-600 border-b border-gray-200">{user.name}</td>
      <td className="px-5 py-4 text-sm text-gray-600 border-b border-gray-200">{user.email}</td>
      <td className="px-5 py-4 border-b border-gray-200">
        <span className={`px-3 py-0.5 rounded-full text-[0.72rem] font-bold uppercase tracking-wide
          ${user.role === 'admin' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
          {user.role}
        </span>
      </td>
      <td className="px-5 py-4 border-b border-gray-200">
        <Link to={editPath} className="px-4 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all mr-2">Edit</Link>
        <button
          className="px-4 py-1 rounded-md text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={(e) => onDelete(e, user._id)}
          disabled={isSelf}
          title={isSelf ? 'Cannot delete your own account' : 'Delete user'}
        >Delete</button>
      </td>
    </tr>
  );
}

function AdminTable({ title, rows, loading, onDelete, currentUserId, getEditPath }) {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <Sidebar />
      <div className="flex-1 px-8 py-10 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-900" style={{fontFamily:'var(--font-display)'}}>{title} ({rows.length})</h1>
        {loading ? <Loader /> : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white border border-gray-200 rounded-xl overflow-hidden">
              <thead><tr>{['Name','Email','Role','Actions'].map(h => <th key={h} className="px-5 py-4 text-left text-[0.78rem] font-bold uppercase tracking-wide text-gray-400 bg-gray-50 border-b border-gray-200">{h}</th>)}</tr></thead>
              <tbody>
                {rows.map((u) => <UserRow key={u._id} user={u} onDelete={onDelete} editPath={getEditPath(u._id)} isSelf={u._id === currentUserId} />)}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export function UserList() {
  const dispatch = useDispatch();
  const { users = [], loading, error, isAdminDeleteUser } = useSelector((s) => s.usersState);
  const handleDelete = (e, id) => { e.target.disabled = true; dispatch(AdminDeleteUser(id)); };
  useEffect(() => {
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearError()) }); return; }
    if (isAdminDeleteUser) { toast.success('User deleted!', { position: 'bottom-center', onOpen: () => dispatch(isAdminDeleteUserClear()) }); }
    dispatch(adminGetUsersDetails());
  }, [dispatch, error, isAdminDeleteUser]);
  const bloggers = users.filter((u) => u.role === 'user');
  return (
    <>
      <MetaData title="Admin — Bloggers" />
      <AdminTable title="Bloggers" rows={bloggers} loading={loading} onDelete={handleDelete} currentUserId={null} getEditPath={(id) => `/admin/user/${id}`} />
    </>
  );
}

export function AdminList() {
  const dispatch = useDispatch();
  const { users = [], loading, error, isAdminDeleteUser } = useSelector((s) => s.usersState);
  const { user: currentUser } = useSelector((s) => s.authState);
  const handleDelete = (e, id) => { e.target.disabled = true; dispatch(AdminDeleteUser(id)); };
  useEffect(() => {
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearError()) }); return; }
    if (isAdminDeleteUser) { toast.success('Admin deleted!', { position: 'bottom-center', onOpen: () => dispatch(isAdminDeleteUserClear()) }); }
    dispatch(adminGetUsersDetails());
  }, [dispatch, error, isAdminDeleteUser]);
  const admins = users.filter((u) => u.role === 'admin');
  return (
    <>
      <MetaData title="Admin — Admins" />
      <AdminTable title="Admins" rows={admins} loading={loading} onDelete={handleDelete} currentUserId={currentUser?._id} getEditPath={(id) => `/admin/admin/${id}`} />
    </>
  );
}
