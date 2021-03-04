import React from 'react'
import { View,Text } from 'react-native'
import Input from '../components/Input/Input'
import Card from '../components/Card/Card'
import PhotoPicker from '../components/ImagePicker/PhotoPicker'
import { TextInput } from 'react-native-paper';

const AddDefibScreen = () => {
    
    return (
      <View>
          <Input/>
          <Card />        
          {/* <View>
              <Card loaction='' adresse='' Ville ='' Province = ''/>
          </View> */}
          {/* <View>
              <PhotoPicker/>
          </View> */}
           <PhotoPicker/>
      </View>
    )
}

export default AddDefibScreen
