import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { CustomerProvider } from './customer';

const AppProvider: React.FC = ({ children }) => {
  return (
    <CustomerProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </CustomerProvider>
  );
};

export default AppProvider;
