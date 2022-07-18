import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GenChartProps } from './SpeedTestTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GenChart = (props: GenChartProps) => {
  const { speedDatas } = props;

  const speedDataRows = speedDatas;
  const timestamp: string[] = [];
  const downBandwidth: number[] = [];
  const upBandwidth: number[] = [];

  if (speedDataRows !== undefined) {
    speedDataRows.forEach((data) => {
      timestamp.push(data.timestamp);
      downBandwidth.push(data.download_bandwidth / 125000);
      upBandwidth.push(data.upload_bandwidth / 125000);
    });
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Network Speed'
      }
    }
  };

  const labels = timestamp;

  const data = {
    labels,
    datasets: [
      {
        label: 'download',
        data: downBandwidth,
        borderColor: 'rgba(255, 99, 132, 1)'
      },
      {
        label: 'upload',
        data: upBandwidth,
        borderColor: 'rgba(132, 99, 255, 1)'
      }
    ]
  };

  return <Line options={options} data={data} />;
};

export default GenChart;
