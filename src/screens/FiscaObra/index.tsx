import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
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

  const listaObras = [
    { label: 'Construção Escola Jardim', value: '685359d05a5553bd373e3256' },
    { label: 'Edifício Aurora', value: '685468159c13f5b0f6871728' },
    { label: 'Edifício Alpha', value: '685486579c13f5b0f687172d' },
    { label: 'Reforma no restaurante Coco Bambu', value: '68548b4c9c13f5b0f6871732' },
  ];

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

  const formatarData = (dataStr: string): string => {
    const [dia, mes, ano] = dataStr.split('/');
    return `${ano}-${mes}-${dia}T00:00:00.000Z`;
  };

  const handleSave = async () => {
    if (
      !fiscalizacao.obraRelacionada ||
      fiscalizacao.dataFiscalizacao.trim() === '' ||
      fiscalizacao.statusObra.trim() === '' ||
      !fiscalizacao.localizacao ||
      !fiscalizacao.foto ||
      fiscalizacao.descricao.trim() === ''
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.100:3000/api/fiscalizacoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          obra: fiscalizacao.obraRelacionada,
          data: formatarData(fiscalizacao.dataFiscalizacao),
          status: fiscalizacao.statusObra,
          observacoes: fiscalizacao.descricao,
          foto: fiscalizacao.foto,
          localizacao: {
            latitude: fiscalizacao.localizacao.coords.latitude,
            longitude: fiscalizacao.localizacao.coords.longitude,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Fiscalização cadastrada com sucesso!');
        navigation.goBack();
      } else {
        const erro = data?.errors?.[0]?.msg || data.message || 'Erro ao criar fiscalização';
        Alert.alert('Erro', erro);
      }
    } catch (error) {
      console.error('Erro ao salvar fiscalização:', error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">

       <View style={styles.header}>
  <TouchableOpacity onPress={handleCancel}>
    <Text style={styles.backButton}>{'<'}</Text>
  </TouchableOpacity>
  <Text style={styles.title}>CADASTRAR FISCALIZAÇÃO</Text>
</View>

        <Text style={styles.subtitle}>Cadastre uma nova fiscalização nos campos abaixo</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Obra relacionada:</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) =>
                setFiscalizacao({ ...fiscalizacao, obraRelacionada: value })
              }
              items={listaObras}
              placeholder={{ label: 'Selecione uma obra...', value: null }}
              value={fiscalizacao.obraRelacionada}
              style={pickerSelectStyles}
              useNativeAndroidPickerStyle={false}
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
    </TouchableWithoutFeedback>
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
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: 'black',
    backgroundColor: '#fff',
  },
  placeholder: {
    color: '#888',
  },
};

export default FiscaObra;
