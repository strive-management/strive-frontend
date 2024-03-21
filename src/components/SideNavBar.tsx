import React from 'react';
import LogoutBtn from './LogoutBtn';

import { Link } from 'react-router-dom';
import HamburgerMenuInt from './ui/HamburgerMenuInt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faChartBar,
  faClipboard,
  faClock,
  faCalendar,
  faCalendarCheck,
  faFile,
} from '@fortawesome/free-regular-svg-icons';

const SideNavBar: React.FC = () => {
  return (
    <>
      <div className="sm:border-r-2 sm:border-gray-400">
        <HamburgerMenuInt />
        <div className="hidden pt-[100px] z-10 min-h-screen sm:bg-white sm:flex sm:flex-col sm:w-20 md:w-[180px] dark:bg-[#212020]">
          <div className="top-[150px] sm:content-center sm:pl-7 md:justify-center gap-6 flex flex-col sm:w-30 z-10 dark:text-gray-300">
            <Link to="/dashboard">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faChartBar} />{' '}
                <h4 className="hidden sm:hidden md:block">Dashboard</h4>
              </div>
            </Link>
            <Link to="/dashboard/admin">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faUser} />{' '}
                <h4 className="hidden sm:hidden md:block">Admin</h4>
              </div>
            </Link>
            <Link to="/dashboard/roster">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faClipboard} />{' '}
                <h4 className="hidden sm:hidden md:block">Roster</h4>
              </div>
            </Link>
            <Link to="/dashboard/clock">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faClock} />{' '}
                <h4 className="hidden sm:hidden md:block">Clock In / Out</h4>
              </div>
            </Link>
            <Link to="/dashboard/schedule">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faCalendar} />{' '}
                <h4 className="hidden sm:hidden md:block">Set Schedule</h4>
              </div>
            </Link>
            <Link to="/dashboard/scheduleview">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faCalendarCheck} />{' '}
                <h4 className="hidden sm:hidden md:block">View Schedule</h4>
              </div>
            </Link>
            <Link to="/dashboard/cloudDisplay">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faFile} />{' '}
                <h4 className="hidden sm:hidden md:block">Files</h4>
              </div>
            </Link>
            <LogoutBtn />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
