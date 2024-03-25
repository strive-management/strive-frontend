import HamburgerMenuInt from "./ui/HamburgerMenuInt";
import logoLight from "../images/strive-black.svg";
import logoDark from "../images/strive-white.svg";

export default function Header() {
  return (
    <>
      <nav>
      
        <div className="fixed flex flex-row text-3xl top-0 z-20 h-20 w-full bg-white border-b-2 border-gray-400 dark:bg-[#212020] dark:text-gray-300">
          {/* <h1
            style={{ fontFamily: "'Lato', sans-serif" }}
            className="text-gray-300 text-xl place-content-center"
          >
            Dashboard
          </h1> */}
          <div className="flex items-center pl-10">
            <img
              src={logoLight}
              alt="Logo"
              className="h-20 w-20 block dark:hidden"
            />
            <img
              src={logoDark}
              alt="Logo"
              className="h-20 w-20 hidden dark:block"
            />
          </div>
          <HamburgerMenuInt />
        </div>
      </nav>
    </>
  );
}
