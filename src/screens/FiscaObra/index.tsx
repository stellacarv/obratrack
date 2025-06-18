import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import RNPickerSelect from 'react-native-picker-select';
import styles from './style';

const FiscaObra = () => {
  const navigation = useNavigation();
  const [fiscalizacao, setFiscalizacao] = useState({
    obraRelacionada: null as string | null,
    dataFiscalizacao: '',
    statusObra: '',
    localizacao: null as Location.LocationObject | null,
    foto: null as string | null,
    descricao: '',
  });
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [locationStatus, setLocationStatus] = useState<string>('');

  // Lista de obras para o dropdown (pode ser substituída por dados da API)
  const obras = [
    { label: 'Obra 1', value: 'obra1' },
    { label: 'Obra 2', value: 'obra2' },
    { label: 'Obra 3', value: 'obra3' },
  ];

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
    setFiscalizacao({ ...fiscalizacao, [field]: value });
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
        setFiscalizacao({ ...fiscalizacao, foto: result.assets[0].uri });
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
        setFiscalizacao({ ...fiscalizacao, foto: result.assets[0].uri });
      }
    } catch (error) {
      console.error('Erro ao abrir a galeria:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setFiscalizacao({ ...fiscalizacao, localizacao: location });
      setLocationStatus('Localização obtida com sucesso');
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setLocationStatus('Erro ao obter localização');
    }
  };

  const handleSave = () => {
    // Lógica para salvar a fiscalização
    Alert.alert('Sucesso', 'Fiscalização cadastrada com sucesso!');
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
        <Text style={styles.title}>CADASTRAR FISCALIZAÇÃO</Text>
      </View>

      <Text style={styles.subtitle}>Cadastre uma nova fiscalização nos campos abaixo</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Obra relacionada:</Text>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={(value) => setFiscalizacao({ ...fiscalizacao, obraRelacionada: value })}
            items={obras}
            placeholder={{ label: 'Selecione uma obra...', value: null }}
            style={pickerSelectStyles}
            value={fiscalizacao.obraRelacionada}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data da fiscalização:</Text>
        <TextInput
          style={styles.input}
          value={fiscalizacao.dataFiscalizacao}
          onChangeText={(text) => handleInputChange('dataFiscalizacao', text)}
          placeholder="DD/MM/AAAA"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Status da obra:</Text>
        <TextInput
          style={styles.input}
          value={fiscalizacao.statusObra}
          onChangeText={(text) => handleInputChange('statusObra', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Localização:</Text>
        <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
          <Text style={styles.locationButtonText}>OBTER LOCALIZAÇÃO ATUAL</Text>
        </TouchableOpacity>
        {fiscalizacao.localizacao && (
          <Text style={styles.locationInfo}>
            Lat: {fiscalizacao.localizacao.coords.latitude.toFixed(4)}, Long: {fiscalizacao.localizacao.coords.longitude.toFixed(4)}
          </Text>
        )}
        <Text style={styles.locationStatus}>{locationStatus}</Text>
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
        {fiscalizacao.foto && <Text style={styles.photoInfo}>Foto selecionada</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          value={fiscalizacao.descricao}
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

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
};

export default FiscaObra;