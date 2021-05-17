import styled, { css } from 'styled-components/native';
import {Product} from './index';
import {FlatList, View, TouchableOpacity} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';


interface PaymentMethodItemProps {
  isSelected?: boolean;
}

interface ContainerDataFilterProps {
  showFilter: boolean;
}

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

export const TotalProductsContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 0px;

  flex-direction: row;
  background: #ffbf00;

  padding: 20px 40px;
  justify-content: space-between;
  align-items: center;
`;

export const TotalProductsText = styled.Text`
  font-size: 16px;
  color: #312e38;
  margin-left: 15px;

  flex: 1;
  font-weight: bold;
  font-family: 'Poppins-Medium';
`;

export const SubtotalValue = styled.Text`
  font-size: 16px;
  color: #312e38;
  font-weight: bold;
  font-family: 'Poppins-Medium';
`;

export const PaymentMethodContainer = styled.View`
  margin-top: 40px;
  margin-bottom:80px;
  
  
`;

export const PaymentMethodSlider = styled.ScrollView`
  margin-top: 16px;
`;

export const PaymentMethodItem = styled.TouchableOpacity<PaymentMethodItemProps>`
  background-color: #f0f0f5;
  border: 2px;
  border-color: #f0f0f5;
  height: 120px;
  width: 120px;
  border-radius: 8px;
  padding-top: 20px;
  padding-bottom: 16px;
  margin-right: 8px;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  ${props =>
    props.isSelected &&
    css`
      border-color: #ffbf00;
      background-color: #fef7be;
    `}
`;

export const Title = styled.Text`
  font-family: 'Poppins-Regular';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #3d3d4d;
  padding: 0 20px;
`;
export const PaymentMethodItemTitle = styled.Text`
  font-style: normal;
  font-family: 'Poppins-Regular';
  font-weight: bold;
  font-size: 15px;
  line-height: 15px;
  text-align: center;
  color: #3d3d4d;
`;

export const AutoCompleteList = styled.Text`
  padding-left:15;
  margin-top:15;
  padding-bottom:15;
  font-size:15;
  font-family: 'Poppins-Regular';  
`

export const FilterContainer = styled.View`
  padding: 0 24px;
  margin-top: 10px;
  flex:1;  
`;

export const FormData = styled.View`
  padding: 24px 24px;
  margin-top: 40px;  
  flex:1;   
  flex-direction:column;
  align-items:center;
  align-content:center; 
  height: 100%;  
`
export const InputContainer = styled.View`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  margin-bottom:10px;  
  background: #f0f0f5;
  border-radius: 10px;
  border-width: 2px;
  border-color: #f0f0f5;
  flex-direction: row;
  align-items: center;
 
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #6c6c80;   
  font-size: 14px;
  font-family: 'Poppins-Regular';   
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 14px;
`;

export const FilterDataContainer = styled.View<ContainerDataFilterProps> `
  background-Color: #ffffff;
  border-width: 2px;
  border-radius:8px;
  border-color:#fff
  ${props =>
    props.showFilter &&
    css`
      border-color:#e7e3e6;
    `}
    
  `;

export const FilterDataItem = styled.Text`
  font-size: 14px;
  font-family: 'Poppins-Regular';   
  color: #6c6c80;  
`
export const Separator = styled.View`
  width: 80%;
  height: 1px;
  background-color: #ccc;  
  align-self: flex-start;
  margin-top: 4px;
`;


