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
  onDrag: (sliderId: 0 | 1, value: Date) => void;
  sliderId: 0 | 1;
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

  const sliderHandleWidth = 11;

  const valuePercent = valueToPercent(value, valueMin, valueMax);

  return (
    <>
      <div
        ref={sliderRef}
        className=" absolute cursor-pointer"
        style={{
          top: 0,
          width: sliderHandleWidth,
          height: "100%",
          left: `${valuePercent}%`,
          transform: "translate(-50%, 0)",
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <svg
          width={sliderHandleWidth}
          height="18"
          viewBox="0 0 11 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          className="absolute"
        >
          <rect
            x="0.5"
            y="0.5"
            width="10"
            height="17"
            rx="1.5"
            fill="#0E1330"
            stroke="white"
          />
          <line x1="4.5" y1="4" x2="4.5" y2="14" stroke="white" />
          <line x1="6.5" y1="4" x2="6.5" y2="14" stroke="white" />
        </svg>
      </div>
    </>
  );
}
