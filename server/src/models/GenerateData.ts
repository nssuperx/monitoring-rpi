import sqlite3 from 'sqlite3';
import express from 'express';
import { SpeedData } from './SpeedTestTypes';

const db = new sqlite3.Database('../speed/speedtest.db');

const dbget = (sql: string): Promise<SpeedData[]> => new Promise((resolve, reject) => {
  db.all(sql, (err, rows) => {
    if (err) reject(err);
    resolve(rows);
  });
});

const getData = async (req: express.Request): Promise<SpeedData[]> => {
  const { begin, end } = req.query;
  const rows = await dbget(`SELECT timestamp, download_bandwidth, upload_bandwidth
                            FROM speedtest_jst
                            WHERE timestamp BETWEEN datetime("${begin}") AND datetime("${end}")`)
    .then((res) => res);
  return rows;
};

export default getData;
