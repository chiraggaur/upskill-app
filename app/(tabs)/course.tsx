import React, { useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MyCourseCard from "@/components/MyCourseCard";
import { useThemeContext } from "../context/themeContext";
import { Course, LoggedInUser } from "../types";

export default function MyCoursesScreen() {
  const { isDark } = useThemeContext();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Load logged-in user and courses
  useEffect(() => {
    const loadData = async () => {
      try {
        const json = await AsyncStorage.getItem("loggedInUser");
        if (!json) return;

        const parsed: LoggedInUser = JSON.parse(json);
        setUser(parsed);

        const response = await axios.get<Course[]>(
          "https://f485c52e-af5f-460e-b2c8-c6a9589aad03.mock.pstmn.io//courses"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error loading courses or user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const enrolledCourses = courses.filter((course) =>
    user?.coursesEnrolled.includes(course.id)
  );

  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>
        My Enrolled Courses
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4f46e5"
          style={{ marginTop: 30 }}
        />
      ) : enrolledCourses.length > 0 ? (
        enrolledCourses.map((course) => (
          <MyCourseCard key={course.id} {...course} />
        ))
      ) : (
        <Text style={[styles.noCourses, { color: textColor }]}>
          You are not enrolled in any courses yet.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  noCourses: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
});
