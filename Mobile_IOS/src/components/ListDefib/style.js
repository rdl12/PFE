import { StyleSheet } from "react-native";

import { COLORS, Colors, icons,images} from '../../Constantes'


const styles = StyleSheet.create({
    container: {
        width: 230, 
        height: 250,
        top:5, 
        position:'absolute',
        zIndex: 30,
        right:3,
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
    ListDefib:{
        top: 150,
        right:11,
        position:'absolute',
        justifyContent:'center',
        alignItems: 'center',
        width: 38,
        height: 42,
        backgroundColor: COLORS.lightGray4,
        zIndex:2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        
    },
    image:{
        height:80,
        
    }
});

export default styles;