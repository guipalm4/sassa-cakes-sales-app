import styled from 'styled-components/native';

export const Header = styled.View`
  padding: 10px;
  background: #e7e3e6;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #28262e;
  font-size: 20px;
  font-family: 'Poppins-Medium';
  line-height: 28px;
`;

export const ModuleName = styled.Text`
  color: #ffbf00;
  font-family: 'Poppins-Medium';
`;

export const HomeButton = styled.TouchableOpacity``;

export const LogoImage = styled.Image`
  width: 68px;
  height: 68px;
  border-radius: 34px;
`;
