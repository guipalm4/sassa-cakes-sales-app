/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useMemo, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

import api from '../../services/api';
import HeaderApp from '../../components/HeaderApp';
import LogoImg from '../../assets/logo.png';
import Modal from '../../components/Modal';
import SearchInput from '../../components/SearchInput';
import Button from '../../components/Button';

import formatValue from '../../utils/formatValue';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

import {useCustomer} from '../../hooks/customer';

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
  Title,
  FilterContainer,
  InputContainer,
  Icon,
  TextInput,
  FormData,
  FilterDataContainer,
  FilterDataItem,
  Separator,
} from './styles';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {useCallback} from 'react';

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

interface Customer {
  id: number;
  name: string;
  phone: string;
}

interface ItemSale {
  qtd: number;
  product: Product;
}

const Sale: React.FC = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<Number>(0);
  const [total, setTotal] = useState(0);
  const [paymentMethods, setPaymentMethods] = useState<MethodPayment[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | undefined
  >();
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >();

  const [customerNameValue, setCustomerNameValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');

  const [enableSelectCustomerButton, setEnableSelectCustomerButton] = useState(
    false,
  );

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [itemsSale, setItemsSale] = useState<Product[]>([]);

  const [customers, setCustomers] = useState<Customer[]>([]);

  const [searchValue, setSearchValue] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [showFilteredData, setShowFilteredData] = useState(false);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await api.get('product/');
      setProducts(
        response.data.map((product: Omit<Product, 'qtd'>) => ({
          ...product,
          formattedPrice: formatValue(product.price),
          qtd: 0,
          subTotal: formatValue(0),
        })),
      );
    }
    loadProducts();
  }, []);

  useEffect(() => {
    async function loadCustomers(): Promise<void> {
      const response = await api.get('customer/');
      setCustomers(response.data);
    }
    loadCustomers();
  }, []);

  useEffect(() => {
    async function loadPaymentMethods(): Promise<void> {
      const paymentMethods = [
        {id: 1, description: 'MONEY', text: 'Dinheiro'},
        {id: 2, description: 'CREDIT_CARD', text: 'Cartão de crédito'},
        {id: 3, description: 'ON_HAVING', text: 'A prazo'},
        //{id :4, description: 'TESTE' },
      ];
      setPaymentMethods(paymentMethods);
    }

    loadPaymentMethods();
  }, []);

  useEffect(() => {
    if (customerNameValue && phoneValue) {
      setEnableSelectCustomerButton(true);
    }
  }, [customerNameValue, phoneValue]);

  function handleIncrementProduct(id: number): void {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              qtd: product.qtd + 1,
              subTotal: formatValue(product.price * (product.qtd + 1)),
            }
          : product,
      ),
    );
  }

  function handleDecrementProduct(id: number): void {
    const findProduct = products.find((product) => product.id === id);

    if (!findProduct) {
      return;
    }
    if (findProduct.qtd === 0) {
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              qtd: product.qtd - 1,
              subTotal: formatValue(product.price * (product.qtd - 1)),
            }
          : product,
      ),
    );
  }

  function handleSelectPaymentMethod(id: number): void {
    if (selectedPaymentMethod === id) {
      setSelectedPaymentMethod(undefined);
    } else {
      setSelectedPaymentMethod(id);
      if (id == 3) {
        setCustomerModal(true);
      }
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
    setQuantity(quantity);
    return formatValue(total);
  }, [products, total, quantity]);

  function renderIcon(paymentMethod: MethodPayment) {
    switch (paymentMethod.description) {
      case 'MONEY':
        return (
          <MaterialCommunityIcons
            name="currency-brl"
            color="#332927"
            size={40}
          />
        );
      case 'CREDIT_CARD':
        return <Entypo name="credit-card" color="#332927" size={40} />;
      case 'ON_HAVING':
        return <Fontisto name="prescription" color="#332927" size={40} />;
      default:
        return (
          <MaterialCommunityIcons
            name="currency-brl"
            color="#332927"
            size={40}
          />
        );
    }
  }

  const findCustomer = (query: string) => {
    setSearchValue(query);
    if (query) {
      const regex = new RegExp(`${query.trim()}`, 'i');
      setFilteredCustomers(
        customers.filter((customer) => customer.name.search(regex) >= 0),
      );
      setShowFilteredData(true);
    } else {
      setFilteredCustomers([]);
    }
  };

  function generateSale(): void {
    setItemsSale(products.filter((product) => product.qtd > 0));
    setConfirmationModal(true);
  }

  function handleSelectCustomer(customer: Customer): void {
    console.log('CUSSTOMER:' + JSON.stringify(customer));
    console.log('ANTES:' + JSON.stringify(selectedCustomer));
    setSelectedCustomer(customer);
    console.log(JSON.stringify(selectedCustomer));
    //setFilteredCustomers([]);
    setShowFilteredData(false);
  }

  return (
    <Container>
      <HeaderApp title="Sassa Cakes" module="Vendas" logo={LogoImg} />

      <ProductList
        data={products}
        keyExtractor={(product) => product.id.toString()}
        ListHeaderComponent={
          <ProductListTitle>Cardápio do dia</ProductListTitle>
        }
        renderItem={({item: product}) => (
          <ProductContainer>
            <ProductImage
              source={{
                uri: product.imageUrl,
              }}
            />
            <RemoveItemContainer
              onPress={() => {
                handleDecrementProduct(product.id);
              }}>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>{product.formattedPrice}</ProductPrice>
              </ProductInfo>
            </RemoveItemContainer>
            <AddItemContainer
              onPress={() => {
                handleIncrementProduct(product.id);
              }}>
              <SaleInfo>
                <SaleQuantity>Qtd: {product.qtd}</SaleQuantity>
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
          showsHorizontalScrollIndicator={false}>
          {paymentMethods.map((paymentMethod) => (
            <PaymentMethodItem
              key={paymentMethod.id}
              isSelected={paymentMethod.id === selectedPaymentMethod}
              onPress={() => handleSelectPaymentMethod(paymentMethod.id)}
              activeOpacity={0.6}>
              {renderIcon(paymentMethod)}
              <PaymentMethodItemTitle>
                {paymentMethod.text}
              </PaymentMethodItemTitle>
            </PaymentMethodItem>
          ))}
        </PaymentMethodSlider>
      </PaymentMethodContainer>

      <TotalProductsContainer
        disabled={selectedPaymentMethod ? false : true}
        onPress={() => generateSale()}>
        <MaterialCommunityIcons
          name="cart-arrow-right"
          color="#332927"
          size={24}
        />
        <TotalProductsText>{`${quantity} itens`}</TotalProductsText>
        <SubtotalValue>{cartTotal}</SubtotalValue>
      </TotalProductsContainer>

      <Modal
        show={confirmationModal}
        close={() => setConfirmationModal(false)}
        text={`Confirma a venda de ${cartTotal}?`}
        info={itemsSale}
        enableButton={selectedPaymentMethod != 3}
        actionButton={() => setConfirmationModal(false)}></Modal>

      <Modal
        show={customerModal}
        close={() => setCustomerModal(false)}
        text={'Selecione o cliente...'}
        enableButton={true}
        actionButton={() => setCustomerModal(false)}>
        <FilterContainer>
          <SearchInput
            value={searchValue}
            onChangeText={(text) => findCustomer(text)}
            placeholder="Procurar"
          />
        </FilterContainer>
        <FormData>
          <InputContainer>
            <Icon name="user" size={20} color={'#B7B7CC'} />

            <TextInput
              key="name"
              placeholder="Nome do Cliente"
              placeholderTextColor="#B7B7CC"
              value={filteredCustomers[0]?.name || customerNameValue}
              onChangeText={setCustomerNameValue}
            />
          </InputContainer>

          <InputContainer>
            <Icon name="phone" size={20} color={'#B7B7CC'} />
            <TextInput
              key="phone"
              placeholder="Telefone"
              placeholderTextColor="#B7B7CC"
              value={filteredCustomers[0]?.phone || phoneValue}
              onChangeText={setPhoneValue}
            />
          </InputContainer>
        </FormData>
      </Modal>
    </Container>
  );
};

export default Sale;
