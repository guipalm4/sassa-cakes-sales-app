import styled from 'styled-components/native';
import {Product} from './index';
import {FlatList} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const ProductList = styled(FlatList as new () => FlatList<Product>)`
  padding: 10px 10px 10px;
`;

export const ProductListTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
  color: #28262e;
  font-family: 'Poppins-Medium';
`;

export const ProductContainer = styled.View`
  background: #e7e3e6;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const RemoveItemContainer = styled(RectButton)`
  flex: 1;
  background: #e7e3e6;
`;

export const AddItemContainer = styled(RectButton)`
  flex: 1;
  background: #e7e3e6;
`;

export const ProductImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 12px;
`;

export const ProductInfo = styled.View`
  flex: 1;
  align-items: flex-start;
  margin-left: 10px;
`;

export const SaleInfo = styled.View`
  flex-direction: column;
  align-items: flex-end;
  margin-right: 10px;
`;

export const SaleQuantity = styled.Text`
  flex: 1;
  margin-left: 8px;
  color: #28262e;
  font-family: 'Poppins-Regular';
`;

export const SubTotal = styled.Text`
  flex: 1;
  margin-left: 8px;
  color: #28262e;
  font-family: 'Poppins-Medium';
`;

export const ProductName = styled.Text`
  flex: 1;
  color: #28262e;
  font-family: 'Poppins-Medium';
`;

export const ProductPrice = styled.Text`
  flex: 1;
  font-family: 'Poppins-Regular';
  color: #332927;
`;

export const SellButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffbf00;
  border-top-width: 1px;
  border-color: #e7e3e6;
  padding: 14px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const SellButtonText = styled.Text`
  font-family: 'Poppins-Medium';
  color: #312e38;
  font-size: 18px;
`;
