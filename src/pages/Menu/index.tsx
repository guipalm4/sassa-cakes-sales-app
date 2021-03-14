import React, {useCallback} from 'react';
import {Image} from 'react-native';

import {Text} from 'react-native';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {useNavigation} from '@react-navigation/native';

import HeaderApp from '../../components/HeaderApp';

import {Container, Title, Logo} from './styles';

const Menu: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Logo source={logoImg} />
      <Title>O que você deseja fazer? </Title>
      <Button color="#ffbf00" textColor="#312e38" onPress={() => navigation.navigate('Sale')}>
        Vender
      </Button>
      <Button color="#ffbf00" textColor="#312e38" onPress={() => {}}>
        Cadastrar Produtos
      </Button>
      <Button color="#ffbf00" textColor="#312e38" onPress={() => {}}>
        Montar Cardápio do dia
      </Button>
    </Container>
  );
};

export default Menu;
