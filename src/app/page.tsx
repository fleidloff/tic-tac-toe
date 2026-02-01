"use client";

import TicTacToeGame from "@/features/tictactoe/Game";
import SettingsPanel from "@/features/tictactoe/SettingsPanel";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useState } from "react";

export default function Home() {
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSetting } = useSettingsStore();

  return (
    <main className="w-screen h-screen flex items-center justify-center bg-black">
      <TicTacToeGame />

      <button
        className="absolute top-4 right-4 p-2 bg-black"
        onClick={() => setShowSettings((prev) => !prev)}
      >
        ⚙️
      </button>

      {showSettings && (
        <div className="absolute top-16 right-4 z-50">
          <SettingsPanel settings={settings} updateSetting={updateSetting} />
        </div>
      )}
    </main>
  );
}
