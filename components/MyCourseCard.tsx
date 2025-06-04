// components/MyCourseCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useThemeContext } from "../app/context/themeContext";
import { router } from "expo-router";

interface MyCourseCardProps {
  title: string;
  image: string;
  duration: string;
  videoCount: number;
  rating: number;
  id: number;
  description: string;
  cost: number;
  status: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  instructor: string;
}

const MyCourseCard: React.FC<MyCourseCardProps> = ({
  title,
  image,
  duration,
  videoCount,
  rating,
  cost,
  id,
}) => {
  const { isDark } = useThemeContext();

  const backgroundColor = isDark ? "#333333" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const videoLogs = isDark ? "#fff" : "#A974B8";

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={() => router.push(`/screens/${id}`)}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <View style={styles.meta}>
          <MaterialIcons name="access-time" size={16} color="#666" />
          <Text style={[styles.metaText, { color: textColor }]}>
            {duration}
          </Text>
          <Text style={styles.dot}>•</Text>
          <Text style={[styles.metaText, { color: videoLogs }]}>
            {videoCount} Videos
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesome
                key={i}
                name="star"
                size={14}
                color={i < rating ? "#f5a623" : "#ccc"}
              />
            ))}
          </View>
          <Text style={[{ color: textColor }, styles.price]}>${cost}</Text>
        </View>
      </View>
      <FontAwesome
        name="heart-o"
        size={22}
        color={textColor}
        style={styles.heart}
      />
    </TouchableOpacity>
  );
};

export default MyCourseCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 25,
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
  },
  dot: {
    marginHorizontal: 4,
    color: "#ccc",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  stars: {
    flexDirection: "row",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
