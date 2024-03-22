import React from "react";
import { useDisclosure, useColorScheme } from "@mantine/hooks";
import LogoutBtn from '../../components/LogoutBtn';
import { Burger } from "@mantine/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faChartBar,
  faUser,
  faClock,
  faCalendar,
  faCalendarCheck,
} from "@fortawesome/free-regular-svg-icons";

const BurgerMenuInternal: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const colorScheme = useColorScheme();
  return (
    <>
      <Burger
        className="fixed top-6 right-10 z-20 block sm:hidden"
        opened={opened}
        onClick={toggle}
        aria-label="Toggle navigation"
        color={colorScheme === "dark" ? "white" : "black"}
      />
      {opened && (
        <div className="absolute backdrop-blur-md top-20 z-20 border-b-2 border-gray-300 left-0 right-0 bg-white dark:bg-[#212020] p-5 sm:hidden">
          <div className="gap-8 flex flex-col place-items-center justify-items-center sm:hidden dark:text-gray-300">
            <Link to="/dashboard">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faChartBar} />{" "}
                <h4 className=" md:block">Dashboard</h4>
              </div>
            </Link>
            <Link to="/dashboard/admin">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faUser} />{" "}
                <h4 className=" md:block">Add Employee</h4>
              </div>
            </Link>
            <Link to="/dashboard/roster">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faClipboard} />{" "}
                <h4 className=" md:block">Roster</h4>
              </div>
            </Link>
            <Link to="/dashboard/clock">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faClock} />{" "}
                <h4 className=" md:block">Clock In / Out</h4>
              </div>
            </Link>
            <Link to="/dashboard/schedule">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faCalendar} />{" "}
                <h4 className=" md:block">Set Schedule</h4>
              </div>
            </Link>
            <Link to="/dashboard/scheduleview">
              <div className="flex flex-row gap-2 items-center">
                <FontAwesomeIcon icon={faCalendarCheck} />{" "}
                <h4 className=" md:block">View Schedule</h4>
              </div>
            </Link>
            <LogoutBtn />
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenuInternal;
