import React from 'react';
import logoLight from '../assets/2-white.svg';
import logoDark from '../images/strive1.svg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChartBar,
  faClipboard,
  faClock,
} from '@fortawesome/free-regular-svg-icons';

const SideNavBar: React.FC = () => {
  return (
    <>
      <div className="hidden bg-blue-50 text-gray-700 sm:w-20 md:w-64 min-h-screen sm:flex sm:flex-col fixed items-center inset-y-0 left-0 z-0 dark:bg-[#1a0429]/80">
        <div className="flex items-center space-x-2 p-4">
          <img
            src={logoDark}
            alt="Logo"
            className="h-20 w-20 block dark:hidden"
          />
          <img
            src={logoLight}
            alt="Logo"
            className="h-20 w-20 hidden dark:block"
          />
        </div>
      </div>
      <div
        id="links"
        className="fixed hidden top-[150px] content-center sm:pl-20 justify-center gap-6 sm:flex flex-col z-10 dark:text-gray-300"
      >
        <Link to="/dashboard">
          <FontAwesomeIcon icon={faChartBar} /> Dashboard
        </Link>
        <Link to="/dashboard/admin">
          <FontAwesomeIcon icon={faUser} /> Admin
        </Link>
        <Link to="/dashboard/roster">
          <FontAwesomeIcon icon={faClipboard} /> Roster
        </Link>
        <Link to="/dashboard/clock">
          <FontAwesomeIcon icon={faClock} /> Clock
        </Link>
      </div>
    </>
  );
};

export default SideNavBar;
