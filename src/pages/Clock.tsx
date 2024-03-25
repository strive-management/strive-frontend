import { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import dayjs from 'dayjs';


import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Tokyo');


interface EmployeeInfo {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  job_title: string;
  department_name: string;
  city: string;
  address_1: string;
  address_2: string;
  zipcode: string;
  country: string;
  location_name: string;
}

interface ScheduleInfo {
  id: number;
  user_id: string;
  employee_id: number;
  fullname: string;
  date: string;
  available: boolean;
  scheduled_start: string;
  scheduled_end: string;
  clock_in: string;
  clock_out: string;
}

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

const Clock = () => {
  const { currentUser } = useAuth();
  const [hour, setHour] = useState<String>('00');
  const [min, setMin] = useState<String>('00');
  const [sec, setSec] = useState<String>('00');
  const [click, setClick] = useState<boolean>(true);
  const [employeeInformation, setEmployeeInformation] =
    useState<EmployeeInfo[]>();
  const [employeeId, setEmployeeId] = useState<string>();
  const [schedule, setSchedule] = useState<ScheduleInfo[]>([]);

  // drop down menu for employee choices

  useEffect(() => {
    const fetchBasicEmployeeData = async () => {
      try {
        const response = await axios.get(
          `${LOCALDB_URL}someEmployees?user_id=${currentUser?.uid}`
        );
        setEmployeeInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBasicEmployeeData();
  }, []);

  //fetching userSchedule
  useEffect(() => {
    const userSchedule = async () => {
      try {
        const response = await axios.get(
          `${LOCALDB_URL}schedulesclock?employee_id=${employeeId}`
        );
        console.log(employeeId);
        console.log(response.data);
        setSchedule(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    userSchedule();
  }, [employeeId, click]);

  // the above dependency array needs to be employeeId for the table to update

  const handleChange = (e: ChangeEvent<any>) => {
    const selectedEmployee = e.target.value;
    console.log(selectedEmployee);
    return setEmployeeId(selectedEmployee);
  };

  const currentTime = async () => {
    try {
      const time: any = await axios.get(
        'https://worldtimeapi.org/api/timezone/Asia/Tokyo'
      );
      const date = time.data.datetime;

      const dateTime = new Date(date);
      setHour(String(dateTime.getHours()).padStart(2, '0'));
      setMin(String(dateTime.getMinutes()).padStart(2, '0'));
      setSec(String(dateTime.getSeconds()).padStart(2, '0'));
    } catch (err: any) {
      console.log(err.meesage);
    }
  };

  const handleCheckIn = async () => {
    // const time: any = await axios.get(
    //   'https://worldtimeapi.org/api/timezone/Asia/Tokyo'
    // );
    // const date = time.data.datetime;
    // console.log(date + 'this is the date');
    const date = new Date();
    try {
      const postTime = await axios.patch(
        `${LOCALDB_URL}schedulesclock/${schedule[0].id}`,
        {
          clock_in: date.toISOString(),
        }
      );
      console.log(postTime);
      console.log(date);
      console.log(employeeId);
      setClick(!click);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  const handleCheckOut = async () => {
    // const time: any = await axios.get(
    //   'https://worldtimeapi.org/api/timezone/Asia/Tokyo'
    // );
    // const date = time.data.datetime;
    const date = new Date();
    try {
      const postTime = await axios.patch(
        `${LOCALDB_URL}schedulesclock/${schedule[0].id}`,
        {
          clock_out: date.toISOString(),
        }
      );
      console.log(postTime);
      setClick(!click);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    currentTime();
    const interval = setInterval(currentTime, 1100);
    return () => clearInterval(interval);
  }, [sec]);

  return (
    <>

      <div className='flex flex-col w-full pt-10 sm:pt-10 overflow-auto'>
      <div className="flex flex-row items-center place-content-center text-3xl top-0 z-10 h-20 pt-20 w-full text-gray-600 dark:text-gray-300">
          <div className="mt-0">Clock In / Clock Out</div>

        </div>
        <div className="p-5 sm:p-10 mt-10 sm:mt-10">
          <div className="flex gap-10 flex-col justify-center border-2 p-6 border-gray-500 dark:border-gray-300 rounded-xl">
            <div className="flex flex-col overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="flex flex-col items-center gap-6 min-w-full py-2 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-10">
                <div>
                  {click ? (
                    <h1 className="text-xl sm:text-3xl text-center font-bold py-3 border-5 border-black dark:text-gray-300">
                      Clock-IN
                    </h1>
                  ) : (
                    <h1 className="text-xl sm:text-3xl  text-center font-bold py-3 border-5 border-black dark:text-gray-300">
                      Clock-OUT
                    </h1>
                  )}
                </div>
                <div className="flex flex-col border-1 justify-center items-center text-gray-600 dark:text-gray-300 bg-transparent rounded-xl">
                  <p className=" font-extralight text-3xl sm:text-5xl relative dark:text-gray-50">
                    <span>{hour}</span>
                    <span>:</span>
                    <span>{min}</span>
                    <span>:</span>
                    <span>{sec}</span>
                  </p>
                </div>


                {click ? (
                  <button
                    className="inline-block rounded bg-blue-300 hover:bg-blue-400 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    onClick={handleCheckIn}
                  >

        <div className='flex flex-col place-items-center top-20 p-5 mt-10 border-2 border-gray-500 dark:border-gray-300 rounded-xl'>
          <div className='flex flex-col place-items-center'>
            <div className='flex flex-col items-center gap-10'>
              <div>
                {click ? (
                  <h1 className='text-md sm:text-3xl text-center font-bold py-3 border-5 border-black dark:text-gray-300'>

                    Clock-IN
                  </button>
                ) : (

                  <button
                    className="inline-block rounded bg-blue-300 hover:bg-blue-400 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    onClick={handleCheckOut}
                  >

                    Clock-OUT
                  </button>
                )}
                <select
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option className=" p-2 border">Select Employee</option>
                  {employeeInformation?.map((employee) => (
                    <option
                      key={employee.id as number}
                      value={employee.id as number}
                    >
                      {employee.id} {employee.first_name} {employee.last_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col border-1 w-[200px] h-[100px] sm:w-[400px] sm:h-[100px] justify-center items-center text-gray-600 dark:text-gray-300 bg-transparent rounded-xl'>
                <p className=' font-extralight text-3xl sm:text-5xl relative dark:text-gray-50'>
                  <span>{hour}</span>
                  <span>:</span>
                  <span>{min}</span>
                  <span>:</span>
                  <span>{sec}</span>
                </p>
              </div>

              {click ? (
                <button
                  className='inline-block rounded bg-blue-300 hover:bg-blue-400 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                  onClick={handleCheckIn}
                >
                  Clock-IN
                </button>
              ) : (
                <button
                  className='inline-block rounded bg-blue-300 hover:bg-blue-400 dark:bg-transparent dark:border-2 dark:border-blue-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-600 dark:text-blue-400 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:bg-blue-300 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong'
                  onClick={handleCheckOut}
                >
                  Clock-OUT
                </button>
              )}
              <select
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              >
                <option className=' p-2 border'>Select Employee</option>
                {employeeInformation?.map((employee) => (
                  <option
                    key={employee.id as number}
                    value={employee.id as number}
                  >
                    {employee.id} {employee.first_name} {employee.last_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='py-10'>
            <table className='min-w-full text-left text-sm  font-light text-surface dark:text-white'>
              <thead className='border-b-2 border-neutral-600 text-center font-medium dark:border-gray-300'>
                <tr>
                  <th scope='col' className='px-6 py-4'>
                    Employee ID
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Full Name
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Date
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Available
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Scheduled Start
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Scheduled End
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Clock In
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Clock Out
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((schedule) => (
                  <tr
                    key={schedule.id}
                    className='h-10 border-b border-gray-600 text-center transition duration-300 ease-in-out hover:bg-gray-300 dark:border-gray-200 dark:hover:bg-neutral-600'
                  >
                    <td>{schedule.employee_id}</td>
                    <td>{schedule.fullname}</td>
                    <td>{dayjs.tz(schedule.date).format('YYYY/MM/DD')}</td>
                    <td>{schedule.available}</td>
                    <td>
                      {schedule.scheduled_start
                        ? dayjs.tz(schedule.scheduled_start).format('HH:mm')
                        : null}
                    </td>
                    <td>
                      {schedule.scheduled_end
                        ? dayjs.tz(schedule.scheduled_end).format('HH:mm')
                        : null}
                    </td>
                    <td>
                      {schedule.clock_in
                        ? dayjs(schedule.clock_in).format('HH:mm')
                        : null}
                    </td>
                    <td>
                      {schedule.clock_out
                        ? dayjs(schedule.clock_out).format('HH:mm')
                        : null}
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
      </div>
    </>
  );
};

export default Clock;
