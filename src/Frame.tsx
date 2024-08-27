import { valueToPercent } from "./utils";

export default function Frame({
  sliderValues,
  minStart,
  maxEnd,
}: {
  sliderValues: Date[];
  minStart: Date;
  maxEnd: Date;
}) {
  const borderWidth = 2;
  const slider1Percent = valueToPercent(sliderValues[0], minStart, maxEnd);
  const slider2Percent = valueToPercent(sliderValues[1], minStart, maxEnd);
  const sliderMinPercent = Math.min(slider1Percent, slider2Percent);
  const sliderMaxPercent = Math.max(slider1Percent, slider2Percent);

  return (
    <div
      className={`border-white absolute`}
      style={{
        width: `calc(${
          sliderMaxPercent - sliderMinPercent
        }% + ${borderWidth}px)`,
        height: "100%",
        top: 0,
        left: `calc(${sliderMinPercent}% - ${borderWidth / 2}px)`,
        borderWidth: `${borderWidth}px`,
        borderRadius: "4px",
      }}
    ></div>
  );
}
