// import React from "react";
// import { View, StyleSheet, TouchableOpacity } from "react-native";
// import { Card, Button, Text } from "react-native-paper";
// import { MaterialIcons } from "@expo/vector-icons";
// import { useThemeContext } from "../app/context/themeContext";
// import { router } from "expo-router";

// type Course = {
//   title: string;
//   image: string;
//   rating: number;
//   id: number;
//   description: string;
//   cost: number;
//   status: string;
//   startDate: string;
//   endDate: string;
//   createdAt: string;
//   instructor: string;
//   students: number;
// };

// type Role = {
//   role?: string;
// };

// type CourseCardProps = {
//   course: Course;
//   user: Role;
// };

// const CourseCard = ({ course, user }: CourseCardProps) => {
//   const { isDark } = useThemeContext();

//   const backgroundColor = isDark ? "#000" : "#fff";
//   const textColor = isDark ? "#fff" : "#000";

//   return (
//     <TouchableOpacity onPress={() => router.push(`/screens/${course.id}`)}>
//       <Card style={[styles.card, { backgroundColor }]}>
//         <Card.Cover
//           source={{ uri: course.image }}
//           style={[styles.cover, { backgroundColor }]}
//         />
//         <Card.Content style={styles.content}>
//           <Text
//             variant="titleMedium"
//             style={[styles.title, { color: textColor }]}
//           >
//             {course.title}
//           </Text>

//           <Text style={[styles.instructor, { color: textColor }]}>
//             By {course.instructor}
//           </Text>

//           <View style={styles.studentsRatingRow}>
//             <Text style={[styles.studentsText, { color: textColor }]}>
//               {course.students} Students
//             </Text>
//             <View style={styles.ratingContainer}>
//               {[...Array(5)].map((_, i) => (
//                 <MaterialIcons
//                   key={i}
//                   name="star"
//                   size={16}
//                   color={i < Math.round(course.rating) ? "#facc15" : "#e5e7eb"}
//                   style={{ marginRight: 2 }}
//                 />
//               ))}
//               <Text style={[styles.ratingText, { color: textColor }]}>
//                 {course.rating.toFixed(1)}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.costStatusRow}>
//             <Text style={[styles.costText, { color: textColor }]}>
//               {course.cost === 0 ? "Free" : `$${course.cost}`}
//             </Text>
//             <Text style={[styles.statusText, { color: textColor }]}>
//               {course.status}
//             </Text>
//           </View>

//           <Text style={[styles.datesText, { color: textColor }]}>
//             {course.startDate} → {course.endDate}
//           </Text>
//         </Card.Content>

//         <Card.Actions style={styles.actions}>
//           {user.role === "student" ? (
//             <Button
//               mode="contained"
//               onPress={() => {}}
//               style={styles.enrollButton}
//               labelStyle={{ color: "#fff" }}
//             >
//               Enroll
//             </Button>
//           ) : null}
//         </Card.Actions>
//       </Card>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     margin: 12,
//     borderRadius: 12,
//     elevation: 3,
//     backgroundColor: "#fff",
//     overflow: "hidden", // Make sure rounded corners clip child elements
//   },
//   cover: {
//     height: 180,
//     borderTopLeftRadius: 12,
//     borderTopRightRadius: 12,
//   },
//   content: {
//     paddingHorizontal: 16,
//     paddingTop: 12,
//     paddingBottom: 8,
//   },
//   title: {
//     fontWeight: "700",
//     fontSize: 18,
//     color: "#000",
//   },
//   instructor: {
//     fontSize: 12,
//     color: "#6b7280", // Tailwind gray-500
//     marginTop: 4,
//   },
//   studentsRatingRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 12,
//   },
//   studentsText: {
//     fontSize: 12,
//     color: "#6b7280",
//   },
//   ratingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   ratingText: {
//     fontSize: 12,
//     color: "#4b5563", // Tailwind gray-600
//     marginLeft: 4,
//   },
//   costStatusRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 12,
//   },
//   costText: {
//     fontSize: 12,
//     color: "#6b7280",
//   },
//   statusText: {
//     fontSize: 12,
//     color: "#6b7280",
//     textTransform: "capitalize",
//   },
//   datesText: {
//     fontSize: 12,
//     color: "#6b7280",
//     marginTop: 6,
//   },
//   actions: {
//     justifyContent: "flex-end",
//     paddingRight: 16,
//     paddingBottom: 12,
//   },
//   enrollButton: {
//     backgroundColor: "#2563eb", // Tailwind blue-600
//   },
// });

