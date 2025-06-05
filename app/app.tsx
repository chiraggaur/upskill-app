import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useThemeContext } from "./context/themeContext";
import Toast from "react-native-toast-message";

export default function AppWithTheme() {
  const { theme, isDark } = useThemeContext();

  return (
    <NavigationThemeProvider value={theme}>
      <Stack initialRouteName="screens/Init">
        <Stack.Screen name="screens/Init" options={{ headerShown: false }} />
        <Stack.Screen name="landingPage" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(instructorTabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="screens/courseEdit"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="screens/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style={isDark ? "light" : "dark"} />
      <Toast />
    </NavigationThemeProvider>
  );
}
