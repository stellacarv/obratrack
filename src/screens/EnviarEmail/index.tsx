import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const EnviarEmail = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');

  const handleEnviar = () => {
    if (!email) {
      Alert.alert('Campo obrigatório', 'Por favor, digite um e-mail válido');
      return;
    }

    // Aqui você pode adicionar a lógica para enviar o e-mail
    Alert.alert('Sucesso', `Detalhes da obra enviados para ${email}`);
    navigation.goBack();
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