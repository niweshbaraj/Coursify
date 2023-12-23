import { Label, Modal } from "flowbite-react";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "../components/Button";


export default function CourseDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.profile);
  const [course, setCourse] = useState({});
  const [courseData, setCourseData] = useState({});
  const [courseLoading, setCourseLoading] = useState(false);
  const [courseError, setCourseError] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setCourseData({});
  }

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.id]: e.target.value });
    console.log(courseData);
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    try {
      setCourseLoading(true);
      const res = await fetch(`/api/courses/${params.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setCourseLoading(false);
        setCourseError(data);
        return;
      }
      setCourseLoading(false);
      setCourseError(false);
      console.log("Course update successfully");
      onCloseModal();
    } catch (error) {
      setCourseLoading(false);
      setCourseError(error);
    }
  };
  console.log(params.id);
  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/courses/${params.id}`, {
          headers: {
            contentType: "application/json",
          },
        });
        const data = await res.json();

        if (!isCancelled) {
          if (!res.ok) {
            console.log(data);
            return;
          }
          setCourse(data);
          setCourseData(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const [feedbackData, setFeedbackData] = useState({});
  const handleFeedBackChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.id]: e.target.value });
    console.log(feedbackData);
  }

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/feedback/${course.course_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log(data);
        return;
      }
      console.log("Feedback submitted successfully");
      alert("Feedback submitted successfully");
      setFeedbackData({});
      window.location.reload();
      navigate(`/courses/${params.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2">
        <div className="container h-fit bg-zinc-300 rounded-[20px] p-3 max-w-lg mx-auto mt-5">
          <div className="font-bold tracking-[2px] uppercase text-slate-500">
            {course.level === 0
              ? "Foundation"
              : course.level === 1
              ? "Diploma"
              : course.level === 2
              ? "Degree"
              : "BS"}{" "}
            LEVEL
          </div>
          <div className="font-bold tracking-[2px] uppercase text-2xl">
            {course.course_id} : {course.name}
          </div>
          <div className="font-bold tracking-[2px] uppercase text-slate-500">
            Course Credit : {course.course_credit}
          </div>
          <div className="font-bold tracking-[2px] uppercase text-slate-500">
            Course Duration : {course.duration}
          </div>
          <div className="font-bold tracking-[2px] uppercase text-slate-500">
            {course.is_project === true ? "Project Course" : ""}
          </div>
          <div className="font-bold tracking-[2px] uppercase text-slate-500">
            Rating : {course.avg_rating}
          </div>
          <div
            className={
              course.status == true
                ? "font-bold text-green-400 tracking-[2px] uppercase"
                : "font-bold tracking-[2px] uppercase text-red-500"
            }
          >
            {course.status === true ? "Available" : "Not Available"}
          </div>
          <div className="container w-11/12 ml-3 h-fit bg-slate-200 rounded-[20px] mt-3">
            <div className="font-semibold tracking-[2px] uppercase text-slate-500 p-2">
              {course.description}
            </div>
          </div>
        </div>

        <div className="mt-4 relative">
          <button
            onClick={() => {
              navigate("/courses");
            }}
            className="px-3 py-1.5 text-xs absolute top-0 right-0 mr-4 bg-orange-500 rounded-[${rounded}] text-white
                       font-bold hover:bg-orange-800
                       tracking-[2px] rounded-[30px]"
          >
            {" "}
            BACK TO COURSES{" "}
          </button>

          {currentUser.type === 0 || currentUser.type === 2 ? (
            <button
              onClick={() => setOpenModal(true)}
              className="px-3 py-1.5 text-xs absolute top-10 right-3 mr-4 bg-orange-500 rounded-[${rounded}] text-white
                       font-bold hover:bg-orange-800
                       tracking-[2px] rounded-[30px]"
            >
              {" "}
              EDIT COURSES{" "}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {currentUser.type === 1 || currentUser.type === 4 ? (
      <div className="container w-[85vw] h-fit bg-zinc-300 rounded-[20px] mt-14 ml-20 p-8 mb-10">
        <div className="font-bold tracking-[2px] uppercase text-2xl mt-3">
          Course Feedback
        </div>
        <div className="container w-11/12 ml-10 h-fit bg-slate-200 rounded-[20px] mt-3 p-8">
          <form onSubmit={handleFeedbackSubmit}>
            <label className="uppercase font-bold tracking-[2px] text-lg">
              Rating :{" "}
            </label>
            <select
              id="rating"
              value={feedbackData.rating}
              onChange={handleFeedBackChange}
              className="w-96 p-2 h-11 rounded-md border border-gray-300 bg-neutral-100 text-gray-900"
            >
              <option>Choose Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <br />
            <br></br>

            <div className="flex flex-col">
              <label className="uppercase font-bold tracking-[2px] text-lg">
                Feedback
              </label>
              <textarea
                id="feedback"
                value={feedbackData.feedback}
                onChange={handleFeedBackChange}
                rows="10"
                cols="63"
                className="rounded-md border border-gray-300 p-2"
              ></textarea>
            </div>

            <Button
              padding="px-6 py-2.5 mt-3"
              rounded="30px"
              ButtonName="SUBMIT"
            />
          </form>
        </div>
      
      </div>) : ""
      }
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="flex justify-center text-2xl font-bold text-gray-900 dark:text-white uppercase">
              Update Course
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="course_name" value="Name of Course" />
              </div>
              <input
                type="text"
                id="name"
                value={courseData.name}
                onChange={handleChange}
                className="bg-neutral-100 w-96 p-2 mb-3 rounded-md border border-gray-300 text-gray-900"
                required
              />

              <div className="mb-2 block">
                <Label htmlFor="course_descr" value="Description of Course" />
              </div>
              <input
                type="text"
                id="description"
                value={courseData.description}
                onChange={handleChange}
                className="bg-neutral-100 w-96 p-2 mb-3 rounded-md border border-gray-300 text-gray-900"
              />

              <div className="mb-2 block">
                <Label htmlFor="course_duration" value="Duration of Course" />
              </div>
              <input
                type="text"
                id="duration"
                value={courseData.duration}
                onChange={handleChange}
                className="bg-neutral-100 w-96 p-2 mb-3 rounded-md border border-gray-300 text-gray-900"
              />

              <div className="mb-2 block">
                <Label htmlFor="course_credit" value="Credit of Course" />
              </div>
              <input
                type="text"
                id="course_credit"
                value={courseData.course_credit}
                onChange={handleChange}
                className="bg-neutral-100 w-96 p-2 mb-3 rounded-md border border-gray-300 text-gray-900"
              />

              <div className="mb-2 block">
                <Label htmlFor="course_project" value="Is it a project?" />
              </div>
              <input
                type="text"
                id="is_project"
                value={courseData.is_project}
                onChange={handleChange}
                className="bg-neutral-100 w-96 p-2 mb-3 rounded-md border border-gray-300 text-gray-900"
              />

              <div className="mb-2 block">
                <Label htmlFor="course_status" value="Status of Course" />
              </div>
              <input
                type="text"
                id="status"
                value={courseData.status}
                onChange={handleChange}
                className="bg-neutral-100 w-96 p-2 mb-3 rounded-md border border-gray-300 text-gray-900"
              />

              <div className="mb-2 block">
                <Label htmlFor="course_level" value="Level of Course" />
              </div>
              <input
                type="text"
                id="level"
                value={courseData.level}
                onChange={handleChange}
                className="bg-neutral-100 w-96 p-2 mb-3 rounded-md border border-gray-300 text-gray-900"
              />
            </div>

            <div className="flex justify-center w-full">
              <button
                disabled={courseLoading}
                onClick={updateCourse}
                className="bg-orange-500 text-white p-3 font-bold tracking-[2px] mb-3
                                        rounded-[30px] uppercase hover:opacity-95 w-[20vw] hover:bg-orange-800
                                        disabled:opacity-80"
              >
                {courseLoading ? "Loading..." : "Update Course"}
              </button>
              <p className="text-red-700 mt-5 font-semibold text-center">
                {courseError
                  ? courseError.message || "Something went wrong!"
                  : ""}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
