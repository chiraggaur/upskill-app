import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CourseCard from "@/components/CourseCard";
import { useThemeContext } from "../context/themeContext";
import { Courses } from "../mockData";

type LoggedInUser = {
  id: number;
  name: string;
  role: "student" | "instructor";
  assignedTeacherId?: number;
};

const CourseListScreen = () => {
  const { isDark } = useThemeContext();
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<typeof Courses>([]);

  useEffect(() => {
    const loadUserAndFilter = async () => {
      try {
        const json = await AsyncStorage.getItem("loggedInUser");
        if (!json) {
          return;
        }
        const parsed: LoggedInUser = JSON.parse(json);
        setUser(parsed);

        if (parsed.role === "student" && parsed.assignedTeacherId != null) {
          // Show only courses whose teacherId matches assignedTeacherId
          const studentCourses = Courses.filter(
            (course) => course.teacherId === parsed.assignedTeacherId
          );
          setFilteredCourses(studentCourses);
        } else if (parsed.role === "instructor") {
          // Show only courses created by this instructor (teacherId === instructor.id)
          const instructorCourses = Courses.filter(
            (course) => course.teacherId === parsed.id
          );
          setFilteredCourses(instructorCourses);
        }
      } catch (err) {
        console.error("Error reading loggedInUser from AsyncStorage", err);
      }
    };

    loadUserAndFilter();
  }, []);

  // While AsyncStorage is loading (user === null), show a simple loader
  if (user === null) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: isDark ? "#000" : "#fff" },
        ]}
      >
        <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 18 }}>
          Loading...
        </Text>
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
