'use strict';
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("../speed/speedtest.db");

const getData = async () => {
    const rows = await dbget('SELECT datetime(timestamp, "localtime") as timestamp, download_bandwidth, upload_bandwidth FROM speedtest where datetime(timestamp) > datetime("now", "-7 days")')
        .then(res => {
            return res;
        });
    return rows;
};

const dbget = (sql) => {
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = getData;
