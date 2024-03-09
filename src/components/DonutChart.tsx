import { DonutChart } from '@mantine/charts';
import { data2 } from './data';

export default function DonutCharts() {
  return (
    <>
      <DonutChart data={data2} size={135} thickness={25} />;
    </>
  );
}
