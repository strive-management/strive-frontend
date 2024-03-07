import { FC } from 'react';

const Dashboard: FC = () => {
    return (
        <>
        <div>
            <nav>
                <div className='bg-gray-300 w-full h-20'></div>
            </nav>
            <div className='grid grid-cols-4 gap-4 m-6 pl-[300px] pr-[100px] fixed top-20 w-full' >
                <div className='bg-gray-400 p-6 place-items-center rounded-xl'>
                        <h1 className=''>
                            Today's Date
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
                    <div className='bg-gray-400 p-6 place-items-center rounded-xl '>
                        <h1 className=''>
                            Weather
                        </h1>
                    </div>
                    <div className='bg-gray-400 p-6 place-items-center rounded-xl'>
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