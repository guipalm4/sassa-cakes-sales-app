import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';

import {Container, ButtonText} from './styles';

export interface ButtonProps extends RectButtonProperties {
  children: string;
  color: string;
  textColor: string;
}

const Button: React.FC<ButtonProps> = ({
  color,
  textColor,
  children,
  ...rest
}) => (
  <Container color={color} {...rest}>
    <ButtonText textColor={textColor}>{children}</ButtonText>
  </Container>
);

export default Button;
