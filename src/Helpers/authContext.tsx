// // // import React, { createContext, useContext, useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { backend_url } from "../backend_route";

// // // interface AuthContextType {
// // //   isAuthenticated: boolean;
// // //   userType: string | null;
// // //   profileRoute: string;
// // //   setIsAuthenticated: (val: boolean) => void;
// // //   logout: () => void;
// // // }

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
// // //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// // //   const [userType, setUserType] = useState<string | null>(null);
// // //   const [profileRoute, setProfileRoute] = useState("/profile");

// // //   const getWithExpirationCheck = (key: string) => {
// // //     const dataString = localStorage.getItem(key);
// // //     if (!dataString) return null;
// // //     const data = JSON.parse(dataString);
// // //     const currentTime = new Date().getTime();
// // //     if (currentTime > data.expirationTime) {
// // //       localStorage.removeItem(key);
// // //       return null;
// // //     }
// // //     return data.value;
// // //   };

// // //   const token = getWithExpirationCheck("token");
// // //   const storedUserType = getWithExpirationCheck("userType");

// // //   useEffect(() => {
// // //     const checkAuth = async () => {
// // //       if (!token || !storedUserType) return;

// // //       try {
// // //         let endpoint = "";
// // //         let profilePath = "/profile";

// // //         if (storedUserType === "Participant") {
// // //           endpoint = `${backend_url}/participants/authenticate`;
// // //           profilePath = "/profile";
// // //         } else if (storedUserType === "Service Provider") {
// // //           endpoint = `${backend_url}/serviceProviders/authenticate`;
// // //           profilePath = "/dashboard/service_provider";
// // //         } else if (storedUserType === "admin") {
// // //           endpoint = `${backend_url}/admin/authenticate`;
// // //           profilePath = "/admin";
// // //         }

// // //         const res = await axios.get(endpoint, {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         });

// // //         console.log("callign from auth context");

// // //         if (res.status === 200) {
// // //           setIsAuthenticated(true);
// // //           setUserType(storedUserType);
// // //           setProfileRoute(profilePath);
// // //         }
// // //       } catch {
// // //         setIsAuthenticated(false);
// // //       }
// // //     };

// // //     checkAuth();
// // //   }, []);

