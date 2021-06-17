import { StyleSheet } from "react-native";

import { COLORS, Colors, icons,images} from '../../Constantes'


const styles = StyleSheet.create({
    container: {
        width: 230, 
        height: 250,
        top:-10, 
        position:'absolute',
        zIndex: 30,
        right:4,
        backgroundColor: COLORS.white,
        elevation:30
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
        top: 100,
        right:11,
        position:'absolute',
        justifyContent:'center',
        alignItems: 'center',
        width: 38,
        height: 42,
        backgroundColor: COLORS.lightGray4,
        zIndex:3,
        shadowColor: "#001",
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 3,
        
    },
    image:{
        height:80,
        
    }
});

export default styles;