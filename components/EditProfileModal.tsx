// components/EditProfileModal.tsx
import React, { useState } from "react";
import { Modal, View, StyleSheet, TextInput } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";

interface Props {
  visible: boolean;
  onClose: () => void;
  initialName: string;
  initialEmail: string;
  onSave: (name: string, email: string) => void;
}

const EditProfileModal = ({
  visible,
  onClose,
  initialName,
  initialEmail,
  onSave,
}: Props) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const { colors } = useTheme();

  const handleSave = () => {
    onSave(name, email);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View
          style={[styles.modalContainer, { backgroundColor: colors.surface }]}
        >
          <Text variant="titleMedium" style={styles.modalTitle}>
            Edit Profile
          </Text>

          <TextInput
            style={[styles.input, { color: colors.onSurface }]}
            placeholder="Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={[styles.input, { color: colors.onSurface }]}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.actions}>
            <Button onPress={onClose}>Cancel</Button>
            <Button mode="contained" onPress={handleSave}>
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    paddingVertical: 8,
    fontSize: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
});
