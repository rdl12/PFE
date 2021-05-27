import React, {useState,useEffect,} from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {FONTS, COLORS, SIZES, images} from '../Constantes'
import { windowHeight, windowWidth } from '../utils/Dimentions';
import TabBarCustomButton from '../components/TabBar/TabBarCustomButton'

const AboutScreen = ({navigation}) => {

    useEffect(() => {

        const parent = navigation.dangerouslyGetParent();
        parent.setOptions({
              tabBarVisible: false,  
              tabBarButton: (props) => (
                         <TabBarCustomButton visible
                              {...props}
                          /> ),
        });
       
        return () =>{
          parent.setOptions({
            tabBarVisible: true,
            tabBarButton: (props) => (
                     <TabBarCustomButton 
                         {...props}
                     />),
        });
        }
        
    }, [])


    return (
        <SafeAreaView style = {{display:'flex',flex:1}}>
                   {/* Header */}
                <View style={{ flexDirection: 'row', paddingHorizontal: SIZES.radius, height: 60, alignItems: 'center',elevation:3 ,backgroundColor:COLORS.WHITE, marginBottom:20}}>
                    <TouchableOpacity
                        style={{ marginLeft: -8 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={images.back_arrow}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.black
                                }}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h2, color: COLORS.black }}>A propos de Nous ...</Text>
                    </View>
                </View>
        </SafeAreaView>
    )
}
 
export default AboutScreen
