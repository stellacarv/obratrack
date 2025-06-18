import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import styles from './style';

const NewObra = () => {
  const navigation = useNavigation();
  const [obra, setObra] = useState({
    nome: '',
    responsavel: '',
    dataInicio: '',
    previsaoTermino: '',
    foto: null as string | null,
    localizacao: null as Location.LocationObject | null,
    descricao: '',
  });
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>('');

  // Solicitar permissões ao carregar a tela
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      if (locationStatus !== 'granted') {
        setLocationStatus('Permissão de localização negada');
      }
    })();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setObra({ ...obra, [field]: value });
  };

  const takePhoto = async () => {
    if (hasCameraPermission === false) {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setObra({ ...obra, foto: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Erro ao abrir a câmera:', error);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setObra({ ...obra, foto: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Erro ao abrir a galeria:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setObra({ ...obra, localizacao: location });
      setLocationStatus('Localização obtida com sucesso');
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setLocationStatus('Erro ao obter localização');
    }
  };

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar a obra
    Alert.alert('Sucesso', 'Obra cadastrada com sucesso!');
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>CADASTRAR OBRA</Text>
      </View>

      <Text style={styles.subtitle}>Cadastre uma nova obra nos campos abaixo</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome da Obra:</Text>
        <TextInput
          style={styles.input}
          value={obra.nome}
          onChangeText={(text) => handleInputChange('nome', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Responsavel:</Text>
        <TextInput
          style={styles.input}
          value={obra.responsavel}
          onChangeText={(text) => handleInputChange('responsavel', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data de Inicio:</Text>
        <TextInput
          style={styles.input}
          value={obra.dataInicio}
          onChangeText={(text) => handleInputChange('dataInicio', text)}
          placeholder="DD/MM/AAAA"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Previsao de termino:</Text>
        <TextInput
          style={styles.input}
          value={obra.previsaoTermino}
          onChangeText={(text) => handleInputChange('previsaoTermino', text)}
          placeholder="DD/MM/AAAA"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Foto da obra:</Text>
        <View style={styles.photoButtons}>
          <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <Text style={styles.photoButtonText}>TIRAR FOTO</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Text style={styles.photoButtonText}>FOTOTECA</Text>
          </TouchableOpacity>
        </View>
        {obra.foto && <Text style={styles.photoInfo}>Foto selecionada</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Localizacao:</Text>
        <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
          <Text style={styles.locationButtonText}>OBTER LOCALIZACAO</Text>
        </TouchableOpacity>
        {obra.localizacao && (
          <Text style={styles.locationInfo}>
            Lat: {obra.localizacao.coords.latitude.toFixed(4)}, Long: {obra.localizacao.coords.longitude.toFixed(4)}
          </Text>
        )}
        <Text style={styles.locationStatus}>{locationStatus}</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descriqao:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={obra.descricao}
          onChangeText={(text) => handleInputChange('descricao', text)}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>CANCELAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SALVAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewObra;