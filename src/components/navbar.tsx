import { Link } from 'react-router-dom';
import { CiSearch, CiLogin } from 'react-icons/ci';

export function Navbar({ user }: { user: any }) {
  return (
    <div className="flex flex-row w-full gap-2">
      <div className="w-full flex items-center pr-5 relative">
        <input className="w-full bg-slate-100 rounded-md outline-none pl-5 pr-20 py-2" type="text" name="" id="" />
        <CiSearch className="absolute right-10 cursor-pointer" fontSize={25} />
      </div>
      {user ? (
        <div className="flex items-center">
          <Link to="/" className="mr-10">
            <img className="w-14 rounded-lg" src={user.picture} alt="user-photo" />
          </Link>
        </div>
      ) : (
        <div className="flex text-center items-center">
          <Link
            to="/login"
            className="text-sm w-10 h-10 mr-10 flex justify-center items-center rounded-md bg-lime-300 hover:bg-lime-400 transition duration-700 hover:scale-105"
          >
            <CiLogin fontSize={20} className="text-white" />
          </Link>
        </div>
      )}
    </div>
  )
}
