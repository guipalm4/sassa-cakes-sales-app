import React, {useEffect, useState, useMemo} from 'react';

import api from '../../services/api';
import HeaderApp from '../../components/HeaderApp';
import LogoImg from '../../assets/logo.png';
import Modal from '../../components/Modal'

import formatValue from '../../utils/formatValue';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'

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
  TotalProductsText,
  PaymentMethodContainer,
  PaymentMethodItem,
  PaymentMethodSlider,
  PaymentMethodItemTitle,
  Title
} from './styles';

export interface Product {
  id: number;
  name: string;
  price: number;
  qtd: number;
  imageUrl: string;
  formattedPrice: string;
  subTotal: string;
}

interface MethodPayment {
  id: number;
  description: string;
  text: string;
}

const Sale: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<Number>(0);
  const [total, setTotal] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState<MethodPayment[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number|undefined>();

  const [modal, setModal] = useState(false)
  
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
      console.log(selectedPaymentMethod);
      
    loadProducts();
  }, []);

  useEffect(() => {
    async function loadPaymentMethods(): Promise<void> {
      
      const paymentMethods = [        
        {id :1, description: 'MONEY', text: "Dinheiro" },
        {id :2, description: 'CREDIT_CARD', text: "Cartão de crédito" },
        {id :3, description: 'ON_HAVING', text: "A prazo" },      
        //{id :4, description: 'TESTE' },      
      ]      
      setPaymentMethods(paymentMethods);                     
    } 

    loadPaymentMethods();
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
  
  function handleSelectPaymentMethod(id : number) :void {
    if (selectedPaymentMethod === id) {
      setSelectedPaymentMethod(undefined);
    } else {
      setSelectedPaymentMethod(id);
    }
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

  function renderIcon(paymentMethod: MethodPayment) {    
    switch(paymentMethod.description){
        case "MONEY": return <MaterialCommunityIcons name="currency-brl" color="#332927" size={40}/>;
        case "CREDIT_CARD": return <Entypo name="credit-card" color="#332927" size={40}/>;
        case "ON_HAVING": return <Fontisto name="prescription" color="#332927" size={40}/>;
        default: return <MaterialCommunityIcons name="currency-brl" color="#332927" size={40}/>
  }
}

  return (
    
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
         <PaymentMethodContainer>
          <Title>Forma de pagamento</Title>
          <PaymentMethodSlider
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {paymentMethods.map(paymentMethod => (
              <PaymentMethodItem
                key={paymentMethod.id}
                isSelected={paymentMethod.id === selectedPaymentMethod}
                onPress={() => handleSelectPaymentMethod(paymentMethod.id)}
                activeOpacity={0.6}>                
                {renderIcon(paymentMethod)}
                <PaymentMethodItemTitle>{paymentMethod.text}</PaymentMethodItemTitle>          
              </PaymentMethodItem>
            ))}
          </PaymentMethodSlider>
        </PaymentMethodContainer>

        <TotalProductsContainer onPress={() => setModal(true)}>
        <MaterialCommunityIcons name="cart-arrow-right" color="#332927" size={24} />
        <TotalProductsText>{`${quantity} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>

      <Modal show={modal}
        close={() => setModal(false)}
        buttonText="Confirmar" text={`Confirma a venda de ${cartTotal}?`}
        enableButton={selectedPaymentMethod==3 ? false:true}>            
      </Modal>
      </Container>
      

  );
};

export default Sale;
