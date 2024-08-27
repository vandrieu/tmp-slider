import { addHours, format } from "date-fns";
import { useState } from "react";
import Range, { RawItem } from "./Range";

function App() {
  const rawItems: RawItem[] = [
    { start: addHours(new Date(), 1100), end: addHours(new Date(), 3000) },
    { start: addHours(new Date(), 1150), end: addHours(new Date(), 3000) },
    { start: addHours(new Date(), 1300), end: addHours(new Date(), 3200) },
    { start: addHours(new Date(), 1350), end: addHours(new Date(), 3200) },
    { start: addHours(new Date(), 1450), end: addHours(new Date(), 3400) },
    { start: addHours(new Date(), 1550), end: addHours(new Date(), 3400) },
    { start: addHours(new Date(), 1650), end: addHours(new Date(), 3400) },
    { start: addHours(new Date(), 1800), end: addHours(new Date(), 3400) },
    { start: addHours(new Date(), 2200), end: addHours(new Date(), 3400) },
    { start: addHours(new Date(), 2250), end: addHours(new Date(), 3400) },
    { start: addHours(new Date(), 2400), end: addHours(new Date(), 3200) },
  ];

  const [dateStart, setDateStart] = useState(rawItems[4].start);
  const [dateEnd, setDateEnd] = useState(rawItems[8].start);

  const onRangeChange = (min: Date, max: Date) => {
    console.log(
      "RANGE CHANGE",
      format(min, "yyyy-MM-dd HH:mm"),
      format(max, "yyyy-MM-dd HH:mm")
    );
    if (dateStart.getTime() !== min.getTime()) {
      setDateStart(min);
    }
    if (dateEnd.getTime() !== max.getTime()) {
      setDateEnd(max);
    }
  };

  return (
    <>
      <div
        className="border border-slate-500"
        style={{ width: "500px", height: "100px" }}
      >
        <Range
          data={rawItems}
          onRangeChange={onRangeChange}
          dateStart={dateStart}
          dateEnd={dateEnd}
        />
      </div>
      <input
        type="datetime-local"
        value={dateStart.toISOString().slice(0, 16)}
        onChange={(e) => setDateStart(new Date(e.target.value))}
      />
      <span className="inline-block w-32"></span>
      <input
        type="datetime-local"
        value={dateEnd.toISOString().slice(0, 16)}
        onChange={(e) => {
          console.log("change date end");
          setDateEnd(new Date(e.target.value));
        }}
      />
    </>
  );
}

export default App;
