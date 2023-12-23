import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getProfileSuccess,
  getProfileFailure,
} from "../store/user/profileSlice";

export default function AdvisorPage() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { userProfile, profError } = useSelector((state) => state.profile);
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  // const students = [
  //   {
  //     id: 1,
  //     name: "Abhishek Gupta",
  //     roll: "21f1008956",
  //     level: "B.S",
  //     cgpa: "7.8",
  //     status: "ACTIVE",
  //   },
  //   {
  //     id: 2,
  //     name: "Akash Badaal",
  //     roll: "21f2007845",
  //     level: "B.Sc",
  //     cgpa: "8.89",
  //     status: "ACTIVE",
  //   },
  //   {
  //     id: 3,
  //     name: "Aman Kumar",
  //     roll: "21f1008956",
  //     level: "B.S",
  //     cgpa: "7.8",
  //     status: "ACTIVE",
  //   },
  //   {
  //     id: 4,
  //     name: "Prathamesh Bhalla",
  //     roll: "21f3008956",
  //     level: "B.S",
  //     cgpa: "8.7",
  //     status: "R.K.A.",
  //   },
  // ];

  const handleChange = (e) => {
    e.preventDefault();
    var lowerCaseInput = e.target.value.toLowerCase();
    setSearchInput(lowerCaseInput);
  };

  const filteredStudents = students.filter((student) => {
    //if no input then return the original
    if (searchInput === "") {
      return student;
    }
    //return the item which contains the user input
    else {
      return student.name.toLowerCase().match(searchInput);
    }
  });

  //   if (searchInput.length > 0) {
  //       students.filter((student) => {
  //       return student.name.match(searchInput);
  //   });
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
          console.log(userProfile);
        }
      } catch (error) {
        dispatch(getProfileFailure(error));
      }
    };

    const fetchData2 = async () => {
      try {
        const response = await fetch("/api/admin/students", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        });
        const studata = await response.json();

        if (!isCancelled) {
          if (!response.ok) {
            console.log(studata);
            return;
          }
          setStudents(studata);
          console.log(studata);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchData2();

    return () => {
      isCancelled = true;
    };
  }, []);

  const rec_courses = ["Python", "Java", "C", "DL", "ML", "AI", "DBMS", "OS", "Maths 1", "Maths 2", "Business Analysis", "English", "Statistics 1", "Statistics 2", "CT"]

  return (
    <div>
      <div>
        <form className="w-[90vw] mt-7 mr-5 ml-16">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-11/12 p-4 ps-10 text-sm text-gray-900 border 
                                                                         border-gray-300 rounded-[30px] bg-gray-50 
                                                                         focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 
                                                                         dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                                                         dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                                         placeholder:font-bold placeholder:tracking-[2px]"
              placeholder="SEARCH STUDENTS"
              onChange={handleChange}
              value={searchInput}
              required
            />
          </div>
        </form>
      </div>
      <div className="container relative bg-zinc-300 rounded-[10px] h-[70vh] w-[90vw] mt-10 mr-5 ml-16 mb-10 p-5">
        {students.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-md text-center rtl:text-right text-gray-800 dark:text-gray-400">
              <thead className="text-md text-gray-900 bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 tracking-[1px]">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-[1px]">
                    NAME
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-[1px]">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-[1px]">
                    LEVEL
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-[1px]">
                    CGPA
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-[1px]">
                    RECOMMENDED COURSES
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-[1px]">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:opacity-80"
                  >
                    <th scope="row" className="px-6 py-4 hover:opacity-75">
                      {student.id}
                    </th>
                    <td className="px-6 py-4 uppercase tracking-[1px]">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 uppercase tracking-[1px]">
                    2{student.id}F{student.level != null ? student.level : 4}00{student.id + 1}{student.id}{student.id + 4}{student.id + 2}
                    </td>
                    <td className="px-6 py-4 tracking-[1px]">
                    {student.level == 0
                        ? "FOUNDATION"
                        : student.level == 1
                        ? "DIPLOMA"
                        : student.level == 2
                        ? "DEGREE"
                        : student.level == 3
                        ? "BS"
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 tracking-[1px]">{student.cgpa != null ? student.cgpa : "N/A"}</td>
                    <td className="px-6 py-4 tracking-[1px]">{
                    rec_courses[Math.floor(Math.random() * rec_courses.length)]
                  } and {
                    rec_courses[Math.floor(Math.random() * rec_courses.length)]
                  } </td>
                    <td className="px-6 py-4 tracking-[1px]">
                      <Button
                        padding="px-2 py-1 text-xs"
                        rounded="30px"
                        ButtonName="APPROVE"
                      />
                      <Button
                        padding="ml-1 px-2 py-1 text-xs"
                        rounded="30px"
                        ButtonName="REJECT"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h1 className="text-3xl text-center font-bold my-7 tracking-[2px]">
            There are no students available.
          </h1>
        )}
      </div>
    </div>
  );
}

{
  /* <div className='container relative bg-zinc-300 rounded-[10px] h-[80vh] w-[90vw] mt-10 mr-5 ml-16 mb-10 p-5'>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-md text-center rtl:text-right text-gray-800 dark:text-gray-400">
          <thead className="text-md text-gray-900 bg-slate-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 tracking-[1px]">
                S.No
              </th>
              <th scope="col" className="px-6 py-3 tracking-[1px]">
                NAME
              </th>
              <th scope="col" className="px-6 py-3 tracking-[1px]">
                ID
              </th>
              <th scope="col" className="px-6 py-3 tracking-[1px]">
                LEVEL
              </th>
              <th scope="col" className="px-6 py-3 tracking-[1px]">
                CGPA
              </th>
              <th scope="col" className="px-6 py-3 tracking-[1px]">
                RECOMMENDED COURSES
              </th>
              <th scope="col" className="px-6 py-3 tracking-[1px]">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4">1</th>
              <td class="px-6 py-4 uppercase tracking-[1px]">Abhishek Gupta</td>
              <td class="px-6 py-4 tracking-[1px]">21f1008956</td>
              <td class="px-6 py-4 tracking-[1px]">B.S</td>
              <td class="px-6 py-4 tracking-[1px]">7.8</td>
              <td class="px-6 py-4 tracking-[1px]"></td>
              <td class="px-6 py-4 tracking-[1px]">
                <Button padding="px-2 py-1 text-xs" rounded="30px" ButtonName="APPROVE" />
                <Button padding="ml-1 px-2 py-1 text-xs" rounded="30px" ButtonName="REJECT" />
              </td>
            </tr>
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" class="px-6 py-4">2</th>
              <td class="px-6 py-4 uppercase tracking-[1px]">Akash Badaal</td>
              <td class="px-6 py-4 tracking-[1px]">21f2007845</td>
              <td class="px-6 py-4 tracking-[1px]">B.Sc</td>
              <td class="px-6 py-4 tracking-[1px]">8.89</td>
              <td class="px-6 py-4 tracking-[1px]"></td>
              <td class="px-6 py-4 tracking-[1px]">
                <Button padding="px-2 py-1 text-xs" rounded="30px" ButtonName="APPROVE" />
                <Button padding="ml-1 px-2 py-1 text-xs" rounded="30px" ButtonName="REJECT" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> */
}
