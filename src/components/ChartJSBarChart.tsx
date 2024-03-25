import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
ChartJS.register(...registerables);

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface jobs {
  id: number;
  job_title: string;
  _count: {
    employees: number;
  };
}

function ChartJSBarChart() {
  const [data, setData] = useState<ChartData<'bar'> | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        await axios
          .get(`${LOCALDB_URL}jobs?user_id=${currentUser?.uid}`)
          .then((response) => {
            setData({
              labels: response.data.map((job: jobs) => job.job_title),
              datasets: [
                {
                  label: 'dataset',
                  data: response.data.map(
                    (employee: jobs) => employee?._count.employees
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
    fetchJobs();
  }, []);

  return <div>{data ? <Bar data={data} /> : null}</div>;
}

export default ChartJSBarChart;
