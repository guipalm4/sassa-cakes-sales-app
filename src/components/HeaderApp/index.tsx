import React, {useCallback} from 'react';

import {Header, HeaderTitle, ModuleName, HomeButton, LogoImage} from './styles';

import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title: string;
  module: string;
  logo: object;
}

const HeaderApp: React.FC<HeaderProps> = ({title, module, logo, ...rest}) => {
  const {navigate} = useNavigation();

  const navigateToMenu = useCallback(() => {
    navigate('Menu');
  }, [navigate]);

  return (
    <Header>
      <HeaderTitle>
        {title + '\n'}
        <ModuleName>{module}</ModuleName>
      </HeaderTitle>
      <HomeButton onPress={navigateToMenu}>
        <LogoImage source={logo} />
      </HomeButton>
    </Header>
  );
};

export default HeaderApp;
