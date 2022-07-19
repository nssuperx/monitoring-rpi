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

// NOTE: 設定スクリプトを別に作る以外の良さげな対策法を現時点で知らないので、これで妥協
const NA = 'Not available';
const apiPort = process.env.REACT_APP_FETCH_PORT || NA;
const host = process.env.REACT_APP_IP || NA;
const isAvailable = apiPort !== NA && host !== NA;

const SpeedTest = () => {
  const [dateBE, setDateBE] = useState<DateBeginEnd>({
    begin: formatDate(new Date('2022-06-01 00:00:00')),
    end: formatDate(new Date())
  });
  const [speedData, setSpeedData] = useState<SpeedData[]>([]);

  useEffect(() => {
    // NOTE: 上述の通り
    if (isAvailable === false) return;

    // TODO: 冗長である
    const query = new URLSearchParams({ begin: dateBE.begin, end: dateBE.end });
    fetch(`http://${host}:${apiPort}/graphdata?${query.toString()}`)
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
      {isAvailable || <p>{NA}</p>}
      <DateForm date={dateBE} onChange={handleChange} onSubmit={handleSubmit} />
      <GenChart speedDatas={speedData} />
    </div>
  );
};

export default SpeedTest;
