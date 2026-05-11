import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAuthError, forgotPassword, resetPassword, updatePassword, updateProfile, updatedStateAsFalse } from '../../actions/UserActions';
import MetaData from '../layouts/MetaData';

const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300";
const cardCls = "bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-[440px] shadow-md flex flex-col gap-5";
const pageCls = "min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-gray-50";
const btnCls = "w-full py-3 bg-blue-600 text-white border-none rounded-md text-sm font-semibold mt-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors";

export function UpdateProfile() {
  const dispatch = useDispatch();
  const { error, user, isUpdated } = useSelector((s) => s.authState);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/avatar1.png');
  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => { if (reader.readyState === 2) { setAvatarPreview(reader.result); setAvatar(e.target.files[0]); } };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name); formData.append('email', email);
    if (avatar) formData.append('avatar', avatar);
    dispatch(updateProfile(formData));
  };
  useEffect(() => { if (user) { setName(user.name); setEmail(user.email); if (user.avatar) setAvatarPreview(user.avatar); } }, [user]);
  useEffect(() => {
    if (isUpdated) { toast.success('Profile updated!', { position: 'bottom-center', onOpen: () => dispatch(updatedStateAsFalse) }); }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearAuthError) }); }
  }, [isUpdated, error, dispatch]);

  return (
    <>
      <MetaData title="Edit Profile" />
      <div className={pageCls}>
        <form className={cardCls} onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className="text-[1.7rem] font-bold text-gray-900" style={{fontFamily:'var(--font-display)'}}>Edit Profile</h2>
          <p className="text-sm text-gray-400 -mt-3">Update your personal information.</p>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></div>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Avatar</label>
            <div className="flex items-center gap-4">
              <img src={avatarPreview} alt="Avatar preview" className="w-[68px] h-[68px] rounded-full object-cover border-2 border-gray-200" />
              <label htmlFor="avatar-update" className="inline-block text-center px-5 py-2 bg-gray-100 border-2 border-dashed border-gray-400 rounded-md text-sm font-medium text-gray-600 cursor-pointer hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all">Change photo</label>
              <input id="avatar-update" type="file" name="avatar" accept=".jpg,.jpeg,.png" onChange={onChangeAvatar} className="hidden" />
            </div>
          </div>
          <button type="submit" className={btnCls}>Save Changes</button>
        </form>
      </div>
    </>
  );
}

export function UpdatePassword() {
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((s) => s.authState);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); dispatch(updatePassword({ oldPassword, password })); };
  useEffect(() => {
    if (isUpdated) { toast.success('Password updated!', { position: 'bottom-center' }); setOldPassword(''); setPassword(''); dispatch(updatedStateAsFalse); }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearAuthError) }); }
  }, [isUpdated, error, dispatch]);
  return (
    <>
      <MetaData title="Change Password" />
      <div className={pageCls}>
        <form className={cardCls} onSubmit={handleSubmit}>
          <h2 className="text-[1.7rem] font-bold text-gray-900" style={{fontFamily:'var(--font-display)'}}>Change Password</h2>
          <p className="text-sm text-gray-400 -mt-3">Keep your account secure.</p>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">Current Password</label><input type="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="••••••••" className={inputCls} /></div>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">New Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} /></div>
          <button type="submit" className={btnCls}>Update Password</button>
        </form>
      </div>
    </>
  );
}

export function ForgotPassword() {
  const dispatch = useDispatch();
  const { error, message } = useSelector((s) => s.authState);
  const [email, setEmail] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); dispatch(forgotPassword({ email })); };
  useEffect(() => {
    if (message) { toast.success(message, { position: 'bottom-center' }); setEmail(''); }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearAuthError) }); }
  }, [message, error, dispatch]);
  return (
    <>
      <MetaData title="Forgot Password" />
      <div className={pageCls}>
        <form className={cardCls} onSubmit={handleSubmit}>
          <h2 className="text-[1.7rem] font-bold text-gray-900" style={{fontFamily:'var(--font-display)'}}>Reset Password</h2>
          <p className="text-sm text-gray-400 -mt-3">We'll send a reset link to your email.</p>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">Email</label><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} /></div>
          <button type="submit" className={btnCls}>Send Reset Link</button>
        </form>
      </div>
    </>
  );
}

export function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, resetPasswordvalue } = useSelector((s) => s.authState);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); dispatch(resetPassword({ password, confirmPassword }, token)); };
  useEffect(() => {
    if (resetPasswordvalue) { toast.success('Password reset successfully!', { position: 'bottom-center' }); navigate('/'); }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearAuthError) }); }
  }, [resetPasswordvalue, error, dispatch, navigate]);
  return (
    <>
      <MetaData title="Set New Password" />
      <div className={pageCls}>
        <form className={cardCls} onSubmit={handleSubmit}>
          <h2 className="text-[1.7rem] font-bold text-gray-900" style={{fontFamily:'var(--font-display)'}}>New Password</h2>
          <p className="text-sm text-gray-400 -mt-3">Choose a strong password.</p>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">Password</label><input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} /></div>
          <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-600">Confirm Password</label><input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className={inputCls} /></div>
          <button type="submit" className={btnCls}>Set Password</button>
        </form>
      </div>
    </>
  );
}
