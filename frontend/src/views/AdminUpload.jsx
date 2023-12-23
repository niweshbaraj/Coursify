import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar.jsx";
import UploadDataImg from "../assets/UploadDataImg.png";

function AdminUpload() {
  const fileInput = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState(null);

  const downloadFile = async () => {
    try {

      if (fileType === "") {
        alert('Please choose file type to download. Choose either Student Details or Course Details.');
        return;
      }

      const url = fileType === "students" ? "/api/admin/add-students-template" : "/api/admin/add-courses-template";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
          "Response-Type": "blob",
        },
      })
      if (!response.ok) {
        console.log("Error");
      }
      const blob = await response.blob();
      // Create an anchor element and dispatch a click event on it
      // to trigger a download
      const a = document.createElement("a");
      a.href = window.URL.createObjectURL(new Blob([blob]));
      a.setAttribute("download", `${fileType}.csv`);
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log('Error downloading CSV file:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      
      if (fileType === "") {
        alert('Please choose file type to upload. Choose either Student Details or Course Details.');
        return;
      }

      if (!file) {
        alert('Please choose a file to upload.');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const url = fileType === "students" ? "/api/admin/add-students" : "/api/admin/add-courses";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <div className="flex mb-4">
      <div className="w-1/3">
        <Sidebar />
      </div>
      <div className="w-2/3 h-fit container bg-zinc-300 rounded-[10px] p-3 max-w-lg mx-auto mt-9 mb-6">
        <h1 className="text-3xl text-center font-bold my-2 uppercase tracking-[2px]">
          Upload Data
        </h1>
        <form className="grid">
          <div className="flex flex-col gap-2">
            <div className="flex items-center mt-6 ml-10">
              <input
                type="radio"
                name="data"
                id="std"
                onChange={() => {
                  setFileType("students");
                }}
                className="bg-gray-100 border-gray-300 w-4 h-4"
              />
              <label
                htmlFor="std"
                className="font-semibold ms-2 uppercase tracking-[2px]"
              >
                Student Details
              </label>
            </div>
            <div className="flex items-center mt-4 ml-10">
              <input
                type="radio"
                name="data"
                id="crse"
                onChange={() => {
                  setFileType("courses");
                }}
                className="bg-gray-100 border-gray-300 w-4 h-4"
              />
              <label
                htmlFor="crse"
                className="font-semibold ms-2 uppercase tracking-[2px]"
              >
                Course Details
              </label>
            </div>
          </div>
          <div
            className="bg-slate-50 rounded-[20px] 
                          h-36 w-72 ml-24 mt-8 grid place-items-center
                          border border-dashed border-slate-500"
          >
            <input type="file" accept=".csv" ref={fileInput} onChange={handleFileChange} hidden />
            <img
              src={UploadDataImg}
              alt="Upload Data"
              onClick={() => fileInput.current.click()}
              className="cursor-pointer hover:opacity-80"
              width="70"
              height="75"
            />
          </div>
        </form>
        <div className="flex gap-x-48 mt-8 mb-4">
          <button
            onClick={uploadFile}
            className="px-4 py-2 mt-3 ml-5 bg-orange-500 rounded-[30px] text-white
                       font-bold hover:bg-orange-800
                       tracking-[2px] uppercase"
          >
            {" "}
            UPLOAD{" "}
          </button>
          <button
            onClick={downloadFile}
            className="px-4 py-2 mt-3 ml-5 bg-orange-500 rounded-[30px] text-white
                       font-bold hover:bg-orange-800
                       tracking-[2px] uppercase"
          >
            {" "}
            DOWNLOAD{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminUpload;
