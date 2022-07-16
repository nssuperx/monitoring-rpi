import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('../speed/speedtest.db');

interface SpeedData {
  timestamp: string
  download_bandwidth: number
  upload_bandwidth: number
}

const dbget = (sql: string): Promise<SpeedData[]> => new Promise((resolve, reject) => {
  db.all(sql, (err, rows) => {
    if (err) reject(err);
    resolve(rows);
  });
});

const getData = async (): Promise<SpeedData[]> => {
  const rows = await dbget('SELECT datetime(timestamp, "localtime") as timestamp, download_bandwidth, upload_bandwidth FROM speedtest where datetime(timestamp) > datetime("now", "-7 days")')
    .then((res) => res);
  return rows;
};

export default getData;
export { SpeedData };
