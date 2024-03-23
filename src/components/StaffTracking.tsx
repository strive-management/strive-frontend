import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface scheduleInfo {
  employee_id: number;
  fullname: string;
}

const StaffTracking = () => {
  const [onHoliday, setOnHoliday] = useState<scheduleInfo[]>();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchHolidayEmployees = async () => {
      try {
        await axios
          .get(`${LOCALDB_URL}schedulesholiday?user_id=${currentUser?.uid}`)
          .then((response) => {
            setOnHoliday(response.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchHolidayEmployees();
  }, []);
  console.log(onHoliday);
  return (
    <>
      {onHoliday ? (
        <table className=''>
          <thead>
            <tr>
              <th>On Scheduled Holiday Today</th>
            </tr>
          </thead>
          <tbody className='flex justify-center'>
            <td>
              {onHoliday?.map((employee) => (
                <tr>
                  <td>{employee.employee_id}</td>
                  <td>{employee.fullname}</td>
                </tr>
              ))}
            </td>
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default StaffTracking;
