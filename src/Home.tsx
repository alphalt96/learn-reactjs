import { LiveManagement } from './components/liveManagement';

function Home() {
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
        <div className="bg-white h-80 flex flex-row">
          {/* search bar + user icon */}
          <div className="w-full bg-yellow-100">
            search
          </div>
          <div className="bg-pink-200 ">
            user logo
          </div>
        </div>
        <LiveManagement/>
      </div>
    </div>
  );
}

export default Home;
