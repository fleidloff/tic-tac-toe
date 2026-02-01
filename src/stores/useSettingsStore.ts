import { create } from "zustand";
import { persist } from "zustand/middleware";

type Settings = {
  infinityMode: boolean;
};

type SettingsState = {
  settings: Settings;
  updateSetting: <K extends keyof Settings>(
    setting: K,
    value: Settings[K]
  ) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: {
        infinityMode: true,
      },
      updateSetting: (setting, value) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [setting]: value,
          },
        })),
    }),
    {
      name: "secret-storage",
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);
