// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from "react-native";
// import { AnimatePresence, MotiView } from "moti";
// import { LinearGradient } from "expo-linear-gradient";
// import { useThemeContext } from "../context/themeContext";
// import { mockStudents, Courses } from "../mockData";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Toast from "react-native-toast-message";

// const ManageStudentsScreen = () => {
//   const [loggedInUser, setLoggedInUser] = useState<number | null>(null);
//   const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [students, setStudents] = useState(mockStudents);
//   const { isDark } = useThemeContext();

//   useEffect(() => {
//     const loadUser = async () => {
//       const storedUser = await AsyncStorage.getItem("loggedInUser");
//       if (storedUser) {
//         setLoggedInUser(JSON.parse(storedUser).id);
//       }
//     };
//     loadUser();
//   }, []);

//   if (loggedInUser === null) return null;

//   const teacherCourses = Courses.filter(
//     (c) => c.teacherId === loggedInUser && c.status === "Published"
//   );

//   const teacherStudents = students.filter(
//     (s) => s.assignedTeacherId === loggedInUser
//   );

//   const enrolledStudents = selectedCourse
//     ? teacherStudents.filter((s) =>
//         s.coursesEnrolled.includes(selectedCourse.id)
//       )
//     : [];

//   const availableStudents = selectedCourse
//     ? teacherStudents.filter(
//         (s) => !s.coursesEnrolled.includes(selectedCourse.id)
//       )
//     : [];

//   const toggleEnroll = (studentId: number) => {
//     const updated = students.map((student) => {
//       if (student.id !== studentId) return student;
//       const isEnrolled = student.coursesEnrolled.includes(selectedCourse.id);
//       const updatedCourses = isEnrolled
//         ? student.coursesEnrolled.filter((id) => id !== selectedCourse.id)
//         : [...student.coursesEnrolled, selectedCourse.id];
//       return { ...student, coursesEnrolled: updatedCourses };
//     });
//     setStudents(updated);

//     const student = students.find((s) => s.id === studentId);

//     Toast.show({
//       type: "success",
//       position: "bottom",
//       text1: `Student ${student?.name} has been ${
//         students
//           .find((s) => s.id === studentId)
//           ?.coursesEnrolled.includes(selectedCourse.id)
//           ? "unenrolled from"
//           : "enrolled in"
//       } ${selectedCourse.title}`,
//     });
//   };

//   return (
//     <LinearGradient
//       colors={
//         isDark
//           ? ["#111827", "#1f2937"]
//           : [
//               "rgba(0, 10, 20, 0.95)", // deep midnight blue
//               "rgba(58, 12, 163, 0.9)", // neon violet
//               "rgba(0, 255, 255, 0.4)", // bright cyan glow
//             ]
//       }
//       style={styles.gradient}
//     >
//       <FlatList
//         ListHeaderComponent={
//           <View style={styles.container}>
//             <Text
//               style={[styles.header, { color: isDark ? "#fff" : "#1E3A8A" }]}
//             >
//               🎓 Select a Course
//             </Text>

//             <TouchableOpacity
//               onPress={() => setDropdownOpen(!dropdownOpen)}
//               style={[
//                 styles.dropdownToggle,
//                 {
//                   backgroundColor: isDark ? "#1f2937" : "#fff",
//                   borderColor: isDark ? "#374151" : "#ccc",
//                 },
//               ]}
//             >
//               <Text style={{ color: isDark ? "#fff" : "#000" }}>
//                 {selectedCourse ? selectedCourse.title : "Select Course"}
//               </Text>
//             </TouchableOpacity>

//             {dropdownOpen &&
//               teacherCourses.map((course) => (
//                 <TouchableOpacity
//                   key={course.id}
//                   onPress={() => {
//                     setSelectedCourse(course);
//                     setDropdownOpen(false);
//                   }}
//                   style={[
//                     styles.dropdownItem,
//                     {
//                       backgroundColor: isDark ? "#374151" : "#f1f5f9",
//                     },
//                   ]}
//                 >
//                   <Text style={{ color: isDark ? "#fff" : "#111" }}>
//                     {course.title}
//                   </Text>
//                 </TouchableOpacity>
//               ))}

//             {selectedCourse && (
//               <AnimatePresence>
//                 <MotiView
//                   key="student-list"
//                   from={{ opacity: 0, translateY: 10 }}
//                   animate={{ opacity: 1, translateY: 0 }}
//                   transition={{ type: "timing", duration: 300 }}
//                   style={styles.studentListContainer}
//                 >
//                   <Text
//                     style={[
//                       styles.subHeader,
//                       { color: isDark ? "#60a5fa" : "#1E40AF" },
//                     ]}
//                   >
//                     Enrolled Students
//                   </Text>

