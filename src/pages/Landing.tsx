import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import logoLight from '../assets/1-white.svg';
import logoDark from '../assets/strive1.svg';
import heroImageLight from '../assets/hex-pattern-3 light.svg';
import heroImageDark from '../assets/hex-pattern-5.svg';
import bolt from '../assets/Icons/bolt.svg';
import celebrate from '../assets/Icons/celebrate.svg';
import lock from '../assets/Icons/lock.svg';
import spa from '../assets/Icons/spa.png';
import BurgerMenu from '../components/ui/HamburgerMenu';

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: [
      'Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900',
      'Rubik:400,500,700',
    ],
  },
});

const Landing: React.FC = () => {
  return (
    <>
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
              style={{ fontFamily: "'Rubik', sans-serif", fontSize: 'large' }}
              className="sm:flex sm:place-items-center sm:flex-row sm:items-center"
            >
              <ul className="gap-8 hidden sm:flex sm:space-x-20 sm:flex-row flex-col place-items-center">
                <li>
                  <a href="#" className="hover:text-blue-200">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-200">
                    Contact
                  </a>
                </li>
              </ul>
              <div className="place-content-end">
                <BurgerMenu />
              </div>
            </div>
            <div
              style={{ fontFamily: "'Rubik', sans-serif", fontSize: 'large' }}
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
      <Outlet />
      <main className="flex w-full pb-[100px] max-w-[2000px] place-content-center overflow-hidden bg-[#fbf7fc] dark:bg-[#1a0429]">
        <section
          id="hero"
          className="flex mt-32 sm:mt-0 w-[1400px] max-w-[2000px] items-center relative"
        >
          <div className="blur-[4px] drop-shadow-xl hero-section w-full h-800">
            <img
              src={heroImageDark}
              className="w-full h-full object-cover rounded-md hidden dark:block"
              alt="Hero"
            />
            <img
              src={heroImageLight}
              className="w-full h-full object-cover rounded-md dark:hidden"
              alt="Hero"
            />
          </div>
          <div
            style={{ fontFamily: "'Rubik', sans-serif" }}
            className="absolute place-items-center justify-center left-0 w-full h-full flex z-10"
          >
            <div className="flex flex-col px-8 py-8 border-solid border-2 border-[#c0f2fc] bg-white/80 dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
              <p className="text-gray-700 dark:text-gray-300 text-xl sm:text-6xl">
                Strive Management Solutions
              </p>
            </div>
          </div>
        </section>
      </main>
      <div className="flex justify-center py-8 bg-[#fbf7fc] dark:bg-[#1a0429]">
        <div className="w-[1400px] border-t border-[#c982f9] "></div>
      </div>
      <section
        className="bg-[#fbf7fc] dark:bg-[#1a0429] flex justify-center py-16"
        style={{ fontFamily: "'Rubik', sans-serif", fontSize: '30px' }}
      >
        <div className="py-10 px-4 mx-6 max-w-[1400px] w-full flex border-solid border-2 bg-white border-[#c0f2fc] rounded-xl justify-center dark:border-[#75c479] dark:bg-[#2c292e] text-gray-700 dark:text-gray-300">
          <h2 className="text-lg sm:text-xl2">
            Striving to make personnel managament as easy as possible.
          </h2>
        </div>
      </section>
      <div className="flex justify-center py-16 bg-[#fbf7fc] dark:bg-[#1a0429]">
        <div className="w-[1400px] border-t border-[#c982f9] "></div>
      </div>
      <section className="mx-auto bg-[#fbf7fc] dark:bg-[#1a0429] text-gray-700 dark:text-gray-300 flex flex-wrap justify-center w-full max-w-[2000px] px-4 sm:px-6 lg:px-8">
        <div className="py-10 w-full max-w-[1400px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center gap-8 auto-rows-[200px] font-rubik text-4xl">
            <div className="flex flex-col py-8 w-full border-solid border-2 border-[#c0f2fc] bg-white dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
              <h1 className="text-3xl sm:text-4xl">Fast</h1>
              <img
                src={bolt}
                alt="logo-dark"
                className="w-10 h-10 block dark:hidden"
              />
            </div>
            <div className="flex flex-col py-8 w-full border-solid border-2 border-[#c0f2fc] bg-white dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
              <h1 className="text-3xl sm:text-4xl">Simple</h1>
              <img
                src={celebrate}
                alt="logo-dark"
                className="w-10 h-10 block dark:hidden"
              />
            </div>
            <div className="flex flex-col py-8 w-full border-solid border-2 border-[#c0f2fc] bg-white dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
              <h1 className="text-3xl sm:text-4xl">Efficient</h1>
              <img
                src={spa}
                alt="logo-dark"
                className="w-10 h-10 block dark:hidden"
              />
            </div>
            <div className="flex flex-col py-8 w-full border-solid border-2 border-[#c0f2fc] bg-white dark:border-[#75c479] dark:bg-[#2c292e] rounded-xl place-items-center">
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
      <div className="flex justify-center py-16 bg-[#fbf7fc] dark:bg-[#1a0429]">
        <div className="w-[1400px] border-t border-[#c982f9] "></div>
      </div>
      <footer
        style={{ fontFamily: "'Rubik', sans-serif" }}
        id="footer"
        className="bg-[#fbf7fc] dark:bg-[#1a0429] sm:mx-auto flex w-full sm:max-w-[2000px] justify-center sm:justify-center relative text-gray-700 dark:text-gray-300 sm:p-10 flex-col sm:flex-row text-base h-40"
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
    </>
  );
};

export default Landing;
