import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeContext } from "../app/context/themeContext";
import { router } from "expo-router";
import styles from "@/app/styles/courseCardStyles";

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

export default CourseCard;
