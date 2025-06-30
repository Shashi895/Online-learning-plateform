import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className="text-gray-700 dark:text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium"
    >
      {label}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md px-5 md:px-16 py-3 flex items-center justify-between">
      {/* Brand / Logo */}
      <Link to="/" className="text-xl font-bold text-yellow-500">
        LearnX
      </Link>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center space-x-5">
        <NavLink to="/" label="Home" />
        <NavLink to="/courses" label="Courses" />
        <NavLink to="/about" label="About" />
        
        {/* <NavLink to="/course/create" label="Course create" /> */}
        {role === "ADMIN" && <NavLink to="/admin/dashboard" label="Dashboard" />}
        {role === "ADMIN" &&   <NavLink to="/course/create" label="Course create" />}

        {isLoggedIn ? (
          <>
            <NavLink to="/user/profile" label="Profile" />
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" label="Login" />
            <NavLink to="/signup" label="Signup" />
          </>
        )}

        <button
          onClick={toggleDarkMode}
          className="ml-3 text-xl text-gray-700 dark:text-white"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={toggleDarkMode} className="text-lg text-gray-700 dark:text-white">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu size={26} className="text-gray-700 dark:text-white" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md p-4 flex flex-col space-y-3 md:hidden animate-fade-in z-50">
          <NavLink to="/" label="Home" />
          <NavLink to="/courses" label="Courses" />
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
          {role === "ADMIN" && <NavLink to="/admin/dashboard" label="Dashboard" />}

          {isLoggedIn ? (
            <>
              <NavLink to="/user/profile" label="Profile" />
              <button
                onClick={handleLogout}
                className="text-sm px-3 py-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" label="Login" />
              <NavLink to="/signup" label="Signup" />
            </>
          )}
        </div>
      )}
    </nav>
  );
}
