import { Outlet } from 'react-router-dom';
import logo from '../assets/strive1-cropped.svg'
import heroImage from '../assets/hex-bg.svg'

import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900']
  }
});



export default function Landing() {
  return (
    <>
      <header className="bg-blue-50 w-full">
          <nav className="bg-gray-300 text-gray-700 w-full">
            <div className="container ml-6 w-full flex justify-between items-center">
              <div>
                <a href="#" className="text-lg font-semibold">
                  <img src={logo} alt="logo" className='w-20 h-20'/>
                </a>
              </div>
              <div style={{ fontFamily: "'Lato', sans-serif" }} className=' flex flex-row items-center mr-0'>
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
              <div style={{ fontFamily: "'Lato', sans-serif" }} className='flex justify-end'>
                <div className="bg-gray-400 h-20 w-20 flex justify-center items-center">Log In</div>
              </div>
            </div>
          </nav>
        <Outlet />
      </header>
      <main>
      <section id='hero' className='w-full relative'>
        <div className='hero-section w-full h-800'>
          <img src={heroImage} className="w-full h-full object-cover" alt="Hero"/>
        </div>
        <div style={{ fontFamily: "'Lato', sans-serif" }} className='absolute top-10 left-20 w-full h-full flex'>
          <p className='text-gray-700 text-3xl'>Strive Management Solutions</p>
        </div>
      </section>
      <section className="w-full h-600 bg-black"></section>
      </main>
      <section className="mx-auto bg-gray-100 flex text-gray-700 flex-col p-4 sm:flex-row sm:justify-between">

      </section>
      <footer style={{ fontFamily: "'Lato', sans-serif" }} id="footer" className="bg-gray-300 mx-auto flex text-gray-700 flex-col p-10 sm:flex-row sm:justify-between text-base h-40">
          <h2>Strive Management Solutions</h2>
        <div style={{ fontFamily: "'Lato', sans-serif" }} className="text-gray-700 flex flex-col sm:gap-2">
          <p className="text-right">Copyright &copy; <span id="year">2024</span></p>
          <p className="text-right">All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
