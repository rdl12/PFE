import React from 'react';
import {SafeAreaView ,View, Text} from 'react-native';
import styles from './style'
import { TextInput } from 'react-native-paper';

import AntDesign from 'react-native-vector-icons/AntDesign';

const Input = ({labelValue, placeholderText, iconType, ...rest}) => {

  const [text, setText] = React.useState('');
    return (
    
       <SafeAreaView>
         <View style = {styles.NameInput}>
         <Text>Nom</Text>
            <TextInput
            label="Nom"
            value={text}
            onChangeText={text => setText(text)}
            mode = 'outlined'
            theme = {{colors:{primary:"red"}}}
            style = {styles.inputField}
        />
         </View>
          
        <Text>Description</Text>
          <TextInput
            label="Description"
            value={text}
            onChangeText={text => setText(text)}
            mode = 'outlined'
            theme = {{colors:{primary:"red"}}}
            style = {styles.inputField}
           
            
        />
       </SafeAreaView >
      
     
    );
  };
  
  export default Input;
  
  