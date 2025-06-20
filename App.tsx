import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper'; // ✅ Importação adicionada

import Home from './src/screens/Home';
import NewObra from './src/screens/NewObra';
import ObraDetails from './src/screens/ObraDetails';
import FiscaObra from './src/screens/FiscaObra';
import EnviarEmail from './src/screens/EnviarEmail';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <PaperProvider> {/* ✅ Envolve o app com o Provider */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="NewObra" component={NewObra} />
          <Stack.Screen name="ObraDetails" component={ObraDetails} />
          <Stack.Screen name="FiscaObra" component={FiscaObra} />
          <Stack.Screen name="EnviarEmail" component={EnviarEmail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
