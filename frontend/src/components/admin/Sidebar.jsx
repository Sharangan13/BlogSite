import { NavLink } from 'react-router-dom';
import { SlNotebook } from 'react-icons/sl';
import { LuUsers } from 'react-icons/lu';
import { RiAdminFill } from 'react-icons/ri';
import { MdDashboard } from 'react-icons/md';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: <MdDashboard />, label: 'Dashboard' },
  { to: '/admin/blogs',     icon: <SlNotebook />,  label: 'Blogs' },
  { to: '/admin/users',     icon: <LuUsers />,     label: 'Bloggers' },
  { to: '/admin/admins',    icon: <RiAdminFill />, label: 'Admins' },
];

export default function Sidebar() {
  return (
    <aside className="w-[230px] bg-white border-r border-gray-200 px-4 py-8 shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto max-md:w-[60px] max-md:px-2 max-sm:w-full max-sm:h-auto max-sm:static max-sm:flex max-sm:flex-row max-sm:border-r-0 max-sm:border-b max-sm:py-2 max-sm:px-4 max-sm:gap-2">
      <p className="text-[0.7rem] font-bold tracking-widest uppercase text-gray-400 px-3 py-2 mb-3 max-md:hidden max-sm:hidden">Admin Panel</p>
      <ul className="list-none flex flex-col gap-1 max-sm:flex-row">
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink to={to} className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-all
              ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
              max-md:justify-center max-sm:flex-col max-sm:text-[0.7rem] max-sm:gap-1 max-sm:py-2`
            }>
              {icon}
              <span className="max-md:hidden max-sm:!block">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
