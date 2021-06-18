import { StyleSheet } from "react-native";

import { COLORS, Colors, icons,images} from '../Constantes'


const styles = StyleSheet.create({
    iconPlaceHolder: {
        bottom: 35,
        left:5,
        position:'absolute',
        justifyContent:'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 50,
        backgroundColor: COLORS.primary,
        zIndex:2,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,

      elevation: 16
    },
    image_icon: {
        width: 50,
        height: 50,
        tintColor: COLORS.white,
        shadowColor: "#000",
        
    },
    BaseMapSwitcher:{
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
    }
});

export default styles;