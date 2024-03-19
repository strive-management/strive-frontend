import { useEffect, useState } from "react";

// import Label from '../components/ui/Label';
import axios from "axios";
//import moment from 'moment';

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

  const [date, setDate] = useState<string>("");

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
  console.log(date.slice(0, 11) + "   " + date.slice(16, date.length));
  return (
    <>
      <div className="flex flex-col w-full overflow-auto">
        <div className="top-20 p-5 sm:p-10 mt-20 sm:mt-10">
            <div className="flex flex-col border-2 p-10 border-gray-300 dark:border-gray-300 rounded-xl">
              <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                      <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                        <tr>
                          {/* {headers.map((header) => (
                  <th key={header} className='px-4 py-2' scope='col'>
                    {header}
                  </th>
                ))} */}
                          <th scope="col" className="px-6 py-4">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Employee ID
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Available
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Scheduled Start
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Scheduled End
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Clock In
                          </th>
                          <th scope="col" className="px-6 py-4">
                            Clock Out
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((row) => (
                          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600 key={row[0]}">
                            {row.map((cell, index) => (
                              <td
                                key={index}
                                className="border hover:border-collapse px-4 py-2"
                              >
                                {typeof cell === "boolean"
                                  ? cell.toString()
                                  : cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex flex-col top-20 p-10 w-full gap-6 overflow-auto rounded-xl sm:left-20 md:left-40 md:grid md:grid-cols-2 lg:max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto">
                <div className="w-[200px] text-gray-700 dark:text-gray-300">
                  <h4>Select Employee</h4>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    onChange={(e) => {
                      setEmployeeScheduleInfo({
                        ...employeeScheduleInfo,
                        employee_id: parseInt(e.target.value),
                      });
                    }}
                  >
                    <option className=" p-2 border">Select Employee</option>
                    {updatedEmployeeInfo
                      ? updatedEmployeeInfo.map((employee) => {
                          return (
                            <option
                              key={employee.id as number}
                              value={employee.id as number}
                            >
                              {employee.id} {employee.first_name}{" "}
                              {employee.last_name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <h4>Date</h4>
                  <input
                    type="date"
                    className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                    name="date"
                    onChange={(e) => {
                      setDate(new Date(e.target.value).toISOString());
                      setEmployeeScheduleInfo({
                        ...employeeScheduleInfo,
                        date: new Date(e.target.value).toISOString(),
                      });
                    }}
                  />
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <h4>Shift Start Time</h4>
                  <input
                    type="time"
                    onChange={(e) => {
                      setEmployeeScheduleInfo({
                        ...employeeScheduleInfo,
                        scheduled_start:
                          date.slice(0, 11) +
                          e.target.value +
                          date.slice(16, date.length),
                      });
                    }}
                    className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <div className="text-gray-700 dark:text-gray-300">
                  <h4>Shift End Time</h4>
                  <input
                    type="time"
                    onChange={(e) => {
                      setEmployeeScheduleInfo({
                        ...employeeScheduleInfo,
                        scheduled_end:
                          date.slice(0, 11) +
                          e.target.value +
                          date.slice(16, date.length),
                      });
                    }}
                    className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                </div>
                <div id="avail-button" className="mt-10">
                  {click ? (
                    <button
                      className="inline-block rounded bg-blue-50 dark:bg-blue-300 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-700 shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                      onClick={handleAvailable}
                    >
                      Not Available
                    </button>
                  ) : (
                    <button
                      className=" text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                      onClick={handleAvailable}
                    >
                      Available
                    </button>
                  )}
                </div>
                <div id="update-button" className="mt-10">
                  <div className="text-gray-300">
                    <button
                      onClick={postSchedule}
                      className=" text-black bg-blue-200 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-white dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                      Click here to update schedules
                    </button>
                  </div>
                </div>
              </div>
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
