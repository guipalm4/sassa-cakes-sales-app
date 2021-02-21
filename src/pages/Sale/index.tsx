import React from 'react';
import {Container} from './styles';
import HeaderApp from '../../components/HeaderApp';

export interface Product {
  id: number;
  name: string;
  price: number;
  formatedPrice: string;
}

const Sale: React.FC = () => {
  return (
    <Container>
      <HeaderApp></HeaderApp>
    </Container>
  );
};

export default Sale;
