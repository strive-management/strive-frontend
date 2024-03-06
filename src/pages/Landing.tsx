import { Outlet, Link } from 'react-router-dom';
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
      <main className='max-w-full w-full overflow-hidden'>
      <section id='hero' className='relative'>
        <div className='hero-section w-full h-800'>
          <img src={heroImage} className="w-full h-full object-cover" alt="Hero"/>
        </div>
        <div style={{ fontFamily: "'Lato', sans-serif" }} className='absolute top-0 p-20 left-0 w-full h-full flex z-10'>
          <p className='text-gray-700 text-3xl'>Strive Management Solutions</p>
        </div>
      </section>
      <section className="w-full h-600 bg-black"></section>
      </main>
      <section className="mx-auto bg-gray-100 flex text-gray-700 flex-col p-4 sm:flex-row sm:justify-between">
        <div className='p-10'>
          <p>Nunc congue neque sed neque eleifend posuere at accumsan nisi. Phasellus enim tellus, tempor sed mattis sed, pellentesque non velit. Cras aliquet placerat mollis. Integer orci est, convallis vitae leo quis, gravida finibus ligula. Suspendisse finibus eros eget pretium feugiat. Sed blandit risus at sem euismod semper. Nam orci velit, volutpat quis velit eget, suscipit gravida mi. Vestibulum sit amet velit placerat, luctus enim dapibus, hendrerit elit.</p>
        </div>
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
