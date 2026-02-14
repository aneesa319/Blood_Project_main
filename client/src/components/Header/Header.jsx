import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Droplets, Search } from "lucide-react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { role, token, id } = useSelector((state) => state.loginLogoutSlice);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDonorsBtn = () => navigate("/search/Donors");

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-lg transition font-medium text-sm ${
      isActive
        ? "bg-primary-600 text-white"
        : "text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400"
    }`;

  const navLinks = (
    <>
      <NavLink to="" className={linkClass} onClick={() => setMenuOpen(false)}>
        Home
      </NavLink>

      {token && role === "admin" && (
        <NavLink to={`/admin/${id}/dashboard`} className={linkClass} onClick={() => setMenuOpen(false)}>
          Admin Dashboard
        </NavLink>
      )}

      {token && role === "patient" && (
        <NavLink to={`/patient/${id}/dashboard`} className={linkClass} onClick={() => setMenuOpen(false)}>
          Patient Dashboard
        </NavLink>
      )}

      {token && role === "donor" && (
        <NavLink to={`/donor/${id}/dashboard`} className={linkClass} onClick={() => setMenuOpen(false)}>
          Donor Dashboard
        </NavLink>
      )}

      <NavLink to="/about" className={linkClass} onClick={() => setMenuOpen(false)}>
        About Us
      </NavLink>

      <NavLink to="/contact" className={linkClass} onClick={() => setMenuOpen(false)}>
        Contact
      </NavLink>

      {!token ? (
        <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>
          Login
        </NavLink>
      ) : (
        <NavLink to="/logout" className={linkClass} onClick={() => setMenuOpen(false)}>
          Logout
        </NavLink>
      )}

      {!token && (
        <NavLink to="/registration" className={linkClass} onClick={() => setMenuOpen(false)}>
          Register
        </NavLink>
      )}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-gray-900 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2 group">
          <Droplets className="w-8 h-8 text-primary-600 group-hover:scale-110 transition-transform" />
          <span className="text-lg font-bold font-heading text-primary-600 dark:text-primary-400">
            LifeSaver System
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Search for Donors */}
          <button
            className="hidden md:inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
            onClick={handleDonorsBtn}
          >
            <Search className="w-4 h-4" />
            Search Donors
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden border-t border-gray-200 dark:border-gray-700"
          >
            <nav className="flex flex-col space-y-1 p-4 bg-white dark:bg-gray-900">
              {navLinks}
              <button
                className="mt-2 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition"
                onClick={() => {
                  handleDonorsBtn();
                  setMenuOpen(false);
                }}
              >
                <Search className="w-4 h-4" />
                Search Donors
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
