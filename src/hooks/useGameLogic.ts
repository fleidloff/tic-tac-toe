import { useSettingsStore } from "@/stores/useSettingsStore";
import { Cell } from "@/types/Cell";
import { useState, useEffect } from "react";

const initialState = [null, null, null, null, null, null, null, null, null];

export default function useGameLogic() {
  const [cells, setCells] = useState<Cell[]>(initialState);
  const [lastElement, setLastElement] = useState("O");
  const [finished, setFinished] = useState(false);
  const [cellClicks, setCellClicks] = useState<number[]>([]);
  const { settings } = useSettingsStore();
  const { infinityMode: infinity } = settings;

  const onCellClick = (cell: number) => {
    if (finished) {
      reset();
      return;
    }
    if (cells[cell] !== null) return;

    const newCells = setField(cell);

    const winningRow = checkWinner(newCells);

    if (winningRow) {
      setFinished(true);
      const winner = newCells[winningRow[0]]!.startsWith("X") ? "X" : "O";

      for (const index of winningRow) {
        newCells[index] = (winner + "-blink") as Cell;
      }
    }

    if (newCells.every((item) => item !== null)) {
      setFinished(true);
    }

    if (infinity && !winningRow) {
      setCells(fadeOldItem(cell, newCells));
    } else {
      setCells(newCells);
    }
  };

  const reset = () => {
    setFinished(false);
    setCells(initialState);
    setLastElement("O");
    setCellClicks([]);
  };

  const setField = (cell: number) => {
    const newCells = cleanUpFadingItems(cells);
    const element = lastElement === "X" ? "O" : "X";
    setLastElement(element);
    newCells[cell] = element;
    return newCells;
  };

  const cleanUpFadingItems = (cells: Cell[]) => {
    const newCells = [
      ...cells.map((cell) => {
        if (cell?.endsWith("-fade")) return null;
        return cell;
      }),
    ];
    return newCells;
  };

  const fadeOldItem = (cell: number, cells: Cell[]) => {
    const newCellClicks = [...cellClicks, cell];
    const newCells = [...cells];

    if (newCellClicks.length >= 6) {
      const oldestIndex = newCellClicks[0];
      const currentValue = newCells[oldestIndex];

      if (currentValue) {
        newCells[oldestIndex] = ((currentValue.startsWith("X") ? "X" : "O") +
          "-fade") as Cell;
      }
    }

    setCells(newCells);
    setCellClicks(newCellClicks.slice(-5));

    return newCells;
  };

  return { cells, onCellClick };
}

const checkWinner = (cells: Cell[]): number[] | null => {
  const lines = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal top-left → bottom-right
    [2, 4, 6], // diagonal top-right → bottom-left
  ];

  // Check each line
  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return [a, b, c];
    }
  }

  return null;
};
