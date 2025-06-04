// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Platform,
//   UIManager,
// } from "react-native";
// import { AnimatePresence, MotiView } from "moti";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Course, Courses, mockStudents } from "../mockData";
// import { LinearGradient } from "expo-linear-gradient";
// import Toast from "react-native-toast-message";
// import useThemeContext from "../context/themeContext";

// if (
//   Platform.OS === "android" &&
//   UIManager.setLayoutAnimationEnabledExperimental
// ) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const ManageStudentsScreen: React.FC = () => {
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [enrollments, setEnrollments] = useState<Record<number, number[]>>({});
//   const [loggedInUser, setLoggedInUser] = useState<number | null>(null);
//   const { isDark } = useThemeContext();

//   const textColor = { color: isDark ? "#fff" : "#000" };
//   const backgroundColor = { backgroundColor: isDark ? "#000" : "#fff" };
//   const cardBackground = { backgroundColor: isDark ? "#1f2937" : "#fff" };

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const storedUser = await AsyncStorage.getItem("loggedInUser");
//         if (storedUser) {
//           const parsedUser = JSON.parse(storedUser);
//           setLoggedInUser(parsedUser.id);
//         }
//       } catch (error) {
//         console.error("Failed to load user data", error);
//       }
//     };
//     loadUser();
//   }, []);

//   const publishedCourses = Courses.filter(
//     (course) =>
//       course.teacherId === loggedInUser && course.status === "Published"
//   );

//   const toggleEnroll = (studentId: number) => {
//     if (!selectedCourse) return;

//     const current = enrollments[selectedCourse.id] || [];
//     const isCurrentlyEnrolled = current.includes(studentId);

//     const updated = isCurrentlyEnrolled
//       ? current.filter((id) => id !== studentId)
//       : [...current, studentId];

//     setEnrollments((prev) => ({ ...prev, [selectedCourse.id]: updated }));

//     // ✅ Show toast message
//     Toast.show({
//       type: isCurrentlyEnrolled ? "error" : "success",
//       text1: isCurrentlyEnrolled ? "Student Unenrolled" : "Student Enrolled",
//       text2: `Successfully ${isCurrentlyEnrolled ? "removed" : "added"} ${
//         mockStudents.find((s) => s.id === studentId)?.name
//       }`,
//       position: "bottom",
//     });
//   };

//   return (
//     <LinearGradient
//       colors={["#E0EAFC", "#b6a6d4"]}
//       style={styles.gradientBackground}
//     >
//       <View style={styles.container}>
//         <Text style={styles.header}>🎓 Manage Students</Text>

//         <View style={styles.dropdownWrapper}>
//           <TouchableOpacity
//             onPress={() => setShowDropdown(!showDropdown)}
//             style={styles.dropdownToggle}
//           >
//             <Text style={styles.dropdownText}>
//               {selectedCourse ? selectedCourse.title : "Select a Course"}
//             </Text>
//           </TouchableOpacity>

//           <AnimatePresence>
//             {showDropdown && (
//               <MotiView
//                 from={{ opacity: 0, translateY: -10 }}
//                 animate={{ opacity: 1, translateY: 0 }}
//                 exit={{ opacity: 0, translateY: -10 }}
//                 style={styles.dropdownContainer}
//               >
//                 {publishedCourses.map((course) => (
//                   <TouchableOpacity
//                     key={course.id}
//                     onPress={() => {
//                       setSelectedCourse(course);
//                       setShowDropdown(false);
//                     }}
//                     style={styles.dropdownItem}
//                   >
//                     <Text style={styles.courseTitle}>{course.title}</Text>
//                     <Text style={styles.courseStatus}>{course.status}</Text>
//                   </TouchableOpacity>
//                 ))}
//               </MotiView>
//             )}
//           </AnimatePresence>
//         </View>

//         <AnimatePresence>
//           {selectedCourse && (
//             <MotiView
//               key="student-list"
//               from={{ opacity: 0, translateY: 10 }}
//               animate={{ opacity: 1, translateY: 0 }}
//               transition={{ type: "timing", duration: 300 }}
//               style={styles.studentListContainer}
//             >
//               <Text style={styles.subHeader}>
//                 Students in: {selectedCourse.title}
//               </Text>

