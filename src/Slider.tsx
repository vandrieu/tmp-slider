import { useEffect, useRef } from "react";
import { pixelsToValue, valueToPercent } from "./utils";

export default function Slider({
  valueMin,
  valueMax,
  onDrag,
  sliderId,
  value,
}: {
  valueMin: Date;
  valueMax: Date;
  onDrag: (sliderId: number, value: Date) => void;
  sliderId: number;
  value: Date;
}) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const parent = slider.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const sliderRect = slider.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
    const parentLeft = parentRect.left;
    const parentRight = parentRect.right;

    let isMouseDown = false;
    let mouseDownSliderX = 0;
    let mouseDownX = 0;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      mouseDownX = e.clientX;
      mouseDownSliderX = slider.getBoundingClientRect().left;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - mouseDownX;
      let newLeft = mouseDownSliderX + deltaX + sliderWidth / 2;
      newLeft = Math.max(newLeft, parentLeft); // prevent overflow to the left
      newLeft = Math.min(newLeft, parentRight); // prevent overflow to the right
      newLeft = newLeft - parentLeft; // convert from screen referential to parent container referential
      slider.style.left = `${newLeft}px`;
      onDrag(
        sliderId,
        pixelsToValue(newLeft, parentRect.width, valueMin, valueMax)
      );
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    slider.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      slider.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const sliderBorderWidth = 0;
  const sliderHandle = 16;
  const handleTranslate = (sliderHandle - sliderBorderWidth) / 2;

  const valuePercent = valueToPercent(value, valueMin, valueMax);

  return (
    <>
      <div
        ref={sliderRef}
        className="bg-slate-400 absolute"
        style={{
          width: sliderBorderWidth,
          height: "100%",
          top: 0,
          left: `${valuePercent}%`,
          transform: "translate(-50%, 0)",
        }}
      >
        <div
          className="bg-slate-400 absolute cursor-pointer"
          style={{
            width: sliderHandle,
            height: "20%",
            top: "50%",
            left: 0,
            transform: `translate(-${handleTranslate}px, -50%)`,
          }}
        ></div>
      </div>
    </>
  );
}
