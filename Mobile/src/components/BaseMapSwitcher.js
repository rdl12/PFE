import { View,Text,Image,TouchableOpacity,StyleSheet } from 'react-native'
import React,{useState} from 'react'
import Svg, { Path } from 'react-native-svg';
import { COLORS, Colors, icons,images} from '../Constantes'


function BaseMapSwitcher() {
    const [shouldShow, setShouldShow] = useState(true);
    return (
        <View>
            {shouldShow ? (
                <View style={{ width: 230, height: 250,top:5, position:'absolute',zIndex:5,right:3,backgroundColor: COLORS.white}}>
                    <TouchableOpacity
                  style={{
                      top: 5,
                      right:10,
                      position:'absolute',
                      justifyContent:'center',
                      alignItems: 'center',
                      width: 42,
                      height: 42,
                      borderRadius: 25,
                      backgroundColor: COLORS.white,
                      zIndex:2
                  }}
                  onPress={() => setShouldShow(!shouldShow)}
              >
                   <Image
                        source={{ uri:  'https://prod.isg.bruneau.media//storage/jmbfra/publish-front/web/Content/Eboutique/FichesGamme/BanFiltre/croix5.png', }}
                         style={{ width: 30, height: 30, position:'absolute',zIndex:2,right:10,top:5 }}
                          
                     /> 
                         
              </TouchableOpacity>
                   
                     
                    <Text style={{ width: 150, height: 50, position:'absolute',zIndex:2,right:65,top:10, fontWeight: "bold" }} >TYPE DE CARTE</Text> 
                    <Image
                        source={{ uri:  'https://www.itespresso.fr/wp-content/uploads/2016/06/Earth-Google.png', }}
                         style={{ width: 80, height: 50, position:'absolute',zIndex:2,right:75,top:50 }} 
                     />
                     <Text style={{ width: 100, height: 50, position:'absolute',zIndex:2,right:35,top:105 }}  >Satellite</Text>
                     <Image
                        source={{ uri:  'https://cdn.easymapmaker.com/map_styles/default.png', }}
                         style={{ width: 80, height: 50, position:'absolute',zIndex:2,right:75,top:150 }} 
                     />
                     <Text style={{ width: 100, height: 50, position:'absolute',zIndex:2,right:35,top:205 }}  >Défaut</Text>
                </View>

          
        ) : null}
              <TouchableOpacity
                  style={{
                      top: 85,
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
                  onPress={() => setShouldShow(!shouldShow)}
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
  