import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";

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

interface range {
  from: string;
  until: string;
}
const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

const ScheduleView = () => {
  const [scheduleInformation, setScheduleInformation] = useState<
    ScheduleInfo[]
  >([]);

  const [range, setRange] = useState<range>({
    from: "",
    until: "",
  });

  // const headers = Object.keys(scheduleInformation[0] || {});
  const rows = scheduleInformation.map((item) => {
    return Object.values(item);
  });

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

  function handleRange(e: ChangeEvent<HTMLInputElement>) {
    setRange({ ...range, [e.target.name]: `${e.target.value}T00:00:00.000Z` });
  }
  console.log(range);

  return (
    <>
      <div className="flex flex-col w-full overflow-auto">
      <div className="top-20 p-5 sm:p-10 mt-20 sm:mt-10">

      {/* <div className="flex flex-row place-content-start pl-[300px] items-center bg-gray-300 w-full h-20">
        <h1
          style={{ fontFamily: "'Lato', sans-serif" }}
          className="text-gray-700 text-xl place-content-center"
        >
          View Schedule
        </h1>
      </div> */}

      

        <div className="flex flex-col p-5 sm:p-10 mt-10 border-2 border-gray-300 dark:border-gray-300 rounded-xl">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden mb-20">
                <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                    <tr>
                      {/* {headers.map((header) => (
                  <th key={header} >
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
                    {rows
                      .filter(
                        (row) => row[2] >= range.from && row[2] <= range.until
                      ) // Filter rows based on condition
                      .map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, index) => (
                            <td key={index}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-row gap-6 text-gray-700 dark:text-gray-300">
                <h4>From</h4>
                <input
                  type="date"
                  className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  name="from"
                  onChange={handleRange}
                />
                <h4>To</h4>
                <input
                  type="date"
                  className="px-6 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
                  name="until"
                  onChange={handleRange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      
    </>
  );
};

export default ScheduleView;

{
  /* const h1Style: React.CSSProperties = {
  marginTop: '40px',
  marginBottom: '40px',
};

const containerStyle: React.CSSProperties = {
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
};

const tableStyle: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: 'auto',
};

const thStyle: React.CSSProperties = {
  border: '1px solid #dddddd',
  padding: '8px 16px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #dddddd',
  padding: '8px',
  textAlign: 'left',
}; */
}
