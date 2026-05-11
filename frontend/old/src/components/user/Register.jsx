import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, clearAuthError } from '../../actions/UserActions';
import MetaData from '../layouts/MetaData';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.authState);
  const [fields, setFields] = useState({ name: '', email: '', password: '' });
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/avatar1.png');
  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => { if (reader.readyState === 2) { setAvatarPreview(reader.result); setAvatar(e.target.files[0]); } };
    } else { setFields({ ...fields, [e.target.name]: e.target.value }); }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', fields.name); formData.append('email', fields.email); formData.append('password', fields.password); formData.append('avatar', avatar);
    dispatch(register(formData));
  };
  useEffect(() => {
    if (isAuthenticated) { navigate('/'); return; }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearAuthError) }); }
  }, [error, isAuthenticated, dispatch, navigate]);

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300";

  return (
    <>
      <MetaData title="Create Account" />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-gray-50">
        <form className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-[440px] shadow-md flex flex-col gap-5" onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="text-[1.7rem] font-bold text-gray-900" style={{fontFamily:'var(--font-display)'}}>Join the blog</h2>
          <p className="text-sm text-gray-400 -mt-3">Create a free account to start writing.</p>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Full Name</label>
            <input name="name" type="text" required value={fields.name} onChange={onChange} placeholder="Jane Doe" className={inputCls} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input name="email" type="email" required value={fields.email} onChange={onChange} placeholder="you@example.com" className={inputCls} />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input name="password" type="password" required value={fields.password} onChange={onChange} placeholder="••••••••" className={inputCls} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Avatar</label>
            <div className="flex items-center gap-4">
              <img src={avatarPreview} alt="Avatar preview" className="w-[68px] h-[68px] rounded-full object-cover border-2 border-gray-200" />
              <label htmlFor="avatar-input" className="inline-block text-center px-5 py-2 bg-gray-100 border-2 border-dashed border-gray-400 rounded-md text-sm font-medium text-gray-600 cursor-pointer hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">
                Choose a photo
              </label>
              <input id="avatar-input" type="file" name="avatar" accept=".jpg,.jpeg,.png" onChange={onChange} className="hidden" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white border-none rounded-md text-sm font-semibold mt-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
          <p className="text-center text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Sign in</Link>
          </p>
        </form>
      </div>
    </>
  );
}
