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
import formatValue from '../../utils/formatValue';
import ImgExemplo from '../../assets/exemplo.jpg';

export interface Product {
  id: number;
  name: string;
  price: number;
  qtd: number;
  imageUrl: string;
  formattedPrice: string;
}

const Sale: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  function handleIncrementProduct(id: number): void {
    setProducts(
      products.map(product =>        
        product.id === id ? { ...product, qtd: product.qtd + 1 } : product,
      ),
    );    
  }

  function handleDecrementProduct(id: number): void {
    const findProduct = products.find(product => product.id === id);

    if (!findProduct) return;
    if (findProduct.qtd === 0) return;

    setProducts(
      products.map(product =>
        product.id === id ? { ...product, qtd: product.qtd - 1 } : product,
      ),
    );
  }

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('product/');
      setProducts(
        response.data.map((product: Omit<Product, 'qtd'>) => ({
          ...product,
          formattedPrice: formatValue(product.price),
          qtd: 0
        })),
        );
      }
    loadProducts();
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
              <ProductImage source={{
                  uri: product.imageUrl,
                }}></ProductImage>
              <RemoveItemContainer onPress={() => {handleDecrementProduct(product.id)}}>
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductPrice>{product.formattedPrice}</ProductPrice>
                </ProductInfo>
              </RemoveItemContainer>
              <AddItemContainer
                onPress={() => {
                  handleIncrementProduct(product.id)
                }}>
                <SaleInfo>
                  <SaleQuantity>
                    Qtd: {product.qtd}
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
