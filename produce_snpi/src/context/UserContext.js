// // src/context/UserContext.js
// import React, { createContext, useState, useEffect } from "react";
// import { login, logout, getCurrentUser, isAuthenticated } from "../services/authService";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(getCurrentUser());
//   const [authenticated, setAuthenticated] = useState(isAuthenticated());

//   const handleLogin = async (username, password) => {
//     const data = await login(username, password);
//     setUser(data.user);
//     setAuthenticated(true);
//   };

//   const handleLogout = () => {
//     logout();
//     setUser(null);
//     setAuthenticated(false);
//   };

//   return (
//     <UserContext.Provider value={{ user, authenticated, handleLogin, handleLogout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (username, password) => {
    const fakeUser = {
      username: username || "demo",
      role: "admin",
    };
    setUser(fakeUser);
    setAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("token", "fake-jwt-token");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, authenticated, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
