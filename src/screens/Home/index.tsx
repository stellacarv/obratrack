import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const Home = () => {
  const navigation = useNavigation();

  const obras = [
    {
      nome: 'Edifício Alpha',
      respectador: 'Arq. Aline Silva',
      status: 'Atrasada',
      facadizacao: 'últ. fiscalização: 01/06',
      data: ''
    },
    {
      nome: ' Edifício Souza Alencar',
      respectador: 'Arq. Pedro Campos',
      status: 'Em dia',
      facadizacao: 'últ. fiscalização: 03/06',
      data: ''
    },
    {
      nome: 'Edifício Bossa Nova',
      respectador: 'Arq. Laís Lima',
      status: 'Em dia',
      facadizacao: 'últ. fiscalização: 29/05',
      data: ''
    },
    {
      nome: 'Edifício Jaqueira',
      respectador: 'Arq. Matheus Buarque',
      status: 'Em dia',
      facadizacao: 'últ. fiscalização: 11/06',
      data: ''
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>OBRAS CADASTRADAS</Text>
      <Text style={styles.subheader}>Visualize as obras cadastradas recentemente</Text>
      
      <View style={styles.divider} />

      {obras.map((obra, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>Nome do Obra: {obra.nome}</Text>
          <Text>Respectador: {obra.respectador}</Text>
          <Text>Status: {obra.status} (dir. Facadização: {obra.facadizacao}) ({obra.data})</Text>
          
          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigation.navigate('ObraDetails' as never)}
          >
            <Text style={styles.detailsButtonText}>DETALHES</Text>
          </TouchableOpacity>
          
          {index < obras.length - 1 && <View style={styles.cardDivider} />}
        </View>
      ))}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>VER TUDO</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.footerButton, styles.primaryButton]}
          onPress={() => navigation.navigate('NewObra' as never)}
        >
          <Text style={[styles.footerButtonText, styles.primaryButtonText]}>NOVA OBRA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Home;