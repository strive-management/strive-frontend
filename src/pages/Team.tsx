import React from "react";
import logoLight from "../assets/1-white.svg";
import logoDark from "../assets/strive1.svg";
import BurgerMenu from "../components/ui/HamburgerMenu";
import { Link, Outlet } from "react-router-dom";
import kevint from "../assets/kevint.png";
import kevinh from "../assets/kevinh.png";
import harum from "../assets/harum.png";
import mattk from "../assets/mattk.png";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";

import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: [
      "Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900",
      "Rubik:400,500,700",
    ],
  },
});

const Team: React.FC = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-white via-white to-blue-100 dark:bg-gradient-to-r dark:from-black dark:via-black dark:to-blue-700">
        <header className="fixed z-20 w-full">
          <nav className="fixed w-full backdrop-blur-md text-gray-800 h-30 drop-shadow dark:text-gray-300">
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
                  <Link to="/contact">Contact</Link>
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
        <main className="flex flex-col items-center justify-center py-10 mt-10 px-6 sm:px-[100px]">
          <div className="flex flex-col py-10 w-full gap-10 items-center justify-center">
            <h1 className="text-4xl dark:text-white text-gray-700">
              Meet Team Strive
            </h1>
            <br />
            <div className="flex flex-col sm:grid sm:grid-cols-2 place-items-center gap-8 auto-rows-[200px] font-rubik text-4xl">
              <div className="flex flex-col bg-white dark:bg-transparent p-8 w-full rounded-xl place-items-center border border-gray-700 dark:border-gray-300">
                <img src={mattk} className="w-[200px] h-[200px]" />
                <br />
                <h2 className="dark:text-white text-gray-700 text-3xl sm:text-4xl">
                  Matt K
                </h2>
                <h3 className="dark:text-white text-gray-700 text-2xl sm:text-2xl">
                  Product Owner
                </h3>
                <br />
                <div className="flex flex-row gap-6">
                <img
                    src={github}
                    className="w-10 h-10 block black dark:bg-white"
                  ></img>

                  <img
                    src={linkedin}
                    className="w-10 h-10 block black dark:bg-white"
                  ></img>
                </div>
              </div>
              <div className="flex flex-col bg-white dark:bg-transparent p-8 w-full rounded-xl place-items-center border border-gray-700 dark:border-gray-300">
                <img src={harum} className="w-[200px] h-[200px]" />
                <br />
                <h2 className="dark:text-white text-gray-700 text-3xl sm:text-4xl">
                  Haru M
                </h2>
                <h3 className="dark:text-white text-gray-700 text-2xl sm:text-2xl">
                  Fullstack Engineer
                </h3>
                <br />
                <div className="flex flex-row gap-6">
                  <img
                    src={github}
                    className="w-10 h-10 filter dark:invert"
                    alt="GitHub"
                  />

                  <img
                    src={linkedin}
                    className="w-10 h-10 block black dark:bg-white"
                  />
                </div>
              </div>
              <div className="flex flex-col bg-white dark:bg-transparent p-8 w-full rounded-xl place-items-center border border-gray-700 dark:border-gray-300">
                <img src={kevint} className="w-[200px] h-[200px]" />
                <br />
                <h2 className="dark:text-white text-gray-700 text-3xl sm:text-4xl">
                  Kevin T
                </h2>
                <h3 className="dark:text-white text-gray-700 text-2xl sm:text-2xl">
                  Fullstack Engineer
                </h3>
                <br />
                <div className="flex flex-row gap-6">
                  <img
                    src={github}
                    className="w-10 h-10 filter dark:invert"
                    alt="GitHub"
                  />

                  <img
                    src={linkedin}
                    className="w-10 h-10 block black dark:bg-white"
                  />
                </div>
              </div>
              <div className="flex flex-col bg-white dark:bg-transparent p-8 w-full rounded-xl place-items-center border border-gray-700 dark:border-gray-300">
                <img src={kevinh} className="w-[200px] h-[200px]" />
                <br />
                <h2 className="dark:text-white text-gray-700 text-3xl sm:text-4xl">
                  Kevin H
                </h2>
                <h3 className="dark:text-white text-gray-700 text-2xl sm:text-2xl">
                  Tech Lead
                </h3>
                <br />
                <div className="flex flex-row gap-6">
                  <img
                    src={github}
                    className="w-10 h-10 filter dark:invert"
                    alt="GitHub"
                  />

                  <img
                    src={linkedin}
                    className="w-10 h-10 block black dark:bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer
          style={{ fontFamily: "'Rubik', sans-serif" }}
          id="footer"
          className=" sm:mx-auto flex w-full sm:max-w-[2000px] justify-center sm:justify-center relative text-gray-700 dark:text-gray-300 sm:p-10 flex-col sm:flex-row text-base h-40"
        >
          <div className="flex flex-col sm:flex-row sm:w-full sm:max-w-[2000px] relative sm:justify-between">
            <h2 className="text-center text-xl">Strive Management Solutions</h2>
            <div
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="text-gray-700 dark:text-gray-300 flex flex-col sm:gap-2"
            >
              <br />
              <p className="text-center">
                Copyright &copy; <span id="year">2024</span>
              </p>
              <p className="text-center">All Rights Reserved</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Team;
