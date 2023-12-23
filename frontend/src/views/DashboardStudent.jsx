import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


import {
  getProfileSuccess,
  getProfileFailure,
} from "../store/user/profileSlice";

export default function DashboardStudent() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { userProfile, profError } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const currentUser = {
  //   "id" : 1
  // }
  // const userProfile = {
  //   "id" : 1,
  //   "name"  : "John Doe",
  //   "username" : "johndoe",
  //   "primary_email" : "johndoe@gmail.com",
  //   "contact" : "9876543210",
  //   "address" : "123, Main Street",
  //   "city" : "Mumbai",
  //   "state" : "Maharashtra",
  //   "pincode" : "400001",
  //   "country" : "India"
  // }

  const [profile, setProfile] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/profile/${currentUser.id}`, {
          headers: { Authorization: `Bearer ${currentUser.token}` },
        });
        const data = await res.json();
  
        if (!isCancelled) {
  
          if (data.success === false) {
            dispatch(getProfileFailure(data));
            return;
          }
  
          dispatch(getProfileSuccess(data));
          setProfile(data);
          console.log(data);
        }
        } catch (error) {
            dispatch(getProfileFailure(error));
        }
      }
  
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);


  return (
    <div className="grid grid-rows-6 grid-cols-4 grid-flow-col relative">
      <div className="row-span-full h-screen w-4/5 bg-orange-500">
        <div>
          <img
            // src="https://c8.alamy.com/comp/2RJ89AN/hipster-bearded-man-face-fashion-guy-with-hat-and-glasses-cartoon-vector-illustration-2RJ89AN.jpg"
            src={`data:image/png;base64, ${userProfile && userProfile.profile_pic}`}
            alt="StudentImage"
            className="flex items-center justify-center w-[220px] h-[200px] self-center cursor-pointer rounded-full object-cover mt-10 mx-auto"
          />

          <div className="flex flex-col items-center justify-center mt-8 p-4 mx-auto">
            <p className="text-white font-bold font-['Arimo']">{userProfile && userProfile.name}</p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.primary_email}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.contact}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile && userProfile.address}
            </p>
            <p className="text-white font-bold font-['Arimo']">
            {userProfile && userProfile.city} {userProfile && userProfile.state} {userProfile && userProfile.pincode} {userProfile && userProfile.country}
            </p>
          </div>
        </div>
          <button type="button"
          className="flex items-center justify-center bg-white text-orange-500 
                    text-md font-bold rounded-[30px] tracking-[2px] 
                    uppercase mt-10 mx-auto hover:bg-slate-300 py-4 px-3 "
        >
            <Link to={`/view_profile/${currentUser.id}`}>
                View Full Profile
            </Link>
        </button>
        
      </div>
      <div className="container bg-gray-200 col-span-3 row-span-3 rounded-[20px] mt-8 w-11/12 px-7 py-5">
        <div className="text-black text-xl font-bold tracking-[2px]">
          ENROLLED COURSES
        </div>
        {userProfile && userProfile.enrolled_courses.length > 0 ? (
        <div className="w-full h-5/6 mt-2 bg-zinc-100 rounded-[20px]">
        <table>
                        <tbody>
                        {userProfile && userProfile.enrolled_courses.map((course) => (
                            <tr key={course.id}>
                                <td className="tracking-[1px] uppercase text-sm px-6 py-1">{course.name}</td>
                                <td className="tracking-[2px] text-sm px-24 py-1">{course.course_id}</td>
                                <td className="tracking-[2px] text-sm px-24 py-1">{course.level == 0 ? "FOUNDATION" : course.level == 1 ?"DIPLOMA" : course.level == 2 ? "DEGREE" : "BS"}</td>
                                <td className="pr-4 pl-28 py-1">
                                    <button onClick={()=>{navigate(`/courses/${course.id}`)}} className="px-1.5 py-0.5 text-xs 
                                                bg-orange-500 hover:bg-orange-800 
                                                text-bold text-white tracking-[2px] uppercase rounded-[30px]">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}   
                        </tbody>
                    </table>
        </div>
        ) : (
          <div className="w-full h-fit mt-2 bg-zinc-100 rounded-[20px]">
          <h1 className="text-3xl text-center font-bold my-7 tracking-[2px]">
          Currently, you are not enrolled in any courses.
        </h1>
        </div>
        )}
      </div>
      <div className="container bg-gray-200 col-span-3 row-span-3 rounded-[20px] mt-8 mb-8 w-11/12 px-7 py-5">
        <div className="text-black text-xl font-bold tracking-[2px]">
          COMPLETED COURSES
        </div>
        {userProfile && userProfile.completed_courses.length > 0 ? (
        <div className="w-full h-[249px] mt-2 bg-zinc-100 rounded-[20px]">
        <table>
                        <tbody>
                        {userProfile && userProfile.completed_courses.map((course_com) => (
                            <tr key={course_com.id}>
                                <td className="tracking-[1px] uppercase text-sm px-6 py-1">{course_com.name}</td>
                                <td className="tracking-[2px] text-sm px-24 py-1">{course_com.course_id}</td>
                                <td className="tracking-[2px] text-sm px-24 py-1">{course_com.level == 0 ? "FOUNDATION" : course_com.level == 1 ?"DIPLOMA" : course_com.level == 2 ? "DEGREE" : "BS"}</td>
                                <td className="pr-4 pl-28 py-1">
                                    <button onClick={()=>{navigate(`/courses/${course_com.id}`)}} className="px-1.5 py-0.5 text-xs 
                                                bg-orange-500 hover:bg-orange-800 
                                                text-bold text-white tracking-[2px] uppercase rounded-[30px]">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}   
                        </tbody>
                    </table>
        </div>
        ) : (
          <div className="w-full h-fit mt-2 bg-zinc-100 rounded-[20px]">
          <h1 className="text-3xl text-center font-bold my-7 tracking-[2px]">
          Currently, you are not enrolled in any courses.
        </h1>
        </div>
        )}
      </div>
    </div>
  );
}
