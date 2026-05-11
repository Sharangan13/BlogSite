import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, clearAuthError } from '../../actions/UserActions';
import MetaData from '../layouts/MetaData';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.authState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); dispatch(login(email, password)); };
  useEffect(() => {
    if (isAuthenticated) { navigate('/'); return; }
    if (error) { toast.error(error, { position: 'bottom-center', onOpen: () => dispatch(clearAuthError) }); }
  }, [error, isAuthenticated, dispatch, navigate]);

  const inputCls = "w-full px-4 py-3 border border-gray-200 rounded-md text-sm bg-white text-gray-900 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-300";

  return (
    <Fragment>
      <MetaData title="Sign In" />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-10 bg-gray-50">
        <form className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-[440px] shadow-md flex flex-col gap-5" onSubmit={handleSubmit}>
          <h2 className="text-[1.7rem] font-bold text-gray-900" style={{fontFamily:'var(--font-display)'}}>Welcome back</h2>
          <p className="text-sm text-gray-400 -mt-3">Sign in to continue reading and writing.</p>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={inputCls} />
            <Link to="/password/forgot" className="text-xs text-blue-600 text-right font-medium hover:underline">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white border-none rounded-md text-sm font-semibold mt-2 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Create one</Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
}
