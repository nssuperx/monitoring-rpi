import React, { useState, useEffect } from 'react';
import GenChart from './GenChart';
import DateForm from './DateForm';
import { DateBeginEnd, SpeedData } from './SpeedTestTypes';

const formatDate = (date: Date): string => {
  // TODO: 別ファイルに書くべき
  // HTMLの input type datetime-local に合わせる
  const year = date.getFullYear();
  const month = (`0${date.getMonth() + 1}`).slice(-2);
  const dd = (`0${date.getDate()}`).slice(-2);
  const hour = (`0${date.getHours()}`).slice(-2);
  const min = (`0${date.getMinutes()}`).slice(-2);
  return `${year}-${month}-${dd}T${hour}:${min}`;
};

const apiPort = process.env.REACT_APP_FETCH_PORT;
const host = process.env.REACT_APP_IP;

const SpeedTest = () => {
  const [dateBE, setDateBE] = useState<DateBeginEnd>({
    begin: formatDate(new Date()),
    end: formatDate(new Date())
  });
  const [speedData, setSpeedData] = useState<SpeedData[]>([]);

  useEffect(() => {
    fetch(`http://${host}:${apiPort}/graphdata`)
      .then((res) => res.json(), () => {})
      .then((data: SpeedData[]) => { setSpeedData(data); }, () => {});
  }, [dateBE]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDateBE({ ...dateBE, [name]: value });
  };

  // 消してok
  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <DateForm date={dateBE} onChange={handleChange} onSubmit={handleSubmit} />
      <GenChart speedDatas={speedData} />
    </div>
  );
};

export default SpeedTest;
