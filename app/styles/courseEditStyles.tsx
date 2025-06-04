import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold" as const,
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4b5563",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top" as const,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  dateButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    marginBottom: 12,
  },
  imageButton: {
    backgroundColor: "#694da6",
    padding: 14,
    borderRadius: 999,
    alignItems: "center" as const,
    marginBottom: 15,
  },
  imageButtonText: {
    color: "white",
    fontWeight: "600" as const,
  },
  saveButton: {
    backgroundColor: "#10b981",
    padding: 16,
    borderRadius: 999,
    alignItems: "center" as const,
    marginTop: 10,
  },
});

export default styles;
