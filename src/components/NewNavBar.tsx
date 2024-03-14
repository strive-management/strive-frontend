import React from "react";
import logoLight from "../assets/2-white.svg";
import logoDark from "../images/strive1.svg";
import { Link } from "react-router-dom";
import HamburgerMenuInternal from '../components/ui/HamburgerMenuInternal';
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
      <HamburgerMenuInternal />
      <div className="hidden fixed z-10 min-h-screen border-r-2 border-gray-400 sm:bg-white sm:border-r-2 sm:border-gray-400 sm:flex sm:flex-col sm:w-20 md:w-40 md:border-r-2 dark:bg-[#212020]">
        
        <div className="absolute flex items-center sm:left-2 md:left-8 top-0">
          <img src={logoDark} alt="Logo" className="h-20 w-20 block dark:hidden" />
          <img src={logoLight} alt="Logo" className="h-20 w-20 hidden dark:block" />
        </div>
      <div
        id="links"
        className="fixed top-[150px] sm:content-center sm:pl-7 md:justify-center gap-6 flex flex-col z-10 dark:text-gray-300"
      >
        <Link to="/dashboard">
          <div className="flex flex-row gap-2 items-center"><FontAwesomeIcon icon={faChartBar} /> <h4 className="hidden sm:hidden md:block">Dashboard</h4></div>
        </Link>
        <Link to="/admin">
        <div className="flex flex-row gap-2 items-center"><FontAwesomeIcon icon={faUser} /> <h4 className="hidden sm:hidden md:block">Admin</h4></div>
        </Link>
        <Link to="/roster">
        <div className="flex flex-row gap-2 items-center"><FontAwesomeIcon icon={faClipboard} /> <h4 className="hidden sm:hidden md:block">Roster</h4></div>
        </Link>
        <Link to="/clock">
        <div className="flex flex-row gap-2 items-center"><FontAwesomeIcon icon={faClock} /> <h4 className="hidden sm:hidden md:block">Clock</h4></div>
        </Link>
      </div>
      </div>
    </>
  );
};

export default SideNavBar;