// // //   const logout = () => {
// // //     localStorage.clear();
// // //     setIsAuthenticated(false);
// // //     setUserType(null);
// // //     setProfileRoute("/profile");
// // //   };

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{
// // //         isAuthenticated,
// // //         userType,
// // //         profileRoute,
// // //         setIsAuthenticated,
// // //         logout,
// // //       }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   const ctx = useContext(AuthContext);
// // //   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
// // //   return ctx;
// // // };


// // // Helpers/authContext.tsx


// // // import { createContext, useContext, useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { backend_url } from "../backend_route";

// // // interface AuthContextType {
// // //   isAuthenticated: boolean;
// // //   userType: string | null;
// // //   profileRoute: string;
// // //   login: (email: string, password: string, userType: string) => Promise<void>;
// // //   logout: () => void;
// // // }

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
// // //   children,
// // // }) => {
// // //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// // //   const [userType, setUserType] = useState<string | null>(null);
// // //   const [profileRoute, setProfileRoute] = useState("");

// // //   const login = async (email: string, password: string, type: string) => {
// // //     let endpoint = "";
// // //     if (type === "Participant") {
// // //       endpoint = `${backend_url}/participants/login`;
// // //     } else if (type === "Service Provider") {
// // //       endpoint = `${backend_url}/serviceProviders/login`;
// // //     } else if (type === "College") {
// // //       endpoint = `${backend_url}/colleges/login`;
// // //     } else if (type === "admin") {
// // //       endpoint = `${backend_url}/admin/login`;
// // //     }

// // //     const response = await axios.post(
// // //       endpoint,
// // //       { email, password },
// // //       {
// // //         headers: { "Content-Type": "application/json" },
// // //         withCredentials: true,
// // //       }
// // //     );

// // //     console.log("Calling from auth context");

// // //     if (response.data.token) {
// // //       const expirationTime =
// // //         new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days
// // //       localStorage.setItem(
// // //         "token",
// // //         JSON.stringify({ value: response.data.token, expirationTime })
// // //       );
// // //       localStorage.setItem(
// // //         "userType",
// // //         JSON.stringify({ value: type, expirationTime })
// // //       );

// // //       console.log(type);

// // //       if (type === "Participant") {
// // //         localStorage.setItem(
// // //           "user",
// // //           JSON.stringify({ value: response.data.participant, expirationTime })
// // //         );
// // //         setProfileRoute("/profile");
// // //       } else if (type === "Service Provider") {
// // //         localStorage.setItem(
// // //           "user",
// // //           JSON.stringify({ value: response.data.serviceProvider, expirationTime })
// // //         );
// // //         setProfileRoute("/dashboard/service_provider");
// // //       } else if (type === "admin") {
// // //         setProfileRoute("/admin");
// // //       }

// // //       setUserType(type);
// // //       setIsAuthenticated(true);

// // //       console.log(profileRoute);
// // //     }
// // //   };

// // //   const logout = () => {
// // //     localStorage.clear();
// // //     setIsAuthenticated(false);
// // //     setUserType(null);
// // //     setProfileRoute("/profile");
// // //   };

// // //   const getWithExpirationCheck = (key: string) => {
// // //     const item = localStorage.getItem(key);
// // //     if (!item) return null;
// // //     const { value, expirationTime } = JSON.parse(item);
// // //     if (new Date().getTime() > expirationTime) {
// // //       localStorage.removeItem(key);
// // //       return null;
// // //     }
// // //     return value;
// // //   };

// // //   useEffect(() => {
// // //     const token = getWithExpirationCheck("token");
// // //     const type = getWithExpirationCheck("userType");

// // //     console.log("token",token);
// // //     console.log("type",type);
// // //     if (token && type) {
// // //       console.log("both token and type");
// // //       setIsAuthenticated(true);
// // //       setUserType(type);
// // //       console.log("profile route before",profileRoute);
// // //       console.log("user type before",userType);
// // //       setProfileRoute(
// // //         type === "Service Provider"
// // //           ? "/dashboard/service_provider"
// // //           : type === "admin"
// // //           ? "/admin"
// // //           : "/profile"


// // //       );
// // //     }
// // //   }, []);

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{ isAuthenticated, userType, profileRoute, login, logout }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   const context = useContext(AuthContext);
// // //   if (!context) {
// // //     throw new Error("useAuth must be used within AuthProvider");
// // //   }
// // //   return context;
// // // };

// // // import { createContext, useContext, useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { backend_url } from "../backend_route";

// // // interface AuthContextType {
// // //   isAuthenticated: boolean;
// // //   userType: string | null;
// // //   profileRoute: string;
// // //   user: any | null; // 👈 added
// // //   login: (email: string, password: string, userType: string) => Promise<void>;
// // //   logout: () => void;
// // // }

// // // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
// // //   children,
// // // }) => {
// // //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// // //   const [userType, setUserType] = useState<string | null>(null);
// // //   const [profileRoute, setProfileRoute] = useState("");
// // //   const [user, setUser] = useState<any | null>(null); // 👈 added


// // //   const login = async (email: string, password: string, type: string): Promise<string> => {
// // //     let endpoint = "";
// // //     if (type === "Participant") {
// // //       endpoint = `${backend_url}/participants/login`;
// // //     } else if (type === "Service Provider") {
// // //       endpoint = `${backend_url}/serviceProviders/login`;
// // //     } else if (type === "College") {
// // //       endpoint = `${backend_url}/colleges/login`;
// // //     } else if (type === "admin") {
// // //       endpoint = `${backend_url}/admin/login`;
// // //     }
  
// // //     const response = await axios.post(
// // //       endpoint,
// // //       { email, password },
// // //       {
// // //         headers: { "Content-Type": "application/json" },
// // //         withCredentials: true,
// // //       }
// // //     );
  
// // //     if (response.data.token) {
// // //       const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
  
// // //       localStorage.setItem(
// // //         "token",
// // //         JSON.stringify({ value: response.data.token, expirationTime })
// // //       );
// // //       localStorage.setItem(
// // //         "userType",
// // //         JSON.stringify({ value: type, expirationTime })
// // //       );
  
// // //       let route = "/profile";
  
// // //       if (type === "Participant") {
// // //         localStorage.setItem(
// // //           "user",
// // //           JSON.stringify({ value: response.data, expirationTime })
// // //         );
// // //         setUser(response.data);
// // //         route = "/profile";
// // //       } else if (type === "Service Provider") {
// // //         localStorage.setItem(
// // //           "user",
// // //           JSON.stringify({ value: response.data, expirationTime })
// // //         );
// // //         setUser(response.data);
// // //         route = "/dashboard/service_provider";
// // //       } else if (type === "admin") {
// // //         localStorage.setItem(
// // //           "user",
// // //           JSON.stringify({ value: response.data || {}, expirationTime })
// // //         );
// // //         setUser(response.data || {});
// // //         route = "/admin";
// // //       }
  
// // //       setUserType(type);
// // //       setIsAuthenticated(true);
// // //       setProfileRoute(route);
  
// // //       return route;
// // //     }
  
// // //     throw new Error("Login failed");
// // //   };


// // //   const logout = () => {
// // //     localStorage.clear();
// // //     setIsAuthenticated(false);
// // //     setUserType(null);
// // //     setUser(null); // 👈 clear user
// // //     setProfileRoute("/profile");
// // //   };

// // //   const getWithExpirationCheck = (key: string) => {
// // //     const item = localStorage.getItem(key);
// // //     if (!item) return null;
// // //     const { value, expirationTime } = JSON.parse(item);
// // //     if (new Date().getTime() > expirationTime) {
// // //       localStorage.removeItem(key);
// // //       return null;
// // //     }
// // //     return value;
// // //   };

// // //   useEffect(() => {
// // //     const token = getWithExpirationCheck("token");
// // //     const type = getWithExpirationCheck("userType");
// // //     const storedUser = getWithExpirationCheck("user"); // 👈 read stored user

// // //     if (token && type) {
// // //       setIsAuthenticated(true);
// // //       setUserType(type);
// // //       setUser(storedUser); // 👈 set user
// // //       setProfileRoute(
// // //         type === "Service Provider"
// // //           ? "/dashboard/service_provider"
// // //           : type === "admin"
// // //           ? "/admin"
// // //           : "/profile"
// // //       );
// // //     }
// // //     console.log(profileRoute);
// // //   }, []);

// // //   return (
// // //     <AuthContext.Provider
// // //       value={{
// // //         isAuthenticated,
// // //         userType,
// // //         profileRoute,
// // //         login,
// // //         logout,
// // //         user, // 👈 exposed
// // //       }}
// // //     >
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // };

// // // export const useAuth = () => {
// // //   const context = useContext(AuthContext);
// // //   if (!context) {
// // //     throw new Error("useAuth must be used within AuthProvider");
// // //   }
// // //   return context;
// // // };


// // import { createContext, useContext, useState, useEffect } from "react";
// // import axios from "axios";
// // import { backend_url } from "../backend_route";

// // interface AuthContextType {
// //   isAuthenticated: boolean;
// //   userType: string | null;
// //   profileRoute: string;
// //   user: any | null;
// //   login: (email: string, password: string, userType: string) => Promise<string>; // 👈 updated to return route
// //   logout: () => void;
// // }

// // const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
// //   children,
// // }) => {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [userType, setUserType] = useState<string | null>(null);
// //   const [profileRoute, setProfileRoute] = useState("");
// //   const [user, setUser] = useState<any | null>(null);

// //   const login = async (
// //     email: string,
// //     password: string,
// //     type: string
// //   ): Promise<string> => {
// //     let endpoint = "";

// //     switch (type) {
// //       case "Participant":
// //         endpoint = `${backend_url}/participants/login`;
// //         break;
// //       case "Service Provider":
// //         endpoint = `${backend_url}/serviceProviders/login`;
// //         break;
// //       case "College":
// //         endpoint = `${backend_url}/colleges/login`;
// //         break;
// //       case "admin":
// //         endpoint = `${backend_url}/admin/login`;
// //         break;
// //       default:
// //         throw new Error("Invalid user type");
// //     }

// //     const response = await axios.post(
// //       endpoint,
// //       { email, password },
// //       {
// //         headers: { "Content-Type": "application/json" },
// //         withCredentials: true,
// //       }
// //     );

// //     if (response.data.token) {
// //       const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

// //       localStorage.setItem(
// //         "token",
// //         JSON.stringify({ value: response.data.token, expirationTime })
// //       );
// //       localStorage.setItem(
// //         "userType",
// //         JSON.stringify({ value: type, expirationTime })
// //       );

// //       let route = "/profile";
// //       const userData = response.data;

// //       if (type === "Participant") {
// //         route = "/profile";
// //         setUser(userData.participant);
// //         console.log("userdata in context",user);
// //       } else if (type === "Service Provider") {
// //         route = "/dashboard/service_provider";
// //       } else if (type === "admin") {
// //         route = "/dashboard/admin";
// //       }

// //       localStorage.setItem(
// //         "user",
// //         JSON.stringify({ value: userData, expirationTime })
// //       );

      
// //       setUserType(type);
// //       setIsAuthenticated(true);
// //       setProfileRoute(route);

// //       return route;
// //     }

// //     throw new Error("Login failed");
// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     setIsAuthenticated(false);
// //     setUserType(null);
// //     setUser(null);
// //     setProfileRoute("/profile");
// //   };

// //   const getWithExpirationCheck = (key: string) => {
// //     const item = localStorage.getItem(key);
// //     if (!item) return null;
// //     try {
// //       const { value, expirationTime } = JSON.parse(item);
// //       if (new Date().getTime() > expirationTime) {
// //         localStorage.removeItem(key);
// //         return null;
// //       }
// //       return value;
// //     } catch {
// //       localStorage.removeItem(key);
// //       return null;
// //     }
// //   };

// //   useEffect(() => {
// //     const token = getWithExpirationCheck("token");
// //     const type = getWithExpirationCheck("userType");
// //     const storedUser = getWithExpirationCheck("user");

// //     if (token && type) {
// //       setIsAuthenticated(true);
// //       setUserType(type);
// //       setUser(storedUser);

// //       const route =
// //         type === "Service Provider"
// //           ? "/dashboard/service_provider"
// //           : type === "admin"
// //           ? "/dashboard/admin"
// //           : "/profile";

// //       setProfileRoute(route);
// //     }
// //   }, []);

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         isAuthenticated,
// //         userType,
// //         profileRoute,
// //         login,
// //         logout,
// //         user,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error("useAuth must be used within AuthProvider");
// //   }
// //   return context;
// // };




// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { backend_url } from "../backend_route";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   userType: string | null;
//   profileRoute: string;
//   user: any | null;
//   login: (email: string, password: string, userType: string) => Promise<string>; // 👈 updated to return route
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userType, setUserType] = useState<string | null>(null);
//   const [profileRoute, setProfileRoute] = useState("");
//   const [user, setUser] = useState<any | null>(null);

