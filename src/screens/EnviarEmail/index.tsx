import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../@types/navigation';
import styles from './style';


type EnviarEmailRouteProp = RouteProp<RootStackParamList, 'EnviarEmail'>;

  const EnviarEmail = () => {
  const navigation = useNavigation();
  const route = useRoute<EnviarEmailRouteProp>();
  const { obraId } = route.params as { obraId: string }; 
  const [email, setEmail] = useState('');

  const handleEnviar = async () => {
    if (!email) {
      Alert.alert('Campo obrigatório', 'Por favor, digite um e-mail válido');
      return;
    }

    try {
      const response = await fetch(`http://192.168.1.103:3000/api/obras/${obraId}/enviar-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', data.message || `Detalhes da obra enviados para ${email}`);
        navigation.goBack();
      } else {
        Alert.alert('Erro', data.message || 'Erro ao enviar e-mail');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      Alert.alert('Erro', 'Não foi possível enviar o e-mail. Verifique a conexão.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ENVIAR POR EMAIL</Text>
      <Text style={styles.subtitle}>Envie os detalhes dessa obra por email</Text>

      <Text style={styles.instruction}>Preencha o campo abaixo</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Digite seu email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="exemplo@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>ENVIAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EnviarEmail;
