import { Link } from "react-router-dom";
import "./Sidebar.css";

import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/laptops">Laptops</Link>
        </li>

        <li>
          <Link to="/admin/rentals">Rentals</Link>
        </li>

        <li>
          <Link to="/admin/payments">Payments</Link>
        </li>

        <li>
          <Link to="/admin/kyc">KYC</Link>
        </li>

        <li>
          <Link to="/admin/reviews">Reviews</Link>
        </li>

        <li>
          <Link to="/admin/users">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
