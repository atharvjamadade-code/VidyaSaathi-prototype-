import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
  dataSaver: boolean;
  setDataSaver: (value: boolean) => void;
  toggleDataSaver: () => void;
  simulateOffline: boolean;
  setSimulateOffline: (value: boolean) => void;
  toggleSimulateOffline: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dataSaver, setDataSaver] = useState<boolean>(() => {
    const saved = localStorage.getItem('vidyasaathi_data_saver');
    return saved !== null ? saved === 'true' : true; // Default to true for rural/2G low bandwidth by default
  });

  const [simulateOffline, setSimulateOffline] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('vidyasaathi_data_saver', String(dataSaver));
  }, [dataSaver]);

  const toggleDataSaver = () => setDataSaver((prev) => !prev);
  const toggleSimulateOffline = () => setSimulateOffline((prev) => !prev);

  return (
    <SettingsContext.Provider
      value={{
        dataSaver,
        setDataSaver,
        toggleDataSaver,
        simulateOffline,
        setSimulateOffline,
        toggleSimulateOffline,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
