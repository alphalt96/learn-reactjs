import { Link, Routes, Route } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { LiveManagement } from './components/liveManagement';
import { Sidebar } from './components/sidebar';
import { fetchUser } from './utils/data';
import { useState } from 'react';
import { Navbar } from './components/navbar';

function Home() {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const user = fetchUser();

  const closeSidebar = () => {
    setDisplaySidebar(false);
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      {/* sidebar for desktop devices */}
      <div className="md:flex hidden flex-col min-w-240">
        <Sidebar />
      </div>

      {/* navbar */}
      <div className="flex flex-col w-full pl-10">
        <div className="bg-white h-80 flex flex-row shrink-0 gap-5">
          <div className="md:hidden flex">
            <button onClick={e => setDisplaySidebar(true)}>
              <HiMenu fontSize={40} />
            </button>
          </div>
          {/* search bar + user icon */}
          <Navbar user={user} />
        </div>

        {/* sidebar for mobile devices */}
        {displaySidebar && (
          <div className="w-2/3 fixed bg-white h-full">
            <button
              className="absolute right-5 top-5"
              onClick={closeSidebar}>
              <MdCancel fontSize={40} />
            </button>
            <Sidebar closeSidebar={closeSidebar} />
          </div>
        )}

        {/* Routes definition */}
        <div className="overflow-scroll">
          <Routes>
            <Route path="/profile" />
            <Route path="/lives" element={<LiveManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Home;
