import {
  addHours,
  clamp,
  max as getMaxDate,
  min as getMinDate,
} from "date-fns";
import { useState } from "react";
import DateRangeSliderInput from "./DateRangeSliderInput";
import { getMinMaxValues, RawItem } from "./utils";

function DialogContent() {
  const rawItems: RawItem[] = [
    {
      start: addHours(new Date("2024-01-01"), 0),
      end: addHours(new Date("2024-01-01"), 1900),
    },
    {
      start: addHours(new Date("2024-01-01"), 50),
      end: addHours(new Date("2024-01-01"), 1900),
    },
    {
      start: addHours(new Date("2024-01-01"), 200),
      end: addHours(new Date("2024-01-01"), 2100),
    },
    {
      start: addHours(new Date("2024-01-01"), 250),
      end: addHours(new Date("2024-01-01"), 2100),
    },
    {
      start: addHours(new Date("2024-01-01"), 350),
      end: addHours(new Date("2024-01-01"), 2300),
    },
    {
      start: addHours(new Date("2024-01-01"), 450),
      end: addHours(new Date("2024-01-01"), 2300),
    },
    {
      start: addHours(new Date("2024-01-01"), 550),
      end: addHours(new Date("2024-01-01"), 2300),
    },
    {
      start: addHours(new Date("2024-01-01"), 700),
      end: addHours(new Date("2024-01-01"), 2300),
    },
    {
      start: addHours(new Date("2024-01-01"), 1100),
      end: addHours(new Date("2024-01-01"), 2300),
    },
    {
      start: addHours(new Date("2024-01-01"), 1150),
      end: addHours(new Date("2024-01-01"), 2300),
    },
    {
      start: addHours(new Date("2024-01-01"), 1300),
      end: addHours(new Date("2024-01-01"), 2100),
    },
  ];

  const { min: minStart, max: maxEnd } = getMinMaxValues(rawItems);

  const [date1, setDate1] = useState(rawItems[4].start);
  const [date2, setDate2] = useState(rawItems[8].start);

  const dateStart = getMinDate([date1, date2]);
  const dateEnd = getMaxDate([date1, date2]);

  // const handleDateInputChange = (e) => {
  //   const setter = date1 < date2 ? setDate1 : setDate2;
  //   setter(new Date(e.target.value));
  // };

  // Prevent the date from going below the mixStart or above the maxEnd
  const clampDate = (value: Date) =>
    clamp(value, { start: minStart, end: maxEnd });

  return (
    <>
      <div
        className=" border-slate-500 pb-3 pl-3 "
        style={{
          width: "500px",
          height: "100px",
          borderBottomWidth: 1,
          borderLeftWidth: 1,
        }}
      >
        <DateRangeSliderInput
          data={rawItems}
          onDate1Change={setDate1}
          onDate2Change={setDate2}
          date1={date1}
          date2={date2}
        />
      </div>
      <input
        type="datetime-local"
        value={dateStart.toISOString().slice(0, 16)}
        onChange={(e) => {
          const value = new Date(e.target.value);
          if (value <= date2) {
            setDate1(clampDate(value));
          } else {
            setDate1(getMaxDate([date1, date2]));
            setDate2(clampDate(value));
          }
        }}
      />
      <span className="inline-block w-32"></span>
      <input
        type="datetime-local"
        value={dateEnd.toISOString().slice(0, 16)}
        onChange={(e) => {
          const value = new Date(e.target.value);
          if (value >= date1) {
            setDate2(clampDate(value));
          } else {
            setDate2(getMinDate([date1, date2]));
            setDate1(clampDate(value));
          }
        }}
      />
    </>
  );
}

export default DialogContent;
