import { FC } from 'react';
import WebFont from 'webfontloader';
import DateAndTime from './DateAndTime';
import LineChart from '../components/LineChart';
import DonutCharts from '../components/DonutChart';
import Header from '../components/Header';
import SideNavBar from '../components/SideNavBar';
import { Outlet, useOutlet } from 'react-router-dom';

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
      <div className="h-screen w-full dark:bg-[#503270]">
        <Header />
        <SideNavBar />
        {isOutletActive ? (
          <Outlet />
        ) : (
          <div className="grid grid-cols-5 gap-4 m-6 pl-[300px] pr-[100px] fixed top-20 w-full">
            <div className="bg-gray-400 p-6 place-items-center rounded-xl">
              <h1 className="">
                <DateAndTime />
              </h1>
            </div>
            <div className="bg-gray-400 p-6 place-items-center rounded-xl">
              <h1 className="">On Duty Staff</h1>
            </div>
            <div className="bg-gray-400 p-6 place-items-center rounded-xl">
              <h1 className="">Off Duty Staff</h1>
            </div>
            <div className="bg-gray-400 p-6 place-items-center rounded-xl row-span-1 col-span-2">
              <DonutCharts />
            </div>
            <div className="bg-gray-200 p-6 place-items-center rounded-xl col-span-3">
              <LineChart />
            </div>
            <DonutCharts />
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
