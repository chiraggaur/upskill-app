import "react-native-reanimated";
import { ThemeProviderCustom } from "./context/themeContext";
import AppWithTheme from "./app";

export default function RootLayout() {
  return (
    <ThemeProviderCustom>
      <AppWithTheme />
    </ThemeProviderCustom>
  );
}
