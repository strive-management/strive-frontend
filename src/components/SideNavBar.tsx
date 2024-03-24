import React from "react";
//import LogoutBtn from './LogoutBtn';
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenuInt from "./ui/HamburgerMenuInt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartBar,
  faClipboard,
  faClock,
  faCalendarCheck,
  faFile,
  faRectangleXmark,
  faCalendarPlus
} from "@fortawesome/free-regular-svg-icons";

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

const SideNavBar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent the default link action
    try {
      await logout();
      await axios.post(`${LOCALDB_URL}logout`);
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <>
      <div className="sm:border-r-2 sm:border-gray-400">
        <HamburgerMenuInt />
        <div className="hidden pt-[100px] z-10 min-h-screen sm:bg-white sm:flex sm:flex-col sm:w-20 md:w-[180px] dark:bg-[#212020]">
          <div className="flex flex-col p-6">
          <div className="top-[150px] sm:content-center md:justify-center gap-6 flex flex-col sm:w-30 z-10 dark:text-gray-300">
            <Link to="/dashboard">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faChartBar} />{" "}
                <h4 className="hidden sm:hidden md:block">Dashboard</h4>
              </div>
            </Link>
            <Link to="/dashboard/admin">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faUser} />{" "}
                <h4 className="hidden sm:hidden md:block">Add Employee</h4>
              </div>
            </Link>
            <Link to="/dashboard/roster">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faClipboard} />{" "}
                <h4 className="hidden sm:hidden md:block">Roster</h4>
              </div>
            </Link>
            <Link to="/dashboard/clock">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faClock} />{" "}
                <h4 className="hidden sm:hidden md:block">Clock In / Out</h4>
              </div>
            </Link>
            <Link to="/dashboard/schedule">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faCalendarPlus} />{" "}
                <h4 className="hidden sm:hidden md:block">Set Schedule</h4>
              </div>
            </Link>
            <Link to="/dashboard/scheduleview">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faCalendarCheck} />{" "}
                <h4 className="hidden sm:hidden md:block">View Schedule</h4>
              </div>
            </Link>
            <Link to="/dashboard/cloudDisplay">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faFile} />{" "}
                <h4 className="hidden sm:hidden md:block">Files</h4>
              </div>
            </Link>
            <div className="flex flex-row border-b-2 place-items-center border-gray-600 dark:border-gray-300"></div>
            <a href="/login" onClick={handleLogout}>
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faRectangleXmark} />{" "}
                <h4 className="hidden sm:hidden md:block">Log Out</h4>
              </div>
            </a>
            {/* <LogoutBtn /> */}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
