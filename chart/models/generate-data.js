'use strict';
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("../speed/speedtest.db");

const getData = async () => {
    const rows = await dbget('SELECT timestamp, download_bandwidth, download_bytes FROM speedtest')
        .then(res => {
            return res;
        });

    const timestamp = [];
    const bandwidth = [];

    for (let i = 0; i < rows.length; i++) {
        timestamp.push(rows[i].timestamp);
        bandwidth.push(rows[i].download_bandwidth);
    }

    return {
        type: 'line',
        data: {
            labels: timestamp,
            datasets: [{
                label: 'speed',
                data: bandwidth,
                borderColor: 'rgba(255, 99, 132, 1)'
            }]
        },
        options: {}
    };
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
