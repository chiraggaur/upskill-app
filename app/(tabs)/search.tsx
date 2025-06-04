import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useThemeContext } from "../context/themeContext";
import { Searchbar } from "react-native-paper";

const filters = [
  "Adobe Photoshop",
  "Coding",
  "Social Media",
  "Camera",
  "Motivation",
  "Web Design",
  "Programming",
  "Figma",
  "Flutter",
  "Marketing",
];

const categories = [
  { name: "Design", icon: "color-palette-outline", lib: "Ionicons" },
  { name: "Personal Development", icon: "user-check", lib: "Feather" },
  { name: "Development", icon: "code", lib: "Feather" },
  { name: "Music", icon: "music", lib: "Feather" },
  { name: "Marketing", icon: "campaign", lib: "MaterialIcons" },
];

const getIconComponent = (lib: string) => {
  switch (lib) {
    case "Ionicons":
      return Ionicons;
    case "Feather":
      return Feather;
    case "MaterialIcons":
      return MaterialIcons;
    case "FontAwesome5":
      return FontAwesome5;
    default:
      return Ionicons;
  }
};

export default function Search() {
  const { isDark } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState("");
  const themedStyles = getStyles(isDark);

  return (
    <ScrollView
      style={themedStyles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Search Input */}
      <Searchbar
        placeholder="Search Courses"
        style={themedStyles.input}
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      {/* Filter Chips */}
      <View style={themedStyles.chipsContainer}>
        {filters.map((tag, index) => (
          <TouchableOpacity key={index} style={themedStyles.chip}>
            <Text style={themedStyles.chipText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Categories */}
      <Text style={themedStyles.sectionTitle}>All Categories</Text>
      {categories.map((category, index) => {
        const Icon = getIconComponent(category.lib);
        return (
          <TouchableOpacity key={index} style={themedStyles.categoryItem}>
            <Icon
              name={category.icon}
              size={26}
              color={isDark ? "#fff" : "#333"}
              style={{ marginRight: 14 }}
            />
            <Text style={themedStyles.categoryText}>{category.name}</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={isDark ? "#ccc" : "#999"}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#121212" : "#fff",
      padding: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#1e1e1e" : "#f0f0f0",
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 20,
      marginBottom: 16,
    },
    input: {
      marginBottom: 15,
      marginTop: 30,
      flex: 1,
      color: isDark ? "#fff" : "#000",
      fontSize: 16,
    },
    chipsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginBottom: 20,
    },
    chip: {
      backgroundColor: isDark ? "#2c2c2c" : "#eee",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    chipText: {
      color: isDark ? "#fff" : "#333",
      fontSize: 14,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
      color: isDark ? "#fff" : "#111",
    },
    categoryItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#1a1a1a" : "#f9f9f9",
      padding: 14,
      borderRadius: 12,
      marginBottom: 12,
      justifyContent: "space-between",
    },
    categoryText: {
      flex: 1,
      fontSize: 16,
      color: isDark ? "#fff" : "#000",
    },
  });
