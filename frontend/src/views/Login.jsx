import { Label, Modal } from "flowbite-react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../store/user/userSlice.js";
// import { getProfileSuccess, getProfileFailure } from '../store/user/profileSlice.js';
import { useDispatch, useSelector } from "react-redux";

import FormBox from "../components/FormBox.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Rocket from "../assets/Rocket.png";

function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);
  const [openModalReset, setOpenModalReset] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  let resetLoading = false;
  let resetError = false;

  const [forgotEmail, setForgotEmail] = useState("");
  let forgotLoading = false;
  let forgotError = false;

  function onCloseModal() {
    setOpenModal(false);
    setForgotEmail("");
  }

  function onCloseModalReset() {
    setOpenModalReset(false);
    setResetEmail("");
    setResetPassword("");
  }

  const loginData = {
    email: formData["Email"],
    password: formData["Password"],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      console.log(data.id);
      {data.type == 0 ? navigate(`/super-admin/dashboard/${data.id}`) : data.type == 1 ? navigate(`/dashboard/${data.id}`) : data.type == 2 ? navigate(`/admin/dashboard/${data.id}`) : data.type == 3 ? navigate(`/advisor/dashboard/${data.id}`) : navigate("/courses")}
      // navigate(`/dashboard/${data.id}`);
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  const forgotPassword = async () => {
    try {
      if (forgotEmail === "") {
        forgotError = "Please enter your email to proceed.";
        console.log(forgotError);
        return;
      }
      forgotLoading = true;
      // onCloseModal();
      // setOpenModalReset(true);
      const res = await fetch(`/api/forget-password?email=${forgotEmail }`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        forgotLoading = false;
        forgotError = data;
        return;
      }
      forgotLoading = false;
      forgotError = false;
      onCloseModal();
      setOpenModalReset(true);
    } catch (error) {
      forgotLoading = false;
      forgotError = error;
      console.error(error);
    }
  }

  const reset_password = async () => {
    try {
      if (resetEmail === "" || resetPassword === "") {
        resetError = "Please enter your email and password to proceed.";
        console.log(resetError);
        return;
      }
      resetLoading = true;
      const res = await fetch("/api/forget-password", {
        // mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({"email" : resetEmail, "new_password" : resetPassword}),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        resetLoading = false;
        resetError = data;
        return;
      }
      resetLoading = false;
      resetError = false;
      onCloseModalReset();
    } catch (error) {
      resetLoading = false;
      resetError = error;
      console.error(error);
    }
  }

  return (
    <div className="flex mb-4">
      <div className="w-1/3">
        <Sidebar imgAdd={Rocket} txt={Rocket} c="ml-10 mt-40" />
      </div>
      <div className="container relative w-2/3 h-[75vh] bg-zinc-300 rounded-[10px] p-3 max-w-lg mx-auto mt-10">
        <h1 className="text-3xl text-center font-bold my-7 tracking-[2px] uppercase">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-rows-3 justify-items-center gap-2"
        >
          <FormBox
            boxType="email"
            label="Email"
            handleChange={handleChange}
            c="bg-neutral-100 w-96 p-2 mb-3"
          />

          <FormBox
            boxType="password"
            label="Password"
            handleChange={handleChange}
            c="bg-neutral-100 p-2 w-96"
          />

          <div
            onClick={() => setOpenModal(true)}
            className="flex justify-center cursor-pointer hover:underline hover:opacity-75"
          >
            Forgot Password?
          </div>

          <button
            disabled={loading}
            className="bg-orange-500 text-white p-3 font-bold tracking-[2px] mb-3
                                        rounded-[30px] uppercase hover:opacity-95 w-[15vw] hover:bg-orange-800
                                        disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <p className="text-red-700 mt-5 font-semibold text-center">
          {error ? error.message || "Something went wrong!" : ""}
        </p>
        <div className="flex gap-2 mt-5 tracking-[1px] absolute bottom-5 inset-x-28">
          <p>Don&#39;t have an account?</p> {/* &#39; is the code for ' */}
          <Link to="/register">
            <span className="text-stone-800 font-bold">Register</span>
          </Link>
        </div>
      </div>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="flex justify-center text-2xl font-bold text-gray-900 dark:text-white uppercase">
              Forgot Password
            </h3>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Enter Your Primary Email To Proceed"
                />
              </div>
              <FormBox
                boxType="email"
                label="name@company.com"
                handleChange={(event) => setForgotEmail(event.target.value)}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                disabled={forgotLoading}
                onClick={forgotPassword}
                className="bg-orange-500 text-white p-3 font-bold tracking-[2px] mb-3
                                        rounded-[30px] uppercase hover:opacity-95 w-[20vw] hover:bg-orange-800
                                        disabled:opacity-80"
              >
                {forgotLoading ? "Loading..." : "Forgot Pasword"}
              </button>
              <p className="text-red-700 mt-5 font-semibold text-center">
                {forgotError ? forgotError.message || "Something went wrong!" : ""}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openModalReset} size="md" onClose={onCloseModalReset} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="flex justify-center text-2xl font-bold text-gray-900 dark:text-white uppercase">
              Reset Password
            </h3>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  value="Email"
                />
              </div>
              <FormBox
                boxType="email"
                label="name@company.com"
                handleChange={(event) => setResetEmail(event.target.value)}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  value="New Passowrd"
                />
              </div>
              <FormBox
                boxType="password"
                label="Password"
                handleChange={(event) => setResetPassword(event.target.value)}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />
            </div>

            <div className="flex justify-center w-full">
              <button
                disabled={resetLoading}
                onClick={reset_password}
                className="bg-orange-500 text-white p-3 font-bold tracking-[2px] mb-3
                                        rounded-[30px] uppercase hover:opacity-95 w-[20vw] hover:bg-orange-800
                                        disabled:opacity-80"
              >
                {resetLoading ? "Loading..." : "Reset Pasword"}
              </button>
              <p className="text-red-700 mt-5 font-semibold text-center">
                {resetError ? resetError.message || "Something went wrong!" : ""}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Login;
