import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterIcon: {
    position: "absolute",
    right: 20,
    top: 10,
    padding: 6,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentContainer: {
    width: "85%",
    padding: 2,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },
  modalGradientCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#1e1b4b",
    width: "100%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButton: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontSize: 16,
  },
});

export default styles;
