import React from 'react'
import { View, Text,TouchableOpacity,Image } from 'react-native'
import { COLORS, Colors, icons,images} from '../../Constantes'
import style from './style'

const ListDefib = ({press,isList}) => {
    
    return (
        <View style={style.ListDefib}>
            {isList ?(
             <TouchableOpacity
                 onPress = {press}
              >
                  <Image
                        source={images.map_icon}
                        resizeMode="contain"
                        style={{

                            width: 25,
                            height: 25,
                            tintColor: COLORS.black
                            
                        }}
                        
                    />  
                         
              </TouchableOpacity>):
              
              <TouchableOpacity
              onPress = { press}
           >
               <Image
                     source={images.list_icon}
                     resizeMode="contain"
                     style={{

                         width: 25,
                         height: 25,
                         tintColor: COLORS.black
                         
                     }}
                     
                 />  
                      
           </TouchableOpacity>}
        </View>
    )
}

export default ListDefib
