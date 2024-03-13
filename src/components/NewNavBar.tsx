import React from "react";
import logo from "../images/strive1.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartBar,
  faClipboard,
  faClock,
} from "@fortawesome/free-regular-svg-icons";

const SideNavBar: React.FC = () => {
  return (
    <>
      <div className="bg-blue-50 text-gray-700 w-64 min-h-screen flex flex-col fixed items-center inset-y-0 left-0 z-0">
        <div className="flex items-center space-x-2 p-4">
          <img src={logo} alt="Logo" className="h-20 w-20" />
        </div>
      </div>
      <div
        id="links"
        className="fixed top-[150px] content-center pl-20 justify-center gap-6 flex flex-col z-10"
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
        <Link to="/clock">
          <FontAwesomeIcon icon={faClock} /> Roster
        </Link>
      </div>
      <div id="user" className="flex h-[50px] w-40 bottom-10 left-10 place-content-center rounded-xl fixed bg-blue-300">
        <h3>Jimmithy B</h3>
      </div>
    </>
  );
};

export default SideNavBar;
