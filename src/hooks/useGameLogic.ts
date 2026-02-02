import {
  checkWinner,
  fadeOldItem,
  markWinningRow,
  removeFadedCells,
} from "@/lib/gameLogic";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Cell } from "@/types/Cell";
import { useState } from "react";

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

    let newCells = placeMove(cell);

    const winningRow = checkWinner(newCells);

    if (winningRow) {
      setFinished(true);
      newCells = markWinningRow(newCells, winningRow);
    }

    if (newCells.every((item) => item !== null)) {
      setFinished(true);
    }

    if (infinity && !winningRow) {
      const { newCells: fadedCells, newCellClicks } = fadeOldItem(
        cell,
        newCells,
        cellClicks
      );
      setCellClicks(newCellClicks);
      setCells(fadedCells);
    } else {
      setCells(newCells);
    }
  };

  const placeMove = (cell: number) => {
    const newCells = removeFadedCells(cells);
    const element = lastElement === "X" ? "O" : "X";
    setLastElement(element);
    newCells[cell] = element;
    return newCells;
  };

  const reset = () => {
    setFinished(false);
    setCells(initialState);
    setLastElement("O");
    setCellClicks([]);
  };

  return { cells, onCellClick };
}
