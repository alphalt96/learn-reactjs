import { Link } from 'react-router-dom';
import { LiveManagement } from './components/liveManagement';
import { fetchUser } from './utils/data';

function Home() {
  const user = fetchUser();

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="flex flex-col min-w-240 bg-green-200">
        {/* side bar */}
        <div className="h-100">
          logo
        </div>
        <div className="flex h-full col bg-red-100">
          {/* categories */}
          menu list
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="px-4 bg-white h-80 flex flex-row gap-5">
          {/* search bar + user icon */}
          <div className="w-full bg-yellow-100">
            search
          </div>
          {user ? (
            <div className="flex items-center">
              <Link to="/">
                <img className="w-20 rounded-lg" src={user.picture} alt="user-photo" />
              </Link>
            </div>
          ) : (
            <div className="flex text-center items-center">
              <Link
                to="/login"
                className="text-sm w-20 rounded-md bg-lime-300 hover:bg-lime-400 text-slate-400"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
        <LiveManagement />
      </div>
    </div>
  );
}

export default Home;
