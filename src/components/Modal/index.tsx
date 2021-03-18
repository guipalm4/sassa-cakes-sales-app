import React, {useState, useEffect, Children} from 'react';
import Button from '../Button';
import { View, Text, StyleSheet, ScrollView, Animated, Dimensions } from 'react-native'


import SearchInput from '../../components/SearchInput';

 import { Indicator, ItemText, ModalText  } from './styles';

 const { height } = Dimensions.get('window')

 interface ModalProps {
    text: string;   
    show: boolean;
    close: any;
    enableButton: boolean;
    info?: Product[];
  }

  interface Customer {
    id?: number;
    name?: string;
  }

  interface Product {
    id: number;
  name: string; 
  qtd: number;
  }

const Modal: React.FC<ModalProps> = ({text, show,  close, children, enableButton, info,...rest}) => {

    const [state, setState] = useState({
        opacity: new Animated.Value(0),
        container: new Animated.Value(height),
        modal: new Animated.Value(height)
    })  
    
    const [customer,setCustomer] = useState<Customer | undefined>({})

    const openModal = () => {
        Animated.sequence([
          Animated.timing(state.container, { toValue: 0, duration: 100 , useNativeDriver: true}),
          Animated.timing(state.opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.spring(state.modal, { toValue: 0, friction: 5, useNativeDriver: true })
        ]).start()
    }

    const closeModal = () => {
        Animated.sequence([
          Animated.timing(state.modal, { toValue: height, duration: 250, useNativeDriver: true }),
          Animated.timing(state.opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(state.container, { toValue: height, duration: 100, useNativeDriver: true })
        ]).start()
        show = false;
    }

    useEffect(() => {
      if(show){
        openModal()
      }else{
        closeModal()
      }
    }, [show])
    

  return(     
      
    <Animated.View 
    style={[styles.container, {
      opacity: state.opacity,
      transform: [
        { translateY: state.container }
      ]
    }]}
  >
    <Animated.View 
      style={[styles.modal, {
        transform: [
          { translateY: state.modal }
        ]
      }]}
    >
        <Indicator/>       
        <ModalText>
           {text}
        </ModalText>
        <ScrollView>
        {info && info.map( (itemSale: Product)=> (
        <ItemText key={itemSale.id}>
          {`${itemSale.qtd} x ${itemSale.name}`}
        </ItemText>  
        ))}       
        </ScrollView>
        <Button style={styles.btn} color="#ffbf00" textColor="#312e38" onPress={close} enabled={enableButton}>
            Sim
        </Button>
       
       
        </Animated.View>
    </Animated.View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex:1,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute'
  },
  modal: {
    
    bottom: 0,
    position: 'absolute',
    height: '40%',
    backgroundColor: '#fff',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 25,
    paddingRight: 25
  },
  btn: {     
    width: '100%',
    height: 50,
    borderRadius: 10,
    bottom: 0,    
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center",
    marginTop: 30
  }
})

export default Modal;