// screens/MyCoursesScreen.tsx

// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { ScrollView } from "react-native";
// import MyCourseCard from "@/components/MyCourseCard";
// import { useThemeContext } from "../context/themeContext";

// const courses = [
//   {
//     id: 101,
//     title: "React for Beginners",
//     description:
//       "Learn the basics of React including components, props, and state.",
//     cost: 0,
//     status: "Published",
//     startDate: "2025-06-01",
//     endDate: "2025-06-30",
//     createdAt: "2025-05-25",
//     image: "https://img-c.udemycdn.com/course/750x422/1565838_e54e_16.jpg",
//     instructor: "Emily Johnson",
//     students: 1200,
//     rating: 4.6,
//     duration: "4h 20m",
//     videoCount: 35,
//   },
//   {
//     id: 102,
//     title: "Advanced JavaScript",
//     description:
//       "Explore asynchronous programming, closures, and advanced JS patterns.",
//     cost: 49,
//     status: "Published",
//     startDate: "2025-07-01",
//     endDate: "2025-07-31",
//     createdAt: "2025-05-26",
//     image: "https://img-c.udemycdn.com/course/750x422/851712_fc61_6.jpg",
//     instructor: "Daniel Smith",
//     students: 890,
//     rating: 4.8,
//     duration: "6h 15m",
//     videoCount: 48,
//   },
//   {
//     id: 103,
//     title: "UI/UX Design Basics",
//     description:
//       "Understand user interface principles and create intuitive user experiences.",
//     cost: 35,
//     status: "Draft",
//     startDate: "2025-08-01",
//     endDate: "2025-08-30",
//     createdAt: "2025-05-27",
//     image: "https://img-c.udemycdn.com/course/750x422/1452908_8741_3.jpg",
//     instructor: "Sophia Lee",
//     students: 530,
//     rating: 4.2,
//     duration: "3h 30m",
//     videoCount: 28,
//   },
//   {
//     id: 104,
//     title: "Node.js Crash Course",
//     description: "Learn how to build backend APIs using Node.js and Express.",
//     cost: 29,
//     status: "Published",
//     startDate: "2025-06-15",
//     endDate: "2025-07-15",
//     createdAt: "2025-05-28",
//     image: "https://img-c.udemycdn.com/course/750x422/922484_52a1_8.jpg",
//     instructor: "Michael Brown",
//     students: 760,
//     rating: 4.5,
//     duration: "5h 10m",
//     videoCount: 40,
//   },
//   {
//     id: 105,
//     title: "Python for Data Analysis",
//     description:
//       "Analyze and visualize data using Python, Pandas, and Matplotlib.",
//     cost: 59,
//     status: "Archived",
//     startDate: "2025-04-01",
//     endDate: "2025-04-30",
//     createdAt: "2025-03-01",
//     image: "https://img-c.udemycdn.com/course/750x422/567828_67d0.jpg",
//     instructor: "Rachel Green",
//     students: 1340,
//     rating: 4.7,
//     duration: "7h 00m",
//     videoCount: 55,
//   },
//   {
//     id: 106,
//     title: "HTML & CSS Bootcamp",
//     description:
//       "Master web layout and styling using HTML5 and modern CSS techniques.",
//     cost: 19,
//     status: "Published",
//     startDate: "2025-06-10",
//     endDate: "2025-06-30",
//     createdAt: "2025-05-22",
//     image: "https://img-c.udemycdn.com/course/750x422/437398_46c3_10.jpg",
//     instructor: "Kevin White",
//     students: 650,
//     rating: 4.4,
//     duration: "3h 45m",
//     videoCount: 30,
//   },
// ];

// export default function MyCoursesScreen() {
//   const router = useRouter();
//   const { isDark } = useThemeContext();

//   const backgroundColor = isDark ? "#000" : "#fff";
//   const textColor = isDark ? "#fff" : "#000";

//   return (
//     <View style={[styles.wrapper, { backgroundColor }]}>
//       {/* Custom header */}
//       <View style={[styles.header, { backgroundColor }]}>
//         <TouchableOpacity
//           onPress={() => router.replace("/(tabs)")}
//           style={styles.backButton}
//         >
//           <Ionicons name="arrow-back" size={24} color={textColor} />
//         </TouchableOpacity>
//         <Text style={[styles.title, { color: textColor }]}>My Courses</Text>
//       </View>

//       {/* Content */}
//       <ScrollView contentContainerStyle={styles.container}>
//         {courses.map((course, index) => (
//           <MyCourseCard key={index} {...course} />
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingTop: 50,
//     paddingBottom: 12,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   backButton: {
//     marginRight: 12,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   container: {
//     padding: 12,
//     paddingBottom: 40,
//   },
// });

///

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import MyCourseCard from "@/components/MyCourseCard";
import { useThemeContext } from "../context/themeContext";

// Types
interface LoggedInUser {
  id: number;
  name: string;
  email: string;
  role: "student" | "teacher";
  coursesEnrolled: number[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  videoCount: number;
  rating: number;
  cost: number;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  instructor: string;
  students: number[];
}

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
