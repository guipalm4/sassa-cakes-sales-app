import React, {
    createContext,
    useState,
    useCallback,
    useContext,
    useEffect,
  } from 'react';
  
  import AsyncStorage from '@react-native-community/async-storage';

  import api from '../services/api';


  interface Customer {
      id?: number;
      name?: string;
      phone?: string;
  }

  interface CustomerContext {      
      customers: Customer[];
      addSelectedCustomer(customer: Customer) : void;
  }

  const CustomerContext = createContext<CustomerContext | null>(null);

  const CustomerProvider: React.FC = ({ children }) => {

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer|undefined>(undefined);

    async function saveCustomer(customer: Customer): Promise<void> {
          const response = await api.post('customer/', customer);
          setCustomers([ ... response.data]);          
    }     

     useEffect(() => {
        async function loadCustomers() : Promise<void> {
            const customers = await AsyncStorage.getItem('@SassaCakes: customers');

            if (customers) {
                console.log(customers);                
                setCustomers([ ... JSON.parse(customers)]);
            }            
        }
        loadCustomers();
    },[])

    const addSelectedCustomer = useCallback(
        async customer => {
            const exist = customers.find(c => c.id === customer.id);

            if(exist) {
                console.log("Exist:" + exist);
                setSelectedCustomer(exist);
            } else{
                saveCustomer(customer);
                addSelectedCustomer(customer)
            }
        await AsyncStorage.setItem(
                '@SassaCakes: selectedCustomer',
                JSON.stringify(selectedCustomer),
        );   
        },
        [selectedCustomer]
    );

    const value = React.useMemo(
        () => ({ addSelectedCustomer, customers, selectedCustomer }),
        [customers, addSelectedCustomer, selectedCustomer],
      );

    return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;

  };

  function useCustomer(): CustomerContext {
    const context = useContext(CustomerContext);
  
    if (!context) {
      throw new Error(`useCustomer must be used within a CustomerProvider`);
    }
  
    return context;
  }
  
  export { CustomerProvider, useCustomer };
  
  