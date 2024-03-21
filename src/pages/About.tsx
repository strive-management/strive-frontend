import React from "react";
import logoLight from "../assets/1-white.svg";
import logoDark from "../assets/strive1.svg";
import BurgerMenu from "../components/ui/HamburgerMenu";
import { Link, Outlet } from "react-router-dom";


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
        <main className="flex items-center justify-center min-h-screen px-6 sm:px-[100px]"></main>
        </div>
        
    </>
  );
};

export default About;
