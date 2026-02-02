import { toggleFullscreen } from "@/lib/fullscreen";

export default function SettingsPanel({
  settings,
  updateSetting,
}: {
  settings: Settings;
  updateSetting: (key: keyof Settings, value: any) => void;
}) {
  return (
    <div className="p-4 space-y-2 border rounded bg-black shadow-md text-white">
      <h2 className="font-bold text-lg">Settings</h2>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={settings.classicMode}
          onChange={() => updateSetting("classicMode", !settings.classicMode)}
          className="form-checkbox"
        />
        <span>Classic Mode</span>
      </label>

      <button onClick={toggleFullscreen}>toggle fullscreen</button>
    </div>
  );
}
