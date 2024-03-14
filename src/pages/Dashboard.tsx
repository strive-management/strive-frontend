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
      <div className='fixed top-0 left-0 z-0 h-12 w-full bg-white border-b-2 border-gray-400'>Dashboard</div>
      <div className='fixed flex flex-row border-b-2 border-gray-400 justify-center w-full h-20 top-0 z-10 bg-white sm:hidden'>
        <img src={logoDark} alt="logo-dark" className='w-20 h-20 block dark:hidden'/>
        <img src={logoLight} alt="logo-light" className='w-20 h-20 hidden dark:block'/>
      </div>
      <div id='main-content-container' className='absolute flex flex-col items-center top-20 p-10 mt-6 w-full gap-6 overflow-auto sm:left-20 md:left-40 md:grid md:grid-cols-2'>
        <div className='flex flex-col items-center content-center p-6 w-11/12 h-60 top-20 border-2 border-gray-300 rounded-xl text-2xl text-gray-600 bg-white'>
          <h1>Today</h1>
          <br></br>
          <DateAndTime/>
        </div>
        <div className='flex flex-col items-center content-center p-6 w-11/12 h-60 top-20 border-2 border-gray-300 rounded-xl text-2xl text-gray-600 bg-white'>
          <LineChart />
        </div>
        <div className='flex flex-col items-center content-center p-6 w-11/12 h-60 top-20 border-2 border-gray-300 rounded-xl text-2xl text-gray-600 bg-white'>
          <h1>Off Duty Staff</h1>
        </div>
        <div className='flex flex-col items-center content-center p-6 w-11/12 h-60 top-20 border-2 border-gray-300 rounded-xl text-2xl text-gray-600 bg-white'>
          <DonutCharts/>
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;
