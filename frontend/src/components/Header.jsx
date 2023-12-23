import { Avatar, Dropdown, Navbar } from "flowbite-react";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOut } from "../store/user/userSlice.js";
import Logo from "../assets/Logo.png";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { userProfile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          // 'Authorization': `Bearer ${currentUser.token}`,
          "Content-Type": "application/json",
        },
        body: "",
      });
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar fluid className="bg-gray-800 text-white">
      <Navbar.Brand>
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} alt="Coursify Logo" width="60" height="65" />
          <span className="text-3xl font-bold font-['Arimo'] tracking-[6px] uppercase">
            Coursify
          </span>
        </NavLink>
      </Navbar.Brand>
      {currentUser ? (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={`data:image/png;base64, ${userProfile && userProfile.profile_pic}`}
                className="w-10 h-10 object-cover"
              />
            }
          >
            {currentUser.type != 4 ? (
            <Dropdown.Header>
              <span className="block text-sm">{userProfile && userProfile.name}</span>
              <span className="block truncate text-sm font-medium">
                {userProfile && userProfile.primary_email}
              </span>
            </Dropdown.Header>
            ) : (
              ""
            )}
            {currentUser.type === 0 || currentUser.type === 2 ? (
              <>
                <Dropdown.Item>
                  <NavLink to={"/admin/upload_data"}>UPLOAD DATA</NavLink>
                </Dropdown.Item>
                <Dropdown.Item>
                  <NavLink to={"/admin/system_settings"}>
                    System Settings
                  </NavLink>
                </Dropdown.Item>
              </>
            ) : (
              ""
            )}
            {/* <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item> */}
            {/* <Dropdown.Item><NavLink to={`/dashboard/${currentUser.id}/personal_details`}>
                  View Full Profile
              </NavLink></Dropdown.Item> */}
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut} className="cursor-pointer">
              Sign out
            </Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      ) : (
        ""
      )}
      <Navbar.Collapse>
        {/* <Navbar.Link href="/" active>
            Home
          </Navbar.Link> */}
        {currentUser ? (
          <>
            {currentUser.type === 0 ? (
              <Navbar.Link>
                <NavLink
                  to={`/super-admin/dashboard/${currentUser.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                      : "text-white font-bold font-['Arimo'] tracking-[2px]"
                  }
                >
                  SUPER DASHBOARD
                </NavLink>
              </Navbar.Link>
            ) : currentUser.type === 1 ? (
              <Navbar.Link>
                <NavLink
                  to={`/dashboard/${currentUser.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                      : "text-white font-bold font-['Arimo'] tracking-[2px]"
                  }
                >
                  DASHBOARD
                </NavLink>
              </Navbar.Link>
            ) : currentUser.type === 2 ? (
              <Navbar.Link>
                <NavLink
                  to={`/dashboard/${currentUser.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                      : "text-white font-bold font-['Arimo'] tracking-[2px]"
                  }
                >
                  DASHBOARD
                </NavLink>
              </Navbar.Link>
            ) : currentUser.type === 3 ? (
              <Navbar.Link>
                <NavLink
                  to={`/advisor/dashboard/${currentUser.id}`}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                      : "text-white font-bold font-['Arimo'] tracking-[2px]"
                  }
                >
                  DASHBOARD
                </NavLink>
              </Navbar.Link>
            ) : (
              <Navbar.Link>
                <NavLink
                  to={"/courses"}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                      : "text-white font-bold font-['Arimo'] tracking-[2px]"
                  }
                >
                  ALUMNI DASHBOARD
                </NavLink>
              </Navbar.Link>
            )}
          {currentUser.type != 4 ? (
            <>
            <Navbar.Link>
              <NavLink
                to={`/view_profile/${currentUser.id}`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                    : "text-white font-bold font-['Arimo'] tracking-[2px]"
                }
              >
                PROFILE
              </NavLink>
            </Navbar.Link>

            <Navbar.Link>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  isActive
                    ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                    : "text-white font-bold font-['Arimo'] tracking-[2px]"
                }
              >
                COURSES
              </NavLink>
            </Navbar.Link>
          </>
            ) : (
              ""
            )}

            {currentUser.type === 1 && (
              <Navbar.Link>
                <NavLink
                  to="/preferences"
                  activeClassName="isActive"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                      : "text-white font-bold font-['Arimo'] tracking-[2px]"
                  }
                >
                  RECOMMENDATIONS
                </NavLink>
              </Navbar.Link>
            )}

            {(currentUser.type == 0 || currentUser.type == 2) && (
              <Navbar.Link>
                <NavLink
                  to="/admin/students"
                  activeClassName="isActive"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                      : "text-white font-bold font-['Arimo'] tracking-[2px]"
                  }
                >
                  STUDENTS
                </NavLink>
              </Navbar.Link>
            )}

            {currentUser.type === 0 || currentUser.type === 2 ? (
              <>
                <Navbar.Link>
                  <NavLink
                    to="/admin/upload_data"
                    activeClassName="isActive"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                        : "hidden"
                    }
                  >
                    UPLOAD
                  </NavLink>
                </Navbar.Link>

                <Navbar.Link>
                  <NavLink
                    to="/admin/system_settings"
                    activeClassName="isActive"
                    className={({ isActive }) =>
                      isActive
                        ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                        : "hidden"
                    }
                  >
                    System Settings
                  </NavLink>
                </Navbar.Link>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <Navbar.Link>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                    : "text-white font-bold font-['Arimo'] tracking-[2px]"
                }
              >
                LOGIN
              </NavLink>
            </Navbar.Link>

            <Navbar.Link>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "bg-orange-500 text-white font-bold font-['Arimo'] tracking-[2px] rounded-[30px] p-3"
                    : "text-white font-bold font-['Arimo'] tracking-[2px]"
                }
              >
                REGISTER
              </NavLink>
            </Navbar.Link>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
