import React, {useEffect, useState} from 'react';
import Text from 'react-native';
import {
  Container,
  ProductList,
  ProductListTitle,
  ProductContainer,
  RemoveItemContainer,
  AddItemContainer,
  ProductName,
  ProductPrice,
  SellButton,
  SellButtonText,
  ProductImage,
  ProductInfo,
  SaleInfo,
  SaleQuantity,
  SubTotal,
} from './styles';
import api from '../../services/api';

import Mock from '../../mocks/products.json';

import HeaderApp from '../../components/HeaderApp';
import LogoImg from '../../assets/logo.png';
import ImgExemplo from '../../assets/exemplo.jpg';
export interface Product {
  id: Number;
  description: String;
  price: Number;
}

const Sale: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('/product/').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <Container>
        <HeaderApp
          title="Sassa Cakes"
          module="Vendas"
          logo={LogoImg}></HeaderApp>

        <ProductList
          data={products}
          keyExtractor={(product) => product.id.toString()}
          ListHeaderComponent={
            <ProductListTitle>Cardápio do dia</ProductListTitle>
          }
          renderItem={({item: product}) => (
            <ProductContainer>
              <ProductImage source={ImgExemplo}></ProductImage>
              <RemoveItemContainer onPress={() => {}}>
                <ProductInfo>
                  <ProductName>{product.description}</ProductName>
                  <ProductPrice>R$ {product.price}</ProductPrice>
                </ProductInfo>
              </RemoveItemContainer>
              <AddItemContainer onPress={() => {}}>
                <SaleInfo>
                  <SaleQuantity>Qtd: 5</SaleQuantity>
                  <SubTotal>R$5,00</SubTotal>
                </SaleInfo>
              </AddItemContainer>
            </ProductContainer>
          )}
        />
      </Container>
      <SellButton onPress={() => {}}>
        <SellButtonText>Finalizar Venda</SellButtonText>
      </SellButton>
    </>
  );
};

export default Sale;
