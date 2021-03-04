import React from 'react'
import {SafeAreaView ,View, Text, TouchableOpacity,Image} from 'react-native';
import styles from './styles'
import { COLORS, Colors, icons,images} from '../../Constantes'

const Card = () => {
    return (
       <View style ={styles.container}>
         <View style = {styles.cardHeader}>
             <Text style ={styles.textHeader} > Adresse</Text>
             
             <Image
                source={images.edit_icon}
                style={{
                    width: 30,
                    height: 30,
                    
                  
                }}
             />    
        
               
             </View>
       </View>
    )
}

export default Card
