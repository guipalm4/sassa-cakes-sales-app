import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import ButtonProps from './index';

interface ButtonProps {
  color: string;
}

interface TextProps {
  textColor: string;
}
//#ffbf00 button
//#312e38 text
export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  height: 60px;
  background: ${props => props.color};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text<TextProps>`
  font-family: 'Poppins-Medium';
  color: ${props => props.textColor};;
  font-size: 18px;
`;
