import styled from 'styled-components/native';
import {Product} from './index';
import {FlatList} from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const ProductList = styled(FlatList as new () => FlatList<Product>)``;
