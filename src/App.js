import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import AddProperty from "./components/AddProperty";
import PropertyList from "./components/PropertyList";
import Footer from "./components/Footer";


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      {token ? (
        <>
          <Navbar handleLogout={handleLogout} />
          <Routes>
            <Route path="/my-properties" element={<PropertyList token={token} />} />
            <Route path="/add-property" element={<AddProperty token={token} />} />
            <Route path="/add-property/:id" element={<AddProperty token={token} />} />
            <Route path="*" element={<Navigate to="/my-properties" />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <>
          <Navbar loggedOut />
          <Routes>
            <Route path="/signup" element={<Signup setToken={setToken} />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
};

export default App;
