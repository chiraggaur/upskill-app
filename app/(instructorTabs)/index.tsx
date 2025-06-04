import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import CourseCard from "@/components/CourseCard";
import { useThemeContext } from "../context/themeContext";
import axios from "axios";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../assets/animations/loading.json";
import { Course, LoggedInUser } from "../types";
import styles from "../styles/instructorIndexStyles";

const CourseListScreen = () => {
  const { isDark } = useThemeContext();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const filterByStatus = (courseList: Course[], status: string | null) => {
    if (!status) return courseList;
    return courseList.filter((course) => course.status === status);
  };

  const loadUserAndCourses = async () => {
    try {
      setLoading(true);
      const json = await AsyncStorage.getItem("loggedInUser");
      if (!json) return;

      const parsed: LoggedInUser = JSON.parse(json);
      setUser(parsed);

      const response = await axios.get<Course[]>(
        "https://f485c52e-af5f-460e-b2c8-c6a9589aad03.mock.pstmn.io//courses"
      );

      const allFetchedCourses = response.data;
      setAllCourses(allFetchedCourses);

      const relevantCourses = allFetchedCourses.filter(
        (course) => course.teacherId === parsed.id
      );

      setFilteredCourses(filterByStatus(relevantCourses, selectedStatus));
    } catch (err) {
      console.error("Error loading user or courses", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserAndCourses();
  }, []);

  useEffect(() => {
    if (!user) return;

    const relevantCourses = allCourses.filter(
      (course) => course.teacherId === user.id
    );

    setFilteredCourses(filterByStatus(relevantCourses, selectedStatus));
  }, [selectedStatus]);

  const backgroundColor = isDark ? "#00000040" : "#fff";
  const textColor = isDark ? "#fff" : "#000";

  if (loading || !user) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: isDark ? "#000" : "#fff" },
        ]}
      >
        <LottieView
          source={loadingAnimation}
          autoPlay
          loop
          style={{ width: 150, height: 150 }}
          colorFilters={[
            {
              keypath: "Shape Layer 1",
              color: isDark ? "#fff" : "#4f46e5",
            },
          ]}
        />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={[styles.scrollContainer, { backgroundColor }]}>
        <View style={[styles.header, { backgroundColor }]}>
          <Text style={[styles.headerText, { color: textColor }]}>Courses</Text>

          <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            style={styles.filterIcon}
          >
            <Ionicons name="filter" size={24} color={textColor} />
          </TouchableOpacity>
        </View>

        {filteredCourses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={{ color: textColor, fontSize: 16 }}>
              No courses found assigned to you.
            </Text>
          </View>
        ) : (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} user={user} />
          ))
        )}
      </ScrollView>

      <Modal
        visible={filterVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContentContainer]}>
            <View style={styles.modalGradientCard}>
              <Text style={styles.modalTitle}>Filter by Status</Text>

              {["All", "Published", "Draft", "Archived"].map((status) => {
                const isSelected =
                  selectedStatus === status ||
                  (status === "All" && selectedStatus === null);
                return (
                  <Pressable
                    key={status}
                    onPress={() => {
                      setSelectedStatus(status === "All" ? null : status);
                      setFilterVisible(false);
                    }}
                    style={({ pressed }) => [
                      styles.modalButton,
                      {
                        backgroundColor: pressed
                          ? "rgba(255,255,255,0.15)"
                          : isSelected
                          ? "#4f46e5"
                          : "rgba(255, 255, 255, 0.05)",
                        borderColor: isSelected ? "#fff" : "transparent",
                        borderWidth: isSelected ? 1.2 : 0,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalButtonText,
                        {
                          color: isSelected ? "#fff" : "#eee",
                          fontWeight: isSelected ? "700" : "500",
                        },
                      ]}
                    >
                      {status}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CourseListScreen;
