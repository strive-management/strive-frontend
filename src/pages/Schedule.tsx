import { useEffect, useState } from 'react';
import SideNavBar from '../components/SideNavBar';
import Label from '../components/ui/Label';
import axios from 'axios';

interface ScheduleInfo {
  id: number;
  employee_id: number;
  date: string;
  available: boolean;
  scheduled_start: string;
  scheduled_end: string;
  clock_in: string;
  clock_out: string;
}

interface EmployeeInfo {
  id: number;
  first_name: string;
  last_name: string;
}

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

export default function Schedule() {
  const [scheduleInformation, setScheduleInformation] = useState<
    ScheduleInfo[]
  >([]);
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo[]>();

  const [employeeScheduleInfo, setEmployeeScheduleInfo] = useState<
    ScheduleInfo[] | any
  >();

  const [updatedEmployeeInfo, setUpdatedEmployeeInfo] =
    useState<EmployeeInfo[]>();

  const [click, setClick] = useState<boolean>(false);

  const [date, setDate] = useState<string>('');

  // const headers = Object.keys(scheduleInformation[0] || {});
  const rows = scheduleInformation.map((item) => Object.values(item));
  // because the table creates the content using the object.values method you have to use zero to access the id number.Then you can delete the specific entry.

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL}employees`);
        setEmployeeInfo(response.data);
        setUpdatedEmployeeInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNames();
  }, []);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await axios.get(`${LOCALDB_URL}schedules`);
        setScheduleInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(scheduleInformation);
    fetchScheduleData();
  }, []);

  // this useEffect is responsible for updating the drop down menu based on the date selected in the calendar input.
  useEffect(() => {
    setUpdatedEmployeeInfo(employeeInfo);
    const selectedDate = scheduleInformation.filter((schedule) => {
      return schedule.date === employeeScheduleInfo.date;
    });

    const unavailableEmployees = selectedDate.map((date) => date.employee_id);

    const availableEmployees = employeeInfo?.filter(
      (employee) => !unavailableEmployees.includes(employee.id)
    );
    setUpdatedEmployeeInfo(availableEmployees);
  }, [employeeScheduleInfo]);

  const handleAvailable = () => {
    setClick(!click);
    console.log(click);
    setEmployeeScheduleInfo({
      ...employeeScheduleInfo,
      available: click,
    });
  };

  const postSchedule = async () => {
    try {
      const scheduleInfo = await axios.post(
        `${LOCALDB_URL}schedules`,
        employeeScheduleInfo
      );
      console.log(scheduleInfo);
    } catch (err: any) {
      console.error(err.message);
    }
  };
  console.log(employeeScheduleInfo);
  console.log(date.slice(0, 11) + '   ' + date.slice(16, date.length));
  return (
    <>
      <SideNavBar />

      <div className='flex flex-row place-content-start pl-[300px] items-center w-full h-20'>
        <h1
          style={{ fontFamily: "'Lato', sans-serif" }}
          className='text-gray-700 text-xl place-content-center'
        >
          Schedule
        </h1>
      </div>
      <div className='flex flex-col items-center absolute p-10 sm:left-40'>
        <h1 className='text-xl text-gray-300 mb-10'>Schedule</h1>
        <div className='flex flex-col p-10 border-2 border-gray-300 dark:border-[#9fe0de] rounded-xl'>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">

      <table className='min-w-full text-left text-sm font-light text-surface text-gray-700 dark:text-gray-300'>
            <thead className='font-medium dark:border-gray-300'>
              <tr>
                {/* {headers.map((header) => (
                  <th key={header} className='px-4 py-2' scope='col'>
                    {header}
                  </th>
                ))} */}
                <th scope="col" className="px-6 py-4">ID</th>
                <th scope="col" className="px-6 py-4">Employee ID</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Available</th>
                <th scope="col" className="px-6 py-4">Scheduled Start</th>
                <th scope="col" className="px-6 py-4">Scheduled End</th>
                <th scope="col" className="px-6 py-4">Clock In</th>
                <th scope="col" className="px-6 py-4">Clock Out</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600 key={row[0]}">
                  {row.map((cell, index) => (
                    <td key={index} className="border hover:border-collapse px-4 py-2">
                      {typeof cell === 'boolean' ? cell.toString() : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>


          </div>
          </div>
          </div>
          <Label text={'Select Employee'} />
          <select
            onChange={(e) => {
              setEmployeeScheduleInfo({
                ...employeeScheduleInfo,
                employee_id: parseInt(e.target.value),
              });
            }}
          >
            <option className=' p-2 border'>Select Employee</option>
            {updatedEmployeeInfo
              ? updatedEmployeeInfo.map((employee) => {
                  return (
                    <option
                      key={employee.id as number}
                      value={employee.id as number}
                    >
                      {employee.id} {employee.first_name} {employee.last_name}
                    </option>
                  );
                })
              : null}
          </select>
          <div className='text-gray-300'>
            <h4>Select a Date</h4>
            <input
              type='date'
              className=' px-6 py-2 border rounded-full'
              name='date'
              onChange={(e) => {
                setDate(new Date(e.target.value).toISOString());
                setEmployeeScheduleInfo({
                  ...employeeScheduleInfo,
                  date: new Date(e.target.value).toISOString(),
                });
              }}
            />
          </div>
          <div className='text-gray-300'>
            <h4>Select a shift start time</h4>
            <input
              type='time'
              onChange={(e) => {
                setEmployeeScheduleInfo({
                  ...employeeScheduleInfo,
                  scheduled_start:
                    date.slice(0, 11) +
                    e.target.value +
                    date.slice(16, date.length),
                });
              }}
              className=' px-6 py-2 border rounded-full'
            />
          </div>
          <div className='text-gray-300'>
            <h4>Select a shift end time</h4>
            <input
              type='time'
              onChange={(e) => {
                setEmployeeScheduleInfo({
                  ...employeeScheduleInfo,
                  scheduled_end:
                    date.slice(0, 11) +
                    e.target.value +
                    date.slice(16, date.length),
                });
              }}
              className='px-6 py-2 border rounded-full'
            />
          </div>
          {click ? (
            <button className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400" onClick={handleAvailable}>Not Available</button>
          ) : (
            <button className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400" onClick={handleAvailable}>Available</button>
          )}
          <div className='text-gray-300'>
            <button onClick={postSchedule} className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-200 focus:bg-primary-accent-200 focus:outline-none focus:ring-0 active:bg-primary-accent-200 motion-reduce:transition-none dark:bg-primary-300 dark:hover:bg-primary-400 dark:focus:bg-primary-400 dark:active:bg-primary-400">
              Click here to update schedules
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// const h1Style: React.CSSProperties = {
//   marginTop: '40px',
//   marginBottom: '40px',
// };

// const containerStyle: React.CSSProperties = {
//   margin: 0,
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   width: 'auto',
// };

// const tableStyle: React.CSSProperties = {
//   borderCollapse: 'collapse',
//   width: 'auto',
// };

// const thStyle: React.CSSProperties = {
//   border: '1px solid #dddddd',
//   padding: '8px 16px',
//   textAlign: 'left',
//   backgroundColor: '#f2f2f2',
// };

// const tdStyle: React.CSSProperties = {
//   border: '1px solid #dddddd',
//   padding: '8px',
//   textAlign: 'left',
// };

//   const deleteButton: React.CSSProperties = {
//     margin: '2px',
//     padding: '7px 14px',
//     textAlign: 'left',
//     backgroundColor: 'red',
//     borderRadius: '4px',
//     fontSize: '14px',
//     fontWeight: '500',
//     color: 'white',
//   };
