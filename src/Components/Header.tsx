// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// interface HeaderProps {
//   isScrolled: boolean;
//   activeNav: string;
//   setActiveNav: (nav: string) => void;
// }

// const Header: React.FC<HeaderProps> = ({
//   isScrolled,
//   activeNav,
//   setActiveNav,
// }) => {
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [navbarTextColor, setNavbarTextColor] = useState("text-white");

//   useEffect(() => {
//     setNavbarTextColor(
//       isScrolled || location.pathname !== "/"
//         ? "text-black hover:text-green-600"
//         : "text-white hover:text-green-200"
//     );
//   }, [isScrolled, location.pathname]);

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between h-16 sm:h-20">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link
//               to="/"
//               className={`text-xl sm:text-2xl font-bold ${
//                 isScrolled ? "text-green-700" : "text-gray-600"
//               }`}
//             >
//               <i className="fas fa-globe-americas mr-2"></i>
//               CarbonFix
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {[
//               { id: "home", label: "Home", route: "/" },
//               { id: "projects", label: "Projects", route: "/project" },
//             ].map((item) => (
//               <Link
//                 to={item.route}
//                 key={item.id}
//                 onClick={() => setActiveNav(item.id)}
//                 className={`text-sm font-semibold transition-all duration-300 relative ${navbarTextColor} 
//                                     ${
//                                       activeNav === item.id
//                                         ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current'
//                                         : ""
//                                     }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//             <Link
//               to="/login"
//               className="bg-green-500 hover:bg-green-600 text-white px-5 sm:px-6 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
//             >
//               <i className="fas fa-user-plus mr-2"></i>
//               Join Now
//             </Link>
//           </div>

//           {/* Mobile Menu Button (Hamburger) */}
//           <button
//             className={`md:hidden text-2xl z-50 relative ${
//               isScrolled ? "text-gray-800" : "text-white"
//             }`}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <i
//               className={` ${
//                 location.pathname === "/" ? "" : "text-black"
//               } fas ${isMenuOpen ? "" : "fa-bars"}`}
//             ></i>
//           </button>
//         </div>

//         {/* Mobile Navigation - Fullscreen Sidebar */}
//         {isMenuOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
//             <div className="w-3/4 max-w-xs h-full bg-white shadow-lg flex flex-col py-8 px-6">
//               <button
//                 className="absolute top-4 right-4 text-gray-600 text-2xl"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <i className="fas fa-times"></i>
//               </button>

//               <nav className="flex flex-col space-y-6">
//                 {[
//                   { id: "home", label: "Home", route: "/" },
//                   { id: "projects", label: "Projects", route: "/project" },
//                 ].map((item) => (
//                   <Link
//                     to={item.route}
//                     key={item.id}
//                     onClick={() => {
//                       setActiveNav(item.id);
//                       setIsMenuOpen(false);
//                     }}
//                     className="text-gray-800 text-lg font-medium py-2 px-3 rounded hover:bg-green-100 hover:text-green-600 transition-all"
//                   >
//                     {item.label}
//                   </Link>
//                 ))}
//                 <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
//                   <i className="fas fa-user-plus mr-2"></i>
//                   <Link
//                     to="/login"
//                     onClick={() => {
//                       setIsMenuOpen(false);
//                     }}
//                   >
//                     Join Now
//                   </Link>
//                 </button>
//               </nav>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// interface HeaderProps {
//   isScrolled: boolean;
//   activeNav: string;
//   setActiveNav: (nav: string) => void;
// }

// const Header: React.FC<HeaderProps> = ({
//   isScrolled,
//   activeNav,
//   setActiveNav,
// }) => {
//   const location = useLocation();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [navbarTextColor, setNavbarTextColor] = useState("text-white");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [profileRoute, setProfileRoute] = useState("/profile");

//   function handleLogout(){
//     // Remove a specific item
//     localStorage.removeItem("userToken");

//     localStorage.removeItem("userdatatoken");

//     localStorage.removeItem("userType");

//     localStorage.removeItem("user");

//     localStorage.removeItem("token");

//     setActiveNav("projects");

//     // OR clear all localStorage data (use cautiously)
//     localStorage.clear();

//     // // Redirect or update UI after logout
//     window.location.href = "/login";
//   }
//   useEffect(() => {
//     setNavbarTextColor(
//       isScrolled || location.pathname !== "/"
//         ? "text-black hover:text-green-600"
//         : "text-white hover:text-green-200"
//     );
//   }, [isScrolled, location.pathname]);

//   const getWithExpirationCheck = (key: string) => {
//     const dataString = localStorage.getItem(key);
//     if (!dataString) return null;
  
//     const data = JSON.parse(dataString);
//     const currentTime = new Date().getTime();
  
//     if (currentTime > data.expirationTime) {
//       localStorage.removeItem(key); // Remove expired item
//       return null; // Item expired
//     }
  
//     return data.value; // Item is still valid
//   };

//   const token = getWithExpirationCheck("token");
//   const userType = getWithExpirationCheck("userType");
//   useEffect(() => {
//     console.log('isAuthenticated changed:', isAuthenticated);
//   }, [isAuthenticated]);
  
//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         // const userType = getWithExpirationCheck("userType");
//         // const token = getWithExpirationCheck("token");

//         if (!token || !userType) {
//           setIsAuthenticated(false);
//           console.log("in first call the is auth is : ",isAuthenticated);

//           return;
//         }

//         let endpoint = "";
//         let profilePath = "/profile"; 

//         if (userType === "Participant") {
//           endpoint = "http://localhost:5000/participants/authenticate";
//           profilePath = "/profile";
//           // window.location.href = profilePath;
//         } else if (userType === "Service Provider") {
//           endpoint = "http://localhost:5000/serviceProviders/authenticate";
//           profilePath = "/dashboard/service_provider";
//           // window.location.href = profilePath;
//         }else if(userType === "admin"){
//           endpoint = "http://localhost:5000/admin/authenticate";
//           profilePath = "/admin";
//         }

//         console.log("Humaira see this is profile path in header",profilePath);
//         console.log(endpoint);

//         setProfileRoute(profilePath);

//         const response = await axios.get(endpoint, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

        

//         if (response.status === 200) {
//           setIsAuthenticated(true);
//           console.log("Humasira this is response.status in header: ", response.status);  // Log response status
//           console.log("isAuthenticated in response . status is : ",isAuthenticated);
//         } else {
//           console.log("Unexpected response status:", response.status);
//         }
        
//       } catch (error) {
//         console.error("Authentication check failed:", error);
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuth();
//   }, [token, userType]);

//   return (
//     <nav
//       className={`fixed w-full z-50 transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <div className="container mx-auto px-6">
//         <div className="flex items-center justify-between h-16 sm:h-20">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link
//               to="/"
//               className={`text-xl sm:text-2xl font-bold ${
//                 isScrolled ? "text-green-700" : "text-gray-600"
//               }`}
//             >
//               <i className="fas fa-globe-americas mr-2"></i>
//               CarbonFix
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {/* {isAuthenticated && ( */}
//               <Link
//                 to="/"
//                 onClick={() => setActiveNav("home")}
//                 className={`text-sm font-semibold transition-all duration-300 relative ${navbarTextColor} 
//                   ${
//                     activeNav === "home"
//                       ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current'
//                       : ""
//                   }`}
//               >
//                 Home
//               </Link>
//             {/* )} */}

//             {profileRoute === "/dashboard/service_provider" || userType === "Admin" ? (
//     // Show only the Logout button for Admin and Service Provider
//     <button onClick={() => handleLogout()}>Logout</button>
// ) : userType === "Participant" ? (
//     // Show both Projects link and Logout button for Participant
//     <>
//         <Link
//             to="/project"
//             onClick={() => setActiveNav("projects")}
//             className={`text-sm font-semibold transition-all duration-300 relative ${navbarTextColor} 
//                 ${activeNav === "projects"
//                     ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current'
//                     : ""}`}
//         >
//             Projects
//         </Link>
//         <button onClick={() => handleLogout()}>Logout</button>
//     </>
// ) : (
//     // For any other user type, show only the Projects link
//     <Link
//         to="/project"
//         onClick={() => setActiveNav("projects")}
//         className={`text-sm font-semibold transition-all duration-300 relative ${navbarTextColor} 
//             ${activeNav === "projects"
//                 ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current'
//                 : ""}`}
//     >
//         Projects
//     </Link>
// )}


           

//             {isAuthenticated ? (
//               <Link
//                 to={profileRoute}
//                 className="bg-green-500 hover:bg-green-600 text-white px-5 sm:px-6 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
//               >
//                 <i className="fas fa-user mr-2"></i>
//                 Profile
//               </Link>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-green-500 hover:bg-green-600 text-white px-5 sm:px-6 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
//               >
//                 <i className="fas fa-user-plus mr-2"></i>
//                 Join Now
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className={`md:hidden text-2xl z-50 relative ${
//               isScrolled ? "text-gray-800" : "text-white"
//             }`}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <i
//               className={`${
//                 location.pathname === "/" ? "" : "text-black"
//               } fas ${isMenuOpen ? "" : "fa-bars"}`}
//             ></i>
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
//             <div className="w-3/4 max-w-xs h-full bg-white shadow-lg flex flex-col py-8 px-6">
//               <button
//                 className="absolute top-4 right-4 text-gray-600 text-2xl"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <i className="fas fa-times"></i>
//               </button>

//               <nav className="flex flex-col space-y-6">
//                 {isAuthenticated && (
//                   <Link
//                     to="/"
//                     onClick={() => {
//                       setActiveNav("home");
//                       setIsMenuOpen(false);
//                     }}
//                     className="text-gray-800 text-lg font-medium py-2 px-3 rounded hover:bg-green-100 hover:text-green-600 transition-all"
//                   >
//                     Home
//                   </Link>
//                 )}

//                 <Link
//                   to="/project"
//                   onClick={() => {
//                     setActiveNav("projects");
//                     setIsMenuOpen(false);
//                   }}
//                   className="text-gray-800 text-lg font-medium py-2 px-3 rounded hover:bg-green-100 hover:text-green-600 transition-all"
//                 >
//                   Projects
//                 </Link>

//                 {isAuthenticated ? (
//                   <Link
//                     to={profileRoute}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
//                   >
//                     <i className="fas fa-user mr-2"></i>
//                     Profile
//                   </Link>
//                 ) : (
//                   <Link
//                     to="/login"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
//                   >
//                     <i className="fas fa-user-plus mr-2"></i>
//                     Join Now
//                   </Link>
//                 )}
//               </nav>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import { Link, useLocation ,useNavigate} from "react-router-dom";
import axios from "axios";

interface HeaderProps {
  isScrolled: boolean;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isScrolled,
  activeNav,
  setActiveNav,
}) => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarTextColor, setNavbarTextColor] = useState("text-white");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileRoute, setProfileRoute] = useState("/profile");

  const navigate = useNavigate();

  function handleLogout() {
    // Remove all relevant localStorage data
    localStorage.clear();
    setIsAuthenticated(false);  // Reset authentication state
    setActiveNav("projects");   // Reset the active navigation to "projects"

    // Redirect to login page
    // window.location.href = "/login";
    navigate("/login");
  }

  useEffect(() => {
    setNavbarTextColor(
      isScrolled || location.pathname !== "/"
        ? "text-black hover:text-green-600"
        : "text-white hover:text-green-200"
    );
  }, [isScrolled, location.pathname]);

  const getWithExpirationCheck = (key: string) => {
    const dataString = localStorage.getItem(key);
    if (!dataString) return null;

    const data = JSON.parse(dataString);
    const currentTime = new Date().getTime();

    if (currentTime > data.expirationTime) {
      localStorage.removeItem(key); // Remove expired item
      return null; // Item expired
    }

    return data.value; // Item is still valid
  };

  const token = getWithExpirationCheck("token");
  const userType = getWithExpirationCheck("userType");

  useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!token || !userType) {
          setIsAuthenticated(false);
          console.log("Authentication failed, missing token or user type.");
          return;
        }

        let endpoint = "";
        let profilePath = "/profile"; // Default profile path

        if (userType === "Participant") {
          endpoint = "https://carbonfix-backend-5y3e.onrender.com/participants/authenticate";
          profilePath = "/profile";
        } else if (userType === "Service Provider") {
          endpoint = "https://carbonfix-backend-5y3e.onrender.com/serviceProviders/authenticate";
          profilePath = "/dashboard/service_provider";
        } else if (userType === "admin") {
          endpoint = "https://carbonfix-backend-5y3e.onrender.com/admin/authenticate";
          profilePath = "/admin";
        }

        console.log("Profile path in header:", profilePath);
        console.log("Authentication endpoint:", endpoint);

        setProfileRoute(profilePath);

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          console.log("Authentication successful, status:", response.status);
        } else {
          console.log("Unexpected response status:", response.status);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [token, userType]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className={`text-xl sm:text-2xl font-bold ${
                isScrolled ? "text-green-700" : "text-gray-600"
              }`}
            >
              <i className="fas fa-globe-americas mr-2"></i>
              CarbonFix
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              onClick={() => setActiveNav("home")}
              className={`text-sm font-semibold transition-all duration-300 relative ${navbarTextColor} 
                ${activeNav === "home"
                  ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current'
                  : ""}`}
            >
              Home
            </Link>

            {profileRoute === "/dashboard/service_provider" || userType === "admin" ? (
              // Show only the Logout button for Admin and Service Provider
              <button onClick={handleLogout}>Logout</button>
            ) : userType === "Participant" ? (
              // Show both Projects link and Logout button for Participant
              <>
                <Link
                  to="/project"
                  onClick={() => setActiveNav("projects")}
                  className={`text-sm font-semibold transition-all duration-300 relative ${navbarTextColor} 
                      ${activeNav === "projects"
                        ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current'
                        : ""}`}
                >
                  Projects
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              // For any other user type, show only the Projects link
              <Link
                to="/project"
                onClick={() => setActiveNav("projects")}
                className={`text-sm font-semibold transition-all duration-300 relative ${navbarTextColor} 
                    ${activeNav === "projects"
                      ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-current'
                      : ""}`}
              >
                Projects
              </Link>
            )}

            {isAuthenticated ? (
              <Link
                to={profileRoute}
                className="bg-green-500 hover:bg-green-600 text-white px-5 sm:px-6 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
              >
                <i className="fas fa-user mr-2"></i>
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-600 text-white px-5 sm:px-6 py-2 text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
              >
                <i className="fas fa-user-plus mr-2"></i>
                Join Now
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden text-2xl z-50 relative ${
              isScrolled ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i
              className={`${
                location.pathname === "/" ? "" : "text-black"
              } fas ${isMenuOpen ? "" : "fa-bars"}`}
            ></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
            <div className="w-3/4 max-w-xs h-full bg-white shadow-lg flex flex-col py-8 px-6">
              <button
                className="absolute top-4 right-4 text-gray-600 text-2xl"
                onClick={() => setIsMenuOpen(false)}
              >
                <i className="fas fa-times"></i>
              </button>

              <nav className="flex flex-col space-y-6">
                {isAuthenticated && (
                  <Link
                    to="/"
                    onClick={() => {
                      setActiveNav("home");
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-800 text-lg font-medium py-2 px-3 rounded hover:bg-green-100 hover:text-green-600 transition-all"
                  >
                    Home
                  </Link>
                )}

                <Link
                  to="/project"
                  onClick={() => {
                    setActiveNav("projects");
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-800 text-lg font-medium py-2 px-3 rounded hover:bg-green-100 hover:text-green-600 transition-all"
                >
                  Projects
                </Link>

                {isAuthenticated ? (
                  <Link
                    to={profileRoute}
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
                  >
                    <i className="fas fa-user mr-2"></i>
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg whitespace-nowrap"
                  >
                    <i className="fas fa-user-plus mr-2"></i>
                    Join Now
                  </Link>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
