import { Label, Modal } from "flowbite-react";

import CourseCard from "../components/CourseCard";
import FormBox from "../components/FormBox.jsx";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Courses() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { userProfile, profError } = useSelector((state) => state.profile);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  const [cardContent, setCardContent] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    setCourseData({});
  }

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/courses", {
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
          setCardContent(data);
          console.log(cardContent);
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

  const [courseLoading, setCourseLoading] = useState(false);
  const [courseError, setCourseError] = useState(false);

  const [courseData, setCourseData] = useState({});

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.id]: e.target.value });
    console.log(courseData);
  };

  const course_data = {
    name: courseData["Course Name"],
    course_id: courseData["Course Code"],
    description: courseData["Course Description"],
    course_credit: courseData["Course Credit"],
    duration: courseData["Course Duration"],
    is_project: courseData["Is it a project?"],
    status: courseData["Course Status"],
    level: courseData["Course Level"],
  };

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      setCourseLoading(true);
      const res = await fetch("/api/admin/add-courses-form", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course_data),
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
      alert("Course added successfully");
      onCloseModal();
      window.location.reload(); // refresh the page
    } catch (error) {
      setCourseLoading(false);
      setCourseError(error);
    }
  };

  const imageList = [
    "course_1",
    "course_2",
    "course_3",
    "course_4",
    "course_5",
    "course_6",
    "course_7",
    "course_8",
    "course_9",
    "course_10",
    "course_11",
    "course_12",
  ];

  // const cardContent = [
  //   {
  //     name: "Trombinoscope",
  //     image:
  //       "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D",
  //     description: "Group project good or bad, who knows, but it's a thing",
  //   },
  //   {
  //     name: "CRUD System",
  //     image:
  //       "https://media.istockphoto.com/id/636379014/photo/hands-forming-a-heart-shape-with-sunset-silhouette.jpg?s=612x612&w=0&k=20&c=CgjWWGEasjgwia2VT7ufXa10azba2HXmUDe96wZG8F0=",
  //     description: "Video game database, yes wow very cool, much CRUD",
  //   },
  //   {
  //     name: "Photo Gallery",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGmUDlytmSKJqLXsQ9_5CBbeawRcs08QqM_QVOU_gluA&s",
  //     description:
  //       "Taking pictures and putting them in a gallery, wow, such art",
  //   },
  //   {
  //     name: "Red Horizon",
  //     image:
  //       "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
  //     description: "A game about a red horizon, what else do you need to know?",
  //   },
  //   {
  //     name: "Design Thinking",
  //     image:
  //       "https://img.freepik.com/free-vector/design-process-concept-landing-page_23-2148313670.jpg",
  //     description: "Design thinking is a process for creative problem solving",
  //   },
  //   {
  //     name: "Brain Warp",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzgqdRa2MBsEA4QJMypn4SuV0_vtP_tfF6Jg&usqp=CAU",
  //     description: "A game about a brain warp, what else do you need to know?",
  //   },
  // ];
  // const popularCourses = [
  //   { id: 1, name: "English" },
  //   { id: 2, name: "Maths 2" },
  //   { id: 3, name: "Python" },
  // ];
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    e.preventDefault();
    var lowerCaseInput = e.target.value.toLowerCase();
    setSearchInput(lowerCaseInput);
  };

  const filteredCourses = cardContent.filter((course) => {
    //if no input then return the original
    if (searchInput === "") {
      return course;
    }
    //return the item which contains the user input
    else {
      return course.name.toLowerCase().match(searchInput);
    }
  });

  return (
    <div className="grid grid-rows-6 grid-cols-4 grid-flow-col relative">
      <div className="h-screen row-span-full fixed right-0 inset-y-0 bg-orange-500 p-5">
        <h3 className="text-zinc-950 text-xl text-center p-4 font-bold tracking-[2px] mt-10 uppercase">
          Popular Courses
        </h3>

        <div className="container items-center justify-center h-fit bg-orange-300 rounded-[20px] py-5 mx-auto">
          {cardContent.length > 0 ? (
            cardContent.slice(0, 3).map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-center gap-3 p-5"
              >
                <h3 className="text-black text-md font-bold tracking-[1px] uppercase">
                  <Link to={`/courses/${course.id}`}>{course.name}</Link>
                </h3>

                {/* <button
                    type="button"
                    className="w-[130px] h-[35px] bg-orange-500 text-white  
                                                            rounded-[20px] uppercase hover:bg-orange-800
                                                            tracking-[2px] text-xs font-semibold"
                  >
                    View Details
                  </button> */}
              </div>
            ))
          ) : (
            <h1 className="items-center text-2xl text-center font-bold my-7 tracking-[2px]">
              This information is not available yet.
            </h1>
          )}
        </div>
        {(currentUser.type == 0 || currentUser.type == 2) && (
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center 
                                            px-4 py-2 bg-white text-orange-500 font-bold hover:bg-slate-200
                                            rounded-[20px] uppercase mt-20 mx-auto"
          >
            Add New Course
          </button>
        )}
      </div>
      <div className="col-span-3 row-span-5">
        <div className="flex flex-row items-center justify-center mt-5 mb-8 gap-7">
          {/* <FormBox
            boxType="search"
            label="Search"
            c="w-[475px] h-[45px] bg-slate-100 rounded-[30px] placeholder:tracking-[1px]"
          />

          <button
            className="bg-orange-500 text-white 
                                  px-6 py-2 font-bold tracking-[2px] 
                                  rounded-[10px] uppercase hover:bg-orange-900"
          >
            Search
          </button> */}
          <input
            type="search"
            id="default-search"
            className="block w-11/12 p-4 ps-10 text-sm text-gray-900 border 
                                                                         border-gray-300 rounded-[30px] bg-gray-50 
                                                                         focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 
                                                                         dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                                                         dark:focus:ring-blue-500 dark:focus:border-blue-500
                                                                         placeholder:font-bold placeholder:tracking-[2px]"
            placeholder="SEARCH COURSES"
            onChange={handleSearchChange}
            value={searchInput}
            required
          />
        </div>

        <div className="ml-3 mt-5">
          {cardContent.length > 0 ? (
            <div className="grid grid-cols-3 gap-x-3 gap-y-7">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  imgSrc={`/courses/${
                    imageList[Math.floor(Math.random() * imageList.length)]
                  }.png`}
                  title={course.name}
                  description={course.description}
                  onClick={() => {
                    navigate(`/courses/${course.id}`);
                  }}
                />
              ))}
            </div>
          ) : (
            <h1 className="text-3xl text-center font-bold my-7 tracking-[2px]">
              There are no courses available.
            </h1>
          )}
        </div>
      </div>

      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="flex justify-center text-2xl font-bold text-gray-900 dark:text-white uppercase">
              Add Course
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="course_name" value="Name of Course" />
              </div>
              <FormBox
                boxType="text"
                label="Course Name"
                handleChange={handleChange}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />

              <div className="mb-2 block">
                <Label htmlFor="course_descr" value="Description of Course" />
              </div>
              <FormBox
                boxType="text"
                label="Course Description"
                handleChange={handleChange}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />

              <div className="mb-2 block">
                <Label htmlFor="course_code" value="Course Code" />
              </div>
              <FormBox
                boxType="text"
                label="Course Code"
                handleChange={handleChange}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />

              <div className="mb-2 block">
                <Label htmlFor="course_duration" value="Duration of Course" />
              </div>
              <FormBox
                boxType="text"
                label="Course Duration"
                handleChange={handleChange}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />

              <div className="mb-2 block">
                <Label htmlFor="course_credit" value="Credit of Course" />
              </div>
              <FormBox
                boxType="text"
                label="Course Credit"
                handleChange={handleChange}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />

              <div className="mb-2 block">
                <Label htmlFor="course_project" value="Is it a project?" />
              </div>
              <FormBox
                boxType="text"
                label="Is it a project?"
                handleChange={handleChange}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />

              <div className="mb-2 block">
                <Label htmlFor="course_status" value="Status of Course" />
              </div>
              <FormBox
                boxType="text"
                label="Course Status"
                handleChange={handleChange}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />

              <div className="mb-2 block">
                <Label htmlFor="course_level" value="Level of Course" />
              </div>
              <FormBox
                boxType="text"
                label="Course Level"
                handleChange={handleChange}
                c="bg-neutral-100 w-96 p-2 mb-3"
                required
              />
            </div>

            <div className="flex justify-center w-full">
              <button
                disabled={courseLoading}
                onClick={addCourse}
                className="bg-orange-500 text-white p-3 font-bold tracking-[2px] mb-3
                                        rounded-[30px] uppercase hover:opacity-95 w-[20vw] hover:bg-orange-800
                                        disabled:opacity-80"
              >
                {courseLoading ? "Loading..." : "Add Course"}
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

export default Courses;
