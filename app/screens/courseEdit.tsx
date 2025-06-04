import React, { useEffect, useState } from "react";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useThemeContext } from "../context/themeContext";
import { useLocalSearchParams } from "expo-router";
import styles from "../styles/courseEditStyles";

type CourseStatus = "Draft" | "Published" | "Archived";

interface CourseFormValues {
  title: string;
  description: string;
  cost: number;
  startDate: Date;
  endDate: Date;
  image: string;
}

const schema = yup.object().shape({
  title: yup.string().required("Course title is required").min(3),
  description: yup.string().required("Description is required").min(10),
  cost: yup.number().typeError("Enter a valid number").required().min(0),
  startDate: yup.date().required(),
  endDate: yup
    .date()
    .required()
    .min(yup.ref("startDate"), "End date must be after start date"),
  image: yup.string().required("Course image is required"),
});

const CourseEditScreen: React.FC = () => {
  const { isDark } = useThemeContext();
  const params = useLocalSearchParams();

  const [image, setImage] = useState<string | undefined>(
    typeof params.image === "string" ? params.image : undefined
  );
  const [status, setStatus] = useState<CourseStatus>(
    (params.status as CourseStatus) || "Draft"
  );
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

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
      image: "",
    },
  });

  useEffect(() => {
    if (params) {
      setValue("title", String(params.title || ""));
      setValue("description", String(params.description || ""));
      setValue("cost", parseFloat(String(params.cost || "0")));
      setValue("startDate", new Date(String(params.startDate || new Date())));
      setValue("endDate", new Date(String(params.endDate || new Date())));
      setValue("image", String(params.image || ""));
    }
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setValue("image", result.assets[0].uri);
    }
  };

  const onSubmit = (data: CourseFormValues) => {
    const updatedCourse = {
      ...data,
      image,
      status,
      updatedAt: new Date(),
    };
    console.log("Updated course:", updatedCourse);
  };

  const textColor = { color: isDark ? "#fff" : "#000" };
  const backgroundColor = { backgroundColor: isDark ? "#000" : "#fff" };
  const cardBackground = { backgroundColor: isDark ? "#1f2937" : "#fff" };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

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
            style={[styles.input, cardBackground, textColor]}
            placeholder="Enter course title"
            placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
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
            style={[styles.input, styles.textArea, cardBackground, textColor]}
            placeholder="Course description..."
            placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
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
            style={[styles.input, cardBackground, textColor]}
            placeholder="e.g. 99.99"
            placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
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
        style={[styles.dateButton, cardBackground]}
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
        style={[styles.dateButton, cardBackground]}
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
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Update Course
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CourseEditScreen;
