import Card from "./components/Card.tsx";
import Processes from "./components/Processes.tsx";
import Tabs from "./components/Tabs.tsx";
import useStats from "./hooks/useStats.ts";
import { useState } from "react";
import type { Tab } from "./types/";
import HistoryChart from "./components/HistoryChart.tsx";
import Services from "./components/Services.tsx";
import { Terminal } from "lucide-react";

function App() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <>
      <header className="gap-5  bg-white border-b border-gray-300 drop-shadow-xs w-full p-8 font-bold text-4xl items-center justify-center flex">
        <Terminal size={36} />

        <p className="">vps_monitor</p>
      </header>

      <main className="flex-col p-8 items-center justify-center flex">
        <Tabs tab={tab} setTab={setTab} />
        {tab === "overview" && <Overview />}
        {tab === "history" && <HistoryChart />}
        {tab === "services" && <Services />}
      </main>
    </>
  );
}

export default App;

const Overview = () => {
  const { data, connected } = useStats();
  return (
    <>
      {!data ? (
        <span className="text-l font-medium">connecting to server...</span>
      ) : (
        <>
          <div className="">
            <span className="text-l font-medium">real time server metrics</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 p-4 mt-8">
            {["cpu", "memory", "temp", "disk"].map((key) => (
              <Card key={key} name={key} value={data[key]} />
            ))}
          </div>

          <div>
            <Processes processes={data?.process || []} />
          </div>
        </>
      )}
    </>
  );
};
