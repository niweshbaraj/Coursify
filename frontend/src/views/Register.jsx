import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import FormBox from "../components/FormBox.jsx";
import Sidebar from "../components/Sidebar.jsx";
import RegisterImg from "../assets/RegisterImg.png";

function Register() {
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const registerData = {
    username: formData["Username"],
    name: formData["First Name"] + " " + formData["Last Name"],
    password: formData["Password"],
    gender:
      formData["Gender"] === "male"
        ? 0
        : formData["Gender"] === "female"
        ? 1
        : 2,
    primary_email: formData["Email"],
  };
  console.log(registerData);

  const handleSuperAdminRegister = async () => {
    const superKey = prompt("Enter Your Super Admin Key");
    if (superKey === 1234 || superKey === "1234") {
      alert("You can register as Super Admin. Fill your credentials and you will be registered as Super Admin.")
      navigate("/super-admin/register");
    }else {
      alert("Wrong Key");
      navigate("/register")
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      // const url = "/api/register" ? location.pathname == "/register"  : "/api/super_admin/register";
      const res = await fetch(`/api/${location.pathname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (!res.ok) {
        setError(true);
        return;
      }
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    
    <div className="flex">
      <div className="w-1/3">
        <Sidebar imgAdd={RegisterImg} txt="Image of Person registering" c="ml-20 mt-20" />
      </div>
      <div className="w-2/3 container relative h-[85vh] mb-10 bg-zinc-300 rounded-[10px] p-3 max-w-lg mx-auto mt-8">
        <h1 className="text-3xl text-center tracking-[2px] font-bold my-5 uppercase">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-rows-6 justify-items-center gap-y-3"
        >
          <div className="flex items-center justify-between gap-x-3">
            <FormBox
              boxType="text"
              label="First Name"
              handleChange={handleChange}
              c="bg-neutral-100 w-56 p-2"
            />

            <FormBox
              boxType="text"
              label="Last Name"
              handleChange={handleChange}
              c="bg-neutral-100 w-56 p-2"
            />
          </div>

          <FormBox
            boxType="text"
            label="Username"
            handleChange={handleChange}
            c="bg-neutral-100 w-[455px] p-2"
          />

          <FormBox
            boxType="email"
            label="Email"
            handleChange={handleChange}
            c="bg-neutral-100 w-[455px] p-2"
          />

          <FormBox
            boxType="password"
            label="Password"
            handleChange={handleChange}
            c="bg-neutral-100 w-[455px] p-2"
          />

          <FormBox
            boxType="password"
            label="Confirm Password"
            handleChange={handleChange}
            c="bg-neutral-100 w-[455px] p-2"
          />

          <div className="flex flex-row gap-24">
            <div className="flex items-center">
              <input
                type="radio"
                value="male"
                id="Gender"
                name="gender"
                className="bg-gray-100 border-gray-300 w-4 h-4"
                onChange={handleChange}
              />
              <label className="font-semibold ms-2">Male</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="female"
                id="Gender"
                name="gender"
                className="bg-gray-100 border-gray-300 w-4 h-4"
                onChange={handleChange}
              />
              <label className="font-semibold ms-2">Female</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="other"
                id="Gender"
                name="gender"
                className="bg-gray-100 border-gray-300 w-4 h-4"
                onChange={handleChange}
              />
              <label className="font-semibold ms-2">Other</label>
            </div>
          </div>

          <button
            disabled={loading}
            className="bg-orange-500 text-white font-bold tracking-[2px] mb-2
                                        p-3 rounded-[30px] uppercase hover:opacity-95 w-[15vw] hover:bg-orange-800
                                        disabled:opacity-80"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <div className="flex gap-2 mt-5 tracking-[1px] bottom-12 inset-x-36 absolute">
          <p onClick={handleSuperAdminRegister} className="text-stone-800 font-bold hover:cursor-pointer hover:underline">Register as Super Admin</p>
        </div>
        <div className="flex gap-2 mt-5 tracking-[1px] bottom-5 inset-x-36 absolute">
          <p>Have an account?</p>
          <Link to="/login">
            <span className="text-stone-800 font-bold">Login</span>
          </Link>
        </div>
        <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      </div>
    </div>
  );
}

export default Register;
