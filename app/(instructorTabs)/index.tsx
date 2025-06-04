// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   View,
//   Text,
//   Modal,
//   Pressable,
//   TouchableOpacity,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";
// import CourseCard from "@/components/CourseCard";
// import { useThemeContext } from "../context/themeContext";
// import { Courses } from "../mockData";
// import LottieView from "lottie-react-native";
// import loadingAnimation from "../../assets/animations/loading.json";

// type LoggedInUser = {
//   id: number;
//   name: string;
//   role: "student" | "instructor";
//   assignedTeacherId?: number;
// };

// const CourseListScreen = () => {
//   const { isDark } = useThemeContext();
//   const [user, setUser] = useState<LoggedInUser | null>(null);
//   const [filteredCourses, setFilteredCourses] = useState<typeof Courses>([]);
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

//   const filterByStatus = (
//     courseList: typeof Courses,
//     status: string | null
//   ) => {
//     if (!status) return courseList;
//     return courseList.filter((course) => course.status === status);
//   };

//   const loadUserAndFilter = async () => {
//     try {
//       const json = await AsyncStorage.getItem("loggedInUser");
//       if (!json) {
//         return;
//       }
//       const parsed: LoggedInUser = JSON.parse(json);
//       setUser(parsed);

//       let relevantCourses: typeof Courses = [];

//       if (parsed.role === "student" && parsed.assignedTeacherId != null) {
//         relevantCourses = Courses.filter(
//           (course) => course.teacherId === parsed.assignedTeacherId
//         );
//       } else if (parsed.role === "instructor") {
//         relevantCourses = Courses.filter(
//           (course) => course.teacherId === parsed.id
//         );
//       }

//       setFilteredCourses(filterByStatus(relevantCourses, selectedStatus));
//     } catch (err) {
//       console.error("Error reading loggedInUser from AsyncStorage", err);
//     }
//   };

//   useEffect(() => {
//     loadUserAndFilter();
//   }, []);

//   useEffect(() => {
//     if (!user) return;
//     const relevantCourses =
//       user.role === "student" && user.assignedTeacherId != null
//         ? Courses.filter(
//             (course) => course.teacherId === user.assignedTeacherId
//           )
//         : Courses.filter((course) => course.teacherId === user.id);

//     setFilteredCourses(filterByStatus(relevantCourses, selectedStatus));
//   }, [selectedStatus]);

//   if (user === null) {
//     return (
//       <View
//         style={[
//           styles.loadingContainer,
//           { backgroundColor: isDark ? "#000" : "#fff" },
//         ]}
//       >
//         <LottieView
//           source={loadingAnimation}
//           autoPlay
//           loop
//           style={{ width: 150, height: 150 }}
//           colorFilters={[
//             {
//               keypath: "Shape Layer 1",
//               color: isDark ? "#fff" : "#4f46e5",
//             },
//           ]}
//         />
//         <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 18 }}>
//           Loading...
//         </Text>
//       </View>
//     );
//   }

//   const backgroundColor = isDark ? "#00000040" : "#fff";
//   const textColor = isDark ? "#fff" : "#000";

//   return (
//     <>
//       <ScrollView style={[styles.scrollContainer, { backgroundColor }]}>
//         <View style={[styles.header, { backgroundColor }]}>
//           <Text style={[styles.headerText, { color: textColor }]}>
//             {user.role === "student"
//               ? "Courses From Your Teacher"
//               : "Your Courses"}
//           </Text>

//           <TouchableOpacity
//             onPress={() => setFilterVisible(true)}
//             style={styles.filterIcon}
//           >
//             <Ionicons name="filter" size={24} color={textColor} />
//           </TouchableOpacity>
//         </View>

//         {filteredCourses.length === 0 ? (
//           <View style={styles.emptyContainer}>
//             <Text style={{ color: textColor, fontSize: 16 }}>
//               {user.role === "student"
//                 ? "No courses found for your assigned teacher."
//                 : "You have not created or been assigned any courses yet."}
//             </Text>
//           </View>
//         ) : (
//           filteredCourses.map((course) => (
//             <CourseCard key={course.id} course={course} user={user} />
//           ))
//         )}
//       </ScrollView>
//       <Modal
//         visible={filterVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => setFilterVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={[styles.modalContentContainer]}>
//             <View style={styles.modalGradientCard}>
//               <Text style={styles.modalTitle}>Filter by Status</Text>

//               {["All", "Published", "Draft", "Archived"].map((status) => {
//                 const isSelected =
//                   selectedStatus === status ||
//                   (status === "All" && selectedStatus === null);
//                 return (
//                   <Pressable
//                     key={status}
//                     onPress={() => {
//                       setSelectedStatus(status === "All" ? null : status);
//                       setFilterVisible(false);
//                     }}
//                     style={({ pressed }) => [
//                       styles.modalButton,
//                       {
//                         backgroundColor: pressed
//                           ? "rgba(255,255,255,0.15)"
//                           : isSelected
//                           ? "#4f46e5"
//                           : "rgba(255, 255, 255, 0.05)",
//                         borderColor: isSelected ? "#fff" : "transparent",
//                         borderWidth: isSelected ? 1.2 : 0,
//                       },
//                     ]}
//                   >
//                     <Text
//                       style={[
//                         styles.modalButtonText,
//                         {
//                           color: isSelected ? "#fff" : "#eee",
//                           fontWeight: isSelected ? "700" : "500",
//                         },
//                       ]}
//                     >
//                       {status}
//                     </Text>
//                   </Pressable>
//                 );
//               })}
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// export default CourseListScreen;

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flex: 1,
//   },
//   header: {
//     paddingVertical: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 20,
//     position: "relative",
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   filterIcon: {
//     position: "absolute",
//     right: 20,
//     top: 10,
//     padding: 6,
//   },
//   loadingContainer: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   emptyContainer: {
//     alignItems: "center",
//     marginTop: 50,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContentContainer: {
//     width: "85%",
//     padding: 2,
//     borderRadius: 16,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//     elevation: 12,
//   },
//   modalGradientCard: {
//     padding: 20,
//     borderRadius: 16,
//     backgroundColor: "#1e1b4b", // Deep purple background
//     width: "100%",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#fff",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   modalButton: {
//     width: "100%",
//     paddingVertical: 12,
//     paddingHorizontal: 18,
//     borderRadius: 10,
//     marginBottom: 12,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   modalButtonText: {
//     fontSize: 16,
//   },
// });

///

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
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
import { Course } from "../mockData";

type LoggedInUser = {
  id: number;
  name: string;
  role: "student" | "instructor";
  assignedTeacherId?: number;
  coursesEnrolled: number[];
};

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

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterIcon: {
    position: "absolute",
    right: 20,
    top: 10,
    padding: 6,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentContainer: {
    width: "85%",
    padding: 2,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },
  modalGradientCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#1e1b4b",
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontSize: 16,
  },
});
