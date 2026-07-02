import { Cpu, MemoryStick, Thermometer, HardDrive } from "lucide-react";

type Info = {
  name: string;
  value: number;
};
//From claude
const config: Record<
  string,
  { icon: React.ReactNode; unit: string; label: string }
> = {
  cpu: { icon: <Cpu size={16} />, unit: "%", label: "CPU_LOAD" },
  memory: { icon: <MemoryStick size={16} />, unit: "GB", label: "MEM_USED" },
  temp: { icon: <Thermometer size={16} />, unit: "°C", label: "CORE_TEMP" },
  disk: { icon: <HardDrive size={16} />, unit: "GB", label: "DISK_NVME" },
};

const Card = ({ name, value }: Info) => {
  const width = 20;
  const used = (value / 100) * width;
  const unused = 20 - used;
  ///From claude
  const { icon, unit, label } = config[name] ?? {
    icon: null,
    unit: "",
    label: name,
  };

  const bar = "█".repeat(used) + "░".repeat(unused);
  return (
    <>
      <div className="bg-white  rounded-b-xs border-2 p-8 items-center gap-2 overflow-auto ">
        <div className="block">
          <div className="flex justify-between">
            <p className="px-3 text-xl pb-4 font-medium  text-gray-700">
              {label}
            </p>
            <span className="text-gray-400">{icon}</span>
          </div>
          <div className="flex align-bottom">
            <p className="px-3 text-3xl pb-4 font-extrabold ">{value}</p>
            <p className="text-gray-700">{unit}</p>
          </div>
        </div>
        <pre className="whitespace-pre overflow-hidden break-all "> {bar} </pre>
      </div>
    </>
  );
};

export default Card;
