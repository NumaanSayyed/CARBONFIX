import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Homepage/Homepage";
import MyProject from "./Users/Participants/myProject";
import Projects from "./Programs/Programs";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Profile from "./Users/Participants/Profile";
import { AuthProvider } from "./Helpers/authContext";

// Service Provider Imports
import ServiceProviderDashboard from "./Users/Service_Provider/Dashboard";
import EnrolledParticipant from "./Users/Service_Provider/ENROLLED_PARTICIPANTS/EnrolledParticipants";

// College Imports
import CollegeDashboard from "./Users/College/Dashboard";
import StudentList from "./Users/College/StudentList";

// Admin Imports
import AdminDashboard from "./Users/Admin/Dashboard";
import AdminRegsiter from "./Users/Admin/Auth/register";
import AdminLogin from "./Users/Admin/Auth/login";

//participa

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BrowserRouter>
     <AuthProvider>
        <Header
          isScrolled={isScrolled}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/participant/project" element={<MyProject />} />

          {/* Service Provider Routes */}
          <Route
            path="/dashboard/service_provider"
            element={<ServiceProviderDashboard />}
          />
          <Route
            path="/dashboard/participant_manage/:projectId"
            element={<EnrolledParticipant />}
          />

          {/* College Routes */}
          <Route path="/dashboard/college" element={<CollegeDashboard />} />
          <Route path="/college/students" element={<StudentList />} />

          {/* Admin Routes */}

          <Route path="/admin/register" element={<AdminRegsiter />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;