import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import axios from "axios";
import loadingAnimation from "../assets/animations/loading.json";
import styles from "./styles/landingPageStyles";

export default function LandingScreen() {
  const [role, setRole] = useState<"student" | "instructor" | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes] = await Promise.all([
          axios.get(
            "https://f485c52e-af5f-460e-b2c8-c6a9589aad03.mock.pstmn.io//Students"
          ),
          axios.get(
            "https://f485c52e-af5f-460e-b2c8-c6a9589aad03.mock.pstmn.io//allTeachers"
          ),
        ]);

        setStudents(studentsRes.data);
        setTeachers(teachersRes.data);
      } catch (err) {
        console.error("API fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Check if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("loggedInUser");
      if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.role === "student") {
          router.replace("/(tabs)");
        } else {
          router.replace("/(instructorTabs)");
        }
      }
    };

    checkUser();
  }, []);

  const handleUserSelect = async (user: any) => {
    const fullUser = { ...user, role };
    setSelectedUser(user);
    await AsyncStorage.setItem("loggedInUser", JSON.stringify(fullUser));
    // eslint-disable-next-line no-unused-expressions
    role === "student"
      ? router.replace("/(tabs)")
      : router.replace("/(instructorTabs)");
  };

  const renderUserItem = ({ item }: { item: any }) => {
    const teacherName =
      role === "student"
        ? teachers.find((t) => t.id === item.assignedTeacherId)?.name
        : null;

    return (
      <TouchableOpacity
        style={styles.userOption}
        onPress={() => handleUserSelect(item)}
      >
        <Text style={styles.userText}>
          {item?.name ?? "Unnamed"}
          {teacherName ? ` (Teacher: ${teacherName})` : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={[
          "rgba(0, 10, 20, 0.95)",
          "rgba(58, 12, 163, 0.9)",
          "rgba(0, 255, 255, 0.4)",
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

          {/* Loading */}
          {loading && (
            <View style={{ marginTop: 40 }}>
              <LottieView
                source={loadingAnimation}
                autoPlay
                loop
                style={{ width: 140, height: 140 }}
              />
            </View>
          )}

          {/* Dropdown User Picker */}
          {!loading && role && (
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
                    data={role === "student" ? students : teachers}
                    keyExtractor={(item, index) =>
                      item?.id?.toString() ?? index.toString()
                    }
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
