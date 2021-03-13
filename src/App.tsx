import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {View, StatusBar} from 'react-native';
import HeaderApp from './components/HeaderApp';

import Routes from './routes';

// import { Container } from './styles';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="default" />
    <View style={{flex: 1, backgroundColor: '#f4ede8'}}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
