"use client";

import Board from "@/components/layout/Board";
import GameView from "@/components/layout/GameView";
import useGameLogic from "@/hooks/useGameLogic";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { Cell } from "@/types/Cell";
import { useState } from "react";

export default function TicTacToeGame() {
  const { cells, onCellClick } = useGameLogic();
  return (
    <GameView>
      <Board cells={cells} onCellClick={onCellClick} />
    </GameView>
  );
}
