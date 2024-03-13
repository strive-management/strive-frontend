import React from "react";
import logo from "../images/strive1.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartBar,
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";

const SideNavBar: React.FC = () => {
  return (
    <>
      <div className="bg-blue-50 text-gray-700 w-64 min-h-screen flex flex-col justify-between fixed items-center inset-y-0 left-0 z-0">
        <div className="flex items-center space-x-2 p-4">
          <img src={logo} alt="Logo" className="h-20 w-20" />
        </div>
      </div>
      <div
        id="links"
        className="fixed top-[100px] left-10 gap-6 flex flex-col z-10"
      >
        <Link to="/dashboard">
          <FontAwesomeIcon icon={faChartBar} /> Dashboard
        </Link>
        <Link to="/admin">
          <FontAwesomeIcon icon={faUser} /> Admin
        </Link>
        <Link to="/roster">
          <FontAwesomeIcon icon={faClipboard} /> Roster
        </Link>
      </div>
    </>
  );
};

export default SideNavBar;
