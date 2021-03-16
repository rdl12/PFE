import React from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'
import { COLORS, Colors, icons,images} from '../../Constantes'
import style from './style'

const ListDefib = ({navigation}) => {
    return (
        <View style={style.ListDefib}>
             <TouchableOpacity
                 onPress = {() => navigation.navigate('ListDefib')}
              >
                  <Image
                        source={images.list_icon}
                        resizeMode="contain"
                        style={{

                            width: 25,
                            height: 25,
                            
                        }}
                        
                    />  
                         
              </TouchableOpacity>
        </View>
    )
}

export default ListDefib
