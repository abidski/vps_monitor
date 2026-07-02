import time

import psutil


def get_stats():
    percent = psutil.cpu_percent(interval=None, percpu=False)
    memory = psutil.virtual_memory()
    temp = psutil.sensors_temperatures()
    network = psutil.net_io_counters()
    disk = psutil.disk_usage("/")
    process = []

    for proc in psutil.process_iter(["pid", "name", "status", "username"]):
        try:
            if proc.info["status"] == "running":
                process.append(proc.info)

        except Exception as e:
            print(e, " inside write_to_db")

    return {
        "cpu": percent,
        "memory": round(memory.used / (1024**3), 2),
        "temp": temp["k10temp"][0].current,
        "process": process,
        "network": {
            "bytes_sent": network.bytes_sent,
            "bytes_recieve": network.bytes_recv,
        },
        "disk": disk.percent,
        "timestamp": time.time(),
    }


if __name__ == "__main__":
    while True:
        data = get_stats()
        print(data)
