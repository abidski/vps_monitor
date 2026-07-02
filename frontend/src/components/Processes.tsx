const Processes = ({ processes }) => {
  return (
    <div>
      <span className="font-bold">active running processes:</span>
      {processes.length == 0 ? (
        <div>no process</div>
      ) : (
        processes.map((item) => <div key={item.pid}>{item.name}</div>)
      )}
    </div>
  );
};

export default Processes;
