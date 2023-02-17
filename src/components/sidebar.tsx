import { NavLink, Link } from 'react-router-dom';
import { FiUser, FiMessageCircle } from 'react-icons/fi';
import { TbBrandGoogleAnalytics } from 'react-icons/tb';
import { RiLiveLine } from 'react-icons/ri';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { MdOutlineLiveTv } from 'react-icons/md';
import { useState } from 'react';

const inActivedStyles = 'flex flex-row items-center gap-5 pl-5 py-3 hover:bg-slate-100 hover:rounded';
const activedStyles = 'flex flex-row items-center gap-5 pl-5 py-3 rounded bg-slate-800 text-white';

export function Sidebar({ closeSidebar }: { closeSidebar?: () => void }) {
  const [toggleSidebar, setToggleSidebar] = useState(true);
  const [arrowStatus, setArrowStatus] = useState(true); // true -> rotation down, false -> rotation up
  const [slideEffect, setSlideEffect] = useState('');

  const changeDropdownSidebar = () => {
    setSlideEffect(
      toggleSidebar ? 'animate-scroll-up origin-top' : 'animate-slide-down origin-top'
    )
    setArrowStatus(!arrowStatus);
    if (!toggleSidebar) setToggleSidebar(!toggleSidebar);
  }

  const onAnimationEnd = (event: any) => {
    if (event.animationName === 'scrollUp') {
      setToggleSidebar(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center">
        <Link
          to={'/'}
          className="block w-70 h-70">
          <MdOutlineLiveTv className="h-full w-full" />
        </Link>
      </div>
      <div>
        <div className="pt-10 px-2">
          <button
            className="bg-slate-200 w-full flex items-center pl-5 py-2 drop-shadow-md rounded"
            onClick={() => changeDropdownSidebar()}
          >
            Categories
            {arrowStatus ? (
              <MdArrowDropUp className='animate-rotate-180' />
            ) : (
              <MdArrowDropDown className='animate-rotate-180' />
            )}
          </button>
        </div>
        {toggleSidebar && (
          <div onAnimationEnd={onAnimationEnd} className={`flex flex-col mt-2 gap-y-3 px-2 ${slideEffect}`}>
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
        )}
      </div>
    </div>
  );
}
