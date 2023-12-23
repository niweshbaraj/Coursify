/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import FormBox from "../components/FormBox.jsx";

// eslint-disable-next-line react/prop-types
function PersonalDetails({ formData, setFormData, disable }) {
  const { currentUser } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.profile);

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

  return (
    <div className="grid grid-rows-5 justify-start gap-y-3">
      <div className="flex flex-col items-start gap-x-5">
        <label
          htmlFor="name"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          disabled={disable}
          className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
        />
      </div>

      <div className="flex flex-col items-start gap-x-5">
        <label
          htmlFor="username"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) => {
            setFormData({ ...formData, username: e.target.value });
          }}
          disabled={disable}
          className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
        />
      </div>

      <div className="flex items-start flex-col gap-x-3">
        <label
          htmlFor="email"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.primary_email}
          onChange={(e) => {
            setFormData({ ...formData, primary_email: e.target.value });
          }}
          disabled={disable}
          className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
        />
      </div>

      <div className="flex items-start flex-col gap-x-3">
        <label
          htmlFor="password"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          disabled={disable}
          className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
        />
      </div>

      <div className="flex items-start flex-col gap-x-3">
        <label
          htmlFor="gender"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          Gender
        </label>
        {/* <FormBox
          boxtype="text"
          label={
            userProfile.gender == 0
              ? "Male"
              : userProfile.gender == 1
              ? "Female"
              : "Other"
          }
          onChange={(e) => {
            setFormData({ ...formData, gender: e.target.value });
          }}
          disabled={disable}
          c="bg-neutral-100 w-[455px] p-2"
        /> */}
        <select
          id="user_type"
          // value={
          //   formData.gender == 0
          //     ? "Male"
          //     : formData.gender == 1
          //     ? "Female"
          //     : "Other"
          // }
          value={formData.gender}
          defaultValue={formData.gender}
          onChange={(e) => {
            setFormData({ ...formData, gender: e.target.value });
          }}
          disabled={false}
          className="w-fit p-2 h-11 rounded-md border border-gray-300 bg-neutral-100 text-gray-900"
        >
          <option value={0}>Male</option>
          <option value={1}>Female</option>
          <option value={2}>Other</option>
        </select>
      </div>

      <div className="flex items-start flex-col gap-x-3">
        <label
          htmlFor="dob"
          className="text-lg font-semibold tracking-[1px] uppercase"
        >
          date of birth
        </label>
        <input
          type="datetime-local"
          id="dob"
          value={formData.dob}
          onChange={(e) => {
            setFormData({ ...formData, dob: e.target.value });
          }}
          disabled={disable}
          className="bg-neutral-100 w-[455px] p-2 rounded-md border border-gray-300 text-gray-900"
        />
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

      {/* <button
          disabled={page === 0}
          onClick={() => {
            setPage((currPage) => currPage - 1);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Prev
        </button> */}

      {/* <button
            onClick={() => {
              if (page === 3) {
                alert("FORM SUBMITTED");
                console.log(formData);
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === 3 ? "Submit" : "Next"}
          </button> */}
    </div>
  );
}

export default PersonalDetails;
