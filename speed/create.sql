create table speedtest
(
    id TEXT primary key,
    timestamp TEXT,
    ping_jitter REAL,
    ping_latency REAL,
    download_bandwidth INTEGER,
    download_bytes INTEGER,
    download_elapsed INTEGER,
    upload_bandwidth INTEGER,
    upload_bytes INTEGER,
    upload_elapsed INTEGER,
    packetloss INTEGER,
    isp TEXT,
    if_internal_ip TEXT,
    if_name TEXT,
    if_mac TEXT,
    if_is_vpn NUMERIC,
    if_external_ip TEXT,
    server_id INTEGER
);

create table servers
(
    id INTEGER primary key,
    host TEXT,
    port INTEGER,
    name TEXT,
    location TEXT,
    country TEXT,
    ip TEXT
);

create view speedtest_jst as select
    id,
    datetime(timestamp, "localtime") as timestamp,
    ping_jitter,
    ping_latency,
    download_bandwidth,
    download_bytes,
    download_elapsed,
    upload_bandwidth,
    upload_bytes,
    upload_elapsed,
    packetloss,
    isp,
    if_internal_ip,
    if_name,
    if_mac,
    if_is_vpn,
    if_external_ip,
    server_id
from speedtest;
