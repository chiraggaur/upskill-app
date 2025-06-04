import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  wrapper: { backgroundColor: "#f1f5f9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    justifyContent: "center",
    marginBottom: 10,
  },
  headerIcons: {
    flexDirection: "row",
    position: "relative",
    left: 100,
    gap: 12,
  },
  imageWrapper: {
    position: "relative",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
  playIcon: {
    position: "absolute",
    top: "40%",
    left: "45%",
    backgroundColor: "#00000080",
    borderRadius: 30,
    padding: 6,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backButton: {
    position: "relative",
    right: 120,
    bottom: 4,
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    color: "#f59e0b",
    fontWeight: "600",
  },
  students: {
    fontSize: 13,
    color: "#555",
    marginLeft: 4,
  },
  description: {
    fontSize: 14.5,
    color: "#333",
    marginVertical: 10,
    lineHeight: 20,
  },
  meta: {
    fontSize: 13.5,
    color: "#555",
    marginTop: 6,
  },
  creator: {
    color: "#2563eb",
    fontWeight: "500",
  },
  enrollBtn: {
    backgroundColor: "#2563eb",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  enrollText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
