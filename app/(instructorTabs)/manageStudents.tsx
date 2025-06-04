import React, { useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../context/themeContext";
import { mockStudents, Courses } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import styles from "../styles/manageStudentsStyles";
import StudentRow from "@/components/StudentCard";

const ManageStudentsScreen = () => {
  const [loggedInUser, setLoggedInUser] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [students, setStudents] = useState(mockStudents);
  const { isDark } = useThemeContext();

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("loggedInUser");
      if (storedUser) {
        setLoggedInUser(JSON.parse(storedUser).id);
      }
    };
    loadUser();
  }, []);

  const teacherCourses = useMemo(
    () =>
      Courses.filter(
        (c) => c.teacherId === loggedInUser && c.status === "Published"
      ),
    [loggedInUser]
  );

  const teacherStudents = useMemo(
    () => students.filter((s) => s.assignedTeacherId === loggedInUser),
    [students, loggedInUser]
  );

  const enrolledStudents = useMemo(
    () =>
      selectedCourse
        ? teacherStudents.filter((s) =>
            s.coursesEnrolled.includes(selectedCourse.id)
          )
        : [],
    [selectedCourse, teacherStudents]
  );

  const availableStudents = useMemo(
    () =>
      selectedCourse
        ? teacherStudents.filter(
            (s) => !s.coursesEnrolled.includes(selectedCourse.id)
          )
        : [],
    [selectedCourse, teacherStudents]
  );

  if (loggedInUser === null) return null;

  const toggleEnroll = (studentId: number) => {
    const updated = students.map((student) => {
      if (student.id !== studentId) return student;
      const isEnrolled = student.coursesEnrolled.includes(selectedCourse.id);
      const updatedCourses = isEnrolled
        ? student.coursesEnrolled.filter((id) => id !== selectedCourse.id)
        : [...student.coursesEnrolled, selectedCourse.id];
      return { ...student, coursesEnrolled: updatedCourses };
    });
    setStudents(updated);

    const student = students.find((s) => s.id === studentId);

    Toast.show({
      type: "success",
      position: "bottom",
      text1: `Student ${student?.name} has been ${
        students
          .find((s) => s.id === studentId)
          ?.coursesEnrolled.includes(selectedCourse.id)
          ? "unenrolled from"
          : "enrolled in"
      } ${selectedCourse.title}`,
    });
  };

  return (
    <LinearGradient
      colors={isDark ? ["#111827", "#1f2937"] : ["#f8fafc", "#e0e7ff"]}
      style={styles.gradient}
    >
      <FlatList
        ListHeaderComponent={
          <View style={styles.container}>
            <Text
              style={[styles.header, { color: isDark ? "#f3f4f6" : "#1e3a8a" }]}
            >
              Manage Students
            </Text>

            <TouchableOpacity
              onPress={() => setDropdownOpen(!dropdownOpen)}
              style={[
                styles.dropdownToggle,
                {
                  backgroundColor: isDark ? "#1f2937" : "#fff",
                  borderColor: isDark ? "#374151" : "#cbd5e1",
                  shadowColor: isDark ? "#000" : "#94a3b8",
                  shadowOpacity: isDark ? 0.9 : 0.15,
                  shadowRadius: 6,
                  elevation: 4,
                },
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  color: isDark ? "#fff" : "#334155",
                  fontWeight: "600",
                }}
              >
                {selectedCourse ? selectedCourse.title : "Select Course"}
              </Text>
            </TouchableOpacity>

            {dropdownOpen &&
              teacherCourses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  onPress={() => {
                    setSelectedCourse(course);
                    setDropdownOpen(false);
                  }}
                  style={[
                    styles.dropdownItem,
                    {
                      backgroundColor: isDark ? "#374151" : "#f1f5f9",
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Text style={{ color: isDark ? "#e0e0e0" : "#1e293b" }}>
                    {course.title}
                  </Text>
                </TouchableOpacity>
              ))}

            {selectedCourse && (
              <AnimatePresence>
                <MotiView
                  key="student-list"
                  from={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: "timing", duration: 300 }}
                  style={styles.studentListContainer}
                >
                  <Text
                    style={[
                      styles.subHeader,
                      { color: isDark ? "#60a5fa" : "#1e40af" },
                    ]}
                  >
                    Enrolled Students
                  </Text>

                  {enrolledStudents.length === 0 && (
                    <Text
                      style={{
                        color: isDark ? "#9ca3af" : "#64748b",
                        fontStyle: "italic",
                      }}
                    >
                      No students enrolled in this course yet.
                    </Text>
                  )}

                  {enrolledStudents.map((item) => (
                    <StudentRow
                      key={item.id}
                      student={item}
                      isEnrolled
                      isDark={isDark}
                      onPress={() => toggleEnroll(item.id)}
                    />
                  ))}

                  <Text
                    style={[
                      styles.subHeader,
                      {
                        color: isDark ? "#6ee7b7" : "#047857",
                        marginTop: 24,
                      },
                    ]}
                  >
                    Available to Enroll
                  </Text>

                  {availableStudents.length === 0 && (
                    <Text
                      style={{
                        color: isDark ? "#9ca3af" : "#64748b",
                        fontStyle: "italic",
                      }}
                    >
                      All students are enrolled in this course.
                    </Text>
                  )}

                  {availableStudents.map((item) => (
                    <StudentRow
                      key={item.id}
                      student={item}
                      isEnrolled={false}
                      isDark={isDark}
                      onPress={() => toggleEnroll(item.id)}
                    />
                  ))}
                </MotiView>
              </AnimatePresence>
            )}
          </View>
        }
        data={[]}
        renderItem={null}
      />
    </LinearGradient>
  );
};

export default ManageStudentsScreen;
