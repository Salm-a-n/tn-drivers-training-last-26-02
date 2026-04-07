import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import InstructorLayout from "../layouts/InstructorLayout";
import StudentLayout from "../layouts/StudentLayout";

// Admin Pages
import Dashboard from "../pages/Dashboard";
import StudentPage from "../pages/StudentPage";
import Packages from "../pages/Packages";
import Schedule from "../pages/Schedule";
import Payments from "../pages/Payments"; 
import Application from "../pages/Application";
import InstructorFleet from "../pages/Instructors";
import FleetManagement from "../pages/Fleetmanagement";
import Finances from "../pages/Finances";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import ResetPassword from "../pages/ResetPassword";
import RegistrationPage from "../pages/RegistrationPage";

// Instructor Pages
import InstructorDashboard from "../pages/instructor/Dashboard";
import MyStudents from "../pages/instructor/MyStudents";
import NotificationPage from "../pages/instructor/NotificationPage";
import InstructorSchedule from "../pages/instructor/MySchedule";
import InstructorExpenses from "../pages/instructor/MyExpenses";

// Student Pages
import StudentProfile from "../pages/student/StudentProfile";
import StudentDashboard from "../pages/student/StudentDashboard";
import MyPackages from "../pages/student/MyPackages";
import StudentNotificationPage from "../pages/student/StudentNotification";
import TestEvaluationPage from "../pages/student/TestEvaluate";
// import StudentSchedule from "../pages/student/StudentSchedule";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/register" element={<RegistrationPage/>}/>
      
      {/* ADMIN ROUTES */}
      <Route element={<AdminLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Students" element={<StudentPage />} />
        <Route path="/Packages" element={<Packages />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Payments" element={<Payments />} />
        <Route path="/Applications" element={<Application />} />
        <Route path="/Instructors" element={<InstructorFleet />} />
        <Route path="/Fleet" element={<FleetManagement />} />
        <Route path="/Finances" element={<Finances />} />
        <Route path="/Settings" element={<Settings />} />
      </Route>

      {/* INSTRUCTOR ROUTES */}
      <Route path="/instructor" element={<InstructorLayout />}>
        <Route index element={<InstructorDashboard />} />
        <Route path="students" element={<MyStudents />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route path="schedule" element={<InstructorSchedule />} />
        <Route path="expenses" element={<InstructorExpenses />} />
      </Route>

      {/* STUDENT ROUTES */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
         <Route path="profile" element={<StudentProfile />} />
         <Route path="packages" element={<MyPackages />} />
         <Route path="notifications" element={<StudentNotificationPage />} /> 
        <Route path="test&Evaluation" element={<TestEvaluationPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;