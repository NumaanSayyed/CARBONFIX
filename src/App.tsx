import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Homepage/Homepage";
import Programs from "./Programs/Programs"; 
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import FAQ from "./Components/FAQ";
import Profile from "./Users/Participants/Profile";
import Dashboard from "./Users/Service_Provider/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Header isScrolled={false} activeNav="home" setActiveNav={() => { }} />

      {/* Page Content */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/program" element={<Programs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/dashboard/service_provider" element={<Dashboard />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;