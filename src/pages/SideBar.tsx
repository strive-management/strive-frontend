import React from 'react';
import logo from '../images/strive1.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faCheckCircle, faChartBar, faCalendar, faBuilding, faClipboard  } from '@fortawesome/free-regular-svg-icons';


const Sidebar: React.FC = () => {
  return (
    <aside className="bg-blue-50 text-gray-700 w-64 min-h-screen flex flex-col justify-between fixed items-center inset-y-0 left-0">
    <div>
    <div className="flex items-center space-x-2 p-4">
          <img src={logo} alt="Logo" className="h-16 w-16"/>
        </div>
      <ul className="space-y-4 p-4">
        <li><FontAwesomeIcon icon={faChartBar} />  <a href="#" className="hover:text-blue-200">Dashboard</a></li>
        <li><FontAwesomeIcon icon={faEnvelope} />  <a href="#" className="hover:text-blue-200">Alerts</a></li>
        <li><FontAwesomeIcon icon={faCheckCircle} /> <a href="#" className="hover:text-blue-200">Roster</a></li>
        <li><FontAwesomeIcon icon={faCalendar} />  <a href="#" className="hover:text-blue-200">Schedules</a></li>
        <li><FontAwesomeIcon icon={faBuilding} />  <a href="#" className="hover:text-blue-200">Booking</a></li>
        <li><FontAwesomeIcon icon={faUser} />  <a href="#" className="hover:text-blue-200">Users</a></li>
        <li><FontAwesomeIcon icon={faClipboard} />  <a href="#" className="hover:text-blue-200">Resoruces</a></li>

      </ul>
    </div>
    <div className="p-4 w-10/12 mb-4 bg-blue-200 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <img src={logo} alt="User Name" className="h-10 w-10 rounded-full" />
        </div>
        <div>
          <div className="text-sm font-medium">Jimithy Bramuels</div>
        </div>
      </div>
    </div>
  </aside>
  );
};

export default Sidebar;
