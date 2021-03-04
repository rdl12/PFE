import React,{useState} from 'react'
import {SafeAreaView ,View, Text, TouchableOpacity,Image} from 'react-native';
import styles from './styles'
import { COLORS, Colors, icons,images} from '../../Constantes'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const PhotoPicker = () => {

    const [imageSource, setImageSource] = useState(null);

        const imageGalleryLaunch = () => {
            let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            };
        
            launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled photo picker');
                    Alert.alert('You did not select any image');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                  } else {
                    let source = { uri: response.uri };
            
                    // ADD THIS
                    setImageSource(source.uri);
                  }
        
            
            });
        }
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
             <TouchableOpacity
                  onPress={imageGalleryLaunch}
                  style = {styles.add_to_photo}
              >

{imageSource === null ? (
          <Image
          source={images.add_to_photo}
          resizeMode='stretch'
          style = {styles.add_to_photo}   
      />  
        ) : (
          <Image
            source={{ uri: imageSource }}
            style = {styles.add_to_photo}  
            resizeMode='contain'
          />
        )}
                
                         
              </TouchableOpacity>

       </View>
    )
}

export default PhotoPicker
