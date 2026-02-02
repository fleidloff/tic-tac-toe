import { Cell } from "@/types/Cell";

export const removeFadedCells = (cells: Cell[]): Cell[] =>
  cells.map((cell) => (cell?.endsWith("-fade") ? null : cell));

export const placeMove = (
  cells: Cell[],
  index: number,
  player: "X" | "O"
): Cell[] => {
  const next = [...cells];
  next[index] = player;
  return next;
};

export const markWinningRow = (cells: Cell[], row: number[]): Cell[] => {
  const winner = cells[row[0]]!.startsWith("X") ? "X" : "O";
  const next = [...cells];

  row.forEach((i) => {
    next[i] = `${winner}-blink` as Cell;
  });

  return next;
};

export const fadeOldItem = (
  cell: number,
  cells: Cell[],
  cellClicks: number[]
) => {
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

  return { newCells, newCellClicks: newCellClicks.slice(-5) };
};

export const checkWinner = (cells: Cell[]): number[] | null => {
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
  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return [a, b, c];
    }
  }
  return null;
};

export const markWinner = (cells: Cell[], winningRow: number[]) => {
  const newCells = cells;
  const winner = newCells[winningRow[0]]!.startsWith("X") ? "X" : "O";

  for (const index of winningRow) {
    newCells[index] = (winner + "-blink") as Cell;
  }
  return newCells;
};
