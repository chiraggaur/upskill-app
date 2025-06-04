import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CourseCard from "@/components/CourseCard";
import { useThemeContext } from "../context/themeContext";
import LottieView from "lottie-react-native";
import loadingAnimation from "../../assets/animations/loading.json";
import { Course, LoggedInUser } from "../types";

const CourseListScreen = () => {
  const { isDark } = useThemeContext();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserAndFilter = async () => {
      try {
        const json = await AsyncStorage.getItem("loggedInUser");
        if (!json) return;

        const parsed: LoggedInUser = JSON.parse(json);
        setUser(parsed);

        const response = await axios.get<Course[]>(
          "https://f485c52e-af5f-460e-b2c8-c6a9589aad03.mock.pstmn.io//courses"
        );

        const courses = response.data;

        if (parsed.role === "student" && parsed.assignedTeacherId != null) {
          const studentCourses = courses.filter(
            (course) =>
              Number(course.teacherId) === Number(parsed.assignedTeacherId)
          );
          setFilteredCourses(studentCourses);
        } else if (parsed.role === "instructor") {
          const instructorCourses = courses.filter(
            (course) => course.teacherId === parsed.id
          );
          setFilteredCourses(instructorCourses);
        }
      } catch (err) {
        console.error("Error reading loggedInUser from AsyncStorage", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndFilter();
  }, []);

  if (loading || user === null) {
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
          style={{ width: 150, height: 250 }}
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

  const backgroundColor = isDark ? "#00000040" : "#fff";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <ScrollView style={[styles.scrollContainer, { backgroundColor }]}>
      <View style={[styles.header, { backgroundColor }]}>
        <Text style={[styles.headerText, { color: textColor }]}>
          {user.role === "student"
            ? "Courses From Your Teacher"
            : "Your Courses"}
        </Text>
      </View>

      {filteredCourses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{ color: textColor, fontSize: 16 }}>
            {user.role === "student"
              ? "No courses found for your assigned teacher."
              : "You have not created or been assigned any courses yet."}
          </Text>
        </View>
      ) : (
        filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} user={user} />
        ))
      )}
    </ScrollView>
  );
};

export default CourseListScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
});
