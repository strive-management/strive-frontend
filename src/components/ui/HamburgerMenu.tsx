import React from 'react';
import { useDisclosure, useColorScheme } from '@mantine/hooks';
import { Burger } from '@mantine/core';



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
                </ul>
            </div>
        )}
    </>
  )
}

export default BurgerMenu;