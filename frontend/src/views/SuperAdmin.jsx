import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  getProfileSuccess,
  getProfileFailure,
} from "../store/user/profileSlice";

const SuperAdmin = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.profile);
  const [ formData, setFormData ] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const loading = false;
  // const error = false;
  // const [profile, setProfile] = useState("");
  // const currentUser = {
  //   "id": 1,};
  // const userProfile  = {
  //   "id": 1,
  //   "name": "John Doe",
  //   "username": "johndoe",
  //   "primary_email": "johndoe@gmail.com",
  //   "contact": "9876543210",
  //   "address": "123, Main Street",
  //   "city": "Mumbai",
  //   "state": "Maharashtra",
  //   "pincode": "400001",
  //   "profile_pic": "",
  // }

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
          // setProfile(data);
          console.log(data);
        }
      } catch (error) {
        dispatch(getProfileFailure(error));
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const changeRoleData = {
    user_id: formData["user_id"],
    user_type: formData["user_type"],
  };
  console.log(changeRoleData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // dispatch(signInStart());
      const res = await fetch(
        `/api/super-admin/change_role/${formData.user_id}?user_type=${formData.user_type}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
          
          body: "JSON.stringify(formData)",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error(data);
        return;
      }
      alert("Role Assigned Successfully");
      setFormData({});
      navigate(`/super-admin/dashboard/${currentUser.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-rows-2 grid-cols-4 grid-flow-col relative">
      <div className="row-span-full h-screen w-4/5 bg-orange-500">
        <div>
          <img
            src={`data:image/png;base64, ${userProfile.profile_pic}`}
            alt="StudentImage"
            className="flex items-center justify-center w-[220px] h-[200px] self-center cursor-pointer rounded-full object-cover mt-10 mx-auto"
          />

          <div className="flex flex-col items-center justify-center mt-8 p-4 mx-auto">
            <p className="text-white font-bold font-['Arimo']">
              {userProfile.name}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile.primary_email}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile.contact}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile.address}
            </p>
            <p className="text-white font-bold font-['Arimo']">
              {userProfile.city} {userProfile.state} {userProfile.pincode} {" "}
              {userProfile.country}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="flex items-center justify-center bg-white text-orange-500 
                        text-md font-bold rounded-[30px] tracking-[2px] mb-10
                        uppercase mt-10 mx-auto hover:bg-slate-300 py-4 px-3 "
        >
          <Link to={`/view_profile/${currentUser.id}`}>View Full Profile</Link>
        </button>
      </div>

      <div className="container relative w-fit h-fit bg-zinc-300 rounded-[10px] p-6 mx-auto mt-20 row-span-full col-span-3">
        <h1 className="text-3xl text-center font-bold my-7 tracking-[2px] uppercase">
          Assign User Role
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-rows-3 justify-items-center gap-2"
        >
          <input
            type="number"
            id="user_id"
            value={formData["user_id"] || ""}
            placeholder="Enter Id of User"
            onChange={handleChange}
            className="bg-neutral-100 w-96 p-2 h-11 mb-3 rounded-md border border-gray-300 text-gray-900"
          />

          <select id="user_type" 
            value={formData["user_type"] || ""}
            onChange={handleChange}
            className='w-96 p-2 h-11 rounded-md border border-gray-300 bg-neutral-100 text-gray-900'>
                                <option>Choose User Type</option>
                                <option value="0">Super Admin</option>
                                <option value="1">Student</option>
                                <option value="2">Admin</option>
                                <option value="3">Advisor</option>
                                <option value="4">Alumni</option>
          </select>

          <button
            disabled={loading}
            className="bg-orange-500 text-white p-3 font-bold tracking-[2px] mb-2 mt-4
                                        rounded-[30px] uppercase hover:opacity-95 w-[15vw] hover:bg-orange-800
                                        disabled:opacity-80"
          >
            {loading ? "Loading..." : "Assign Role"}
          </button>
        </form>
        <p className="text-red-700 mt-5 font-semibold text-center">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
      </div>

      {/* <button className="bg-orange-500 text-white p-3 font-bold tracking-[2px] mb-3
          rounded-[30px] uppercase hover:opacity-95 w-[15vw] hover:bg-orange-800
          disabled:opacity-80">Update</button>*/}
    </div>
  );
};

export default SuperAdmin;
