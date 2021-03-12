import React from 'react'
import {SafeAreaView ,View, Text, TouchableOpacity,Image} from 'react-native';
import styles from './styles'
import { COLORS, Colors, icons,images} from '../../Constantes'

const Card = ({ADRESSE,PAYS,PROVINCE}) => {
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
             <Text style ={styles.textHeader} >   ADRESSE : {ADRESSE}</Text>
             <Text style ={styles.textHeader} >   PAYS : {PAYS}</Text>
             <Text style ={styles.textHeader} >   PROVINCE : {PROVINCE}</Text>
               
       </View>
    )
}

export default Card
