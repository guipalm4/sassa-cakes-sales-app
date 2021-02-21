import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Sale from '../pages/Sale';
import Menu from '../pages/Menu';

// import { Container } from './styles';

const MainMenu = createStackNavigator();

const SaleRoutes: React.FC = () => (
  <MainMenu.Navigator
    screenOptions={{
      headerShown: false, //retira header do app
      cardStyle: {backgroundColor: '#ece7e7'},
    }}>
    <MainMenu.Screen name="Menu" component={Menu} />
    <MainMenu.Screen name="Sale" component={Sale} />
  </MainMenu.Navigator>
);

export default SaleRoutes;
