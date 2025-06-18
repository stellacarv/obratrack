import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const ObraDetails = () => {
  const navigation = useNavigation();

  // Dados mockados (serão substituídos pela integração com backend)
  const obra = {
    nome: 'Edifício Alpha',
    responsavel: 'Arq. Aline Silva',
    dataInicio: '20/05/2025',
    previsaoTermino: '20/01/2026',
    status: 'Atrasada (dit.fiscalização: 01/06/2025)',
    endereco: 'Rua Antônio Falcão, 700, Boa Viagem',
    fotoUrl: null, // Será preenchido pela integração
  };

  const fiscalizacoes = [
    {
      data: '01/05/2025',
      status: '1m',
      descricao: 'Equipamento parado, dificultando o andamento da obra',
      fotos: ['https://www.fiscali.org'],
    },
    {
      data: '31/05/2025',
      status: '1m',
      descricao: 'Cima em andamento, regular',
      fotos: ['https://www.fiscali.org'],
    },
  ];

  const handleEnviarEmail = () => {
    navigation.navigate('EnviarEmail' as never);
  };

  const handleRegistrarFiscalizacao = () => {
    navigation.navigate('FiscaObra' as never);
  };

  const handleVerMapa = () => {
    // Abre o endereço no mapa (Google Maps)
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(obra.endereco)}`;
    Linking.openURL(url).catch(err => console.error("Erro ao abrir mapa: ", err));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho com botões de ação */}
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>EDITAR OBRA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>EXCLUIR OBRA</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleEnviarEmail}
        >
          <Text style={styles.headerButtonText}>ENVIAR POR EMAIL</Text>
        </TouchableOpacity>
      </View>

      {/* Título */}
      <Text style={styles.sectionTitle}>DETALHES DA OBRA</Text>
      <Text style={styles.sectionSubtitle}>Visualize os detalhes dessa obra</Text>

      {/* Nome da obra */}
      <Text style={styles.obraName}>{obra.nome}</Text>

      {/* Espaço para foto */}
      <View style={styles.fotoContainer}>
        {obra.fotoUrl ? (
          <Image source={{ uri: obra.fotoUrl }} style={styles.foto} />
        ) : (
          <Text style={styles.fotoPlaceholder}>Espaço para foto</Text>
        )}
      </View>

      {/* Informações Gerais */}
      <Text style={styles.sectionTitle}>Informações Gerais</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Nome da Obra:</Text> {obra.nome}</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Responsável:</Text> {obra.responsavel}</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Data de Início:</Text> {obra.dataInicio}</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Previsão de Término:</Text> {obra.previsaoTermino}</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Status:</Text> {obra.status}</Text>
      </View>

      {/* Localização */}
      <Text style={styles.sectionTitle}>Localização</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Endereço:</Text> {obra.endereco}</Text>
        <TouchableOpacity style={styles.mapaButton} onPress={handleVerMapa}>
          <Text style={styles.mapaButtonText}>VER MAPA</Text>
        </TouchableOpacity>
      </View>

      {/* Fiscalizações */}
      <Text style={styles.sectionTitle}>FISCALIZAÇÕES</Text>
      <Text style={styles.sectionSubtitle}>Visualize os últimos fiscalizações realizadas</Text>

      {fiscalizacoes.map((fiscalizacao, index) => (
        <View key={index} style={styles.fiscalizacaoContainer}>
          <Text style={styles.fiscalizacaoData}><Text style={styles.infoLabel}>Data:</Text> {fiscalizacao.data}</Text>
          <Text style={styles.fiscalizacaoText}><Text style={styles.infoLabel}>Status:</Text> {fiscalizacao.status}</Text>
          <Text style={styles.fiscalizacaoText}><Text style={styles.infoLabel}>Descrição:</Text> {fiscalizacao.descricao}</Text>
          
          <Text style={styles.fotosTitle}>Fotografias registradas:</Text>
          {fiscalizacao.fotos.map((foto, fotoIndex) => (
            <TouchableOpacity key={fotoIndex} onPress={() => Linking.openURL(foto)}>
              <Text style={styles.fotoLink}>{foto}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Botão para nova fiscalização */}
      <TouchableOpacity 
        style={styles.novaFiscalizacaoButton}
        onPress={handleRegistrarFiscalizacao}
      >
        <Text style={styles.novaFiscalizacaoButtonText}>REGISTRAR NOVA FISCALIZAÇÃO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ObraDetails;