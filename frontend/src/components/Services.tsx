import { useState } from "react";
import { useServices } from "../hooks/useServices.ts";

type Service = {
  unit: string;
  description: string;
  active: string;
};

const Services = () => {
  const { data, loading, error } = useServices();
  const [limit, setLimit] = useState(5);

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="w-full border-2 border-black ">
        <div className="uppercase border-b-2 border-black  p-8 font-bold bg-white ">
          <span>services</span>
        </div>
        <div className="grid grid-cols-4 text-gray-500  border-b-2  bg-gray-100  font-bold uppercase tracking-widest">
          {["Unit", "Description", "Sub", "Acitve"].map((item) => {
            return <span className="p-4 ">{item}</span>;
          })}
        </div>
        {/* use claude */}
        {data.slice(0, limit).map((item) => {
          return (
            <div
              key={item.unit}
              className="grid  grid-cols-4 font-medium  border-gray-200 bg-white border uppercase tracking-widest"
            >
              <span className="font-bold p-4">{item.unit}</span>
              <span className="p-4 font-light">{item.description}</span>
              <span className="p-4 font-semibold">{item.sub}</span>

              <div className=" flex   p-4  ">
                <span
                  className={`p-4 flex font-semibold w-30 justify-center h-14   ${item.active === "active" ? " bg-green-300 text-green-600" : " bg-red-300 text-red-600"}`}
                >
                  {item.active}
                </span>
              </div>
            </div>
          );
        })}
        {limit < data.length && (
          <button
            className="w-full border border-gray-200 border-t-0 bg-white p-4 text-xs uppercase tracking-widest hover:bg-gray-100"
            onClick={() => setLimit(limit + 5)}
          >
            show more ({data.length - limit} remaining)
          </button>
        )}
      </div>
    </>
  );
};

export default Services;
