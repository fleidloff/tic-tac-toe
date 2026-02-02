"use client";

import SettingsPanel from "@/features/tictactoe/SettingsPanel";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useState } from "react";

export default function Settings() {
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSetting } = useSettingsStore();

  return (
    <>
      <button
        className="absolute bottom-4 right-4 p-2 bg-black"
        onClick={() => setShowSettings((prev) => !prev)}
      >
        ⚙️
      </button>

      {showSettings && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setShowSettings(false)}
          />

          <div className="absolute bottom-16 right-4 z-50">
            <SettingsPanel settings={settings} updateSetting={updateSetting} />
          </div>
        </div>
      )}
    </>
  );
}
