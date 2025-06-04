import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useThemeContext } from "../context/themeContext";
import { Courses } from "../mockData";

const CourseDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { isDark } = useThemeContext();
  const course = Courses.find((c) => c.id === Number(id));
  const textColor = { color: isDark ? "#fff" : "#000" };
  const backgroundColor = { backgroundColor: isDark ? "#000" : "#fff" };

  if (!course) return <Text>Course not found</Text>;

  return (
    <ScrollView style={[styles.wrapper, backgroundColor]}>
      <View style={[styles.header, backgroundColor]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="chevron-back"
            size={24}
            style={[styles.backButton, textColor]}
          />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons
              name="heart-outline"
              size={22}
              color={isDark ? "#fff" : "#F44336"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="star-outline"
              size={22}
              color={isDark ? "#fff" : "#333"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="share-social-outline"
              size={22}
              color={isDark ? "#fff" : "#333"}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Course Thumbnail */}
      <View style={styles.imageWrapper}>
        <Image source={{ uri: course.image }} style={styles.image} />
        <View style={styles.playIcon}>
          <Entypo name="controller-play" size={32} color="#fff" />
        </View>
      </View>

      {/* Details Card */}
      <View style={[styles.card, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{course.title}</Text>

        {/* Rating and students */}
        <View style={styles.ratingRow}>
          <FontAwesome name="star" size={14} color="#f59e0b" />
          <Text style={[styles.rating, textColor]}> {course.rating}</Text>
          <Text style={[styles.students, textColor]}>
            {" "}
            | {course.students} Students
          </Text>
        </View>

        <Text style={[styles.description, textColor]}>
          {course.description}
        </Text>

        {/* Meta Info */}
        <Text style={[textColor, styles.meta]}>
          Created by{" "}
          <Text style={[textColor, styles.creator]}>{course.instructor}</Text>
        </Text>
        <Text style={[styles.meta, textColor]}>Start: {course.startDate}</Text>
        <Text style={[styles.meta, textColor]}>End: {course.endDate}</Text>
        <Text style={[styles.meta, textColor]}>Duration: 18 hours</Text>
        <Text style={[styles.meta, textColor]}>Language: English</Text>

        {/* Enroll Button */}
        <TouchableOpacity style={styles.enrollBtn}>
          <Ionicons name="crop-outline" size={18} color="white" />
          <Text style={[styles.enrollText, textColor]}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export const options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#f1f5f9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    justifyContent: "center",
    marginBottom: 10,
  },
  headerIcons: {
    flexDirection: "row",
    position: "relative",
    left: 100,
    gap: 12,
  },
  imageWrapper: {
    position: "relative",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  playIcon: {
    position: "absolute",
    top: "40%",
    left: "45%",
    backgroundColor: "#00000080",
    borderRadius: 30,
    padding: 6,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backButton: {
    position: "relative",
    right: 120,
    bottom: 4,
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    color: "#f59e0b",
    fontWeight: "600",
  },
  students: {
    fontSize: 13,
    color: "#555",
    marginLeft: 4,
  },
  description: {
    fontSize: 14.5,
    color: "#333",
    marginVertical: 10,
    lineHeight: 20,
  },
  meta: {
    fontSize: 13.5,
    color: "#555",
    marginTop: 6,
  },
  creator: {
    color: "#2563eb",
    fontWeight: "500",
  },
  enrollBtn: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  enrollText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CourseDetailScreen;
