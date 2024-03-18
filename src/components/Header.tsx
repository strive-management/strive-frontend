import HamburgerMenuInt from "./ui/HamburgerMenuInt";
import logoLight from "../assets/2-white.svg";
import logoDark from "../images/strive1.svg";

export default function Header() {
  return (
    <>
      <nav>
      
        <div className="fixed flex flex-row text-3xl top-0 z-10 h-20 w-full bg-white border-b-2 border-gray-400 dark:bg-[#212020] dark:text-gray-300">
          {/* <h1
            style={{ fontFamily: "'Lato', sans-serif" }}
            className="text-gray-300 text-xl place-content-center"
          >
            Dashboard
          </h1> */}
          <div className="flex items-center pl-10">
            <img
              src={logoDark}
              alt="Logo"
              className="h-10 w-10 block dark:hidden"
            />
            <img
              src={logoLight}
              alt="Logo"
              className="h-10 w-10 hidden dark:block"
            />
          </div>
          <HamburgerMenuInt />
        </div>
      </nav>
    </>
  );
}
