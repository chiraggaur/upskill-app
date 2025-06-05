import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  cover: {
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
  },
  instructor: {
    fontSize: 12,
    marginTop: 4,
  },
  studentsRatingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  studentsText: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  costStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  costText: {
    fontSize: 12,
  },
  statusText: {
    fontSize: 12,
    textTransform: "capitalize",
  },
  datesText: {
    fontSize: 12,
    marginTop: 6,
  },
  actions: {
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 10,
    paddingRight: 16,
    paddingBottom: 12,
  },
  enrollButton: {
    backgroundColor: "#2563eb",
  },
  editButton: {
    borderColor: "#2563eb",
  },
});

export default styles;
