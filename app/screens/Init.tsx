import { useEffect } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../assets/animations/loading.json";

export default function Init() {
  useEffect(() => {
    const checkUser = async () => {
      try {
        const fullUser = await AsyncStorage.getItem("loggedInUser");
        console.log("✅ Stored user:", fullUser);

        if (fullUser) {
          const parsedUser = JSON.parse(fullUser);
          if (parsedUser?.role === "instructor") {
            router.replace("/(instructorTabs)");
          } else if (parsedUser?.role === "student") {
            router.replace("/(tabs)");
          } else {
            await AsyncStorage.removeItem("loggedInUser");
            router.replace("/landingPage");
          }
        } else {
          router.replace("/landingPage");
        }
      } catch (error) {
        console.error("Error retrieving user:", error);
        await AsyncStorage.removeItem("loggedInUser");
        router.replace("/landingPage");
      }
    };

    checkUser();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={loadingAnimation}
        autoPlay
        loop
        style={{ width: 140, height: 140 }}
      />
    </View>
  );
}