//               <FlatList
//                 data={mockStudents}
//                 contentContainerStyle={{ paddingBottom: 180 }}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => {
//                   const isEnrolled = enrollments[selectedCourse.id]?.includes(
//                     item.id
//                   );
//                   return (
//                     <View style={styles.studentRow}>
//                       <View>
//                         <Text style={styles.studentName}>{item.name}</Text>
//                         <Text style={styles.studentEmail}>{item.email}</Text>
//                       </View>
//                       <TouchableOpacity
//                         onPress={() => toggleEnroll(item.id)}
//                         style={[
//                           styles.enrollButton,
//                           isEnrolled ? styles.unenroll : styles.enroll,
//                         ]}
//                       >
//                         <Text style={styles.enrollText}>
//                           {isEnrolled ? "Unenroll" : "Enroll"}
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   );
//                 }}
//               />
//             </MotiView>
//           )}
//         </AnimatePresence>
//       </View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradientBackground: {
//     flex: 1,
//   },
//   container: {
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     flex: 1,
//   },
//   header: {
//     fontSize: 26,
//     fontWeight: "800",
//     color: "#1E3A8A",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   dropdownWrapper: {
//     zIndex: 10,
//     marginBottom: 10,
//   },
//   dropdownToggle: {
//     padding: 14,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 12,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     borderColor: "#3B82F6",
//     borderWidth: 1,
//   },
//   dropdownText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1D4ED8",
//   },
//   dropdownContainer: {
//     position: "absolute",
//     top: 60,
//     width: "100%",
//     backgroundColor: "#FFF",
//     borderRadius: 12,
//     padding: 10,
//     elevation: 5,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   dropdownItem: {
//     paddingVertical: 10,
//     borderBottomColor: "#E5E7EB",
//     borderBottomWidth: 1,
//   },
//   courseTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#1E40AF",
//   },
//   courseStatus: {
//     fontSize: 12,
//     color: "#64748B",
//   },
//   subHeader: {
//     fontSize: 18,
//     color: "#1E40AF",
//     marginBottom: 10,
//     fontWeight: "600",
//   },
//   studentListContainer: {
//     marginTop: 10,
//     flex: 1,
//   },
//   studentRow: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 12,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   studentName: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
//   },
//   studentEmail: {
//     fontSize: 13,
//     color: "#6B7280",
//   },
//   enrollButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     borderRadius: 8,
//   },
//   enroll: {
//     backgroundColor: "#4ADE80",
//   },
//   unenroll: {
//     backgroundColor: "#F87171",
//   },
//   enrollText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

// export default ManageStudentsScreen;

////

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AnimatePresence, MotiView } from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Course, Courses, mockStudents } from "../mockData";
import { LinearGradient } from "expo-linear-gradient";
import Toast from "react-native-toast-message";
import useThemeContext from "../context/themeContext";

