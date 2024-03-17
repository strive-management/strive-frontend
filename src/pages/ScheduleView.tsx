import { useEffect, useState } from 'react';
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

// interface range {
//   from: string;
//   until: string;
// }
const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

const ScheduleView = () => {
  const [scheduleInformation, setScheduleInformation] = useState<
    ScheduleInfo[]
  >([]);

  // const [range, setRange] = useState<range>({
  //   from: '',
  //   until: '',
  // });

  const headers = Object.keys(scheduleInformation[0] || {});
  const rows = scheduleInformation.map((item) => {
    return Object.values(item);
  });
  console.log(headers);
  console.log(rows[0]);

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

  return (
    <>
      <div style={containerStyle}>
        <h1 style={h1Style}>Schedule</h1>
        <div style={containerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} style={thStyle}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) => (
                    <td key={index} style={tdStyle}>
                      {typeof cell === 'boolean' ? cell.toString() : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4>from</h4>
        <input type='date' />
        <h4>Until</h4>
        <input type='date' />
      </div>
    </>
  );
};

export default ScheduleView;

const h1Style: React.CSSProperties = {
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
};
