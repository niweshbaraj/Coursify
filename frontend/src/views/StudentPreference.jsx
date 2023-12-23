import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
export default function StudentPreference() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    const { userProfile, profError } = useSelector((state) => state.profile);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        navigate('/preferences/course_recommendation');
    };
    return (
        <div>
            <div className='grid grid-rows-6 grid-cols-4 grid-flow-col relative'>
            <div className="row-span-full w-4/5 bg-orange-500">
        <div>
          <img
            src={`data:image/png;base64, ${userProfile.profile_pic}`}
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
                <form onSubmit={handleSubmit} className='col-span-3 row-span-5'>
                    <div className="container bg-gray-200 rounded-[20px] mt-8 mb-8 w-11/12 px-7 py-5">
                        <div className="text-black text-xl font-bold tracking-[2px] uppercase">Course Preferences</div>
                        <div className="container p-4 w-full h-fit mt-2 bg-zinc-100 rounded-[20px]">

                            <div className="grid gap-x-8 gap-y-6 mb-6 md:grid-cols-2">
                                <div className="ml-6">
                                    <label className="uppercase tracking-[2px]">Course 1</label>
                                    <input type="text" className="ml-2 rounded-md border border-slate-300 px-2" />
                                </div>
                                <div className="ml-6">
                                    <label className="uppercase tracking-[2px]">Course 2</label>
                                    <input type="text" className="ml-2 rounded-md border border-slate-300 px-2" />
                                </div>
                                <div className="ml-6">
                                    <label className="uppercase tracking-[2px]">Course 3</label>
                                    <input type="text" className="ml-2 rounded-md border border-slate-300 px-2" />
                                </div>
                                <div className="ml-6">
                                    <label className="uppercase tracking-[2px]">Course 4</label>
                                    <input type="text" className="ml-2 rounded-md border border-slate-300 px-2" />
                                </div>
                                <div>
                                    <label className="font-bold tracking-[2px] uppercase text-md">Learning Path</label>
                                </div>
                                <div></div>
                                <div className='flex items-center ml-6'>
                                    <input type='radio' value="male" name="level" className='bg-gray-100 border-gray-300 w-4 h-4' />
                                    <label className="ms-2 tracking-[2px] uppercase text-sm">Foundation Level</label>
                                </div>
                                <div className='flex items-center ml-6'>
                                    <input type='radio' value="male" name="gender" className='bg-gray-100 border-gray-300 w-4 h-4' />
                                    <label className="tracking-[2px] uppercase text-sm ms-2">Diploma Level</label>
                                </div>
                                <div className='flex items-center ml-6'>
                                    <input type='radio' value="male" name="gender" className='bg-gray-100 border-gray-300 w-4 h-4' />
                                    <label className="tracking-[2px] text-sm ms-2">B.Sc LEVEL</label>
                                </div>
                                <div className='flex items-center ml-6'>
                                    <input type='radio' value="male" name="gender" className='bg-gray-100 border-gray-300 w-4 h-4' />
                                    <label className="tracking-[2px] text-sm ms-2">B.S LEVEL</label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="container bg-gray-200 rounded-[20px] mt-8 mb-8 w-11/12 px-7 py-5 h-fit">
                        <div className="text-black text-xl font-bold tracking-[2px] uppercase">Other Preferences</div>
                        <div className="container p-4 w-full h-fit mt-2 bg-zinc-100 rounded-[20px]">

                            <div className="grid gap-x-4 gap-y-6 mb-6 md:grid-cols-2">
                                <div>
                                    <label className="ms-2 tracking-[2px] uppercase text-sm">No. Of Hours Per Week</label>
                                    <input type="number" min="1"className="ml-2 rounded-md border border-slate-300 px-2 h-7 w-24" />
                                </div>
                                <div>
                                    <label className="ms-2 tracking-[2px] uppercase text-sm" >Fields of Interest</label>
                                    <input type="text" className="ml-2 rounded-md border border-slate-300 px-2 h-7 w-48" />
                                </div>
                                <div>
                                    <label className="ms-2 tracking-[2px] uppercase text-sm" >Study Group</label>
                                    <input type="text" className="ml-2 rounded-md border border-slate-300 px-2 h-7 w-48" />
                                </div>
                                <div>
                                    <label className="ms-2 tracking-[2px] uppercase text-sm" >Others</label>
                                    <input type="text" className="ml-2 rounded-md border border-slate-300 px-2 h-7 w-48" />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='ml-96'>
                        
                        <button  className="px-3 py-1.5 bg-orange-500 rounded-[20px] text-white
                       font-bold hover:bg-orange-800
                       tracking-[2px]"> RECOMMEND ME </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
