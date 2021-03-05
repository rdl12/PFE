import React from 'react';
import {SafeAreaView ,View, Text} from 'react-native';
import styles from './style'
import { TextInput } from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';

const Input = ({labelValue ,placeholderText, iconType, ...rest}) => {

    return (
    
       <SafeAreaView>
         <View style = {styles.NameInput}>
        
            <TextInput
            value={labelValue}
            placeholder = {placeholderText}
            mode = 'outlined'
            theme = {{colors:{primary:"red"}}}
            style = {styles.inputField}
            {...rest}
        />
         </View>
     
       </SafeAreaView >
      
     
    );
  };
  
  export default Input;
  
  