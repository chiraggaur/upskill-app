import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const fullUser = await AsyncStorage.getItem("loggedInUser");
        if (fullUser) {
          const parsedUser = JSON.parse(fullUser);
          setRole(parsedUser.role); // <-- Set the role in state
        }
      } catch (error) {
        console.error("Error retrieving user from storage:", error);
      }
    };

    checkUser();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="magnifyingglass.circle.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="course"
        options={{
          title: "My Courses",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
