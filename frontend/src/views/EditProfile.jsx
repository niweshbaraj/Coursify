import { useState } from "react";
import { useSelector } from "react-redux";

import PersonalDetails from "./PersonalDetails.jsx";
import AddressDetails from "./AddressDetails.jsx";
import AdditionalDetails from "./AdditionalDetails.jsx";

const EditProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { userProfile, profError } = useSelector((state) => state.profile);
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: userProfile && userProfile.name,
    username: userProfile && userProfile.username,
    primary_email: userProfile && userProfile.primary_email,
    password: userProfile && userProfile.password,
    gender: userProfile && userProfile.gender == 0 ? "Male" : userProfile && userProfile.gender == 1 ? "Female" : "Other",
    user_type: userProfile && userProfile.user_type == 0 ? "SUPER ADMIN" : userProfile && userProfile.user_type == 1 ? "STUDENT" : userProfile && userProfile.user_type == 2 ? "ADMIN" : userProfile && userProfile.user_type == 3 ? "ADVISOR" : "ALUMNI",
    secondary_email: userProfile && userProfile.secondary_email,
    level: userProfile && userProfile.level == 0 ? "FOUNDATION" : userProfile && userProfile.level == 1 ? "DIPLOMA" : userProfile && userProfile.level == 2 ? "DEGREE" : "BS",
    status: userProfile.status == 0 ? "ACTIVE" : "INACTIVE",
    // dob: userProfile.dob,
    contact: userProfile && userProfile.contact,
    address: userProfile && userProfile.address,
    city: userProfile && userProfile.city,
    state: userProfile && userProfile.state,
    pincode: userProfile && userProfile.pincode,
    country: userProfile && userProfile.country,
    // profile_pic: userProfile.profile_pic,
  });

  const [disable, setDisable] = useState(true);

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

  
  const FormTitles = [
    "Personal Details",
    "Address Details",
    "Additional Details",
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <PersonalDetails
          formData={formData}
          setFormData={setFormData}
          disable={disable}
        />
      );
    } else if (page === 1) {
      return (
        <AddressDetails
          formData={formData}
          setFormData={setFormData}
          disable={disable}
        />
      );
    } else {
      return (
        <AdditionalDetails
          formData={formData}
          setFormData={setFormData}
          disable={disable}
        />
      );
    }
  };

  const updateDetails = async () => {
    const updatedData = {
      name: formData.name || (userProfile && userProfile.name),
      username: formData.username || (userProfile && userProfile.username),
      primary_email: formData.primary_email || (userProfile && userProfile.primary_email),
      password: formData.password || (userProfile && userProfile.password),
      gender: formData.gender || (userProfile.gender && userProfile.gender),
      user_type: formData.user_type || (userProfile.user_type && userProfile.user_type), 
      secondary_email: formData.secondary_email,
      status: formData.status || (userProfile.status && userProfile.status),
      dob: formData.dob || "2023-12-16T23:05",
      contact: formData.contact | "",
      address: formData.address || "",
      city: formData.city || "",
      state: formData.state || "",
      pincode: formData.pincode || "",
      country: formData.country || "",
      profile_pic: formData.profile_pic || (userProfile.profile_pic && userProfile.profile_pic),
    };
    try {
      
      console.log(formData);
      const res = await fetch(`/api/profile/${currentUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log(data.message);        
        setDisable(true);
        return;
      }
      alert("Profile Updated Successfully");
      setDisable(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid grid-rows-6 grid-cols-4 grid-flow-col relative">
      <div className="row-span-full w-4/5 h-screen bg-orange-500">
        <div>
          <img
            src={`data:image/png;base64, ${userProfile && userProfile.profile_pic}`}
            alt="StudentImage"
            className="flex items-center justify-center w-[220px] h-[200px] self-center cursor-pointer rounded-full object-cover mt-10 mx-auto"
          />

          <div className="flex flex-col items-center justify-center mt-8 p-4 mx-auto">
            <p className="text-white font-bold tracking-[1px]">
              {userProfile && userProfile.name}
            </p>
            <p className="text-white font-bold tracking-[1px]">
              {userProfile && userProfile.primary_email}
            </p>
            <p className="text-white font-bold tracking-[1px]">
              {userProfile && userProfile.contact}
            </p>
            <p className="text-white font-bold tracking-[1px]">
              {userProfile && userProfile.address}
            </p>
            <p className="text-white font-bold tracking-[1px]">{userProfile && userProfile.city} {userProfile && userProfile.state} </p>
            <p className="text-white font-bold tracking-[1px]">{userProfile && userProfile.pincode}{" "}{userProfile && userProfile.country}</p>
          </div>
        </div>

      </div>
      <div className="container relative h-fit mb-10 ml-28 w-fit col-span-3 row-span-full">
        <div className="flex flex-row gap-x-7">
          <div>
            <h1 className="text-black text-3xl text-center tracking-[2px] font-bold uppercase my-5">
              {userProfile && userProfile.username} {FormTitles[page]}
            </h1>
          </div>

          <div className="mt-5 ml-14">
            <button
              disabled={!disable}
              type="button"
              onClick={() => setDisable(false)}
              className="tracking-[2px] px-3 py-2 bg-orange-500 text-white font-bold rounded-[20px] text-xs
                        uppercase hover:bg-orange-900 disabled:opacity-80"
            >
              Edit {FormTitles[page]}
            </button>
          </div>
        </div>

        <div className="mt-5">
            {PageDisplay()}
        </div>

        {/* <button
            // disabled={disable}
            onClick={() => {
              if (page === 3) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
            className="bg-orange-500 text-white p-3 font-bold tracking-[2px] mb-3
                                        rounded-[30px] uppercase hover:opacity-95 w-[15vw] hover:bg-orange-800
                                        disabled:opacity-80"
          >
            {" "}
            Next
          </button> */}

        <div className="flex items-center justify-between gap-x-5 mt-8">
          {page > 0 && 
          <button
            onClick={() => {
              setPage((currPage) => currPage - 1);
              setDisable(true);
            }}
            className="bg-orange-500 text-white font-bold tracking-[2px] mb-3 px-3 py-2
          rounded-[30px] uppercase hover:opacity-95 hover:bg-orange-800
          disabled:opacity-80"
          >
            Previous
          </button>
          }

          <button
            onClick={() => {
              if (page === 2) {
                updateDetails();
              } else {
                setPage((currPage) => currPage + 1);
                setDisable(true);
              }
            }}
            className="bg-orange-500 text-white px-7 py-2 font-bold tracking-[2px] mb-3
          rounded-[30px] uppercase hover:opacity-95 hover:bg-orange-800
          disabled:opacity-80"
          >
            {page === 2 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
