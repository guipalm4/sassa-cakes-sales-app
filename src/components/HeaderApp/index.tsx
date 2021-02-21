import React, {useCallback} from 'react';

import {Header, HeaderTitle, ModuleName, HomeButton, LogoImage} from './styles';

import {useNavigation} from '@react-navigation/native';

import LogoImg from '../../assets/logo.png';
const HeaderApp: React.FC = () => {
  const {navigate} = useNavigation();

  const navigateToMenu = useCallback(() => {
    navigate('Menu');
  }, [navigate]);

  return (
    <Header>
      <HeaderTitle>
        Sassa Cakes {'\n'}
        <ModuleName>Vendas</ModuleName>
      </HeaderTitle>
      <HomeButton onPress={navigateToMenu}>
        <LogoImage source={LogoImg} />
      </HomeButton>
    </Header>
  );
};

export default HeaderApp;
