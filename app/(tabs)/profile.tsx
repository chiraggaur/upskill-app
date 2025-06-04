import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { useThemeContext } from "../context/themeContext";
import {
  Avatar,
  Text,
  Switch,
  List,
  Divider,
  Card,
  IconButton,
} from "react-native-paper";
import EditProfileModal from "@/components/EditProfileModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/profileStyles";

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useThemeContext();
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const textColor = { color: isDark ? "#fff" : "#000" };
  const backgroundColor = { backgroundColor: isDark ? "#000" : "#fff" };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("loggedInUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setName(parsedUser.name || "");
          setEmail(parsedUser.email || "");
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };
    loadUser();
  }, []);

  const handleSaveProfile = (updatedName: string, updatedEmail: string) => {
    setName(updatedName);
    setEmail(updatedEmail);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedInUser");
    router.replace("/landingPage");
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, backgroundColor]}>
      {/* Profile Header */}
      <View style={[styles.header, backgroundColor]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDark ? "#fff" : "#000"}
          />
        </TouchableOpacity>
        <Text style={[styles.title, textColor]}>Profile</Text>
      </View>

      <View style={styles.profileHeader}>
        <Avatar.Image
          size={60}
          source={{ uri: "https://i.pravatar.cc/150?img=12" }}
        />
        <View style={styles.profileInfo}>
          <Text variant="titleMedium" style={textColor}>
            {name}
          </Text>
          <Text variant="bodySmall" style={textColor}>
            {email}
          </Text>
        </View>
        <IconButton
          icon="pencil"
          onPress={() => setIsModalVisible(true)}
          iconColor={isDark ? "#fff" : "#000"}
        />
      </View>

      {/* Edit Modal */}
      <EditProfileModal
        key={name + email}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        initialName={name}
        initialEmail={email}
        onSave={handleSaveProfile}
      />
      <Card
        mode="outlined"
        style={[styles.premiumCard, backgroundColor]}
        onPress={() => {}}
      >
        <Card.Title
          title="Subscribe to access all premium features"
          titleVariant="bodyMedium"
          titleStyle={[styles.subscription, textColor]}
          left={(props) => <Avatar.Icon {...props} icon="crown" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" />}
        />
      </Card>

      {/* Settings Section */}
      <Text style={[styles.settingsTitle, textColor]}>Settings</Text>

      <List.Item
        title="Notifications"
        titleStyle={textColor}
        left={() => (
          <List.Icon icon="bell-outline" color={isDark ? "#fff" : "#000"} />
        )}
        right={() => (
          <Switch
            value={isNotificationEnabled}
            onValueChange={() =>
              setIsNotificationEnabled(!isNotificationEnabled)
            }
          />
        )}
      />
      <Divider />

      <List.Item
        title="Dark Mode"
        titleStyle={textColor}
        left={() => (
          <List.Icon icon="weather-night" color={isDark ? "#fff" : "#000"} />
        )}
        right={() => <Switch value={isDark} onValueChange={toggleTheme} />}
      />
      <Divider />

      <List.Item
        title="Language"
        titleStyle={textColor}
        left={() => (
          <List.Icon icon="translate" color={isDark ? "#fff" : "#000"} />
        )}
        right={() => (
          <List.Icon icon="chevron-right" color={isDark ? "#fff" : "#000"} />
        )}
        onPress={() => {}}
      />
      <Divider />

      <List.Item
        title="Privacy Policy"
        titleStyle={textColor}
        left={() => (
          <List.Icon icon="lock-outline" color={isDark ? "#fff" : "#000"} />
        )}
        right={() => (
          <List.Icon icon="chevron-right" color={isDark ? "#fff" : "#000"} />
        )}
        onPress={() => {}}
      />
      <Divider />

      <List.Item
        title="Contact Us"
        titleStyle={textColor}
        left={() => (
          <List.Icon icon="email-outline" color={isDark ? "#fff" : "#000"} />
        )}
        right={() => (
          <List.Icon icon="chevron-right" color={isDark ? "#fff" : "#000"} />
        )}
        onPress={() => {}}
      />
      <Divider />

      <List.Item
        title="Rate This App"
        titleStyle={textColor}
        left={() => (
          <List.Icon icon="star-outline" color={isDark ? "#fff" : "#000"} />
        )}
        right={() => (
          <List.Icon icon="chevron-right" color={isDark ? "#fff" : "#000"} />
        )}
        onPress={() => {}}
      />
      <Divider />

      <List.Item
        title="Logout"
        titleStyle={[textColor, { color: "red" }]}
        left={() => (
          <List.Icon icon="logout" color={isDark ? "#fff" : "#000"} />
        )}
        onPress={handleLogout}
      />
    </ScrollView>
  );
}
