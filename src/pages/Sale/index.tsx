import React, {useCallback, useEffect, useState} from 'react';
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
  name: String;
  price: Number;
  qtd: number;
}

const Sale: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = useCallback(
    async (id) => {
      const productsUpdated = products.map((product) =>
        product.id === id ? {...product, qtd: product.qtd + 1} : product,
      );
      setProducts(productsUpdated);
    },
    [products],
  );

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
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.price}</ProductPrice>
                </ProductInfo>
              </RemoveItemContainer>
              <AddItemContainer
                onPress={() => {
                  handleAddProduct(product.id);
                }}>
                <SaleInfo>
                  <SaleQuantity>
                    Qtd: {product.qtd ? product.qtd : 0}
                  </SaleQuantity>
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
