import React from "react";
import { Link, Outlet } from "react-router-dom";
import logoLight from "../assets/1-white.svg";
import logoDark from "../assets/strive1.svg";

import bolt from "../assets/Icons/bolt.svg";
import celebrate from "../assets/Icons/celebrate.svg";
import lock from "../assets/Icons/lock.svg";
import spa from "../assets/Icons/spa.png";
import BurgerMenu from "../components/ui/HamburgerMenu";

import WebFont from "webfontloader";

WebFont.load({
  google: {
    families: [
      "Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900",
      "Rubik:400,500,700",
    ],
  },
});

const Landing: React.FC = () => {
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
        <main className="flex items-center justify-center min-h-screen px-6 sm:px-[100px]">
          <section id="hero" className="text-center">
            <div
              style={{ fontFamily: "'Rubik', sans-serif" }}
              className="sm:px-8 py-8"
            >
              <h1 className="text-gray-700 font-bold dark:text-gray-300 text-2xl sm:text-6xl">
                Easily manage your team so that you can place your effort where
                it really matters.
              </h1>
              <br />
              <div className="sm:px-20">
                <p className="text-gray-700 dark:text-gray-300 text-xl sm:text-3xl">
                  Strive is a modern, user-focused personnel management solution
                  that lets you easily manage your most valuable resource: your
                  team.
                </p>
              </div>
              <br />
              <br />
              <Link
              className="text-gray-700 text-lg sm:text-2xl bg-blue-100 hover:bg-[#92c9f9] dark:text-black dark:bg-gray-200 dark:hover:bg-gray-400 px-8 py-3 sm:px-10 sm:py-4 ms:m-2 rounded-xl"
              to="/about"
            >
              Learn More
            </Link>
            </div>
          </section>
        </main>

        <section
          className=" flex justify-center py-16"
          style={{ fontFamily: "'Rubik', sans-serif", fontSize: "30px" }}
        >
          <div className="py-10 px-10 mx-6 max-w-[1400px] flex rounded-xl text-center justify-center text-gray-700 dark:text-gray-300">
            <h2 className="text-3xl sm:text-xl2">
              Striving to make personnel managament as easy as possible.
            </h2>
          </div>
        </section>

        <section className="mx-auto  text-gray-700 dark:text-gray-300 flex flex-wrap justify-center w-full max-w-[2000px] px-4 sm:px-6 sm:pb-20 lg:px-8">
          <div className="py-10 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-8 auto-rows-[200px] font-rubik text-4xl">
              <div className="flex flex-col py-8 w-full rounded-xl place-items-center">
                <h1 className="text-3xl sm:text-4xl">Fast</h1>
                <img
                  src={bolt}
                  alt="logo-dark"
                  className="w-10 h-10 block dark:hidden"
                />
              </div>
              <div className="flex flex-col py-8 w-full rounded-xl place-items-center">
                <h1 className="text-3xl sm:text-4xl">Simple</h1>
                <img
                  src={celebrate}
                  alt="logo-dark"
                  className="w-10 h-10 block dark:hidden"
                />
              </div>
              <div className="flex flex-col py-8 w-full rounded-xl place-items-center">
                <h1 className="text-3xl sm:text-4xl">Efficient</h1>
                <img
                  src={spa}
                  alt="logo-dark"
                  className="w-10 h-10 block dark:hidden"
                />
              </div>
              <div className="flex flex-col py-8 w-full rounded-xl place-items-center">
                <h1 className="text-3xl sm:text-4xl">Secure</h1>
                <img
                  src={lock}
                  alt="logo-dark"
                  className="w-10 h-10 block dark:hidden"
                />
              </div>
            </div>
          </div>
        </section>

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

export default Landing;
