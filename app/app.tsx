import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useThemeContext } from "./context/themeContext";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function AppWithTheme() {
  const { theme, isDark } = useThemeContext();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const fullUser = await AsyncStorage.getItem("loggedInUser");
        if (fullUser) {
          const parsedUser = JSON.parse(fullUser);
          setRole(parsedUser.role);
        }
      } catch (error) {
        console.error("Error retrieving user from storage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <NavigationThemeProvider value={theme}>
      <Stack>
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
