import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { mockStudents, mockTeachers } from "./mockData";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function LandingScreen() {
  const [role, setRole] = useState<"student" | "instructor" | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("loggedInUser");
      if (role === "student") {
        if (user) {
          const parsedUser = JSON.parse(user);
          if (parsedUser.role === "student") {
            router.replace("/(tabs)");
          } else {
            router.replace("/(instructorTabs)");
          }
        }
      }
      checkUser();
    };
  }, []);

  const handleUserSelect = async (user: any) => {
    const fullUser = { ...user, role };
    await AsyncStorage.setItem("loggedInUser", JSON.stringify(fullUser));

    // eslint-disable-next-line no-unused-expressions
    role === "student"
      ? router.replace("/(tabs)")
      : router.replace("/(instructorTabs)");
  };

  const renderUserItem = ({ item }: { item: any }) => {
    const teacherName =
      role === "student"
        ? mockTeachers.find((t) => t.id === item.assignedTeacherId)?.name
        : null;

    return (
      <TouchableOpacity
        style={styles.userOption}
        onPress={() => handleUserSelect(item)}
      >
        <Text style={styles.userText}>
          {item.name}
          {teacherName ? ` (Teacher: ${teacherName})` : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1600195077075-d99c0cddf2e6?auto=format&fit=crop&w=1400&q=80",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          "rgba(10, 10, 25, 0.9)",
          "rgba(20, 0, 50, 0.95)",
          "rgba(0, 255, 255, 0.2)",
        ]}
        style={styles.overlay}
      >
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Welcome</Text>

        <View style={styles.centerContent}>
          <Text style={styles.subtitle}>Select Your Role to Continue</Text>

          {/* Role Buttons */}
          <View style={styles.buttonContainer}>
            <MotiView
              from={{ translateY: 20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ delay: 100 }}
            >
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "student" && styles.activeButton,
                ]}
                onPress={() => {
                  setRole("student");
                  setShowDropdown(false);
                  setSelectedUser(null);
                }}
              >
                <Text style={styles.buttonText}>Student</Text>
              </TouchableOpacity>
            </MotiView>

            <MotiView
              from={{ translateY: 20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              transition={{ delay: 200 }}
            >
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "instructor" && styles.activeButton,
                ]}
                onPress={() => {
                  setRole("instructor");
                  setShowDropdown(false);
                  setSelectedUser(null);
                }}
              >
                <Text style={styles.buttonText}>Instructor</Text>
              </TouchableOpacity>
            </MotiView>
          </View>

          {/* Dropdown User Picker */}
          {role && (
            <View style={{ width: "100%", marginTop: 16 }}>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => setShowDropdown((prev) => !prev)}
              >
                <Text style={styles.selectorText}>
                  {selectedUser
                    ? selectedUser.name
                    : `Select a ${role === "student" ? "Student" : "Teacher"}`}
                </Text>
              </TouchableOpacity>

              {showDropdown && (
                <View style={styles.dropdownList}>
                  <FlatList
                    data={role === "student" ? mockStudents : mockTeachers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderUserItem}
                    style={{ maxHeight: 200 }}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    flexWrap: "wrap",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 24,
  },
  roleButton: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  activeButton: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  dropdownSelector: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  selectorText: {
    fontSize: 16,
    color: "#fff",
  },
  dropdownList: {
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  userOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },
  userText: {
    fontSize: 16,
    color: "#fff",
  },
});
