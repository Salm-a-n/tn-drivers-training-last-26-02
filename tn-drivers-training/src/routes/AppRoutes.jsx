import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import InstructorLayout from "../layouts/InstructorLayout";

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

// ... other admin imports

// Instructor Pages
import InstructorDashboard from "../pages/instructor/Dashboard";
import MyStudents from "../pages/instructor/MyStudents";
import NotificationPage from "../pages/instructor/NotificationPage";
import InstructorSchedule from "../pages/instructor/MySchedule";
import InstructorExpenses from "../pages/instructor/MyExpenses";

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
        <Route index element={<InstructorDashboard />} /> {/* /instructor */}
        <Route path="/instructor/Students" element={<MyStudents />} />
        <Route path="/instructor/Notifications" element={<NotificationPage />} />
        <Route path="/instructor/Schedule" element={<InstructorSchedule />} />
        <Route path="/instructor/Expenses" element={<InstructorExpenses />} />
      </Route>

      {/* LOGIN ROUTE (Outer - no sidebar) */}
      {/* <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};

export default AppRoutes;