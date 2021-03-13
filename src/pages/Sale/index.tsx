import React, {useEffect, useState, useMemo} from 'react';
import {
  Container,
  ProductList,
  ProductListTitle,
  ProductContainer,
  RemoveItemContainer,
  AddItemContainer,
  ProductName,
  ProductPrice,  
  ProductImage,
  ProductInfo,
  SaleInfo,
  SaleQuantity,
  SubTotal,
  SubtotalValue,
  TotalProductsContainer,
  TotalProductsText
} from './styles';
import api from '../../services/api';
import HeaderApp from '../../components/HeaderApp';
import LogoImg from '../../assets/logo.png';
import formatValue from '../../utils/formatValue';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export interface Product {
  id: number;
  name: string;
  price: number;
  qtd: number;
  imageUrl: string;
  formattedPrice: string;
  subTotal: string;
}

const Sale: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<Number>(0);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('product/');
      setProducts(
        response.data.map((product: Omit<Product, 'qtd'>) => ({
          ...product,
          formattedPrice: formatValue(product.price),
          qtd: 0,
          subTotal: formatValue(0)
        })),
        );
      }
    loadProducts();
  }, []);
  
  function handleIncrementProduct(id: number): void {
    setProducts(
      products.map(product =>        
        product.id === id ? { ...product, qtd: product.qtd + 1,
        subTotal: formatValue((product.price * (product.qtd + 1))) } : product,
      ),
    );    
  }

  function handleDecrementProduct(id: number): void {
    const findProduct = products.find(product => product.id === id);

    if (!findProduct) return;
    if (findProduct.qtd === 0) return;

    setProducts(
      products.map(product =>
        product.id === id ? { ...product, qtd: product.qtd - 1,
        subTotal: formatValue((product.price * (product.qtd - 1))) } : product,
      ),
    );
  } 
  
  const cartTotal = useMemo(() => {
    const total = products.reduce((accumulator, product) => {
      return accumulator + product.qtd * product.price;
    }, 0);

    const quantity = products.reduce((accumulator, product) => {
      return accumulator + product.qtd;
    }, 0);

    setTotal(total);
    setQuantity(quantity)
    return formatValue(total);
  }, [products, total, quantity]);  

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
              <SubTotal>{product.subTotal}</SubTotal>
                </SaleInfo>
              </AddItemContainer>
            </ProductContainer>
          )}
        />
      </Container>
      <TotalProductsContainer>
        <MaterialCommunityIcons name="cart-arrow-right" color="#332927" size={24} />
        <TotalProductsText>{`${quantity} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>
    </>
  );
};

export default Sale;