//                   {enrolledStudents.map((item) => (
//                     <StudentRow
//                       key={item.id}
//                       student={item}
//                       isEnrolled
//                       isDark={isDark}
//                       onPress={() => toggleEnroll(item.id)}
//                     />
//                   ))}

//                   <Text
//                     style={[
//                       styles.subHeader,
//                       {
//                         color: isDark ? "#6ee7b7" : "#047857",
//                         marginTop: 24,
//                       },
//                     ]}
//                   >
//                     Available to Enroll
//                   </Text>

//                   {availableStudents.map((item) => (
//                     <StudentRow
//                       key={item.id}
//                       student={item}
//                       isEnrolled={false}
//                       isDark={isDark}
//                       onPress={() => toggleEnroll(item.id)}
//                     />
//                   ))}
//                 </MotiView>
//               </AnimatePresence>
//             )}
//           </View>
//         }
//         data={[]}
//         renderItem={null}
//       />
//     </LinearGradient>
//   );
// };

// const StudentRow = ({
//   student,
//   isEnrolled,
//   isDark,
//   onPress,
// }: {
//   student: any;
//   isEnrolled: boolean;
//   isDark: boolean;
//   onPress: () => void;
// }) => (
//   <View
//     style={[
//       styles.studentRow,
//       {
//         backgroundColor: isDark ? "#1f2937" : "#fff",
//         shadowColor: isDark ? "#00000033" : "#000",
//       },
//     ]}
//   >
//     <View>
//       <Text style={{ color: isDark ? "#f9fafb" : "#111827", fontSize: 16 }}>
//         {student.name}
//       </Text>
//       <Text style={{ color: isDark ? "#9CA3AF" : "#6B7280" }}>
//         {student.email}
//       </Text>
//     </View>
//     <TouchableOpacity
//       onPress={onPress}
//       style={[
//         styles.enrollButton,
//         { backgroundColor: isEnrolled ? "#ef4444" : "#10b981" },
//       ]}
//     >
//       <Text style={{ color: "#fff", fontWeight: "bold" }}>
//         {isEnrolled ? "Unenroll" : "Enroll"}
//       </Text>
//     </TouchableOpacity>
//   </View>
// );

// const styles = StyleSheet.create({
//   gradient: { flex: 1 },
//   container: { padding: 16, paddingBottom: 120 },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
//   dropdownToggle: {
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 10,
//   },
//   dropdownItem: {
//     padding: 12,
//     borderRadius: 6,
//     marginVertical: 4,
//   },
//   studentListContainer: {
//     marginTop: 16,
//   },
//   subHeader: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 8,
//   },
//   studentRow: {
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 2,
//   },
//   enrollButton: {
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     borderRadius: 6,
//   },
// });

// export default ManageStudentsScreen;

////

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
} from "react-native";
import { AnimatePresence, MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../context/themeContext";
import { mockStudents, Courses } from "../mockData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

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

  if (loggedInUser === null) return null;

  const teacherCourses = Courses.filter(
    (c) => c.teacherId === loggedInUser && c.status === "Published"
  );

  const teacherStudents = students.filter(
    (s) => s.assignedTeacherId === loggedInUser
  );

  const enrolledStudents = selectedCourse
    ? teacherStudents.filter((s) =>
        s.coursesEnrolled.includes(selectedCourse.id)
      )
    : [];

  const availableStudents = selectedCourse
    ? teacherStudents.filter(
        (s) => !s.coursesEnrolled.includes(selectedCourse.id)
      )
    : [];

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

const StudentRow = ({
  student,
  isEnrolled,
  isDark,
  onPress,
}: {
  student: any;
  isEnrolled: boolean;
  isDark: boolean;
  onPress: () => void;
}) => (
  <View
    style={[
      styles.studentRow,
      {
        backgroundColor: isDark ? "#1f2937" : "#fff",
        shadowColor: isDark ? "#00000033" : "#0000001a",
      },
    ]}
  >
    <View>
      <Text
        style={{
          color: isDark ? "#f9fafb" : "#111827",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {student.name}
      </Text>
      <Text style={{ color: isDark ? "#9ca3af" : "#64748b", marginTop: 2 }}>
        {student.email}
      </Text>
    </View>
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.enrollButton,
        { backgroundColor: isEnrolled ? "#ef4444" : "#10b981" },
      ]}
      activeOpacity={0.8}
    >
      <Text style={{ color: "#fff", fontWeight: "700" }}>
        {isEnrolled ? "Unenroll" : "Enroll"}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 28,
    textAlign: "center",
  },
  dropdownToggle: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  studentListContainer: {
    marginTop: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  studentRow: {
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  enrollButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default ManageStudentsScreen;
