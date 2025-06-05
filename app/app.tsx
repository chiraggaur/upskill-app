import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useThemeContext } from "./context/themeContext";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/animations/loading.json";

export default function AppWithTheme() {
  const { theme, isDark } = useThemeContext();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const fullUser = await AsyncStorage.getItem("loggedInUser");

        if (fullUser) {
          const parsedUser = JSON.parse(fullUser);

          if (parsedUser.role === "instructor") {
            setInitialRoute("(instructorTabs)");
          } else {
            setInitialRoute("(tabs)");
          }
        } else {
          setInitialRoute("landingPage");
        }
      } catch (error) {
        console.error("Error retrieving user from storage:", error);
        setInitialRoute("landingPage");
      }
    };

    checkUser();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginTop: 40 }}>
          <LottieView
            source={loadingAnimation}
            autoPlay
            loop
            style={{ width: 140, height: 140 }}
          />
        </View>
      </View>
    );
  }

  return (
    <NavigationThemeProvider value={theme}>
      <Stack initialRouteName={initialRoute}>
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
