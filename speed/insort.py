import sys
import sqlite3
import json

args = sys.argv

class Speed:
    def __init__(self, speed_result) -> None:
        self.bandwidth = speed_result.get("bandwidth")
        self.bytes = speed_result.get("bytes")
        self.elapsed = speed_result.get("elapsed")

class IfInfo:
    def __init__(self, if_result) -> None:
        self.internal_ip = if_result.get("internalIp")
        self.name = if_result.get("name")
        self.mac = if_result.get("macAddr")
        self.is_vpn = if_result.get("isVpn")
        self.external_ip = if_result.get("externalIp")

class Server:
    def __init__(self, server_result) -> None:
        self.id = server_result.get("id")
        self.host = server_result.get("host")
        self.port = server_result.get("port")
        self.name = server_result.get("name")
        self.location = server_result.get("location")
        self.country = server_result.get("country")
        self.ip = server_result.get("ip")

def main():
    filename = args[1]
    with open(f"{filename}") as f:
        result = json.load(f)

    # NOTE: キーの存在を確認してもいいかも
    result_id = result.get("result").get("id")
    timestamp = result.get("timestamp")

    ping = result.get("ping")
    ping_jitter = ping.get("jitter")
    ping_latency = ping.get("latency")

    down = Speed(result.get("download"))
    up = Speed(result.get("upload"))

    packetloss = result.get("packetLoss", "NULL")
    isp = result.get("isp")

    interface = IfInfo(result.get("interface"))

    server = Server(result.get("server"))

    dbname = "speedtest.db"
    conn = sqlite3.connect(dbname)
    cur = conn.cursor()

    error_log_file = "error.log"

    # test result
    try:
        cur.execute(f"INSERT INTO speedtest VALUES('{result_id}', '{timestamp}', {ping_jitter}, {ping_latency}, \
                    {down.bandwidth}, {down.bytes}, {down.elapsed}, {up.bandwidth}, {up.bytes}, {up.elapsed}, \
                    {packetloss}, '{isp}', \
                    '{interface.internal_ip}', '{interface.name}', '{interface.mac}', {interface.is_vpn}, '{interface.external_ip}', \
                    {server.id})")
    except sqlite3.Error as e:
        with open(error_log_file, mode='a') as f:
            f.write(f"{e}: {filename}\n")
    else:
        conn.commit()

    # server info
    try:
        cur.execute(f"INSERT INTO servers VALUES({server.id}, '{server.host}', {server.port}, \
                    '{server.name}', '{server.location}', '{server.country}', '{server.ip}')")
    except sqlite3.Error as e:
        if not "UNIQUE constraint" in str(e):
            with open(error_log_file, mode='a') as f:
                f.write(f"{e}: {filename}\n")
    else:
        conn.commit()

    cur.close()
    conn.close()


if __name__=="__main__":
    main()