//   const login = async (
//     email: string,
//     password: string,
//     type: string
//   ): Promise<string> => {
//     let endpoint = "";

//     switch (type) {
//       case "Participant":
//         endpoint = `${backend_url}/participants/login`;
//         break;
//       case "Service Provider":
//         endpoint = `${backend_url}/serviceProviders/login`;
//         break;
//       case "College":
//         endpoint = `${backend_url}/colleges/login`;
//         break;
//       case "admin":
//         endpoint = `${backend_url}/admin/login`;
//         break;
//       default:
//         throw new Error("Invalid user type");
//     }

//     const response = await axios.post(
//       endpoint,
//       { email, password },
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );

//     if (response.data.token) {
//       const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

//       localStorage.setItem(
//         "token",
//         JSON.stringify({ value: response.data.token, expirationTime })
//       );
//       localStorage.setItem(
//         "userType",
//         JSON.stringify({ value: type, expirationTime })
//       );

//       let route = "/profile";
//       const userData = response.data;

//       if (type === "Participant") {
//         route = "/profile";
//         setUser(userData.participant);
//         console.log("userdata in context",user);
//       } else if (type === "Service Provider") {
//         route = "/dashboard/service_provider";
//       } else if (type === "admin") {
//         route = "/dashboard/admin";
//       }

