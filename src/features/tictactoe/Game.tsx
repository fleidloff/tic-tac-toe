"use client";

import Board from "@/components/layout/Board";
import GameView from "@/components/layout/GameView";
import { Cell } from "@/types/Cell";
import { useState } from "react";

const initialState = [null, null, null, null, null, null, null, null, null];

export default function TicTacToeGame() {
  const [cells, setCells] = useState<Cell[]>(initialState);
  const [lastElement, setLastElement] = useState("O");
  const [finished, setFinished] = useState(false);

  const onCellClick = (cell: number) => {
    if (finished) {
      setFinished(false);
      setCells(initialState);
      setLastElement("O");
      return;
    }
    if (cells[cell] !== null) return;
    const newCells = [...cells];
    const element = lastElement === "X" ? "O" : "X";
    setLastElement(element);
    newCells[cell] = element;

    const winningRow = checkWinner(newCells);

    if (winningRow) {
      setFinished(true);
      const winner = newCells[winningRow[0]]!.startsWith("X") ? "X" : "O";

      for (const index of winningRow) {
        newCells[index] = (winner + "-blink") as Cell;
      }
    }
    setCells(newCells);
  };

  return (
    <GameView>
      <Board cells={cells} onCellClick={onCellClick} />
    </GameView>
  );
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
