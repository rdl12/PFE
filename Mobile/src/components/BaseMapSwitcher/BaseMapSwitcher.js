import { View,Text,Image,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import Svg, { Path } from 'react-native-svg';
import { COLORS, Colors, icons,images} from '../../Constantes'
import style from './style'
import { useDispatch } from 'react-redux';
import {MapState} from '../../redux/actions'

const BaseMapSwitcher = () => {
    const [shouldShow, setShouldShow] = useState(false);
    const dispatch = useDispatch()
    return (
        <View style = {style.layerswitcher}>
            {shouldShow ? (
                <View style={style.container}>
                    <TouchableOpacity
                  style={style.closeButton}
                  onPress={() => setShouldShow(!shouldShow)}
              >
                   <Image
                         source={images.close_Button_icon}
                         style={{ width: 30, height: 30, position:'absolute',zIndex:2,right:10,top:5 }}
                          
                     /> 
                         
              </TouchableOpacity>
                   
                     
                    <Text style={{ width: 150, height: 50, position:'absolute',zIndex:2,right:65,top:10, fontWeight: "bold" }} >TYPE DE CARTE</Text> 
                    <TouchableOpacity
                             style={{ width: 80, height: 50, position:'absolute',zIndex:1,right:75,top:50 }} 
                             onPress={() => dispatch(MapState({ maptype : 'standard'}))}
                            >
                    <Image
                        source={ images.default_map_image }
                         style={{ width: 80, height: 50, position:'absolute',justifyContent: 'center', }} 
                     />
                    </TouchableOpacity>
                     <Text style={{ width: 100, height: 50, position:'absolute',zIndex:2,right:35,top:105 }}>Défaut</Text>

                     <TouchableOpacity
                           style={{ width: 80, height: 50, position:'absolute',zIndex:2,right:75,top:150 }} 
                           onPress={() => dispatch(MapState({ maptype : 'satellite'}))}
                            >
                     <Image
                        source={images.Earth_map_image}
                         style={{ width: 80, height: 50,  position:'absolute',justifyContent: 'center', }} 
                     />
                     </TouchableOpacity>
                     <Text style={{ width: 100, height: 50, position:'absolute',zIndex:2,right:35,top:205 }} >Satellite</Text>
                </View>

          
        ) : null}
              <TouchableOpacity
                  style={style.BaseMapSwitcher}
                  onPress={() => setShouldShow(!shouldShow)}
              >
                  <Image
                        source={images.layer_icon}
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

export default BaseMapSwitcher