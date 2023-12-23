/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useState } from "react";


// eslint-disable-next-line react/prop-types
function AdditionalDetails({ formData, setFormData, disable }) {
  
  const { userProfile } = useSelector((state) => state.profile);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (file) => {
    const base64 = await convertToBase64(file);
    console.log(base64);
    return base64;
  };

  return (
    <div className="grid grid-rows-6 justify-start gap-y-3">
      <div className="flex items-start flex-col">
        <label
          htmlFor="name"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          Profile Picture
        </label>
        <input
          type="file"
          id="profile_pic"
          accept="image/*"
          // value={formData.profile_pic}
          onChange={(e) => {
            setFormData({ ...formData, profile_pic: handleFileUpload(e.target.files[0]) });
          }}
          disabled={disable}
          className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
        />
      </div>

      <div className="flex items-start flex-col">
        <label
          htmlFor="status"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          Status
        </label>
        {/* <FormBox
          boxtype="text"
          label={userProfile.status}
          onChange={(e) => {
            setFormData({ ...formData, status: e.target.value });
          }}
          disabled={disable}
          c="bg-neutral-100 w-[455px] p-2"
        /> */}
        <select
          id="status"
          value={formData.status}
          onChange={(e) => {
            setFormData({ ...formData, status: e.target.value });
          }}
          disabled={disable}
          className="w-96 p-2 h-11 rounded-md border border-gray-300 bg-neutral-100 text-gray-900"
        >
          <option value={0} selected={userProfile.status == true ? true : false}>ACTIVE</option>
          <option value={1} selected={userProfile.status == false ? true : false}>INACTIVE</option>
        </select>
      </div>

      <div className="flex items-start flex-col">
        <label
          htmlFor="level"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          Level
        </label>
        <select
          id="level"
          
          value={formData.level}
          onChange={(e) => {
            setFormData({ ...formData, level: e.target.value });
          }}
          disabled={disable}
          className="w-96 p-2 h-11 rounded-md border border-gray-300 bg-neutral-100 text-gray-900"
        >
          <option value={0}>FOUNDATION</option>
          <option value={1}>DIPLOMA</option>
          <option value={2}>DEGREE</option>
          <option value={3}>BS</option>
          </select>
      </div>

      <div className="flex items-start flex-col">
        <label
          htmlFor="user_type"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          User Type
        </label>
        <select
          id="user_type"
          onChange={(e) => {
            setFormData({ ...formData, user_type: e.target.value });
          }}
          disabled={true}
          className="w-96 p-2 h-11 rounded-md border border-gray-300 bg-neutral-100 text-gray-900"
        >
          <option value={0} selected={userProfile.user_type == 0 ? true : false}>Super Admin</option>
          <option value={1} selected={userProfile.user_type == 1 ? true : false}>Student</option>
          <option value={2} selected={userProfile.user_type == 2 ? true : false}>Admin</option>
          <option value={3} selected={userProfile.user_type == 3 ? true : false}>Advisor</option>
          <option value={4} selected={userProfile.user_type == 4 ? true : false}>Alumni</option>
        </select>
      </div>

    </div>
  );
}

export default AdditionalDetails;
