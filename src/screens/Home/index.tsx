import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute, RouteProp, useIsFocused } from '@react-navigation/native';
import styles from './style';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../@types/navigation';

type NavigationProps = StackNavigationProp<RootStackParamList, 'Home'>;
type RouteProps = RouteProp<RootStackParamList, 'Home'>;

interface Obra {
  _id: string;
  nome: string;
  responsavel: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
}

const Home = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RouteProps>();
  const isFocused = useIsFocused(); // Para recarregar ao voltar
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
      console.error('Erro ao buscar obras:', error);
      Alert.alert('Erro', 'Não foi possível carregar as obras');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (route.params?.atualizar || isFocused) {
      carregarObras();
    }
  }, [route.params?.atualizar, isFocused]);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={{ textAlign: 'center', marginTop: 10 }}>Carregando obras...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>OBRAS CADASTRADAS</Text>
      <Text style={styles.subheader}>Visualize as obras cadastradas recentemente</Text>
      <View style={styles.divider} />

      {obras.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhuma obra cadastrada ainda.</Text>
      ) : (
        obras.map((obra, index) => (
          <View key={obra._id} style={styles.card}>
            <Text style={styles.cardTitle}>Nome da Obra: {obra.nome}</Text>
            <Text>Responsável: {obra.responsavel}</Text>
            <Text>Descrição: {obra.descricao}</Text>
            <Text>
              Início: {new Date(obra.data_inicio).toLocaleDateString()} | Fim: {new Date(obra.data_fim).toLocaleDateString()}
            </Text>
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => navigation.navigate('ObraDetails', { obraId: obra._id })}
            >
              <Text style={styles.detailsButtonText}>DETALHES</Text>
            </TouchableOpacity>

            {index < obras.length - 1 && <View style={styles.cardDivider} />}
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
          <Text style={[styles.footerButtonText, styles.primaryButtonText]}>NOVA OBRA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;
