import { Platform, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 28,
    textAlign: "center",
  },
  dropdownToggle: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: Platform.OS === "ios" ? 14 : 12,
    paddingHorizontal: 18,
    marginBottom: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "transparent",
  },
  studentListContainer: {
    marginTop: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  studentRow: {
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 3,
  },
  enrollButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
});

export default styles;
