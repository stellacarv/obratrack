import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#DDFFDB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 16,
    color: "#314C1C",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#314C1C"
  },
  subtitle: {
    fontSize: 16,
    color: "#4B712D",
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#314C1C",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: "#ddffdb",
    marginTop: 8,
    height: 40,
    justifyContent: "center",
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#314C1C",
  },
  modalPicker: {
    backgroundColor: "#ddffdb",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "50%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#314C1C",
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "#314C1C",
    fontWeight: "bold",
  },
  modalPickerContainer: {
    backgroundColor: "#314C1C",
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#314C1C",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  photoButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photoButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "#314C1C",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  photoButtonText: {
    fontWeight: "bold",
    color: "#ddffdb",
  },
  photoInfo: {
    marginTop: 8,
    color: "#314C1C",
    fontStyle: "italic",
  },
  locationButton: {
    padding: 12,
    backgroundColor: "#314C1C",
    borderRadius: 8,
    alignItems: "center",
  },
  locationButtonText: {
    fontWeight: "bold",
    color: "#ddffdb",
  },
  locationInfo: {
    marginTop: 8,
    color: "#314C1C",
  },
  locationStatus: {
    marginTop: 4,
    color: "#314C1C",
    fontSize: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#314C1C",
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    fontWeight: "bold",
    color: "#ddffdb",
  },
  saveButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#314C1C",
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  saveButtonText: {
    fontWeight: "bold",
    color: "#ddffdb",
  },
});

export default styles;
