import React from "react";
import logoLight from "../assets/1-white.svg";
import logoDark from "../assets/strive1.svg";
import BurgerMenu from "../components/ui/HamburgerMenu";
import { Link, Outlet } from "react-router-dom";
import dashboardImageLight from "../assets/websiteImages/A.png";
import dashboardImageDark from "../assets/websiteImages/I.png";
import dataEntryLight from "../assets/websiteImages/C.png";
import dataEntryDark from "../assets/websiteImages/H.png";
import rosterViewLight from "../assets/websiteImages/D.png";
import rosterViewDark from "../assets/websiteImages/E.png";
import clockInOutLight from "../assets/websiteImages/F.png";
import clockInOutDark from "../assets/websiteImages/G.png";

import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: [
      "Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900",
      "Rubik:400,500,700",
    ],
  },
});

const About: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-white via-white to-blue-100 dark:bg-gradient-to-r dark:from-black dark:via-black dark:to-blue-700">
        <header className="fixed z-20 w-full">
          <nav className="fixed w-full backdrop-blur-md text-gray-700 h-30 drop-shadow dark:text-gray-300">
            <div className="flex items-center justify-between mx-6 sm:flex sm:flex-row sm:justify-between">
              <div className="flex place-self-start sm:place-self-center sm:block sm:ml-6">
                <a href="#" className="text-lg font-semibold">
                  <img
                    src={logoDark}
                    alt="logo-dark"
                    className="w-20 h-20 block dark:hidden"
                  />
                  <img
                    src={logoLight}
                    alt="logo-light"
                    className="w-20 h-20 hidden dark:block"
                  />
                </a>
              </div>
              <div
                style={{ fontFamily: "'Rubik', sans-serif", fontSize: "large" }}
                className="sm:flex sm:place-items-center sm:flex-row sm:items-center"
              >
                <ul className="gap-8 hidden sm:flex sm:space-x-20 sm:flex-row flex-col place-items-center">
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
                  <Link to="/team">Team Strive</Link>
                </ul>
                <div className="place-content-end">
                  <BurgerMenu />
                </div>
              </div>
              <div
                style={{ fontFamily: "'Rubik', sans-serif", fontSize: "large" }}
                className="hidden sm:flex sm:flex-row sm:place-items-center"
              >
                <div className="m-10 place-self-center sm:m-6">
                  <Link
                    className="text-gray-700 text-sm bg-[#d3ebf9] hover:bg-[#92c9f9] dark:text-black dark:bg-gray-200 dark:hover:bg-gray-400 sm:px-4 py-2 m-2 rounded"
                    to="/login"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <Outlet />
        <main className="flex mt-10 py-10 sm:py-20 justify-start min-h-screen px-6 sm:px-[100px]">
          <section id="hero" className="text-center">
            <div
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="sm:px-8 py-8"
            >
              <h1 className="text-gray-700 font-bold dark:text-gray-300 text-3xl sm:text-5xl">
                Strive lets you manage your team from a simple, clean interface.
              </h1>

              <br />
            </div>
            <div className="sm:py-10 w-full sm:mt-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-10 font-rubik">
                <div className="border p-2 sm:p-6 border-gray-300 rounded-xl place-items-center text-xl sm:hidden overflow-hidden text-black dark:text-gray-300">
                  <p>
                    Strive gives you a minimalist, yet feature rich layout,
                    allowing you to focus more on team management and operation.
                  </p>
                </div>
                <div className="border p-2 sm:p-6 border-gray-300 rounded-xl place-items-center overflow-hidden block dark:hidden">
                  <img
                    src={dashboardImageLight}
                    alt="dashboard-light"
                    className="rounded-xl"
                  />
                </div>
                <div className="border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center overflow-hidden hidden dark:block">
                  <img
                    src={dashboardImageDark}
                    alt="dashboard-dark"
                    className="rounded-xl"
                  />
                </div>
                <div className="hidden sm:block border p-2 sm:p-6 w-full border-gray-300  rounded-xl place-items-center text-xl sm:text-2xl overflow-hidden text-black dark:text-gray-300">
                  <p>
                    Strive gives you a minimalist, yet feature rich layout,
                    allowing you to focus more on team management and operation.
                  </p>
                </div>

                <div className="hidden sm:block border p-2 sm:p-6 w-full border-gray-300  rounded-xl place-items-center text-2xl overflow-hidden text-black dark:text-gray-300">
                  <p>
                    Team roster information at the click of a mouse, or the
                    press of a finger.
                  </p>
                </div>
                <div className="sm:hidden border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center text-xl overflow-hidden text-black dark:text-gray-300">
                  <p>
                    Team roster information at the click of a mouse, or the
                    press of a finger.
                  </p>
                </div>
                <div className=" border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center overflow-hidden block dark:hidden">
                  <img
                    src={rosterViewLight}
                    alt="dashboard-light "
                    className="rounded-xl"
                  />
                </div>

                <div className=" border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center overflow-hidden hidden dark:block">
                  <img
                    src={rosterViewDark}
                    alt="dashboard-dark "
                    className="rounded-xl"
                  />
                </div>

                <div className="sm:hidden border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center text-xl overflow-hidden text-black dark:text-gray-300">
                  <p>Ultra-simple Clock In / Clock Out.</p>
                </div>
                <div className="border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center overflow-hidden block dark:hidden">
                  <img
                    src={clockInOutLight}
                    alt="clock-in-out-light"
                    className="rounded-xl"
                  />
                </div>
                <div className="border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center overflow-hidden hidden dark:block">
                  <img
                    src={clockInOutDark}
                    alt="clock-in-out-light"
                    className="rounded-xl"
                  />
                </div>
                <div className="hidden sm:block border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center text-2xl overflow-hidden text-black dark:text-gray-300">
                  <p>Ultra-simple Clock In / Clock Out.</p>
                </div>
                <div className="sm:hidden border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center text-xl overflow-hidden text-black dark:text-gray-300">
                  <p>Comprehensive data entry.</p>
                </div>
                <div className="hidden sm:block border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center text-2xl overflow-hidden text-black dark:text-gray-300">
                  <p>Comprehensive data entry.</p>
                </div>
                <div className="border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center overflow-hidden block dark:hidden">
                  <img
                    src={dataEntryLight}
                    alt="data-entry-light"
                    className="rounded-xl"
                  />
                </div>
                <div className="border p-2 sm:p-6 w-full border-gray-300 rounded-xl place-items-center overflow-hidden hidden dark:block">
                  <img
                    src={dataEntryDark}
                    alt="data-entry-dark"
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer
          style={{ fontFamily: "'Rubik', sans-serif" }}
          id="footer"
          className=" sm:mx-auto flex w-full sm:max-w-[2000px] justify-center sm:justify-center relative text-gray-700 dark:text-gray-300 sm:p-10 flex-col sm:flex-row text-base h-40"
        >
          <div className="flex flex-col sm:flex-row sm:w-full sm:max-w-[2000px] relative sm:justify-between">
            <h2 className="text-center text-xl sm:text-lg">
              Strive Management Solutions
            </h2>
            <div className="m-2 sm:m-0"></div>
            <div
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="text-gray-700 dark:text-gray-300 flex flex-col sm:gap-2"
            >
              <p className="text-center text-md sm:text-lg">
                Copyright &copy; <span id="year">2024</span>
              </p>
              <p className="text-center text-md sm:text-lg">
                All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default About;
