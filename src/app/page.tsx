"use client";

import TicTacToeGame from "@/features/tictactoe/Game";

export default function Home() {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black">
      <TicTacToeGame />
    </main>
  );
}
