import { StyleSheet } from "react-native";

import { COLORS, Colors, icons,images} from '../../Constantes'


const styles = StyleSheet.create({
    container: {
        width: 230, 
        height: 250,
        top:5, 
        position:'absolute',
        zIndex:5,
        right:3,
        backgroundColor: COLORS.white
    },
    closeButton: {
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
    },
    image:{
        height:80,
        
    }
});

export default styles;