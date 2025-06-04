import { StyleSheet } from "react-native";
const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#121212" : "#fff",
      padding: 16,
    },
    input: {
      marginBottom: 15,
      marginTop: 30,
      flex: 1,
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
      marginRight: 8,
      marginBottom: 8,
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

export default getStyles;