//       localStorage.setItem(
//         "user",
//         JSON.stringify({ value: userData, expirationTime })
//       );

      
//       setUserType(type);
//       setIsAuthenticated(true);
//       setProfileRoute(route);

//       return route;
//     }

//     throw new Error("Login failed");
//   };

//   const logout = () => {
//     localStorage.clear();
//     setIsAuthenticated(false);
//     setUserType(null);
//     setUser(null);
//     setProfileRoute("/profile");
//   };

//   const getWithExpirationCheck = (key: string) => {
//     const item = localStorage.getItem(key);
//     if (!item) return null;
//     try {
//       const { value, expirationTime } = JSON.parse(item);
//       if (new Date().getTime() > expirationTime) {
//         localStorage.removeItem(key);
//         return null;
//       }
//       return value;
//     } catch {
//       localStorage.removeItem(key);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const token = getWithExpirationCheck("token");
//     const type = getWithExpirationCheck("userType");
//     const storedUser = getWithExpirationCheck("user");

//     if (token && type) {
//       setIsAuthenticated(true);
//       setUserType(type);
//       setUser(storedUser);

//       const route =
//         type === "Service Provider"
//           ? "/dashboard/service_provider"
//           : type === "admin"
//           ? "/dashboard/admin"
//           : "/profile";

