import { NavLink, Link } from 'react-router-dom';
import { FiUser, FiMessageCircle } from 'react-icons/fi';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { RiLiveLine } from 'react-icons/ri';
import { MdOutlineLiveTv } from 'react-icons/md';

const inActivedStyles = 'flex flex-row items-center gap-5 pl-5 py-3 hover:bg-slate-100 hover:rounded';
const activedStyles = 'flex flex-row items-center gap-5 pl-5 py-3 rounded bg-slate-800 text-white';

export function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center">
        <Link
          to={'/'}
          className="block w-70 h-70">
          <MdOutlineLiveTv className="h-full w-full" />
        </Link>
      </div>
      <div className="pt-10 flex flex-col gap-y-3 px-2">
        <NavLink to={'/profile'}
          className={({ isActive }) => isActive ? activedStyles : inActivedStyles}
          onClick={closeSidebar}>
          <FiUser /> Profile
        </NavLink>
        <NavLink to={'/lives'}
          className={({ isActive }) => isActive ? activedStyles : inActivedStyles}
          onClick={closeSidebar}>
          <RiLiveLine /> Lives
        </NavLink>
        <NavLink to={'/analytics'}
          className={({ isActive }) => isActive ? activedStyles : inActivedStyles}
          onClick={closeSidebar}>
          <TbBrandGoogleAnalytics /> Analytics
        </NavLink>
        <NavLink to={'/messages'}
          className={({ isActive }) => isActive ? activedStyles : inActivedStyles}
          onClick={closeSidebar}>
          <FiMessageCircle /> Messages
        </NavLink>
      </div>
    </div>
  );
}