const ManageStudentsScreen: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [enrollments, setEnrollments] = useState<Record<number, number[]>>({});
  const [loggedInUser, setLoggedInUser] = useState<number | null>(null);
  const { isDark } = useThemeContext();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setLoggedInUser(parsedUser.id);
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    loadUser();
  }, []);

  const publishedCourses = Courses.filter(
    (course) =>
      course.teacherId === loggedInUser && course.status === "Published"
  );

  const toggleEnroll = (studentId: number) => {
    if (!selectedCourse) return;

    const current = enrollments[selectedCourse.id] || [];
    const isCurrentlyEnrolled = current.includes(studentId);

    const updated = isCurrentlyEnrolled
      ? current.filter((id) => id !== studentId)
      : [...current, studentId];

    setEnrollments((prev) => ({ ...prev, [selectedCourse.id]: updated }));

    Toast.show({
      type: isCurrentlyEnrolled ? "error" : "success",
      text1: isCurrentlyEnrolled ? "Student Unenrolled" : "Student Enrolled",
      text2: `Successfully ${isCurrentlyEnrolled ? "removed" : "added"} ${
        mockStudents.find((s) => s.id === studentId)?.name
      }`,
      position: "bottom",
    });
  };

  return (
    <LinearGradient
      colors={isDark ? ["#111827", "#1f2937"] : ["#E0EAFC", "#b6a6d4"]}
      style={styles.gradientBackground}
    >
      <View style={[styles.container]}>
        <Text style={[styles.header, { color: isDark ? "#fff" : "#1E3A8A" }]}>
          🎓 Manage Students
        </Text>

        <View style={styles.dropdownWrapper}>
          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            style={[
              styles.dropdownToggle,
              {
                backgroundColor: isDark ? "#1f2937" : "#fff",
                borderColor: isDark ? "#6b7280" : "#3B82F6",
              },
            ]}
          >
            <Text
              style={[
                styles.dropdownText,
                { color: isDark ? "#fff" : "#1D4ED8" },
              ]}
            >
              {selectedCourse ? selectedCourse.title : "Select a Course"}
            </Text>
          </TouchableOpacity>

          <AnimatePresence>
            {showDropdown && (
              <MotiView
                from={{ opacity: 0, translateY: -10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -10 }}
                style={[
                  styles.dropdownContainer,
                  {
                    backgroundColor: isDark ? "#374151" : "#fff",
                  },
                ]}
              >
                {publishedCourses.map((course) => (
                  <TouchableOpacity
                    key={course.id}
                    onPress={() => {
                      setSelectedCourse(course);
                      setShowDropdown(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text
                      style={[
                        styles.courseTitle,
                        { color: isDark ? "#93c5fd" : "#1E40AF" },
                      ]}
                    >
                      {course.title}
                    </Text>
                    <Text
                      style={[
                        styles.courseStatus,
                        { color: isDark ? "#9CA3AF" : "#64748B" },
                      ]}
                    >
                      {course.status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </MotiView>
            )}
          </AnimatePresence>
        </View>

        <AnimatePresence>
          {selectedCourse && (
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
                  { color: isDark ? "#60a5fa" : "#1E40AF" },
                ]}
              >
                Students in: {selectedCourse.title}
              </Text>

              <FlatList
                data={mockStudents}
                contentContainerStyle={{ paddingBottom: 180 }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const isEnrolled = enrollments[selectedCourse.id]?.includes(
                    item.id
                  );
                  return (
                    <View
                      style={[
                        styles.studentRow,
                        {
                          backgroundColor: isDark ? "#1f2937" : "#fff",
                          shadowColor: isDark ? "#00000055" : "#000",
                        },
                      ]}
                    >
                      <View>
                        <Text
                          style={[
                            styles.studentName,
                            { color: isDark ? "#f9fafb" : "#111827" },
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.studentEmail,
                            { color: isDark ? "#9CA3AF" : "#6B7280" },
                          ]}
                        >
                          {item.email}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => toggleEnroll(item.id)}
                        style={[
                          styles.enrollButton,
                          isEnrolled ? styles.unenroll : styles.enroll,
                        ]}
                      >
                        <Text style={styles.enrollText}>
                          {isEnrolled ? "Unenroll" : "Enroll"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </MotiView>
          )}
        </AnimatePresence>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },
  dropdownWrapper: {
    zIndex: 10,
    marginBottom: 10,
  },
  dropdownToggle: {
    padding: 14,
    borderRadius: 12,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownContainer: {
    position: "absolute",
    top: 60,
    width: "100%",
    borderRadius: 12,
    padding: 10,
    elevation: 5,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  courseStatus: {
    fontSize: 12,
  },
  subHeader: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "600",
  },
  studentListContainer: {
    marginTop: 10,
    flex: 1,
  },
  studentRow: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "700",
  },
  studentEmail: {
    fontSize: 13,
  },
  enrollButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  enroll: {
    backgroundColor: "#4ADE80",
  },
  unenroll: {
    backgroundColor: "#F87171",
  },
  enrollText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default ManageStudentsScreen;
