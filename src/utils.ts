import { max, min } from "date-fns"

export type RawItem = {
    start: Date;
    end: Date;
  };
  
  export type CountItem = {
    start: Date;
    end: Date;
    count: number;
  };
  
  export type DrawItem = {
    xFrom: number; // in percentage (ex: 50 for 50%)
    xTo: number; // in percentage (ex: 50 for 50%)
    yFrom: number; // in percentage (ex: 50 for 50%)
    yTo: number; // in percentage (ex: 50 for 50%)
    countItem: CountItem;
  };

// Convert x and y from percentage [0;100] to pixels:
export function percentToPixels( value: number, parentSize: number): number {
    return (value / 100) * parentSize
}

// Convert x and y from pixels to percentage [0;100]:
export function pixelsToPercent( value: number, parentSize: number):  number {
    return (value / parentSize) * 100
}

export function valueToPercent( value: Date, min: Date, max: Date): number {
    return numberValueToPercent(value.getTime(), min.getTime(), max.getTime())
}

export function numberValueToPercent( value: number, min: number, max: number): number {
    return ((value - min) * 100) / (max - min)
}

export function pixelsToValue( pixels: number, parentSize: number, min: Date, max: Date): Date {
    return new Date((pixels / parentSize) * (max.getTime() - min.getTime()) + min.getTime())
}

export function getMinMaxValues(values: (RawItem|CountItem)[]): { min: Date, max: Date } {
    return {
        min: min(values.map((item) => item.start)),
        max: max(values.map((item) => item.end)),
    }
}