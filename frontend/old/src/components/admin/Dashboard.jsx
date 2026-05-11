import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminGetBlogs } from '../../actions/BlogsActions';
import { adminGetUsersDetails } from '../../actions/AdminAction';
import Loader from '../layouts/Loder';
import MetaData from '../layouts/MetaData';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { blogs = [] } = useSelector((s) => s.blogsState);
  const { users = [], loading } = useSelector((s) => s.usersState);
  useEffect(() => { dispatch(adminGetBlogs()); dispatch(adminGetUsersDetails()); }, [dispatch]);
  const admins = users.filter((u) => u.role === 'admin').length;
  const bloggers = users.length - admins;
  const stats = [
    { label: 'Total Blogs', value: blogs.length, link: '/admin/blogs' },
    { label: 'Bloggers',    value: bloggers,      link: '/admin/users' },
    { label: 'Admins',      value: admins,        link: '/admin/admins' },
  ];

  return (
    <>
      <MetaData title="Admin Dashboard" />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar />
        <div className="flex-1 px-8 py-10 overflow-x-auto">
          <h1 className="text-2xl font-bold mb-8 text-gray-900" style={{fontFamily:'var(--font-display)'}}>Dashboard</h1>
          {loading ? <Loader /> : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
              {stats.map(({ label, value, link }) => (
                <div key={label} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-sm text-gray-400 font-medium mb-2">{label}</p>
                  <p className="text-[2.2rem] font-bold text-blue-600" style={{fontFamily:'var(--font-display)'}}>{value}</p>
                  <Link to={link} className="text-xs text-blue-600 font-semibold mt-3 inline-block">View all →</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
