import React from 'react'
import {SafeAreaView ,View, Text, TouchableOpacity,Image} from 'react-native';
import styles from './styles'
import {images} from '../../Constantes'

const PhotoPicker = ({imageSource,press}) => {

    return (
        <View style ={styles.container}>
         <View style = {styles.cardHeader}>
             <Text style ={styles.textHeader} > Photo</Text>
             <Image
                source={images.add_photo}
                style={{
                    width: 30,
                    height: 30,
                  
                }}
             />    
             </View>
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