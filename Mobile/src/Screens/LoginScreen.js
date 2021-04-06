import { View,Text, SafeAreaView ,KeyboardAvoidingView, ImageBackground} from 'react-native'
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
        <ImageBackground source = {images.login_background} resizeMode='cover'  style={styles.background_image}>
        
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
        <ImageBackground source= {images.login_background_footer} resizeMode='cover' style = {styles.image_footer}>

          <View style = {styles.Register}>
             <TouchableOpacity >
               <Text style = {styles.RegisterText}>S'inscrire ?</Text>
             </TouchableOpacity>
          </View>

          <View style={styles.loginButton}>
            <TouchableOpacity onPress={() => dispatch(login({'username': username, 'password': password },navigation))}>
              <Text style = {styles.text}>Login</Text>
            </TouchableOpacity>
          </View>
           
         
      
         </ImageBackground>  

         

         
         
        
        </SafeAreaView>
     )
}

export default LoginScreen

const styles = StyleSheet.create({

  login:{
    flex:2,
    marginTop:windowHeight/3.1
  },

  title:{
    color:COLORS.primary,
    fontSize:30,
    letterSpacing:1,
    fontWeight:'bold',
    fontFamily:'Nunito',
    marginBottom:10,
    marginLeft: 20,
  },
 
  background_image:{
    flex:1,
    width:windowWidth,
    height:windowHeight/2
  },

  image_footer:{
    flex:0.35,
    width:windowWidth,
    height:windowHeight/4
  },


  loginButton:{
    top:40,
    left:windowWidth/1.7,
    width:windowWidth/2.7,
    borderColor:COLORS.white,
    borderWidth:2  
  },

  text:{
    color:Colors.white,
    padding:18,
    fontSize:20,
    marginLeft:23,
    fontFamily:'Nunito',

  },

  Register:{
    
    top:80,
    width:windowWidth/5.5,
    left:windowWidth/12,
    borderBottomColor:COLORS.primary,
    borderBottomWidth:0.5
  
 
  },
  
  RegisterText:{
   
    fontSize:15,
    fontFamily:'Nunito',
    color:COLORS.primary
  },
});

