import { FC } from 'react';
import WebFont from 'webfontloader';
import DateAndTime from './DateAndTime';
// import DonutCharts from '../components/DonutChart';
import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';
import { Outlet, useOutlet } from 'react-router-dom';
import ChartJSDonut from '../components/ChartJSDonut';
import ChartJSBarChart from '../components/ChartJSBarChart';
import ChartJSPolarChart from '../components/ChartJSPolarChart';
import StaffTracking from '../components/StaffTracking';

WebFont.load({
  google: {
    families: [
      'Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900',
    ],
  },
});

const Dashboard: FC = () => {
  const isOutletActive = useOutlet() !== null;

  return (
    <>
      <div className='flex flex-row h-screen w-full bg-gray-100 dark:bg-[#212020]'>
        <Header />
        <SideNavBar />

        {isOutletActive ? (
          <Outlet />
        ) : (
          <div className='flex flex-grow pt-20'>
            <div
              id='main-content-container'
              className='flex flex-col items-top top-20 p-5 sm:p-10 gap-6 overflow-auto sm:left-20 md:left-40 md:grid md:grid-cols-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto'
            >
              <div className='flex flex-col items-center content-center p-6 w-11/12 top-20 border-2 border-gray-500 dark:border-gray-300 rounded-xl text-2xl text-gray-600 dark:text-gray-300'>
                <DateAndTime />
                <StaffTracking />
              </div>
              <div className='flex flex-col items-center content-center p-6 w-11/12 top-20 border-2 border-gray-500 dark:border-gray-300 rounded-xl text-2xl text-gray-600 dark:text-gray-300'>
                <h1>Staff Numbers by Department</h1>
                <ChartJSPolarChart />
              </div>
              <div className='flex flex-col items-center content-center p-6 w-11/12 top-20 border-2 border-gray-500 dark:border-gray-300 rounded-xl text-2xl text-gray-600 dark:text-gray-300'>
                <h1>Job Roles</h1>
                <ChartJSBarChart />
              </div>
              <div className='flex flex-col items-center content-center p-6 w-11/12 top-20 border-2 border-gray-500 dark:border-gray-300 rounded-xl text-2xl text-gray-600 dark:text-gray-300'>
                <h1>Staff Locations</h1>
                <ChartJSDonut />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
