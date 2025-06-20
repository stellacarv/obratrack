import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Linking, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './style';

type Obra = {
  _id: string;
  nome: string;
  responsavel: string;
  data_inicio: string;
  data_fim: string;
  descricao: string;
  localizacao: { latitude: number; longitude: number };
  foto: string;
};

type Fiscalizacao = {
  _id: string;
  data: string;
  status: string;
  observacoes: string;
  foto: string;
};

const ObraDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { obraId } = route.params as { obraId: string };

  const [obra, setObra] = useState<Obra | null>(null);
  const [fiscalizacoes, setFiscalizacoes] = useState<Fiscalizacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObraAndFiscalizacoes = async () => {
      try {
        const resObra = await fetch(`http://192.168.1.103:3000/api/obras/${obraId}`);
        const resFisc = await fetch(`http://192.168.1.103:3000/api/fiscalizacoes/obra/${obraId}`);
        const obraData = await resObra.json();
        const fiscData = await resFisc.json();

        setObra(obraData);
        setFiscalizacoes(fiscData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObraAndFiscalizacoes();
  }, [obraId]);

  const handleEnviarEmail = () => {
    navigation.navigate('EnviarEmail' as never);
  };

  const handleRegistrarFiscalizacao = () => {
    navigation.navigate('FiscaObra' as never);
  };

  const handleVerMapa = () => {
    if (!obra) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${obra.localizacao.latitude},${obra.localizacao.longitude}`;
    Linking.openURL(url).catch(err => console.error("Erro ao abrir mapa: ", err));
  };

  if (loading || !obra) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando detalhes da obra...</Text>
      </View>
    );
  }

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
        {obra.foto ? (
          <Image source={{ uri: obra.foto }} style={styles.foto} />
        ) : (
          <Text style={styles.fotoPlaceholder}>Espaço para foto</Text>
        )}
      </View>

      {/* Informações Gerais */}
      <Text style={styles.sectionTitle}>Informações Gerais</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Nome da Obra:</Text> {obra.nome}</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Responsável:</Text> {obra.responsavel}</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Data de Início:</Text> {new Date(obra.data_inicio).toLocaleDateString()}</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Previsão de Término:</Text> {new Date(obra.data_fim).toLocaleDateString()}</Text>
        <Text style={styles.infoText}><Text style={styles.infoLabel}>Descrição:</Text> {obra.descricao}</Text>
      </View>

      {/* Localização */}
      <Text style={styles.sectionTitle}>Localização</Text>
     <View style={styles.infoContainer}>
  <Text style={styles.infoText}>
    <Text style={styles.infoLabel}>Latitude:</Text> {obra.localizacao.latitude}
  </Text>
  <Text style={styles.infoText}>
    <Text style={styles.infoLabel}>Longitude:</Text> {obra.localizacao.longitude}
  </Text>
  <TouchableOpacity style={styles.mapaButton} onPress={handleVerMapa}>
    <Text style={styles.mapaButtonText}>VER MAPA</Text>
  </TouchableOpacity>
</View>


      {/* Fiscalizações */}
      <Text style={styles.sectionTitle}>FISCALIZAÇÕES</Text>
      <Text style={styles.sectionSubtitle}>Visualize as últimas fiscalizações realizadas</Text>

      {fiscalizacoes.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Nenhuma fiscalização registrada.</Text>
      ) : (
        fiscalizacoes.map((fiscalizacao) => (
          <View key={fiscalizacao._id} style={styles.fiscalizacaoContainer}>
            <Text style={styles.fiscalizacaoData}><Text style={styles.infoLabel}>Data:</Text> {new Date(fiscalizacao.data).toLocaleDateString()}</Text>
            <Text style={styles.fiscalizacaoText}><Text style={styles.infoLabel}>Status:</Text> {fiscalizacao.status}</Text>
            <Text style={styles.fiscalizacaoText}><Text style={styles.infoLabel}>Observações:</Text> {fiscalizacao.observacoes}</Text>
            <Text style={styles.fotosTitle}>Fotografia registrada:</Text>
            <TouchableOpacity onPress={() => Linking.openURL(fiscalizacao.foto)}>
              <Text style={styles.fotoLink}>{fiscalizacao.foto}</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

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
