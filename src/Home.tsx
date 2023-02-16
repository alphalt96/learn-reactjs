import { Link, Routes, Route } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';
import { LiveManagement } from './components/liveManagement';
import { Sidebar } from './components/sidebar';
import { fetchUser } from './utils/data';
import { useState } from 'react';
import { Navbar } from './components/navbar';
import classes from './Home.module.css';
import Carousel from './components/carousel';

import temporaryImage1 from './assets/1.jpeg';
import temporaryImage2 from './assets/2.jpg';
import temporaryImage3 from './assets/3.jpg';

const data = [
  {
    destination: '/lives',
    img: temporaryImage1
  },
  {
    destination: '/profile',
    img: temporaryImage2
  },
  {
    destination: '/analysis',
    img: temporaryImage3
  }
];

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
          <div className={`w-2/3 fixed bg-white h-full ${classes.animateSlideIn}`}>
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
            <Route path="/" element={<HomeContent />} />
            <Route path="/profile" />
            <Route path="/lives" element={<LiveManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <div>
      <Carousel
        width={300}
        height={300}
      >
        {data.map(item => (
          <div>
            <Link to={item.destination}>
              <img src={item.img} alt="photo" />
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Home;
