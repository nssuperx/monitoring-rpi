import React, { useState, useEffect } from 'react';
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

const apiPort = process.env.REACT_APP_FETCH_PORT;
const host = process.env.REACT_APP_IP;

const GenChart = () => {
  const [posts, setPosts] = useState<SpeedData[]>([]);

  useEffect(() => {
    fetch(`http://${host}:${apiPort}/graphdata`)
      .then((res) => res.json(), () => {})
      .then((data: SpeedData[]) => {
        setPosts(data);
      }, () => {});
  }, []);

  const speedDataRows = posts;
  const timestamp: string[] = [];
  const downBandwidth: number[] = [];
  const upBandwidth: number[] = [];

  speedDataRows.forEach((data) => {
    timestamp.push(data.timestamp);
    downBandwidth.push(data.download_bandwidth / 125000);
    upBandwidth.push(data.upload_bandwidth / 125000);
  });

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
