import React from 'react'
import {SafeAreaView ,View, Text, TouchableOpacity,Image} from 'react-native';
import styles from './styles'
import {images} from '../../Constantes'

const PhotoPicker = ({imageSource,press}) => {

    return (
        <View >
             {imageSource === null ? (
             <TouchableOpacity
                  onPress={press}
                  style = {styles.add_to_photo}
              >


          <Image
          source={images.add_to_photo}
          resizeMode='stretch'
          style = {styles.add_to_photo}   
      />  
        
                
                         
              </TouchableOpacity>) 
              : (
                <Image
                  source={{ uri: imageSource }}
                  style = {styles.add_to_photo}  
                  resizeMode='contain'
                />
              )}

       </View>
    )
}

export default PhotoPicker