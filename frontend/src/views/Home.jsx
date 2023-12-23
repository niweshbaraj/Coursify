import { Link } from 'react-router-dom';

import HomeImg from '../assets/HomePage.png';

function Home() {
  return (
    <div className="flex bg-orange-500 gap-5 relative h-screen">
      <div className="w-1/3 mt-6 ml-6">
        <img src={HomeImg} alt="Guy with a cat" />
      </div>

      <div className="w-2/3">
      <h1 className="text-white text-9xl font-bold tracking-[6px] uppercase mt-6 ml-8">
        Coursify
      </h1>
      <h3 className="text-zinc-800 text-xl font-bold tracking-[2px] ml-36" >Learning Path Recommendation System</h3>
      <div className='flex gap-x-20 absolute bottom-40 right-80'>
        <div className="bg-white text-orange-500 p-3 font-bold tracking-[2px] 
                                        mb-3 rounded-[30px] uppercase 
                                        hover:opacity-95 text-xl px-6 py-3"><Link to="/register">Register</Link></div>
        <div className="bg-white text-orange-500 p-3 font-bold tracking-[2px] 
                                        mb-3 rounded-[30px] uppercase 
                                        hover:opacity-95 text-xl px-8 py-3"><Link to="/login">Login</Link></div>
      </div>
      </div>
      
      
    </div>
  );
}

export default Home;
