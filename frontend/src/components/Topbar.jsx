import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaCalendarAlt, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

function Topbar() {

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4">
      <ul className="menu bg-base-200 lg:menu-horizontal rounded-box shadow-lg flex flex-col lg:flex-row items-center lg:justify-center space-y-2 lg:space-y-0 lg:space-x-4">
        {/* <li className="w-full lg:w-auto">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <FaHome className="text-xl" />
            <span>Home</span>
          </Link>
        </li> */}

        <li className="w-full lg:w-auto">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <FaTasks className="text-xl" />
            <span>Tasks</span>
          </Link>
        </li>

        <li className="w-full lg:w-auto">
          <Link
            to="/dashboard/calendar"
            className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <FaCalendarAlt className="text-xl" />
            <span>Calendar View</span>
            <span className="badge badge-sm badge-warning ml-2">NEW</span>
          </Link>
        </li>

        <li className="w-full lg:w-auto">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <FaUserCircle className="text-2xl" />
            <span>Profile</span>
          </Link>
        </li>

        <li className="w-full lg:w-auto">
          <button
            className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            onClick={() => alert('Logout clicked!')} // Replace with your logout logic
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Topbar;
