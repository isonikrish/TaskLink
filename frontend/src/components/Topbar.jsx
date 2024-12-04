import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTasks, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { useMainContext } from '../contexts/MainContext';

function Topbar() {
  const { handleLogout } = useMainContext();

  return (
    <>
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4">
        <ul className="menu bg-base-200 lg:menu-horizontal rounded-box shadow-lg flex flex-col lg:flex-row items-center lg:justify-center space-y-2 lg:space-y-0 lg:space-x-4">
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

          {/* Trigger the modal using a label */}
          <li className="w-full lg:w-auto">
            <label
              htmlFor="my_modal_6"
              className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
            >
              <FaSignOutAlt className="text-xl" />
              <span>Logout</span>
            </label>
          </li>

          <li className="w-full lg:w-auto">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 w-full lg:w-auto hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Profile" />
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>

      {/* Modal Structure - placed outside the UL */}
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
