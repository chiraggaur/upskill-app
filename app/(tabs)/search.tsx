import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { useThemeContext } from "../context/themeContext";
import debounce from "lodash.debounce";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CourseCard from "@/components/CourseCard";
import { categories, Course, dummySuggestions } from "../types";
import getStyles from "../styles/searchStyles";

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
  const styles = getStyles(isDark);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [user, setUser] = useState({ role: "student" });
  const [showDummy, setShowDummy] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const json = await AsyncStorage.getItem("loggedInUser");
      if (json) {
        setUser(JSON.parse(json));
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      setShowDummy(true);
      setSelectedCourse(null);
      setNotFound(false);
    }
  }, [searchQuery]);

  const fetchCourses = async (query: string) => {
    if (!query) return;
    try {
      const response = await axios.get(
        "https://f485c52e-af5f-460e-b2c8-c6a9589aad03.mock.pstmn.io//courses"
      );
      const filtered = response.data.filter((course: Course) =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setNotFound(filtered.length === 0);
    } catch (err) {
      console.error("Course fetch error", err);
      setNotFound(true);
    }
  };

  const debouncedFetch = useCallback(debounce(fetchCourses, 200), []);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCourse(null);
    setShowDummy(false);
    debouncedFetch(query);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Searchbar
        placeholder="Search Courses"
        style={styles.input}
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {showDummy ? (
        <View style={styles.chipsContainer}>
          {dummySuggestions.map((tag, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chip}
              onPress={() => {
                setSearchQuery(tag);
                setShowDummy(false);
                debouncedFetch(tag);
              }}
            >
              <Text style={styles.chipText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : suggestions.length > 0 ? (
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sectionTitle}>Suggestions</Text>
          {suggestions.map((course) => (
            <TouchableOpacity
              key={course.id}
              onPress={() => {
                setSelectedCourse(course);
                setSuggestions([]);
                setSearchQuery(course.title);
                setNotFound(false);
              }}
              style={styles.chip}
            >
              <Text style={styles.chipText}>{course.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : notFound ? (
        <Text style={{ color: isDark ? "#ccc" : "#444", marginBottom: 20 }}>
          No such courses yet.
        </Text>
      ) : null}

      {/* Selected course display */}
      {selectedCourse && <CourseCard course={selectedCourse} user={user} />}

      {/* Categories */}
      <Text style={styles.sectionTitle}>All Categories</Text>
      {categories.map((category, index) => {
        const Icon = getIconComponent(category.lib);
        return (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Icon
              name={category.icon}
              size={26}
              color={isDark ? "#fff" : "#333"}
              style={{ marginRight: 14 }}
            />
            <Text style={styles.categoryText}>{category.name}</Text>
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
