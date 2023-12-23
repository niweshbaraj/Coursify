import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getStudentSuccess, getStudentFailure } from "../store/user/studentSlice";

export default function AdminStudentDetails() {
  const params = useParams();
  const [student, setStudent] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { studentUser } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  
  useEffect(() => {
    let isCancelled = false;
    console.log(isCancelled);
    console.log(params.id);

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/students/${params.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
  
        if (!isCancelled) {
  
          if (!res.ok) {
            dispatch(getStudentFailure(data));
            return;
          }
          dispatch(getStudentSuccess(data));
          console.log(studentUser);
        }
        } catch (error) {
            dispatch(getStudentFailure(error));
        }
      }
  
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);
  console.log("studentUser", studentUser);

  return (
    <div className="grid grid-rows-2 grid-cols-4">
      <div className="container relative h-fit bg-zinc-300 rounded-[20px] p-3 w-full mx-auto mt-5 ml-14">
        <div className="flex items-center">
          <div>
            <div className="uppercase font-bold text-black tracking-[2px] text-xl">
              {studentUser && studentUser.name}
            </div>
            <div className="uppercase tracking-[2px] mt-6 ml-2 text-sm"> 
              2{studentUser && studentUser.id}F{studentUser && studentUser.level != null ? studentUser.level : 4}00
              {studentUser && studentUser.id + 1}
              {studentUser && studentUser.id}
              {studentUser && studentUser.id + 4}
              {studentUser && studentUser.id + 2}
            </div>
            <div className="tracking-[2px] ml-2 text-sm">
              {studentUser && studentUser.email}
            </div>
            <div className="uppercase tracking-[2px] ml-2 text-sm hover:opacity-80">
              {studentUser && studentUser.contact}
            </div>
            <div className="uppercase tracking-[2px] ml-2 text-sm">
              {studentUser && studentUser.address}
            </div>
          </div>
          <div className="absolute top-5 right-5">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg> */}
            <img
            // src="https://c8.alamy.com/comp/2RJ89AN/hipster-bearded-man-face-fashion-guy-with-hat-and-glasses-cartoon-vector-illustration-2RJ89AN.jpg"
            src={`data:image/png;base64, ${studentUser && studentUser.profile_pic}`}
            alt="StudentImage"
            className="flex items-center justify-center w-20 h-20 self-center cursor-pointer rounded-full object-cover"
          />
          </div>
        </div>
      </div>
      <div className="container h-fit bg-zinc-300 rounded-[20px] p-3 w-3/5 mx-auto mt-5 col-span-3">
        <div className="text-black text-xl font-bold tracking-[2px]">
          ENROLLED COURSES
        </div>
        <div className=" container w-full h-5/6 mt-2 bg-zinc-100 rounded-[20px] p-4">
          {studentUser && studentUser.enrolled_courses.length > 0 ? (
            <table>
              <tbody>
                {studentUser.enrolled_courses.map((course) => (
                  <tr key={course.id}>
                    <td className="tracking-[1px] uppercase text-sm px-6 py-1">
                      {course.name}
                    </td>
                    <td className="tracking-[1px] uppercase text-sm px-6 py-1">
                      {course.course_id}
                    </td>
                    <td className="tracking-[2px] text-sm font-bold text-orange-500 px-24 py-1 uppercase">
                      {course.level == 0
                        ? "FOUNDATION"
                        : course.level == 1
                        ? "DIPLOMA"
                        : course.level == 2
                        ? "DEGREE"
                        : "BS"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="text-3xl text-center font-bold my-7 tracking-[2px]">
              Currently, {studentUser && studentUser.name} is not enrolled in any courses.
            </h1>
          )}
        </div>
      </div>
      <div></div>
      <div className="container h-fit bg-zinc-300 rounded-[20px] p-3 w-3/5 mx-auto mt-5 col-span-3">
        <div className="text-black text-xl font-bold tracking-[2px]">
          COMPLETED COURSES
        </div>
        <div className=" container w-full h-5/6 mt-2 bg-zinc-100 rounded-[20px] p-4">
          {studentUser && studentUser.completed_courses.length > 0 ? (
            <table>
              <tbody>
                {studentUser.completed_courses.map((course_com) => (
                  <tr key={course_com.id}>
                    <td className="tracking-[1px] uppercase text-sm px-6 py-1">
                      {course_com.name}
                    </td>
                    <td className="tracking-[1px] uppercase text-sm px-6 py-1">
                      {course_com.course_id}
                    </td>
                    <td className="tracking-[2px] text-sm font-bold text-orange-500 px-24 py-1 uppercase">
                      {course_com.level == 0
                        ? "FOUNDATION"
                        : course_com.level == 1
                        ? "DIPLOMA"
                        : course_com.level == 2
                        ? "DEGREE"
                        : "BS"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="text-3xl text-center font-bold my-7 tracking-[2px]">
              Currently, {studentUser && studentUser.name} has not completed any course(s).
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
