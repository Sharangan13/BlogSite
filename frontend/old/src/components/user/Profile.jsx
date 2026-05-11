import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';

export default function Profile() {
  const { user } = useSelector((s) => s.authState);
  return (
    <>
      <MetaData title="My Profile" />
      <div className="max-w-[700px] mx-auto my-12 px-8">
        <div className="flex items-start gap-8 bg-white border border-gray-200 rounded-2xl p-10 shadow-sm max-sm:flex-col max-sm:items-center max-sm:text-center">
          <img
            className="w-[100px] h-[100px] rounded-full object-cover border-[3px] border-blue-600 shrink-0"
            src={user.avatar ?? '/images/avatar1.png'}
            alt={user.name}
          />
          <div>
            <h2 className="text-2xl font-bold mb-1 text-gray-900">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-400 text-xs mt-2">Member since {String(user.createdAt).substring(0, 10)}</p>
            <div className="flex gap-3 mt-5 flex-wrap max-sm:justify-center">
              <Link to="/myprofile/update" className="px-5 py-2 rounded-md text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors">Edit Profile</Link>
              <Link to="/myprofile/update/password" className="px-5 py-2 rounded-md text-sm font-semibold bg-white text-gray-600 border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all">Change Password</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
