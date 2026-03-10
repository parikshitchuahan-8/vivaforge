import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const activeStyle =
    "text-blue-600 border-b-2 border-blue-600 pb-1";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          {/* LEFT SECTION */}

          <div className="flex items-center space-x-6">

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600"
            >
              ExamPortal
            </Link>

            {auth.user && (

              <div className="hidden md:flex items-center space-x-4">

                <NavLink
                  to="/ai-quiz"
                  className={({ isActive }) =>
                    `hover:text-blue-600 ${
                      isActive ? activeStyle : "text-gray-700"
                    }`
                  }
                >
                  AI Quiz
                </NavLink>

                <NavLink
                  to="/interview"
                  className={({ isActive }) =>
                    `hover:text-blue-600 ${
                      isActive ? activeStyle : "text-gray-700"
                    }`
                  }
                >
                  AI Interview
                </NavLink>

                <NavLink
                  to="/coding"
                  className={({ isActive }) =>
                    `hover:text-blue-600 ${
                      isActive ? activeStyle : "text-gray-700"
                    }`
                  }
                >
                  AI Coding
                </NavLink>

                <NavLink
                  to="/study"
                  className={({ isActive }) =>
                    `hover:text-blue-600 ${
                      isActive ? activeStyle : "text-gray-700"
                    }`
                  }
                >
                  AI Study
                </NavLink>

              </div>

            )}

          </div>

          {/* RIGHT SECTION */}

          <div className="flex items-center space-x-4">

            {auth.user ? (

              <>
                <span className="hidden sm:block font-medium text-gray-700">
                  Welcome, {auth.user.username}
                </span>

                <NavLink
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>

            ) : (

              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Login
              </Link>

            )}

            {/* MOBILE MENU BUTTON */}

            <button
              className="md:hidden text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>

          </div>

        </div>

        {/* MOBILE MENU */}

        {menuOpen && auth.user && (

          <div className="md:hidden mt-4 pb-4 space-y-3">

            <NavLink
              to="/ai-quiz"
              className="block text-gray-700 hover:text-blue-600"
            >
              AI Quiz
            </NavLink>

            <NavLink
              to="/interview"
              className="block text-gray-700 hover:text-blue-600"
            >
              AI Interview
            </NavLink>

            <NavLink
              to="/coding"
              className="block text-gray-700 hover:text-blue-600"
            >
              AI Coding
            </NavLink>

            <NavLink
              to="/study"
              className="block text-gray-700 hover:text-blue-600"
            >
              AI Study
            </NavLink>

          </div>

        )}

      </nav>

    </header>
  );
};

export default Navbar;