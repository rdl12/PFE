import { View,Text, SafeAreaView ,Button,Image, ImageBackground} from 'react-native'
import React ,{useState}  from 'react'
import { login } from '../redux/actions';
import { useDispatch } from 'react-redux';
import {SignupScreen} from './SignupScreen'
import Input from '../components/Input/Input'
import { StyleSheet } from "react-native";
import { COLORS,images } from "../Constantes";
import {windowHeight,windowWidth} from '../utils/Dimentions'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';



const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
    return (
        <SafeAreaView style = {{backgroundColor : COLORS.white,flex:1,justifyContent:'space-between',display:'flex'}}>
        
        <ImageBackground source = {images.login_background}  style={styles.background_image}>
        <View style = {styles.login}>
        <Text style = {styles.title}> Login</Text>
          <Input
          placeholderText='Email'
          labelValue={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          placeholderText='password'
          labelValue={password}
          onChangeText={(text) => setPassword(text)}
        />
       
          </View>
        
         
        </ImageBackground>
      
         <ImageBackground source= {images.login_background_footer} style = {styles.image_footer}>
         <TouchableOpacity style = {styles.Register}>
            <Text style = {styles.RegisterText}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(login({'username': username, 'password': password }))}
            style = {styles.loginButton}
          >
            
            <Text style = {styles.text}>Login</Text>
          </TouchableOpacity>
         
         </ImageBackground>
        </SafeAreaView>
     )
}

export default LoginScreen

const styles = StyleSheet.create({
  title:{
    color:COLORS.primary,
    fontSize:30,
    letterSpacing:1,
    fontWeight:'bold',
    fontFamily:'Nunito',
    marginBottom:10,
    marginLeft: 20,



  },
  Register:{
    top:19,
    marginLeft:20,
 
  },
  RegisterText:{
    fontSize:15,
    fontFamily:'Nunito',
    color:COLORS.primary
  },
  login:{
    
    alignContent:'center',
    top:windowWidth/2,
    marginBottom:20,
    

  },
 
  background_image:{
    flex: 0.5,
    resizeMode: "cover",
    justifyContent: "center"
   

  },
  image_footer:{
    bottom:0,
    resizeMode: "cover",
    justifyContent: "center",
    flex:0.25

  },
  loginButton:{
  
    left:windowWidth/1.77,
    marginTop:35,
    borderWidth: 1,
    borderColor:COLORS.white,
    width:windowWidth/2.5,
    borderRadius:7
    
    
  },

  text:{
    color:Colors.white,
    padding:20,
    fontSize:20,
    fontFamily:'Nunito',

  }
});

