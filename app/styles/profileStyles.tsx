import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  profileInfo: {
    flex: 1,
  },
  premiumCard: {
    marginBottom: 24,

    borderRadius: 12,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    justifyContent: "center",
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  subscription: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "600",
  },
});

export default styles;
