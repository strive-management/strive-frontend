import React from 'react';
import { useDisclosure, useColorScheme } from '@mantine/hooks';
import { Burger } from '@mantine/core';
import { Link } from 'react-router-dom';



const BurgerMenu: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const colorScheme = useColorScheme();
  return (
    <>
        <Burger className="block sm:hidden" opened={opened} onClick={toggle} aria-label="Toggle navigation" color={colorScheme === 'dark' ? 'white' : 'black'}/>
        { opened && (
                <div className='absolute backdrop-blur-md top-20 z-0 left-0 right-0 bg-white/80 dark:bg-[#1a0429] p-5 sm:hidden'>
                <ul className="gap-8 flex flex-col place-items-center justify-items-center sm:hidden">
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
                  <li>
                  <div style={{ fontFamily: "'Rubik', sans-serif", fontSize: "large" }} className='flex flex-row place-items-center'>
                    <div className='m-10 place-self-center sm:m-6'><Link className='text-gray-700 text-sm bg-[#d3ebf9] hover:bg-[#92c9f9] dark:text-black dark:bg-[#c982f9] dark:hover:bg-[#905593] px-4 py-2 m-2 rounded' to="/login">Log In</Link></div>
                  </div>
                  </li>
                </ul>
            </div>
        )}
    </>
  )
}

export default BurgerMenu;