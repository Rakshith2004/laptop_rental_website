import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import "./Navbar.css";
import logo from "../assets/laplogo.png";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      {/* LEFT - LOGO */}
      <div className="nav-left">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={logo} alt="LaptopRent" className="logo-img" />
        </Link>
      </div>

      {/* CENTER - LINKS (desktop) */}
      <nav className={`nav-center ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/laptops" onClick={closeMenu}>Laptops</Link>
        <Link to="/my-bookings" onClick={closeMenu}>Bookings</Link>

        {user?.role === "admin" && (
          <Link to="/admin" onClick={closeMenu}>Admin</Link>
        )}

        {/* Auth buttons inside mobile menu */}
        <div className="mobile-auth">
          {!user ? (
            <>
              <Link to="/login" className="btn login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="btn signup" onClick={closeMenu}>
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="profile" onClick={closeMenu}>
                <FaUserCircle size={22} /> Profile
              </Link>
              <button className="btn logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Overlay (mobile) */}
      {menuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

      {/* RIGHT - AUTH (desktop only) */}
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="btn login">
              Login
            </Link>
            <Link to="/signup" className="btn signup">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="profile">
              <FaUserCircle size={26} />
            </Link>

            <button className="btn logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {/* HAMBURGER TOGGLE (mobile only) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;