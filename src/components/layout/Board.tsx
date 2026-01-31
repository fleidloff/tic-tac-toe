import { Cell } from "@/types/Cell";
import React from "react";
import O from "@/components/ui/game/O";
import X from "@/components/ui/game/X";
import clsx from "clsx";

type BoardProps = {
  cells: Cell[];
  onCellClick: (index: number) => void;
};

export default function Board({ cells, onCellClick }: BoardProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
      {cells.map((cell, index) => {
        const isRightBorder = (index + 1) % 3 !== 0;
        const isBottomBorder = index < 6;

        return (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            className={`
            flex items-center justify-center
            w-full h-full text-4xl font-bold
            ${isRightBorder ? "border-r-5 border-white" : ""}
            ${isBottomBorder ? "border-b-5 border-white" : ""}
          `}
          >
            {cell && (
              <div
                className={clsx(
                  "w-full h-full flex items-center justify-center fade-in",
                  cell.endsWith("-blink") && "blink"
                )}
              >
                {cell.startsWith("X") ? <X /> : <O />}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
