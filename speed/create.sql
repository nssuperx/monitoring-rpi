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
    country TEXT
    ip TEXT
);