//       setProfileRoute(route);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         userType,
//         profileRoute,
//         login,
//         logout,
//         user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };


// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { backend_url } from "../backend_route";

// interface AuthContextType {
//   isAuthenticated: boolean;
//   userType: string | null;
//   profileRoute: string;
//   user: any | null;
//   login: (email: string, password: string, userType: string) => Promise<string>; // 👈 updated to return route
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userType, setUserType] = useState<string | null>(null);
//   const [profileRoute, setProfileRoute] = useState("");
//   const [user, setUser] = useState<any | null>(null);

//   const login = async (
//     email: string,
//     password: string,
//     type: string
//   ): Promise<string> => {
//     let endpoint = "";

//     switch (type) {
//       case "Participant":
//         endpoint = `${backend_url}/participants/login`;
//         break;
//       case "Service Provider":
//         endpoint = `${backend_url}/serviceProviders/login`;
//         break;
//       case "College":
//         endpoint = `${backend_url}/colleges/login`;
//         break;
//       case "admin":
//         endpoint = `${backend_url}/admin/login`;
//         break;
//       default:
//         throw new Error("Invalid user type");
//     }

//     const response = await axios.post(
//       endpoint,
//       { email, password },
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );

//     if (response.data.token) {
//       const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

//       localStorage.setItem(
//         "token",
//         JSON.stringify({ value: response.data.token, expirationTime })
//       );
//       localStorage.setItem(
//         "userType",
//         JSON.stringify({ value: type, expirationTime })
//       );

//       let route = "/profile";
//       const userData = response.data;

//       if (type === "Participant") {
//         route = "/profile";
//         setUser(userData.participant); // Ensure user data is set here
//         console.log("userdata in context after login:", userData.participant); // ✅ log the actual user
//         console.log(user);
//       } else if (type === "Service Provider") {
//         route = "/dashboard/service_provider";
//       } else if (type === "admin") {
//         route = "/dashboard/admin";
//       }

//       localStorage.setItem(
//         "user",
//         JSON.stringify({ value: userData, expirationTime })
//       );

//       setUserType(type);
//       setIsAuthenticated(true);
//       setProfileRoute(route);

//       return route;
//     }

//     throw new Error("Login failed");
//   };

//   const logout = () => {
//     localStorage.clear();
//     setIsAuthenticated(false);
//     setUserType(null);
//     setUser(null);
//     setProfileRoute("/profile");
//   };

