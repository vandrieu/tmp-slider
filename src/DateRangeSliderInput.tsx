import Canvas from "./Canvas";
import Frame from "./Frame";
import Slider from "./Slider";
import { getMinMaxValues, RawItem } from "./utils";

export default function DateRangeSliderInput({
  data: rawItems,
  date1,
  date2,
  onDate1Change,
  onDate2Change,
}: {
  data: RawItem[];
  date1: Date;
  date2: Date;
  onDate1Change: (value: Date) => void;
  onDate2Change: (value: Date) => void;
}) {
  const { min: minStart, max: maxEnd } = getMinMaxValues(rawItems);

  const onDrag = (sliderId: 0 | 1, value: Date) => {
    const setter = [onDate1Change, onDate2Change][sliderId];
    setter(value);
  };

  return (
    <div className="w-full h-full relative">
      <Canvas rawItems={rawItems} />
      <Frame
        sliderValues={[date1, date2]}
        minStart={minStart}
        maxEnd={maxEnd}
      />
      <Slider
        valueMin={minStart}
        valueMax={maxEnd}
        onDrag={onDrag}
        sliderId={0}
        value={date1}
      />
      <Slider
        valueMin={minStart}
        valueMax={maxEnd}
        onDrag={onDrag}
        sliderId={1}
        value={date2}
      />
    </div>
  );
}
