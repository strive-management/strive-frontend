import { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import dayjs from 'dayjs';

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
  }, [employeeId]);

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
      <div className='flex flex-col w-full place-items-center overflow-auto'>
        <div className='flex flex-row items-center place-content-center text-3xl top-0 z-10 h-20 w-full text-gray-600 dark:text-gray-300'>
          <div>Clock In / Out</div>
        </div>

        <div className='flex flex-col place-items-center top-20 p-5'>
          <div className='flex flex-row place-content-center w-full h-20'>
            <h1
              style={{ fontFamily: "'Lato', sans-serif" }}
              className='text-gray-300 text-xl place-content-center'
            >
              Clock In / Clock Out
            </h1>
          </div>
          <div className='flex flex-col place-items-center'>
            <div className='flex flex-col items-center'>
              <div>
                {click ? (
                  <h1 className='text-md sm:text-3xl text-center font-bold py-3 border-5 border-black dark:text-gray-300'>
                    Time-IN
                  </h1>
                ) : (
                  <h1 className='text-md sm:text-3xl  text-center font-bold py-3 border-5 border-black dark:text-gray-300'>
                    Time-OUT
                  </h1>
                )}
              </div>
              <div className='flex flex-col border-1 w-[200px] h-[100px] sm:w-[400px] sm:h-[100px] justify-center items-center opacity-40 bg-slate-400 rounded-xl'>
                <p className=' font-extralight text-3xl sm:text-5xl relative dark:text-gray-50'>
                  <span>{hour}</span>
                  <span>:</span>
                  <span>{min}</span>
                  <span>:</span>
                  <span>{sec}</span>
                </p>
              </div>
              <div className='py-4'>
                {click ? (
                  <button
                    className='mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                    onClick={handleCheckIn}
                  >
                    Check-IN
                  </button>
                ) : (
                  <button
                    className='mt-10 text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
                    onClick={handleCheckOut}
                  >
                    Check-OUT
                  </button>
                )}
                <select
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
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
          </div>
          <table>
            <thead className='border-b border-neutral-200 font-medium dark:border-white/10'>
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
                  className='border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600'
                >
                  <td>{schedule.employee_id}</td>
                  <td>{schedule.fullname}</td>
                  <td>{dayjs(schedule.date).format('YYYY/MM/DD')}</td>
                  <td>{schedule.available}</td>
                  <td>{dayjs(schedule.scheduled_start).format('HH:mm')}</td>
                  <td>{dayjs(schedule.scheduled_end).format('HH:mm')}</td>
                  <td>{dayjs(schedule.clock_in).format('HH:mm')}</td>
                  <td>{dayjs(schedule.clock_out).format('HH:mm')}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Clock;
