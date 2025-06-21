import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import { RootStackParamList } from '../../@types/navigation';
import styles from './style';

type NavigationProps = StackNavigationProp<RootStackParamList, 'NewObra'>;

const formatarData = (dataStr: string): string => {
  const [dia, mes, ano] = dataStr.split('/');
  return `${ano}-${mes}-${dia}T00:00:00.000Z`;
};

const NewObra = () => {
  const navigation = useNavigation<NavigationProps>();

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
    if (!hasCameraPermission) {
      Alert.alert('Permissão negada', 'Você precisa permitir o acesso à câmera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setObra({ ...obra, foto: result.assets[0].uri });
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setObra({ ...obra, foto: result.assets[0].uri });
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

  const handleSave = async () => {
    if (
      obra.nome.trim() === '' ||
      obra.responsavel.trim() === '' ||
      obra.dataInicio.trim() === '' ||
      obra.previsaoTermino.trim() === '' ||
      obra.descricao.trim() === '' ||
      !obra.foto ||
      !obra.localizacao
    ) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.103:3000/api/obras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: obra.nome,
          responsavel: obra.responsavel,
          data_inicio: formatarData(obra.dataInicio),
          data_fim: formatarData(obra.previsaoTermino),
          descricao: obra.descricao,
          foto: obra.foto,
          localizacao: {
            latitude: obra.localizacao.coords.latitude,
            longitude: obra.localizacao.coords.longitude,
          },
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Obra cadastrada com sucesso!');
        navigation.navigate('Home', { atualizar: true });
      } else {
        const data = await response.json();
        const erro = data?.errors?.[0]?.msg || data.message || 'Erro ao cadastrar obra';
        Alert.alert('Erro', erro);
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* ... sua UI continua igual aqui ... */}
      {/* Botões no final */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
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
