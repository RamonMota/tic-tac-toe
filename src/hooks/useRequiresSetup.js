import { useGameSettings } from "../context/GameSettingsContext";

export function useRequiresSetup() {
  const { isConfigured } = useGameSettings();
  return !isConfigured;
}

