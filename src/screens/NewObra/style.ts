import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ddffdb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 16,
    color: '#314C1C',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "#314C1C"
  },
  subtitle: {
    fontSize: 16,
    color: '#314C1C',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#314C1C',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  photoButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#314C1C',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  photoButtonText: {
    fontWeight: 'bold',
    color: "#ddffdb"
  },
  photoInfo: {
    marginTop: 8,
    color: '#314C1C',
    fontStyle: 'italic',
  },
  locationButton: {
    padding: 12,
    backgroundColor: '#314C1C',
    borderRadius: 8,
    alignItems: 'center',
  },
  locationButtonText: {
    fontWeight: 'bold',
    color: "#ddffdb"
  },
  locationInfo: {
    marginTop: 8,
    color: '#314C1C',
  },
  locationStatus: {
    marginTop: 4,
    color: '#ddffdb',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    color: '#314C1C',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#314C1C",
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: '#314C1C',
  },
  saveButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#314C1C',
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  saveButtonText: {
    fontWeight: 'bold',
    color: '#ddffdb',
  },
});

export default styles;