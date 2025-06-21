import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#DDFFDB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#314C1C',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#4B712D',
  },
  instruction: {
    fontSize: 12,
    textAlign: 'center',
    fontStyle: "italic",
    marginBottom: 16,
    color: '#4B712D',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#314C1C',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#314C1C',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#DDFFDB',
  },
  button: {
    backgroundColor: '#314C1C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ddffdb',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;