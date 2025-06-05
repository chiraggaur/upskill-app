import { Platform, StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 25,
    backgroundColor: "#fff",
    marginVertical: 6,
    borderRadius: 10,
    elevation: 3,
    position: "relative",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#666",
  },
  dot: {
    marginHorizontal: 4,
    color: "#ccc",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  stars: {
    flexDirection: "row",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
  heart: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default styles;
