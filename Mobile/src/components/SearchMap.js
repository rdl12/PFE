import { View,Text,Image,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import Svg, { Path } from 'react-native-svg';
import { COLORS, Colors, icons,images} from '../Constantes'


function SearchMap() {
    return (
        <View>
            
            <TouchableOpacity
                  style={{
                      top: 25,
                      right:5,
                      position:'absolute',
                      justifyContent:'center',
                      alignItems: 'center',
                      width: 42,
                      height: 42,
                      borderRadius: 25,
                      backgroundColor: COLORS.white,
                      zIndex:2
                  }}

              >
                  <Image
                        source={images.Home_image}
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

export default SearchMap;


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
  