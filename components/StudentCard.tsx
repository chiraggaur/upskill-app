import styles from "@/app/styles/manageStudentsStyles";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

type StudentRowProps = {
  student: any;
  isEnrolled: boolean;
  isDark: boolean;
  onPress: () => void;
};

const StudentRow = ({
  student,
  isEnrolled,
  isDark,
  onPress,
}: StudentRowProps) => {
  return (
    <View
      style={[
        styles.studentRow,
        {
          backgroundColor: isDark ? "#1f2937" : "#fff",
          shadowColor: isDark ? "#00000033" : "#0000001a",
        },
      ]}
    >
      <View>
        <Text
          style={{
            color: isDark ? "#f9fafb" : "#111827",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {student.name}
        </Text>
        <Text style={{ color: isDark ? "#9ca3af" : "#64748b", marginTop: 2 }}>
          {student.email}
        </Text>
      </View>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.enrollButton,
          { backgroundColor: isEnrolled ? "#ef4444" : "#10b981" },
        ]}
        activeOpacity={0.8}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>
          {isEnrolled ? "Unenroll" : "Enroll"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StudentRow;
