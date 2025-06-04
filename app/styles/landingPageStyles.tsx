import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "auto",
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    flexWrap: "wrap",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 24,
  },
  roleButton: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  activeButton: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  dropdownSelector: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  selectorText: {
    fontSize: 16,
    color: "#fff",
  },
  dropdownList: {
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  userOption: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
  },
  userText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default styles;
