import { COLORS, Colors, icons,images,FONTS} from '../../Constantes'
import { StyleSheet } from "react-native";
import {windowHeight, windowWidth} from '../../utils/Dimentions';

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: 10,
        height: windowHeight / 12,
        borderColor: '#ccc',
        borderRadius: 7,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf:'center',
      },
      iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightColor: '#ccc',
        borderRightWidth: 1,
        width: 50,
      },
      input: {
        padding: 1,
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
      },
      inputField: {
        marginLeft: 27,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.17 ,
        height: windowHeight / 12,
        fontSize: 20,
        backgroundColor:'white'
       
      },
      NameInput:{
        alignItems:'flex-start'

      },
      label:{
        fontSize: 15,
        fontFamily: FONTS.h1.fontFamily,
        letterSpacing: 1,
        marginLeft:27,
        color:COLORS.primary
      }
});

export default styles;