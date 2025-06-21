import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useIsFocused, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../@types/navigation';
import styles from './style';

interface Obra {
  _id: string;
  nome: string;
  responsavel: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
}

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;

  const Home = () => {
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const route = useRoute<HomeRouteProp>();
  const [obras, setObras] = useState<Obra[]>([]);
  const [carregando, setCarregando] = useState(true);
  const API_URL = 'http://192.168.1.103:3000/api/obras';

  const carregarObras = async () => {
    try {
      setCarregando(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      setObras(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as obras');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarObras();
  }, [isFocused, route.params?.atualizar]);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ marginTop: 10 }}>Carregando obras...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>OBRAS CADASTRADAS</Text>
            <Text style={styles.subheader}>Veja a  lista das obras cadastradas</Text>
      {obras.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma obra cadastrada.</Text>
      ) : (
        obras.map((obra) => (
          <View key={obra._id} style={styles.card}>
            <Text style={styles.cardTitle}>Nome: {obra.nome}</Text>
            <Text>Responsável: {obra.responsavel}</Text>
            <Text>Descrição: {obra.descricao}</Text>
            <Text>
              Início: {new Date(obra.data_inicio).toLocaleDateString()} | Fim: {new Date(obra.data_fim).toLocaleDateString()}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ObraDetails', { obraId: obra._id })}>
              <Text style={styles.detailsButtonText}>DETALHES</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>VER TUDO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.footerButton, styles.primaryButton]}
          onPress={() => navigation.navigate('NewObra')}
        >
          <Text style={styles.primaryButtonText}>NOVA OBRA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;
