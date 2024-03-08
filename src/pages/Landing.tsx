import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/strive1-cropped.svg'
import heroImage from '../assets/hex-bg.svg'

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900']
  }
});



const Landing: React.FC = () => {
  return (
    <>

      <header className="bg-blue-50">
          <nav className="bg-gray-300 text-gray-700">
            <div className="flex flex-row justify-between">
              <div className='ml-6'>
                <a href="#" className="text-lg font-semibold">
                  <img src={logo} alt="logo" className='w-20 h-20'/>
                </a>
              </div>
              <div style={{ fontFamily: "'Lato', sans-serif" }} className=' flex flex-row items-center'>
                <ul className="flex space-x-4">
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
              <div style={{ fontFamily: "'Lato', sans-serif" }} className=''>
                <div><Link className='bg-gray-400 text-gray-700 no-underline h-20 w-20 flex justify-center items-center' to="/login">Log In</Link></div>
              </div>
            </div>
          </nav>
      </header>
      <main className='flex w-full max-w-[2000px] place-content-center overflow-hidden bg-gray-50'>
      <section id='hero' className='flex w-[1400px] max-w-[2000px] items-center relative'>
        <div className='hero-section w-full h-800'>
          <img src={heroImage} className="w-full h-full object-cover" alt="Hero"/>
        </div>
        <div style={{ fontFamily: "'Lato', sans-serif" }} className='absolute top-0 p-20 left-0 w-full h-full flex z-10'>
          <p className='text-gray-700 text-3xl'>Strive Management Solutions</p>
        </div>
      </section>
      </main>
      <div className="flex justify-center py-16 bg-gray-50">
        <div className="w-[1400px] border-t border-gray-300 "></div>
      </div>
      <section className="mx-auto bg-gradient-to-b from-gray-50 to-white text-gray-700 flex w-full max-w-[2000px] relative flex-row justify-center">
        <div className='py-10 w-[1400px] bg-gradient-to-b from-gray-50 to-white'>
          <div className='grid p-10 place-items-center' style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gridAutoRows: '100px', fontFamily: "'Lato', sans-serif", fontSize: "30px"}}>
          <div style={{ gridColumnStart: 1, gridRowStart: 1 }}><h1>Fast</h1></div>
          <div style={{ gridColumnStart: 2, gridRowStart: 2 }}><h1>Simple</h1></div>
          <div style={{ gridColumnStart: 3, gridRowStart: 3 }}><h1>Efficient</h1></div>
          <div style={{ gridColumnStart: 4, gridRowStart: 4 }}><h1>Secure</h1></div>
        </div>
        </div>
      </section>
      <div className="flex justify-center py-16 bg-white">
        <div className="w-[1400px] border-t border-gray-300 "></div>
      </div>
      <footer style={{ fontFamily: "'Lato', sans-serif" }} id="footer" className="bg-white mx-auto flex w-full max-w-[2000px] items-center relative text-gray-700 p-10 flex-row justify-center text-base h-40">
          <div className='flex w-[1400px] max-w-[2000px] items-center relative justify-between'>
            <h2>Strive Management Solutions</h2>
            <div style={{ fontFamily: "'Lato', sans-serif" }} className="text-gray-700 flex flex-col sm:gap-2">
            <p className="text-right">Copyright &copy; <span id="year">2024</span></p>
            <p className="text-right">All Rights Reserved</p>
            </div>
          </div>
      </footer>

    </>
  );
}


export default Landing;