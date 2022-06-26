import sys
import sqlite3
import json

args = sys.argv

def main():
    filename = args[1]
    with open(f"{filename}") as f:
        result = json.load(f)

    # NOTE: キーの存在を確認してもいいかも
    result_id = result.get("result").get("id")
    timestamp = result.get("timestamp")
    ping_jitter = result.get("ping").get("jitter")
    ping_latency = result.get("ping").get("latency")
    download_bandwidth = result.get("download").get("bandwidth")
    download_bytes = result.get("download").get("bytes")
    download_elapsed = result.get("download").get("elapsed")
    upload_bandwidth = result.get("upload").get("bandwidth")
    upload_bytes = result.get("upload").get("bytes")
    upload_elapsed = result.get("upload").get("elapsed")
    packetloss = result.get("packetLoss", "NULL")
    isp = result.get("isp")
    if_internal_ip = result.get("interface").get("internalIp")
    if_name = result.get("interface").get("name")
    if_mac = result.get("interface").get("macAddr")
    if_is_vpn = result.get("interface").get("isVpn")
    if_external_ip = result.get("interface").get("externalIp")
    server_id = result.get("server").get("id")

    dbname = "test.db"
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()

    error_log_file = "error.log"

    try:
        cur.execute(f"INSERT INTO speedtest VALUES('{result_id}', '{timestamp}', {ping_jitter}, {ping_latency}, \
                    {download_bandwidth}, {download_bytes}, {download_elapsed}, {upload_bandwidth}, {upload_bytes}, {upload_elapsed}, \
                    {packetloss}, '{isp}', '{if_internal_ip}', '{if_name}', '{if_mac}', {if_is_vpn}, '{if_external_ip}', {server_id})")
    
    except sqlite3.Error as e:
        with open(error_log_file, mode='a') as f:
            f.write(f"{e}: {filename}\n")

    else:
        conn.commit()

    cur.close()
    conn.close()


if __name__=="__main__":
    main()