//   const getWithExpirationCheck = (key: string) => {
//     const item = localStorage.getItem(key);
//     if (!item) return null;
//     try {
//       const { value, expirationTime } = JSON.parse(item);
//       if (new Date().getTime() > expirationTime) {
//         localStorage.removeItem(key);
//         return null;
//       }
//       return value;
//     } catch {
//       localStorage.removeItem(key);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const token = getWithExpirationCheck("token");
//     const type = getWithExpirationCheck("userType");
//     const storedUser = getWithExpirationCheck("user");

//     if (token && type) {
//       setIsAuthenticated(true);
//       setUserType(type);
//       setUser(storedUser); // Load the user from localStorage

//       const route =
//         type === "Service Provider"
//           ? "/dashboard/service_provider"
//           : type === "admin"
//           ? "/dashboard/admin"
//           : "/profile";

//       setProfileRoute(route);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAuthenticated,
//         userType,
//         profileRoute,
//         login,
//         logout,
//         user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "../backend_route";

interface AuthContextType {
  isAuthenticated: boolean;
  userType: string | null;
  profileRoute: string;
  user: any | null;
  login: (email: string, password: string, userType: string) => Promise<string>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [profileRoute, setProfileRoute] = useState("");
  const [user, setUser] = useState<any | null>(null);

  const login = async (
    email: string,
    password: string,
    type: string
  ): Promise<string> => {
    let endpoint = "";

    switch (type) {
      case "Participant":
        endpoint = `${backend_url}/participants/login`;
        break;
      case "Service Provider":
        endpoint = `${backend_url}/serviceProviders/login`;
        break;
      case "College":
        endpoint = `${backend_url}/colleges/login`;
        break;
      case "admin":
        endpoint = `${backend_url}/admin/login`;
        break;
      default:
        throw new Error("Invalid user type");
    }

    const response = await axios.post(
      endpoint,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (response.data.token) {
      const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

      localStorage.setItem(
        "token",
        JSON.stringify({ value: response.data.token, expirationTime })
      );
      localStorage.setItem(
        "userType",
        JSON.stringify({ value: type, expirationTime })
      );

      let route = "/profile";
      const userData = response.data;

      if (type === "Participant") {
        route = "/profile";
        setUser(userData.participant); // Ensure user data is set here
        console.log("userdata in context after login:", userData.participant); // ✅ log the actual user
      } else if (type === "Service Provider") {
        route = "/dashboard/service_provider";
      } else if (type === "admin") {
        route = "/dashboard/admin";
      }

      localStorage.setItem(
        "user",
        JSON.stringify({ value: userData, expirationTime })
      );

      setUserType(type);
      setIsAuthenticated(true);
      setProfileRoute(route);

      return route;
    }

    throw new Error("Login failed");
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserType(null);
    setUser(null);
    setProfileRoute("/profile");
  };

  const getWithExpirationCheck = (key: string) => {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      const { value, expirationTime } = JSON.parse(item);
      if (new Date().getTime() > expirationTime) {
        localStorage.removeItem(key);
        return null;
      }
      return value;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  };

  useEffect(() => {
    const token = getWithExpirationCheck("token");
    const type = getWithExpirationCheck("userType");
    const storedUser = getWithExpirationCheck("user");

    if (token && type) {
      setIsAuthenticated(true);
      setUserType(type);
      setUser(storedUser); // Load the user from localStorage

      const route =
        type === "Service Provider"
          ? "/dashboard/service_provider"
          : type === "admin"
          ? "/dashboard/admin"
          : "/profile";

      setProfileRoute(route);
    }
  }, []);

  // Log user whenever it changes
  useEffect(() => {
    console.log("User data changed:", user); // ✅ log the user whenever it changes
  }, [user]); // This will log every time the user state changes

  useEffect(() => {
    const data = getWithExpirationCheck("user");
    const userType = localStorage.getItem("userType");
  
    if (data && userType) {
      setUser(data);
      setUserType(userType);
    }
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        profileRoute,
        login,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
