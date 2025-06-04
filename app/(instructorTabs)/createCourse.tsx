import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useThemeContext } from "../context/themeContext";
import styles from "../styles/courseEditStyles";
import schema from "../Miscellaneous/yupSchema";

type CourseStatus = "Draft" | "Published" | "Archived";

interface CourseFormValues {
  title: string;
  description: string;
  cost: number;
  startDate: Date;
  endDate: Date;
  image: string;
}

const CreateCourseScreen: React.FC = () => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<CourseStatus>("Draft");
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const { isDark } = useThemeContext();

  const textColor = { color: isDark ? "#fff" : "#000" };
  const backgroundColor = { backgroundColor: isDark ? "#000" : "#fff" };
  const cardBackground = { backgroundColor: isDark ? "#1f2937" : "#fff" };

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CourseFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      cost: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = (data: CourseFormValues) => {
    const course = {
      ...data,
      image,
      status,
      createdAt: new Date(),
    };
    console.log("Saving course:", course);
  };

  return (
    <ScrollView
      contentContainerStyle={[{ padding: 20, flexGrow: 1 }, backgroundColor]}
    >
      <Text style={[styles.label, textColor]}>Title</Text>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter course title"
            placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
            style={[styles.input, cardBackground, textColor]}
          />
        )}
      />
      {errors.title && (
        <Text style={{ color: "red" }}>{errors.title.message}</Text>
      )}

      <Text style={[styles.label, textColor]}>Description</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={5}
            placeholder="Course description..."
            placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
            style={[styles.input, styles.textArea, cardBackground, textColor]}
          />
        )}
      />
      {errors.description && (
        <Text style={{ color: "red" }}>{errors.description.message}</Text>
      )}

      <Text style={[styles.label, textColor]}>Cost</Text>
      <Controller
        control={control}
        name="cost"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value?.toString()}
            onChangeText={(text) => onChange(parseFloat(text) || 0)}
            keyboardType="numeric"
            placeholder="e.g. 99.99"
            placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
            style={[styles.input, cardBackground, textColor]}
          />
        )}
      />
      {errors.cost && (
        <Text style={{ color: "red" }}>{errors.cost.message}</Text>
      )}

      <Text style={[styles.label, textColor]}>Status</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        {["Draft", "Published", "Archived"].map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setStatus(s as CourseStatus)}
            style={[
              styles.statusButton,
              {
                backgroundColor:
                  status === s ? "#694da6" : isDark ? "#374151" : "#d1d5db",
              },
            ]}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, textColor]}>Start Date</Text>
      <TouchableOpacity
        style={[
          styles.dateButton,
          cardBackground,
          { borderColor: isDark ? "#4B5563" : "#D1D5DB" },
        ]}
        onPress={() => setShowStartPicker(true)}
      >
        <Text style={textColor}>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowStartPicker(false);
            if (date) setValue("startDate", date);
          }}
        />
      )}

      <Text style={[styles.label, textColor]}>End Date</Text>
      <TouchableOpacity
        style={[
          styles.dateButton,
          cardBackground,
          { borderColor: isDark ? "#4B5563" : "#D1D5DB" },
        ]}
        onPress={() => setShowEndPicker(true)}
      >
        <Text style={textColor}>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(_, date) => {
            setShowEndPicker(false);
            if (date) setValue("endDate", date);
          }}
        />
      )}

      {errors.image && (
        <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
          {errors.image.message}
        </Text>
      )}

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick Course Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginVertical: 10,
          }}
        />
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Save Course</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateCourseScreen;
