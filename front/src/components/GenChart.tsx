import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SpeedData {
  timestamp: string
  download_bandwidth: number
  upload_bandwidth: number
}

const port_api = 3001;

export const GenChart = () => {
  const [posts, setPosts] = useState<SpeedData[]>([]);

  useEffect(() => {
    fetch(`http://localhost:${port_api}/graphdata`)
      .then(res => res.json())
      .then(data => {
        setPosts(data);
      })
  }, []);

  const speedDataRows = posts;
  const timestamp = [];
  const down_bandwidth = [];
  const up_bandwidth = [];

  for (let i = 0; i < speedDataRows.length; i++) {
    timestamp.push(speedDataRows[i].timestamp);
    down_bandwidth.push(speedDataRows[i].download_bandwidth / 125000);
    up_bandwidth.push(speedDataRows[i].upload_bandwidth / 125000);
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Network Speed',
      },
    },
  };

  const labels = timestamp;

  const data = {
    labels,
    datasets: [
      {
        label: 'download',
        data: down_bandwidth,
        borderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'upload',
        data: up_bandwidth,
        borderColor: 'rgba(132, 99, 255, 1)',
      },
    ],
  };

  return <Line options={options} data={data} />;
}
