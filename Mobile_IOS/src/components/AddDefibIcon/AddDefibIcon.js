import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,Image} from 'react-native'
import { COLORS, icons,images} from '../../Constantes'
import { useDispatch } from 'react-redux';
import { AddDefibButton} from '../../redux/actions';
import  {Marker} from 'react-native-maps'

import styles from './style'

function AddDefibIcon()  {
     const dispatch = useDispatch()
   
        return (
            <View>          
          <TouchableOpacity
                  style={styles.iconPlaceHolder}
                  onPress={() => dispatch(AddDefibButton())}
              >
                  <Image
                        source={images.add_defib}
                        resizeMode="contain"
                        style={styles.image_icon}
                    />       
              </TouchableOpacity>
             
           
            </View>
        )
    }


export default AddDefibIcon
