import { FC } from 'react';
import WebFont from 'webfontloader';
import DateAndTime from './DateAndTime'

WebFont.load({
    google: {
      families: ['Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900']
    }
  });

const Dashboard: FC = () => {



    return (
        <>
        <div>
            <nav>
                <div className='flex flex-row place-content-start pl-[300px] items-center bg-gray-300 w-full h-20'>
                    <h1 style={{ fontFamily: "'Lato', sans-serif" }} className='text-gray-700 text-xl place-content-center'>Dashboard</h1>
                </div>
            </nav>
            <div className='grid grid-cols-4 gap-4 m-6 pl-[300px] pr-[100px] fixed top-20 w-full' >
                <div className='bg-gray-400 p-6 place-items-center rounded-xl'>
                        <h1 className=''>
                            <DateAndTime/>
                        </h1>
                    </div>
                    <div className='bg-gray-400 p-6 place-items-center rounded-xl'>
                        <h1 className=''>
                            On Duty Staff
                        </h1>
                    </div>
                    <div className='bg-gray-400 p-6 place-items-center rounded-xl'>
                        <h1 className=''>
                            Off Duty Staff
                        </h1>
                    </div>
                    <div className='bg-gray-400 p-6 place-items-center rounded-xl row-span-2'>
                        <h1 className=''>
                            Weather
                        </h1>
                    </div>
                    <div className='bg-gray-400 p-6 place-items-center rounded-xl col-span-2'>
                        <h1 className=''>
                            Weather
                        </h1>
                    </div>
                </div>
        </div>
        </>
    )
}

export default Dashboard;