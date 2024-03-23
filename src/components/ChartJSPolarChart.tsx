import { Chart as ChartJS, registerables } from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
ChartJS.register(...registerables);

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface departments {
  department_name: string;
  _count: {
    employees: number;
  };
}

function ChartJSPolarChart() {
  const [data, setData] = useState<ChartData<'polarArea'> | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        await axios
          .get(`${LOCALDB_URL}departments?user_id=${currentUser?.uid}`)
          .then((response) => {
            setData({
              labels: response.data.map(
                (department: departments) => department?.department_name
              ),
              datasets: [
                {
                  label: 'dataset',
                  data: response.data.map(
                    (department: departments) => department?._count.employees
                  ),
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                },
              ],
            });
          });
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchDepartments();
  }, []);

  return <div>{data ? <PolarArea data={data} /> : null}</div>;
}

export default ChartJSPolarChart;