// export default CourseCard;

////

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeContext } from "../app/context/themeContext";
import { router } from "expo-router";

type Course = {
  title: string;
  image: string;
  rating: number;
  id: number;
  description: string;
  cost: number;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  instructor: string;
  students: number;
};

type Role = {
  role?: string;
};

type CourseCardProps = {
  course: Course;
  user: Role;
};

const CourseCard = ({ course, user }: CourseCardProps) => {
  const { isDark } = useThemeContext();

  const backgroundColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";

  return (
    <TouchableOpacity onPress={() => router.push(`/screens/${course.id}`)}>
      <Card style={[styles.card, { backgroundColor }]}>
        <Card.Cover
          source={{ uri: course.image }}
          style={[styles.cover, { backgroundColor }]}
        />
        <Card.Content style={styles.content}>
          <Text
            variant="titleMedium"
            style={[styles.title, { color: textColor }]}
          >
            {course.title}
          </Text>

          <Text style={[styles.instructor, { color: textColor }]}>
            By {course.instructor}
          </Text>

          <View style={styles.studentsRatingRow}>
            <Text style={[styles.studentsText, { color: textColor }]}>
              {course.students} Students
            </Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, i) => (
                <MaterialIcons
                  key={i}
                  name="star"
                  size={16}
                  color={i < Math.round(course.rating) ? "#facc15" : "#e5e7eb"}
                  style={{ marginRight: 2 }}
                />
              ))}
              <Text style={[styles.ratingText, { color: textColor }]}>
                {course.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.costStatusRow}>
            <Text style={[styles.costText, { color: textColor }]}>
              {course.cost === 0 ? "Free" : `$${course.cost}`}
            </Text>
            <Text style={[styles.statusText, { color: textColor }]}>
              {course.status}
            </Text>
          </View>

          <Text style={[styles.datesText, { color: textColor }]}>
            {course.startDate} → {course.endDate}
          </Text>
        </Card.Content>

        <Card.Actions style={styles.actions}>
          {user.role === "student" && (
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.enrollButton}
              labelStyle={{ color: "#fff" }}
            >
              Enroll
            </Button>
          )}

          {user.role === "instructor" && (
            // <Button
            //   mode="outlined"
            //   onPress={() => router.push(`/(instructorTabs)/cours`)}
            //   style={styles.editButton}
            //   labelStyle={{ color: "#2563eb" }}
            // >
            //   Edit
            // </Button>
            <Button
              mode="outlined"
              onPress={() =>
                router.push({
                  pathname: "/screens/courseEdit",
                  params: {
                    mode: "edit",
                    title: course.title,
                    description: course.description,
                    cost: course.cost.toString(),
                    image: course.image,
                    startDate: course.startDate,
                    endDate: course.endDate,
                    status: course.status,
                  },
                })
              }
              style={styles.editButton}
              labelStyle={{ color: "#2563eb" }}
            >
              Edit
            </Button>
          )}
        </Card.Actions>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  cover: {
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
  },
  instructor: {
    fontSize: 12,
    marginTop: 4,
  },
  studentsRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  studentsText: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  costStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  costText: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
    textTransform: "capitalize",
  },
  datesText: {
    fontSize: 12,
    marginTop: 6,
  },
  actions: {
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 10,
    paddingRight: 16,
    paddingBottom: 12,
  },
  enrollButton: {
    backgroundColor: "#2563eb",
  },
  editButton: {
    borderColor: "#2563eb",
  },
});

export default CourseCard;
