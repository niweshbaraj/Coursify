import { Routes, Route } from "react-router-dom";
import Login from '../views/Login.jsx';
import Home from '../views/Home.jsx';
import Register from '../views/Register.jsx';
import SuperAdmin from '../views/SuperAdmin.jsx';
import AdminUpload from '../views/AdminUpload.jsx';
import Courses from "../views/Courses.jsx";
import AlumniFeedback from "../views/AlumniFeedback.jsx";
import CourseDetails from "../views/CourseDetails.jsx";
import AdvisorPage from "../views/AdvisorPage.jsx";
import DashboardStudent from "../views/DashboardStudent.jsx";
import AdminDashboard from "../views/AdminDashboard.jsx";
import AdminStudentDetails from "../views/AdminStudentDetails.jsx";
import AdminStudents from "../views/AdminStudents.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import SystemSettings from "../views/Sys2.jsx";
import StudentPreference from "../views/StudentPreference.jsx";
import RecommendationPage from "../views/RecommendationPage.jsx";
import EditProfile from "../views/EditProfile.jsx";
import ForgotPassword from "../views/ForgotPassword.jsx";
import RecommendationStatus from "../views/RecommendationStatus.jsx";


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/super-admin/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/super-admin/register" element={<Register />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route element={<PrivateRoute />}>
                <Route path="/super-admin/dashboard/:id" element={<SuperAdmin />} />
                <Route path="/dashboard/:id" element={<DashboardStudent />} />
                <Route path="/view_profile/:id" element={<EditProfile />} />
                <Route path="/courses">
                    <Route path="" element={<Courses />} />
                    <Route path=":id" element={<CourseDetails />} />
                </Route>
                <Route path="/preferences">
                    <Route path="" element={<StudentPreference />} />
                    <Route path="course_recommendation" element={<RecommendationPage />} />
                    <Route path="recommendation-status" element={<RecommendationStatus />} />
                </Route>
                <Route path="/admin">
                    <Route path="upload_data" element={<AdminUpload />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="system_settings" element={<SystemSettings />} />
                    <Route path="students">
                        <Route path="" element={<AdminStudents />} />
                        <Route path=":id" element={<AdminStudentDetails />} />
                    </Route>
                </Route>
                <Route path="/alumni/dashboard/:id" element={<AlumniFeedback />} />
                <Route path="/advisor/dashboard/:id" element={<AdvisorPage />} /> 
            </Route>
        </Routes>
    )
}