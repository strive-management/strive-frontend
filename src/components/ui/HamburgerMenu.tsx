import React from "react";
import { useDisclosure, useColorScheme } from "@mantine/hooks";
import { Burger } from "@mantine/core";
import { Link } from "react-router-dom";

const BurgerMenu: React.FC = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  const colorScheme = useColorScheme();

  const handleLinkClick = () => {
    close();
  };

  return (
    <>
      <Burger
        className="block sm:hidden"
        opened={opened}
        onClick={(e) => {
          e.preventDefault();
          toggle();
        }}
        aria-label="Toggle navigation"
        color={colorScheme === "dark" ? "white" : "black"}
      />
      {opened && (
        <div className="absolute z-0 left-0 right-0 bg-white dark:bg-black p-5 sm:hidden">
          <div className="gap-8 flex flex-col place-items-center justify-items-center sm:hidden">
            <Link to="/" className="text-gray-700 text-xl dark:text-gray-300 dark:hover:text-gray-400">
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 text-xl dark:text-gray-300 dark:hover:text-gray-400"
            >
              About
            </Link>
            <Link to="/team" className="text-gray-700 text-xl dark:text-gray-300 dark:hover:text-gray-400">
              Team Strive
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 text-xl dark:text-gray-300 dark:hover:text-gray-400"
            >
              Contact
            </Link>

            <div
              style={{ fontFamily: "'Rubik', sans-serif", fontSize: "large" }}
              className="flex flex-row place-items-center"
            >
              <div className="m-6 place-self-center sm:m-6">
                <Link
                  className="text-gray-700  text-xl bg-[#d3ebf9] hover:bg-[#92c9f9] dark:text-black dark:bg-gray-200 dark:hover:bg-gray-400 px-4 py-2 m-2 rounded"
                  onClick={handleLinkClick}
                  to="/login"
                >
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BurgerMenu;
