import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Sale from '../pages/Sale';

// import { Container } from './styles';

const Sales = createStackNavigator();

const SaleRoutes: React.FC = () => (
  <Sales.Navigator
    screenOptions={{
      headerShown: false, //retira header do app
      cardStyle: {backgroundColor: '#ceacbd'},
    }}>
    <Sales.Screen name="Sale" component={Sale} />
  </Sales.Navigator>
);

export default SaleRoutes;
