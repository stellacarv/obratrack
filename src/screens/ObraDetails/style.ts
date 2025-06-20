import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ddffdb',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#314C1C',
    borderRadius: 4,
  },
  headerButtonText: {
    color: '#314C1C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: "#314C1C",
    alignItems: "center",
    fontStyle: "italic"
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#476A2C',
    marginBottom: 16,
  },
  obraName: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#314C1C',
  },
  fotoContainer: {
    height: 200,
    backgroundColor: '#314C1C',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#51FF00',
  },
  foto: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  fotoPlaceholder: {
    color: '#888',
    fontSize: 16,
  },
  imagemFiscalizacao: {
  width: '100%',
  height: 200,
  borderRadius: 8,
  resizeMode: 'cover', 
  marginTop: 8,
},
  infoContainer: {
    backgroundColor: '#314C1C',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#ddffdb',
  },
  infoText: {
    marginBottom: 8,
    fontSize: 15,
    color: "#ddffdb"
  },
  mapaButton: {
    padding: 12,
    backgroundColor: '#314C1C',
    borderWidth: 1,
    borderColor: '#ddffdb',
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 12,
  },
  mapaButtonText: {
    color: '#ddffdb',
    fontWeight: 'bold',
  },
  fiscalizacaoContainer: {
    backgroundColor: '#314C1C',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  fiscalizacaoData: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#51FF00',
  },
  fiscalizacaoText: {
    fontSize: 15,
    marginBottom: 8,
    color: "#ddffdb"
  },
  fotosTitle: {
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    color: "#51FF00"
  },
  fotoLink: {
    color: '#8DAB76',
    marginBottom: 4,
    textDecorationLine: 'underline',
  },
  novaFiscalizacaoButton: {
    padding: 16,
    backgroundColor: '#314C1C',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 24,
  },
  novaFiscalizacaoButtonText: {
    color: '#ddffdb',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});

export default styles;