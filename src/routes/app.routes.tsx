import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Menu from '../pages/Menu';
import Sale from '../pages/Sale';



const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#ece7e7'},
    }}
    initialRouteName="Menu"
  >
    <App.Screen
      options={{
        headerTransparent: true,        
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
      name="Menu"
      component={Menu}
    />
    <App.Screen
      options={{
        headerTransparent: true,        
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },      
      }}
      name="Sale"
      component={Sale}
    />
  </App.Navigator>
);

export default AppRoutes;
