import React from "react";
import logoLight from "../assets/1-white.svg";
import logoDark from "../assets/strive1.svg";
import BurgerMenu from "../components/ui/HamburgerMenu";
import { Link } from "react-router-dom";

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
      <div id="about-main-container" className="flex flex-col w-full h-screen">
        <header className="fixed z-20 w-full">
          <nav className="fixed w-full backdrop-blur-md bg-white/80 text-gray-800 h-30 dark:bg-[#1a0429]/80 drop-shadow dark:text-gray-300">
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
                    className="text-gray-700 text-sm bg-[#d3ebf9] hover:bg-[#92c9f9] dark:text-black dark:bg-[#c982f9] dark:hover:bg-[#905593] px-4 py-2 m-2 rounded"
                    to="/login"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <main className=" flex w-full h-screen max-w-[2000px] place-content-center overflow-hidden bg-[#fbf7fc] dark:bg-[#1a0429]">
          <div className="p-20 mt-[200px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-10 auto-rows-[200px] font-rubik text-2xl">
              <div className="flex flex-col w-[200px] h-[200px] border-solid border-2 border-[#c0f2fc] bg-white dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
                <h1 className="text-xl sm:text-xl">Matt K</h1>
              </div>
              <div className="flex flex-col w-full border-solid border-2 border-[#c0f2fc] bg-white dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
                <h1 className="text-3xl sm:text-4xl">Haru M</h1>
              </div>
              <div className="flex flex-col w-full border-solid border-2 border-[#c0f2fc] bg-white dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
                <h1 className="text-3xl sm:text-4xl">Kevin T</h1>
              </div>
              <div className="flex flex-col w-full border-solid border-2 border-[#c0f2fc] bg-white dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
                <h1 className="text-3xl sm:text-4xl">Kevin H</h1>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;
