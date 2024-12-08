import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { IoIosMenu } from "react-icons/io";
import { useMainContext } from '../contexts/MainContext';

function Topbar() {
  const { handleLogout } = useMainContext();
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <>
      <div className="fixed top-4 md:left-1/2 left-0 transform md:-translate-x-1/2 z-50 px-4 w-64 md:w-auto">

   
        <div className="text-4xl md:hidden">
          <IoIosMenu onClick={() => setMenuToggle(!menuToggle)} />
        </div>


        <ul
          className={`menu bg-base-200 lg:menu-horizontal rounded-box shadow-lg flex-col lg:flex-row items-center lg:justify-center space-y-2 lg:space-y-0 lg:space-x-4 
          ${menuToggle ? "flex" : "hidden"} lg:flex`}
        >
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
            <label
              htmlFor="my_modal_6"
              className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </label>
          </li>
        </ul>
      </div>


      <input type="checkbox" id="my_modal_6" className="modal-toggle hidden" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <p className="py-4">Are you sure you want to logout?</p>
          <div className="modal-action">
            <button className="btn btn-success" onClick={handleLogout}>
              Logout
            </button>
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topbar;
