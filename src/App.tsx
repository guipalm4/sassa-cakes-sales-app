import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, StatusBar} from 'react-native';

import Routes from './routes';

// import { Container } from './styles';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="default" backgroundColor="#d1abbe" />
    <View style={{flex: 1, backgroundColor: '#ceacbd'}}>
      <Routes />
    </View>
  </NavigationContainer>
);

export default App;
