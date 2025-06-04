import React, { createContext, useContext, useState, useMemo } from "react";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: DefaultTheme,
});

export const ThemeProviderCustom = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(() => (isDark ? DarkTheme : DefaultTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;
