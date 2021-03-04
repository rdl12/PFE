import { COLORS, Colors, icons,images} from '../../Constantes'
import { StyleSheet } from "react-native";
import {windowHeight, windowWidth} from '../../utils/Dimentions';

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginLeft:17,
        marginBottom: 10,
        width: '90%',
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
        padding: 10,
        flex: 1,
        fontSize: 16,
        fontFamily: 'Lato-Regular',
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
      },
      inputField: {
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.15 ,
        height: windowHeight / 12,
        fontSize: 20,
        backgroundColor:'white'
       
      },
      NameInput:{
        alignItems:'flex-start'

      }
});

export default styles;