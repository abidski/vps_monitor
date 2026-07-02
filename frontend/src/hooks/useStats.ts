import { useEffect, useState, useRef } from "react";

interface Metrics {
  cpu: number;
  memory: number;
  temp: number | null;
  process: Array<{
    pid: number;
    name: string;
    status: string;
    username: string;
  }>;
}
function useStats() {
  const [connected, setConnected] = useState<boolean>(false);
  const [data, setData] = useState<Metrics>();
  const socketRef = useRef<WebSocket | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    let shouldReconnect = true;
    function connect() {
      let socket = new WebSocket("ws://localhost:8000/api/ws");
      socketRef.current = socket;

      socket.onopen = function () {
        console.log("connected");
        setConnected(true);
      };
      socket.onmessage = function (event) {
        try {
          const data = JSON.parse(event.data);
          setData(data);
        } catch (err) {
          console.log(err);
        }
      };
      socket.onclose = function () {
        console.log("close");
        setConnected(false);
        if (shouldReconnect) {
          timeoutRef.current = setTimeout(connect, 3000);
        }
      };
      socket.onerror = function (event) {
        console.log("error", event);
      };
    }
    connect();
    return () => {
      // cleanup — this is the "new" part I added
      shouldReconnect = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      socketRef.current?.close();
    };
  }, []);
  return { data, connected };
}

export default useStats;
