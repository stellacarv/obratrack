import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ddffdb',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheader: {
    fontSize: 16,
    color: '#314C1C',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddffdb',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#314C1C',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    boxShadow: "6"
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: "#ddffdb"
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#8DAB76',
    marginVertical: 12,
  },
  detailsButton: {
    marginTop: 12,
    paddingVertical: 8,
    color: "#8DAB76"
  },
  detailsButtonText: {
    color: '#ddffdb',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  footerButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#314C1C',
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    marginBottom: 50
  },
  primaryButton: {
    backgroundColor: '#314C1C',
    borderColor: '#ddffdb',
  },
  footerButtonText: {
    fontWeight: 'bold',
  },
  primaryButtonText: {
    color: '#ddffdb',
  },
});
export default styles;