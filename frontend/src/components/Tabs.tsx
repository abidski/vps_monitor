import type { Tab } from "../types";
type Tabs = { tab: string; setTab: (tab: Tab) => void };
const Tabs = ({ tab, setTab }: Tabs) => {
  const tabClass = (element: string) =>
    tab === element
      ? "bg-black text-white"
      : "text-gray-500 hover:bg-black hover:text-white";
  return (
    <>
      <div className="bg-gray-100/60 p-2 rounded-xl  flex justify-center gap-8 items-center m-18 text-xl font-medium span">
        {["overview", "history", "services"].map((element) => (
          <button
            key={element}
            className={`${tabClass(element)} p-2 px-4 font-bold text-xs uppercase rounded-sm text-gray-500 hover:bg-black hover:text-white`}
            onClick={() => setTab(element as Tab)}
          >
            {element}
          </button>
        ))}
      </div>
    </>
  );
};

export default Tabs;
