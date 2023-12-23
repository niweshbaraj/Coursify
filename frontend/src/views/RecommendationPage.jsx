import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PenPencil from "../assets/PenPencil.png";

export default function RecommendationPage() {
  const { currentUser } = useSelector((state) => state.user);
  const [paths, setPaths] = useState([]);
  const navigate = useNavigate();
  let i = 0;

  const imageList = ["learn_1", "learn_2", "learn_3", "learn_4", "learn_5", "learn_6", "learn_7"];

  const recommendedCourses = [
    { id: 1, name: "English" },
    { id: 2, name: "Maths 2" },
    { id: 3, name: "Python" },
  ];

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/recommendation-path", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
            "Response-Type": "application/json",
          },
          body: JSON.stringify({ n_hours: 4 }),
        });
        const data = await res.json();

        if (!isCancelled) {
          if (!res.ok) {
            console.log(data);
            return;
          }
          setPaths(data);
          console.log(paths);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div>
      <div className="grid grid-rows-6 grid-cols-4 grid-flow-col relative">
        <div className="w-2/7 row-span-full absolute right-0 h-screen bg-orange-500">
          <h3 className="text-zinc-950 text-xl text-center p-4 font-bold tracking-[2px] mt-10 uppercase">
            Recommended Courses
          </h3>
          <div className="items-center justify-center w-[300px] h-[303px] bg-orange-400 rounded-[20px] py-8 mx-auto">
          {recommendedCourses.length > 0 ? (
           recommendedCourses.map((recomnd) => (
            <div key={recomnd.id} className="flex items-center justify-center gap-3 p-5">
              <h6 className="text-black text-md font-bold tracking-[2px] uppercase">
                {recomnd.name}
              </h6>
              <button
                type="button"
                onClick={() => navigate(`/courses/${recomnd.id}`)}
                className="w-[130px] h-[35px] bg-orange-500 text-white  
                                                            rounded-[20px] uppercase hover:bg-orange-800
                                                            tracking-[2px] text-xs font-semibold"
              >
                View Details
              </button>
            </div>
             ))
             ) : (
               <h1 className="items-center text-3xl text-center font-bold my-7 tracking-[2px]">
                 This information is not available yet.
               </h1>
             )}
          </div>
        </div>

        <div className="col-span-3 ">
          {paths.length > 0 ? (
            paths.map((path) => (
              <div
                key={path.path.path_id}
                className="container bg-gray-200 rounded-[20px] mt-8 ml-8 w-11/12 px-7 py-5"
              >
                <div className="flex flex-row gap-x-8">
                  <img src={`/learn/${
                    imageList[Math.floor(Math.random() * imageList.length)]
                  }.png`} >

                  </img>
                  <div>
                    <p onClick={() => navigate("/preferences/recommendation-status")} className="font-bold tracking-[2px] text-xl">
                      Learning Path {++i}
                    </p>
                    
                    <p className="tracking-[1px]">
                    Foundation : {path.path.foundation.join(' -> ')}
                    </p>
                    <p className="tracking-[1px]">
                    Diploma : {path.path.diploma.join(' -> ')}
                    </p>
                    <p className="tracking-[1px]">
                    Degree : {path.path.foundation.join(' -> ')}
                    </p>
                    <p className="tracking-[1px]">
                    BS : {path.path.diploma.join(' -> ')}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="container bg-gray-200 rounded-[20px] mt-8 ml-8 w-11/12 px-7 py-5">
              <div className="flex flex-row gap-x-8">
                <h1 className="items-center text-3xl text-center font-bold my-7 tracking-[2px]">
                  No recommendation to show
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
