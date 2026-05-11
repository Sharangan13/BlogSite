import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../actions/UserActions';
import {
  IoCreateOutline,
  IoMenu,
  IoClose,
  IoSearch,
} from 'react-icons/io5';

function BlogSearch({ mobile = false, onSearchComplete }) {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword('');

      if (onSearchComplete) {
        onSearchComplete();
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center ${
        mobile ? 'w-full' : 'hidden md:flex flex-1 max-w-[460px]'
      }`}
    >
      <input
        type="text"
        placeholder="Search blogs..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 px-4 py-2.5 text-sm border border-r-0 border-gray-200 bg-gray-50 text-gray-900 rounded-l-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-gray-400"
      />

      <button
        type="submit"
        aria-label="Search"
        className="px-4 py-2.5 bg-blue-600 text-white rounded-r-xl hover:bg-blue-700 transition-all"
      >
        <IoSearch size={18} />
      </button>
    </form>
  );
}

function UserDropdown({ user, onLogout, mobile = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 ${
          mobile
            ? 'w-full justify-start px-3 py-3 rounded-xl hover:bg-gray-100'
            : 'px-2 py-1 rounded-full hover:bg-gray-100'
        } transition-all`}
      >
        <img
          src={user.avatar || '/images/avatar1.png'}
          alt={user.name}
          className="w-9 h-9 rounded-full object-cover border-2 border-blue-600"
        />

        <span className="text-sm font-semibold text-gray-800">
          {user.name || 'User'}
        </span>
      </button>

      {open && (
        <div
          className={`bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden z-50 ${
            mobile
              ? 'mt-2 w-full'
              : 'absolute top-[calc(100%+10px)] right-0 min-w-[220px]'
          }`}
        >
          {user.role === 'admin' && (
            <button
              onClick={() => go('/admin/dashboard')}
              className="block w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition-all"
            >
              Dashboard
            </button>
          )}

          <button
            onClick={() => go('/myprofile')}
            className="block w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition-all"
          >
            My Profile
          </button>

          <button
            onClick={() => go('/myblogs')}
            className="block w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition-all"
          >
            My Blogs
          </button>

          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="block w-full text-left px-5 py-3 text-sm text-red-600 hover:bg-gray-50 transition-all"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const { isAuthenticated, user } = useSelector(
    (state) => state.authState
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/');
    setMobileMenu(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-[1000] bg-white border-b border-gray-200 shadow-sm">
        <div className="h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="font-bold text-2xl text-blue-600 tracking-tight whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            The Blog
          </Link>

          {/* Desktop Search */}
          <BlogSearch />

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/blog/new"
              className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 hover:-translate-y-px transition-all"
            >
              <IoCreateOutline size={16} className="mr-1" />
              Write
            </Link>

            {isAuthenticated ? (
              <UserDropdown
                user={user}
                onLogout={handleLogout}
              />
            ) : (
              <Link
                to="/login"
                className="text-gray-600 text-sm px-4 py-2 rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all font-medium"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu((prev) => !prev)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-all"
          >
            {mobileMenu ? (
              <IoClose size={26} />
            ) : (
              <IoMenu size={26} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4 animate-fadeIn">
            {/* Mobile Search */}
            <BlogSearch
              mobile
              onSearchComplete={() => setMobileMenu(false)}
            />

            {/* Write Button */}
            <Link
              to="/blog/new"
              onClick={() => setMobileMenu(false)}
              className="w-full flex items-center justify-center bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all"
            >
              <IoCreateOutline size={18} className="mr-2" />
              Write Blog
            </Link>

            {/* User/Auth */}
            {isAuthenticated ? (
              <UserDropdown
                user={user}
                onLogout={handleLogout}
                mobile
              />
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="block w-full text-center text-gray-700 text-sm px-4 py-3 rounded-xl border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  );
}