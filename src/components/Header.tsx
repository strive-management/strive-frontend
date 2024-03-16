import HamburgerMenuInt from './ui/HamburgerMenuInt';


export default function Header() {
  return (
    <>
      <nav>
        <div className="fixed flex flex-row items-center place-content-center text-3xl top-0 md:left-40 z-10 h-20 w-full bg-white border-b-2 border-gray-400 dark:bg-[#212020] dark:text-gray-300">
          {/* <h1
            style={{ fontFamily: "'Lato', sans-serif" }}
            className="text-gray-300 text-xl place-content-center"
          >
            Dashboard
          </h1> */}
          <HamburgerMenuInt />
        </div>
      </nav>
    </>
  );
}
