import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { useThemeContext } from "../context/themeContext";
import { Courses } from "../types";
import styles from "../styles/courseDetailStyles";

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

export default CourseDetailScreen;
