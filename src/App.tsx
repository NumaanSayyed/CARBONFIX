import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Homepage/Homepage";
import Programs from "./Programs/Programs"; 
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import FAQ from "./Components/FAQ";
import Profile from "./Users/Participants/Profile";
import ServiceProviderDashboard from "./Users/Service_Provider/Dashboard";
import CollegeDashboard from "./Users/College/Dashboard"; 
import StudentList from "./Users/College/StudentList";  // ✅ Import StudentList
import AdminDashboard from "./Users/Admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Header isScrolled={false} activeNav="home" setActiveNav={() => { }} />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/program" element={<Programs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/dashboard/service_provider" element={<ServiceProviderDashboard />} />
        <Route path="/college" element={<CollegeDashboard />} />
        <Route path="/college/students" element={<StudentList />} />  
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
