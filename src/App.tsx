import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import {View, StatusBar} from 'react-native';
import AppProvider from './hooks'


import Routes from './routes';

// import { Container } from './styles';

const App: React.FC = () => ( 

    <View style={{flex: 1, backgroundColor: '#f4ede8'}}>  
    <AppProvider>
     <StatusBar barStyle="default" />
     <Routes /> 
   </AppProvider>       
  </View>

  
);

export default App;
