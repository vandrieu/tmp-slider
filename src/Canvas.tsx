import { memo, useEffect, useRef } from "react";
import {
  getMinMaxValues,
  numberValueToPercent,
  percentToPixels,
  valueToPercent,
  CountItem,
  DrawItem,
  RawItem,
} from "./utils";

const Canvas = memo(
  ({ rawItems }: { rawItems: RawItem[] }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const countItems = convertRawItemsToCountItems(rawItems);

    useEffect(() => {
      const domCanvasHeight = canvasRef.current?.clientHeight;
      const domCanvasWidth = canvasRef.current?.clientWidth;

      const canvas = canvasRef.current;
      if (!canvas) return;
      if (domCanvasWidth) canvas.width = domCanvasWidth;
      if (domCanvasHeight) canvas.height = domCanvasHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const yMax = Math.max(...countItems.map((item) => item.count));
      const { min: xMin, max: xMax } = getMinMaxValues(countItems);

      const drawItems: DrawItem[] = countItems.map((item) => ({
        xFrom: valueToPercent(item.start, xMin, xMax),
        xTo: valueToPercent(item.end, xMin, xMax),
        yFrom: 0,
        yTo: numberValueToPercent(item.count, 0, yMax),
        countItem: item,
      }));

      const strokeWidth = 3;
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = "#8F9BB7";
      ctx.beginPath();

      const lineTo = (x: number, y: number, isBound: boolean) => {
        // Convert x and y from percentage [0;100] to pixels:
        x = percentToPixels(x, canvas.width);
        y = percentToPixels(y, canvas.height);
        // Offset the lines along the canvas border to account for the stroke width:
        x = Math.max(x, strokeWidth / 2); //padding left
        x = Math.min(x, canvas.width - strokeWidth / 2); //padding right
        if (!isBound) {
          y = Math.max(y, strokeWidth / 2); //padding bottom
          y = Math.min(y, canvas.height - strokeWidth / 2); //padding top
        }
        ctx.lineTo(x, y);
      };

      // Draw the green rectangle for the intervals having all items
      ctx.fillStyle = "#22C45D";
      for (let i = 0; i < drawItems.length; i++) {
        const drawItem = drawItems[i];
        if (drawItem.countItem.count === rawItems.length) {
          ctx.fillRect(
            percentToPixels(drawItem.xFrom, canvas.width),
            0,
            percentToPixels(drawItem.xTo - drawItem.xFrom, canvas.width),
            canvas.height
          );
        }
      }

      // Draw the step lines
      lineTo(0, 0, true);
      for (let i = 0; i < drawItems.length; i++) {
        const drawItem = drawItems[i];
        lineTo(drawItem.xFrom, drawItem.yTo, false); //vertical line
        lineTo(drawItem.xTo, drawItem.yTo, false); //horizontal line
      }
      lineTo(100, 0, true);
      ctx.stroke();

      return () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
    }, [countItems, rawItems.length]);

    return (
      <>
        <canvas
          ref={canvasRef}
          style={{ transform: "scaleY(-1)", height: "100%", width: "100%" }}
        />
      </>
    );
  },
  () => true // never re-render
);

export default memo(Canvas);

function convertRawItemsToCountItems(rawItems: RawItem[]): CountItem[] {
  // Collect all unique boundaries (start and end points)
  const boundaries: Date[] = [];
  rawItems.forEach((item) => {
    boundaries.push(item.start, item.end);
  });
  const uniqueBoundaries = Array.from(new Set(boundaries)).sort(
    (a, b) => a.getTime() - b.getTime()
  );
  // Generate the intervals and count items in each interval
  const countItems: CountItem[] = [];
  for (let i = 0; i < uniqueBoundaries.length - 1; i++) {
    const start = uniqueBoundaries[i];
    const end = uniqueBoundaries[i + 1];
    const count = rawItems.filter(
      (item) => item.start < end && item.end > start
    ).length;
    countItems.push({ start, end, count });
  }
  return countItems;
}
