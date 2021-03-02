import { View,Text,Image,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import Svg, { Path } from 'react-native-svg';
import { COLORS, Colors, icons,images} from '../Constantes'


function BaseMapSwitcher() {
    return (
        <View>
            
            <TouchableOpacity
                  style={{
                      top: 25,
                      right:0,
                      position:'absolute',
                      justifyContent:'center',
                      alignItems: 'center',
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: COLORS.white,
                      zIndex:2
                  }}

              >
                  <Image
                        source={images.Home_image}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30,
                            
                        }}
                    />       
              </TouchableOpacity>

        </View>
      
    )
}

export default BaseMapSwitcher


const styles = StyleSheet.create({
    container: {
        height: '5%',
        width: '10%',
        zIndex:100,
        position:'absolute',
        backgroundColor: 'red',
        right: '0%',
        top: '3%',
        borderRadius: 100,
        overflow: 'hidden'
        
    },
  
  });
  