"use client";

import TicTacToeGame from "@/features/tictactoe/Game";
import Settings from "@/features/tictactoe/Settings";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black">
      <TicTacToeGame />
      <Settings />
    </main>
  );
}
