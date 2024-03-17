import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { ChartData } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const LOCALDB_URL = import.meta.env.VITE_LOCALDB_URL;

interface locations {
  id: number;
  location_name: string;
  number_of_staff: number;
}

function ChartJSDonut() {
  const [data, setData] = useState<ChartData<'doughnut'>>();

  useEffect(() => {
    const fetchNames = async () => {
      try {
        await axios.get(`${LOCALDB_URL}locations`).then((response) => {
          console.log(response.data);
          setData({
            labels: response.data.map(
              (location: locations) => location.location_name
            ),
            datasets: [
              {
                label: 'dataset',
                data: response.data.map(
                  (location: locations) => location.number_of_staff
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
      } catch (error) {
        console.error(error);
      }
    };
    fetchNames();
  }, []);
  return <>{data ? <Doughnut data={data} /> : null}</>;
}

export default ChartJSDonut;
