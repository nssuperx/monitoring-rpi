'use strict';
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("../speed/speedtest.db");

const getData = async () => {
    const rows = await dbget('SELECT timestamp, download_bandwidth, upload_bandwidth FROM speedtest')
        .then(res => {
            return res;
        });

    const timestamp = [];
    const down_bandwidth = [];
    const up_bandwidth = [];

    for (let i = 0; i < rows.length; i++) {
        timestamp.push(rows[i].timestamp);
        down_bandwidth.push(rows[i].download_bandwidth / 125000);
        up_bandwidth.push(rows[i].upload_bandwidth / 125000);
    }

    return {
        type: 'line',
        data: {
            labels: timestamp,
            datasets: [{
                label: 'download',
                data: down_bandwidth,
                borderColor: 'rgba(255, 99, 132, 1)'
            },
            {
                label: 'upload',
                data: up_bandwidth,
                borderColor: 'rgba(132, 99, 255, 1)'
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
