import { FC } from 'react';
import WebFont from 'webfontloader';
import DateAndTime from './DateAndTime';
import LineChart from '../components/LineChart';
import DonutCharts from '../components/DonutChart';
import logoLight from '../assets/1-white.svg'
import logoDark from '../assets/strive1.svg'


WebFont.load({
  google: {
    families: [
      'Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900',
    ],
  },
});

const Dashboard: FC = () => {
  return (
    <>
      
        <div className='fixed flex flex-row items-center place-content-center text-3xl top-0 md:left-40 z-10 h-20 w-full bg-white border-b-2 border-gray-400 dark:bg-[#212020] dark:text-gray-300'>
          <div>Dashboard</div>
        </div>
        
        <div className='fixed flex flex-row border-b-2 border-gray-400 justify-center h-20 top-0 z-20 bg-white sm:hidden dark:bg-[#212020]'>
          <img src={logoDark} alt="logo-dark" className='sm:w-10 sm:h-10 w-20 h-20 block dark:hidden'/>
          <img src={logoLight} alt="logo-light" className='sm:w-10 sm:h-10 w-20 h-20 hidden dark:block'/>
        </div>
      
      
      
      <div id='main-content-container' className='absolute flex flex-col items-center top-20 p-10 w-full h-screen gap-6 overflow-auto bg-white dark:bg-[#212020] sm:left-20 md:left-40 md:grid md:grid-cols-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto'>
        <div className='flex flex-col items-center content-center p-6 w-11/12 h-60 top-20 border-2 border-gray-300 dark:border-[#9fe0de] rounded-xl text-2xl text-gray-600 dark:text-gray-300 bg-white dark:bg-[#30302f]'>
          <h1>Today</h1>
          <br></br>
          <DateAndTime/>
        </div>
        <div className='flex flex-col items-center content-center p-6 w-11/12 h-60 top-20 border-2 border-gray-300 dark:border-[#9fe0de] rounded-xl text-2xl text-gray-600 dark:text-gray-300 bg-white dark:bg-[#30302f]'>
          <LineChart />
        </div>
        <div className='flex flex-col items-center content-center p-6 w-11/12 h-60 top-20 border-2 border-gray-300 dark:border-[#9fe0de] rounded-xl text-2xl text-gray-600 dark:text-gray-300 bg-white dark:bg-[#30302f]'>
          <h1>Off Duty Staff</h1>
        </div>
        <div className='flex flex-col items-center content-center p-6 w-11/12 h-60 top-20 border-2 border-gray-300 dark:border-[#9fe0de] rounded-xl text-2xl text-gray-600 dark:text-gray-300 bg-white dark:bg-[#30302f]'>
          <DonutCharts/>
        </div>
      </div>
      
      
      
      
    </>
  );
};

export default Dashboard;
